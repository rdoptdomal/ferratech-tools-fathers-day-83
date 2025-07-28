import { PrismaClient } from '@prisma/client';

// Configurar DATABASE_URL se não estiver definido
if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = 'mongodb+srv://rdoptdomal:Helena2270184!@ferratech.wbmjhml.mongodb.net/ferratech?retryWrites=true&w=majority';
}

const prisma = new PrismaClient();

async function testAPI() {
  try {
    console.log('🧪 Testando API de produtos...');

    // Testar busca de produtos em destaque
    console.log('\n1. Testando produtos em destaque...');
    const featuredProducts = await prisma.product.findMany({
      where: {
        isActive: true,
        isFeatured: true
      },
      include: {
        category: true
      },
      take: 5
    });
    console.log(`✅ Encontrados ${featuredProducts.length} produtos em destaque`);

    // Testar busca de produtos gerais
    console.log('\n2. Testando produtos gerais...');
    const allProducts = await prisma.product.findMany({
      where: {
        isActive: true
      },
      include: {
        category: true
      },
      take: 5
    });
    console.log(`✅ Encontrados ${allProducts.length} produtos gerais`);

    // Testar contagem
    console.log('\n3. Testando contagem...');
    const totalProducts = await prisma.product.count({
      where: { isActive: true }
    });
    console.log(`✅ Total de produtos ativos: ${totalProducts}`);

    // Mostrar alguns produtos de exemplo
    console.log('\n📋 Produtos de exemplo:');
    allProducts.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} - R$ ${product.price} - ${product.category?.name || 'Sem categoria'}`);
    });

    console.log('\n✅ Teste da API concluído com sucesso!');

  } catch (error) {
    console.error('❌ Erro no teste da API:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testAPI(); 