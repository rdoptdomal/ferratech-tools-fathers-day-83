import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

const BLACKCAT_SECRET_KEY = 'sk_yfcQHXDMEaZ18y2eXfNNK6gARWHB28W1w2JCiGOJRF5ANlyT';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('x-blackcat-signature');

    // Verificar assinatura do webhook (se BlackCat fornecer)
    if (signature) {
      const expectedSignature = crypto
        .createHmac('sha256', BLACKCAT_SECRET_KEY)
        .update(body)
        .digest('hex');

      if (signature !== expectedSignature) {
        return NextResponse.json(
          { error: 'Assinatura inválida' },
          { status: 401 }
        );
      }
    }

    const webhookData = JSON.parse(body);
    console.log('Webhook BlackCat recebido:', webhookData);

    // Extrair dados do webhook
    const {
      id: paymentId,
      order_id: orderId,
      status,
      transaction_id: transactionId,
      amount,
      payment_method,
      customer,
      created_at,
      updated_at
    } = webhookData;

    // Buscar o pedido
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        user: true,
        shippingAddress: true,
        items: {
          include: {
            product: true
          }
        }
      }
    });

    if (!order) {
      console.error(`Pedido não encontrado: ${orderId}`);
      return NextResponse.json(
        { error: 'Pedido não encontrado' },
        { status: 404 }
      );
    }

    // Atualizar status do pedido baseado no webhook
    let paymentStatus: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED' | 'CANCELLED' = 'PENDING';
    let orderStatus: 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' = 'PENDING';

    switch (status) {
      case 'approved':
      case 'paid':
        paymentStatus = 'PAID';
        orderStatus = 'CONFIRMED';
        break;
      case 'failed':
      case 'rejected':
        paymentStatus = 'FAILED';
        orderStatus = 'CANCELLED';
        break;
      case 'cancelled':
        paymentStatus = 'CANCELLED';
        orderStatus = 'CANCELLED';
        break;
      case 'refunded':
        paymentStatus = 'REFUNDED';
        orderStatus = 'CANCELLED';
        break;
      default:
        paymentStatus = 'PENDING';
        orderStatus = 'PENDING';
    }

    // Atualizar pedido
    await prisma.order.update({
      where: { id: orderId },
      data: {
        paymentStatus,
        status: orderStatus,
        blackcatPaymentId: paymentId,
        transactionId,
        blackcatWebhookData: webhookData,
        updatedAt: new Date()
      }
    });

    // Se o pagamento foi aprovado, enviar email de confirmação
    if (status === 'approved' || status === 'paid') {
      // Aqui você pode implementar o envio de email
      console.log(`Pagamento aprovado para pedido ${orderId}`);
      
      // Exemplo de envio de email (implementar com seu serviço de email)
      // await sendOrderConfirmationEmail(order);
    }

    // Se o pagamento falhou, restaurar estoque
    if (status === 'failed' || status === 'rejected' || status === 'cancelled') {
      for (const item of order.items) {
        await prisma.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              increment: item.quantity
            }
          }
        });
      }
      console.log(`Estoque restaurado para pedido ${orderId}`);
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Erro no webhook BlackCat:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Webhook endpoint ativo' });
} 