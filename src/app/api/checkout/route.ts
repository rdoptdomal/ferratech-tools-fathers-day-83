import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface CheckoutData {
  items: Array<{
    productId: string;
    quantity: number;
    variation?: any;
  }>;
  customerDetails: {
    name: string;
    email: string;
    phone: string;
    cpf: string;
  };
  shippingAddress: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  paymentMethod: 'PIX' | 'CREDIT_CARD' | 'BOLETO' | 'BANK_TRANSFER';
  total: number;
  cardData?: {
    number: string;
    holder_name: string;
    cvv: string;
    expiration_month: string;
    expiration_year: string;
  };
}

const BLACKCAT_SECRET_KEY = 'sk_yfcQHXDMEaZ18y2eXfNNK6gARWHB28W1w2JCiGOJRF5ANlyT';
const BLACKCAT_PUBLIC_KEY = 'pk_98LtyQC254l3zTGscDDrKUdfEpnHCvMIygtXduJJzmdzHxIo';

export async function POST(request: NextRequest) {
  try {
    const data: CheckoutData = await request.json();

    // 1. Validação dos dados
    if (!data.items || data.items.length === 0) {
      return NextResponse.json(
        { error: 'Carrinho vazio' },
        { status: 400 }
      );
    }

    if (!data.customerDetails.name || !data.customerDetails.email) {
      return NextResponse.json(
        { error: 'Dados do cliente incompletos' },
        { status: 400 }
      );
    }

    // 2. Buscar produtos e recalcular total (segurança)
    const productIds = data.items.map(item => item.productId);
    const products = await prisma.product.findMany({
      where: { 
        id: { in: productIds },
        isActive: true
      }
    });

    // 3. Recalcular total no backend
    let calculatedTotal = 0;
    const orderItems = [];

    for (const item of data.items) {
      const product = products.find(p => p.id === item.productId);
      if (!product) {
        return NextResponse.json(
          { error: `Produto ${item.productId} não encontrado` },
          { status: 400 }
        );
      }

      if (product.stock < item.quantity) {
        return NextResponse.json(
          { error: `Estoque insuficiente para ${product.name}` },
          { status: 400 }
        );
      }

      const itemTotal = product.price * item.quantity;
      calculatedTotal += itemTotal;

      orderItems.push({
        productId: item.productId,
        quantity: item.quantity,
        price: product.price,
        variation: item.variation
      });
    }

    // 4. Verificar se o total calculado corresponde ao enviado
    if (Math.abs(calculatedTotal - data.total) > 0.01) {
      return NextResponse.json(
        { error: 'Total do pedido inválido' },
        { status: 400 }
      );
    }

    // 5. Criar ou buscar usuário
    let user = await prisma.user.findUnique({
      where: { email: data.customerDetails.email }
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: data.customerDetails.email,
          name: data.customerDetails.name,
          phone: data.customerDetails.phone,
          cpf: data.customerDetails.cpf
        }
      });
    }

    // 6. Criar endereço
    const address = await prisma.address.create({
      data: {
        ...data.shippingAddress,
        userId: user.id
      }
    });

    // 7. Criar pedido
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        addressId: address.id,
        subtotal: calculatedTotal,
        total: calculatedTotal, // Sem frete por enquanto
        paymentMethod: data.paymentMethod,
        items: {
          create: orderItems
        }
      }
    });

    // 8. Atualizar estoque
    for (const item of data.items) {
      await prisma.product.update({
        where: { id: item.productId },
        data: {
          stock: {
            decrement: item.quantity
          }
        }
      });
    }

    // 9. Integração com BlackCat Pagamentos
    const blackcatPayload = {
      amount: Math.round(calculatedTotal * 100), // BlackCat usa centavos
      currency: 'BRL',
      payment_method: data.paymentMethod.toLowerCase(),
      order_id: order.id,
      customer: {
        name: data.customerDetails.name,
        email: data.customerDetails.email,
        phone: data.customerDetails.phone,
        cpf: data.customerDetails.cpf
      },
      billing_address: {
        street: data.shippingAddress.street,
        number: data.shippingAddress.number,
        complement: data.shippingAddress.complement,
        neighborhood: data.shippingAddress.neighborhood,
        city: data.shippingAddress.city,
        state: data.shippingAddress.state,
        zip_code: data.shippingAddress.zipCode
      },
      shipping_address: {
        street: data.shippingAddress.street,
        number: data.shippingAddress.number,
        complement: data.shippingAddress.complement,
        neighborhood: data.shippingAddress.neighborhood,
        city: data.shippingAddress.city,
        state: data.shippingAddress.state,
        zip_code: data.shippingAddress.zipCode
      },
      items: data.items.map(item => {
        const product = products.find(p => p.id === item.productId);
        return {
          name: product?.name || 'Produto',
          quantity: item.quantity,
          unit_amount: Math.round((product?.price || 0) * 100)
        };
      }),
      webhook_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/webhooks/blackcat`,
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pedido/sucesso`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pedido/cancelado`
    };

    // Se for cartão de crédito, adicionar dados do cartão
    if (data.paymentMethod === 'CREDIT_CARD' && data.cardData) {
      blackcatPayload.card = {
        number: data.cardData.number,
        holder_name: data.cardData.holder_name,
        cvv: data.cardData.cvv,
        expiration_month: data.cardData.expiration_month,
        expiration_year: data.cardData.expiration_year
      };
    }

    // Fazer requisição para BlackCat
    const blackcatResponse = await fetch('https://api.blackcat.com.br/v1/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${BLACKCAT_SECRET_KEY}`
      },
      body: JSON.stringify(blackcatPayload)
    });

    const blackcatData = await blackcatResponse.json();

    if (!blackcatResponse.ok) {
      throw new Error(`BlackCat error: ${blackcatData.message || 'Erro no processamento'}`);
    }

    // 10. Atualizar pedido com dados do BlackCat
    await prisma.order.update({
      where: { id: order.id },
      data: {
        blackcatPaymentId: blackcatData.id,
        transactionId: blackcatData.transaction_id,
        paymentStatus: blackcatData.status === 'approved' ? 'PAID' : 'PENDING',
        status: blackcatData.status === 'approved' ? 'CONFIRMED' : 'PENDING'
      }
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      paymentId: blackcatData.id,
      transactionId: blackcatData.transaction_id,
      status: blackcatData.status,
      paymentUrl: blackcatData.payment_url, // Para PIX e Boleto
      qrCode: blackcatData.qr_code, // Para PIX
      qrCodeText: blackcatData.qr_code_text // Para PIX
    });

  } catch (error) {
    console.error('Erro no checkout:', error);
    return NextResponse.json(
      { error: 'Erro interno no processamento' },
      { status: 500 }
    );
  }
} 