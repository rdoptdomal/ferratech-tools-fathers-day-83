import axios from 'axios';

const BLACKCAT_API_URL = 'https://api.blackcatpagamentos.com/v1';

export interface BlackCatPaymentRequest {
  amount: number;
  currency: string;
  description: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    cpf: string;
  };
  payment_method: 'credit_card' | 'pix' | 'boleto';
  installments?: number;
  card_data?: {
    number: string;
    holder_name: string;
    expiration_month: string;
    expiration_year: string;
    cvv: string;
  };
  billing_address?: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zip_code: string;
  };
  shipping_address?: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zip_code: string;
  };
  redirect_url?: string;
  enable3DS?: boolean;
}

interface BlackCatPayload {
  amount: number;
  currency: string;
  description: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    cpf: string;
  };
  payment_method: 'credit_card' | 'pix' | 'boleto';
  redirect_url: string;
  enable3DS: boolean;
  card?: {
    number: string;
    holder_name: string;
    expiration_month: string;
    expiration_year: string;
    cvv: string;
  };
  installments?: number;
  shipping_address?: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zip_code: string;
  };
}

export interface BlackCatPaymentResponse {
  id: string;
  transaction_id: string;
  status: 'pending' | 'paid' | 'failed' | 'cancelled' | 'pending_payment' | 'authentication_required';
  amount: number;
  currency: string;
  payment_method: string;
  installments?: number;
  pix_details?: {
    qr_code_image_base64: string;
    qr_code_text: string;
  };
  boleto_details?: {
    boleto_code: string;
    boleto_url: string;
  };
  authentication_url?: string;
  created_at: string;
  updated_at: string;
}

class BlackCatClient {
  private apiKey: string;
  private publicKey: string;

  constructor() {
    this.apiKey = import.meta.env.VITE_BLACKCAT_SECRET_KEY || 'sk_yfcQHXDMEaZ18y2eXfNNK6gARWHB28W1w2JCiGOJRF5ANlyT';
    this.publicKey = import.meta.env.VITE_BLACKCAT_PUBLIC_KEY || 'pk_98LtyQC254l3zTGscDDrKUdfEpnHCvMIygtXduJJzmdzHxIo';
  }

  private getHeaders() {
    // Usando Basic Auth conforme documentação do BlackCatPagamentos
    const auth = 'Basic ' + btoa(this.publicKey + ':' + this.apiKey);
    return {
      'Authorization': auth,
      'Content-Type': 'application/json',
    };
  }

