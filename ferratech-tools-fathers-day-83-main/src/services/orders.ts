import { supabase } from '@/integrations/supabase/client';
import type { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

export type Order = Tables<'orders'>;
export type OrderInsert = TablesInsert<'orders'>;
export type OrderUpdate = TablesUpdate<'orders'>;
export type OrderItem = Tables<'order_items'>;
export type OrderItemInsert = TablesInsert<'order_items'>;

export interface OrderWithItems extends Order {
  order_items: OrderItem[];
}

export class OrderService {
  async getAllOrders(): Promise<OrderWithItems[]> {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (*)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao buscar pedidos:', error);
      throw new Error('Falha ao buscar pedidos');
    }

    return data || [];
  }

  async getOrderById(id: string): Promise<OrderWithItems | null> {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (*)
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Erro ao buscar pedido:', error);
      throw new Error('Falha ao buscar pedido');
    }

    return data;
  }

  async createOrder(order: OrderInsert, items: Omit<OrderItemInsert, 'order_id'>[]): Promise<OrderWithItems> {
    // Iniciar transação
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert(order)
      .select()
      .single();

    if (orderError) {
      console.error('Erro ao criar pedido:', orderError);
      throw new Error('Falha ao criar pedido');
    }

    // Adicionar itens do pedido
    const itemsWithOrderId = items.map(item => ({
      ...item,
      order_id: orderData.id
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(itemsWithOrderId);

    if (itemsError) {
      console.error('Erro ao criar itens do pedido:', itemsError);
      throw new Error('Falha ao criar itens do pedido');
    }

    // Retornar pedido completo
    return this.getOrderById(orderData.id) as Promise<OrderWithItems>;
  }

  async updateOrder(id: string, updates: OrderUpdate): Promise<Order> {
    const { data, error } = await supabase
      .from('orders')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Erro ao atualizar pedido:', error);
      throw new Error('Falha ao atualizar pedido');
    }

    return data;
  }

  async updateOrderStatus(id: string, status: string): Promise<Order> {
    return this.updateOrder(id, { order_status: status });
  }

  async updatePaymentStatus(id: string, status: string): Promise<Order> {
    return this.updateOrder(id, { payment_status: status });
  }

  async getOrdersByStatus(status: string): Promise<OrderWithItems[]> {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (*)
      `)
      .eq('order_status', status)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao buscar pedidos por status:', error);
      throw new Error('Falha ao buscar pedidos por status');
    }

    return data || [];
  }

  async getOrdersByCustomer(customerEmail: string): Promise<OrderWithItems[]> {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (*)
      `)
      .eq('customer_email', customerEmail)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao buscar pedidos do cliente:', error);
      throw new Error('Falha ao buscar pedidos do cliente');
    }

    return data || [];
  }

  async deleteOrder(id: string): Promise<void> {
    // Primeiro deletar os itens do pedido
    const { error: itemsError } = await supabase
      .from('order_items')
      .delete()
      .eq('order_id', id);

    if (itemsError) {
      console.error('Erro ao deletar itens do pedido:', itemsError);
      throw new Error('Falha ao deletar itens do pedido');
    }

    // Depois deletar o pedido
    const { error: orderError } = await supabase
      .from('orders')
      .delete()
      .eq('id', id);

    if (orderError) {
      console.error('Erro ao deletar pedido:', orderError);
      throw new Error('Falha ao deletar pedido');
    }
  }
}

export const orderService = new OrderService(); 