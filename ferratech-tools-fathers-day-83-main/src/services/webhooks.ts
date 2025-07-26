import { blackCatClient } from "@/integrations/blackcat/client";
import { orderService } from "./orders";

export interface WebhookEvent {
  event_type: 'payment.succeeded' | 'payment.failed' | 'payment.pending';
  transaction_id: string;
  status: string;
  amount: number;
  created_at: string;
}

export class WebhookService {
  async processWebhook(event: WebhookEvent) {
    try {
      console.log('Processando webhook:', event);

      // Buscar pedido pelo transaction_id
      const orders = await orderService.getAllOrders();
      const order = orders.find(o => o.blackcat_payment_id === event.transaction_id);

      if (!order) {
        console.error('Pedido não encontrado para transaction_id:', event.transaction_id);
        return;
      }

      // Atualizar status do pedido baseado no evento
      switch (event.event_type) {
        case 'payment.succeeded':
          await orderService.updateOrderStatus(order.id, 'confirmed');
          await orderService.updatePaymentStatus(order.id, 'paid');
          console.log('Pedido confirmado:', order.id);
          break;

        case 'payment.failed':
          await orderService.updatePaymentStatus(order.id, 'failed');
          console.log('Pagamento falhou:', order.id);
          break;

        case 'payment.pending':
          await orderService.updatePaymentStatus(order.id, 'pending');
          console.log('Pagamento pendente:', order.id);
          break;

        default:
          console.log('Evento não tratado:', event.event_type);
      }
    } catch (error) {
      console.error('Erro ao processar webhook:', error);
      throw error;
    }
  }

  // Função para verificar status de pagamentos pendentes
  async checkPendingPayments() {
    try {
      const orders = await orderService.getOrdersByStatus('pending');
      
      for (const order of orders) {
        if (order.blackcat_payment_id) {
          try {
            const payment = await blackCatClient.getPayment(order.blackcat_payment_id);
            
            if (payment.status === 'paid') {
              await orderService.updateOrderStatus(order.id, 'confirmed');
              await orderService.updatePaymentStatus(order.id, 'paid');
              console.log('Pedido confirmado via polling:', order.id);
            } else if (payment.status === 'failed') {
              await orderService.updatePaymentStatus(order.id, 'failed');
              console.log('Pagamento falhou via polling:', order.id);
            }
          } catch (error) {
            console.error('Erro ao verificar pagamento:', order.blackcat_payment_id, error);
          }
        }
      }
    } catch (error) {
      console.error('Erro ao verificar pagamentos pendentes:', error);
    }
  }
}

export const webhookService = new WebhookService(); 