  async createPayment(paymentData: BlackCatPaymentRequest): Promise<BlackCatPaymentResponse> {
    try {
      // Validar dados obrigatórios
      if (!paymentData.amount || paymentData.amount <= 0) {
        throw new Error('Valor do pagamento deve ser maior que zero');
      }

      if (!paymentData.customer.name || !paymentData.customer.email || !paymentData.customer.cpf) {
        throw new Error('Dados do cliente são obrigatórios');
      }

      if (!paymentData.payment_method) {
        throw new Error('Método de pagamento é obrigatório');
      }

      // Validar CPF (mínimo 11 dígitos)
      const cpf = paymentData.customer.cpf.replace(/\D/g, '');
      if (cpf.length < 11) {
        throw new Error('CPF deve ter pelo menos 11 dígitos');
      }

      // Preparar payload para BlackCatPagamentos
      const payload: BlackCatPayload = {
        amount: paymentData.amount,
        currency: paymentData.currency || 'BRL',
        description: paymentData.description || 'Pagamento FerraTech',
        customer: {
          name: paymentData.customer.name.trim(),
          email: paymentData.customer.email.trim(),
          phone: paymentData.customer.phone.replace(/\D/g, ''),
          cpf: cpf
        },
        payment_method: paymentData.payment_method,
        redirect_url: paymentData.redirect_url || `${import.meta.env.VITE_SITE_URL}/checkout/callback`,
        enable3DS: paymentData.enable3DS || false
      };

      // Para PIX, remover campos desnecessários
      if (paymentData.payment_method === 'pix') {
        delete payload.enable3DS;
        // PIX não precisa de endereço de entrega
        if (payload.shipping_address) {
          delete payload.shipping_address;
        }
      }

      // Adicionar dados do cartão se for pagamento com cartão
      if (paymentData.payment_method === 'credit_card') {
        if (!paymentData.card_data) {
          throw new Error('Dados do cartão são obrigatórios para pagamento com cartão');
        }

        // Validar dados do cartão
        const cardNumber = paymentData.card_data.number.replace(/\s/g, '');
        if (cardNumber.length < 13 || cardNumber.length > 19) {
          throw new Error('Número do cartão inválido');
        }

        if (!paymentData.card_data.holder_name.trim()) {
          throw new Error('Nome do titular é obrigatório');
        }

        if (!paymentData.card_data.cvv || paymentData.card_data.cvv.length < 3) {
          throw new Error('CVV é obrigatório');
        }

        payload.card = {
          number: cardNumber,
          holder_name: paymentData.card_data.holder_name.trim(),
          expiration_month: paymentData.card_data.expiration_month,
          expiration_year: paymentData.card_data.expiration_year,
          cvv: paymentData.card_data.cvv
        };
        payload.installments = paymentData.installments || 1;
      }

      // Adicionar endereço de entrega se fornecido
      if (paymentData.shipping_address) {
        if (!paymentData.shipping_address.street || !paymentData.shipping_address.city || !paymentData.shipping_address.state) {
          throw new Error('Endereço de entrega incompleto');
        }

        payload.shipping_address = {
          street: paymentData.shipping_address.street.trim(),
          number: paymentData.shipping_address.number.trim(),
          complement: paymentData.shipping_address.complement?.trim() || '',
          neighborhood: paymentData.shipping_address.neighborhood.trim(),
          city: paymentData.shipping_address.city.trim(),
          state: paymentData.shipping_address.state.trim(),
          zip_code: paymentData.shipping_address.zip_code.replace(/\D/g, '')
        };
      }

      console.log('Enviando payload para BlackCat:', payload);

      // Teste com payload mínimo para PIX
      if (paymentData.payment_method === 'pix') {
        const minimalPayload = {
          amount: paymentData.amount,
          currency: 'BRL',
          description: paymentData.description,
          customer: {
            name: paymentData.customer.name,
            email: paymentData.customer.email,
            phone: paymentData.customer.phone,
            cpf: paymentData.customer.cpf
          },
          payment_method: 'pix',
          redirect_url: paymentData.redirect_url
        };
        
        console.log('Payload mínimo para PIX:', minimalPayload);
        
        const response = await axios.post(
          `${BLACKCAT_API_URL}/transactions`,
          minimalPayload,
          { 
            headers: this.getHeaders(),
            timeout: 30000
          }
        );
        
        console.log('Resposta do BlackCat:', response.data);
        return response.data;
      }

      const response = await axios.post(
        `${BLACKCAT_API_URL}/transactions`,
        payload,
        { 
          headers: this.getHeaders(),
          timeout: 30000 // 30 segundos de timeout
        }
      );

      console.log('Resposta do BlackCat:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Erro ao criar pagamento:', error.response?.data || error.message);
      
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else if (error.message) {
        throw new Error(error.message);
      } else {
        throw new Error('Falha ao processar pagamento. Tente novamente.');
      }
    }
  }

  async getPayment(transactionId: string): Promise<BlackCatPaymentResponse> {
    try {
      const response = await axios.get(
        `${BLACKCAT_API_URL}/transactions/${transactionId}`,
        { headers: this.getHeaders() }
      );
      return response.data;
    } catch (error: any) {
      console.error('Erro ao buscar pagamento:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Falha ao buscar pagamento');
    }
  }

  async refundPayment(transactionId: string, amount?: number): Promise<BlackCatPaymentResponse> {
    try {
      const refundData = amount ? { amount } : {};
      const response = await axios.post(
        `${BLACKCAT_API_URL}/transactions/${transactionId}/refund`,
        refundData,
        { headers: this.getHeaders() }
      );
      return response.data;
    } catch (error: any) {
      console.error('Erro ao estornar pagamento:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Falha ao estornar pagamento');
    }
  }

  getPublicKey(): string {
    return this.publicKey;
  }
}

export const blackCatClient = new BlackCatClient(); 