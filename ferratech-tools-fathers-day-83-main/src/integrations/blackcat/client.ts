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
      // Preparar payload para BlackCatPagamentos
      const payload: BlackCatPayload = {
        amount: paymentData.amount,
        currency: paymentData.currency || 'BRL',
        description: paymentData.description,
        customer: {
          name: paymentData.customer.name,
          email: paymentData.customer.email,
          phone: paymentData.customer.phone,
          cpf: paymentData.customer.cpf.replace(/\D/g, '')
        },
        payment_method: paymentData.payment_method,
        redirect_url: paymentData.redirect_url || `${import.meta.env.VITE_SITE_URL}/checkout/callback`,
        enable3DS: paymentData.enable3DS || true
      };

      // Adicionar dados do cartão se for pagamento com cartão
      if (paymentData.payment_method === 'credit_card' && paymentData.card_data) {
        payload.card = {
          number: paymentData.card_data.number.replace(/\s/g, ''),
          holder_name: paymentData.card_data.holder_name,
          expiration_month: paymentData.card_data.expiration_month,
          expiration_year: paymentData.card_data.expiration_year,
          cvv: paymentData.card_data.cvv
        };
        payload.installments = paymentData.installments || 1;
      }

      // Adicionar endereço de entrega se fornecido
      if (paymentData.shipping_address) {
        payload.shipping_address = {
          street: paymentData.shipping_address.street,
          number: paymentData.shipping_address.number,
          complement: paymentData.shipping_address.complement,
          neighborhood: paymentData.shipping_address.neighborhood,
          city: paymentData.shipping_address.city,
          state: paymentData.shipping_address.state,
          zip_code: paymentData.shipping_address.zip_code.replace(/\D/g, '')
        };
      }

      const response = await axios.post(
        `${BLACKCAT_API_URL}/transactions`,
        payload,
        { headers: this.getHeaders() }
      );
      return response.data;
    } catch (error: any) {
      console.error('Erro ao criar pagamento:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Falha ao processar pagamento');
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