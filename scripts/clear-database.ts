import { PrismaClient } from '@prisma/client';

// Configurar DATABASE_URL se não estiver definido
if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = 'mongodb+srv://rdoptdomal:Helena2270184!@ferratech.wbmjhml.mongodb.net/ferratech?retryWrites=true&w=majority';
}

const prisma = new PrismaClient();

async function clearDatabase() {
  try {
    console.log('🧹 Iniciando limpeza do banco de dados...');

    // Deletar todos os produtos
    const deletedProducts = await prisma.product.deleteMany({});
    console.log(`✅ ${deletedProducts.count} produtos deletados`);

    // Deletar todas as categorias
    const deletedCategories = await prisma.category.deleteMany({});
    console.log(`✅ ${deletedCategories.count} categorias deletadas`);

    // Deletar todos os pedidos e itens
    const deletedOrderItems = await prisma.orderItem.deleteMany({});
    console.log(`✅ ${deletedOrderItems.count} itens de pedido deletados`);

    const deletedOrders = await prisma.order.deleteMany({});
    console.log(`✅ ${deletedOrders.count} pedidos deletados`);

    // Deletar todos os endereços
    const deletedAddresses = await prisma.address.deleteMany({});
    console.log(`✅ ${deletedAddresses.count} endereços deletados`);

    // Deletar todos os usuários
    const deletedUsers = await prisma.user.deleteMany({});
    console.log(`✅ ${deletedUsers.count} usuários deletados`);

    console.log('🎉 Banco de dados limpo com sucesso!');

  } catch (error) {
    console.error('❌ Erro durante a limpeza:', error);
  } finally {
    await prisma.$disconnect();
  }
}

clearDatabase(); 