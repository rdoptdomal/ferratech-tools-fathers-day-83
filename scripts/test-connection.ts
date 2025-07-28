import { PrismaClient } from '@prisma/client';

// Configurar DATABASE_URL se não estiver definido
if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = 'mongodb+srv://rdoptdomal:Helena2270184!@ferratech.wbmjhml.mongodb.net/ferratech?retryWrites=true&w=majority';
}

const prisma = new PrismaClient();

async function testConnection() {
  try {
    console.log('🔍 Testando conexão com o banco...');
    
    // Testar conexão
    await prisma.$connect();
    console.log('✅ Conexão estabelecida');

    // Contar produtos
    const productCount = await prisma.product.count();
    console.log(`📦 Total de produtos: ${productCount}`);

    // Contar categorias
    const categoryCount = await prisma.category.count();
    console.log(`📂 Total de categorias: ${categoryCount}`);

    // Buscar alguns produtos
    const products = await prisma.product.findMany({
      take: 3,
      include: { category: true }
    });

    console.log('\n📋 Produtos encontrados:');
    products.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} - R$ ${product.price}`);
    });

  } catch (error) {
    console.error('❌ Erro:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection(); 