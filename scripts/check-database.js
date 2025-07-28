require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkDatabase() {
  console.log('🔍 Verificando banco de dados...\n');

  try {
    // Testar conexão
    await prisma.$connect();
    console.log('✅ Conexão com banco estabelecida\n');

    // Contar produtos
    const totalProducts = await prisma.product.count();
    console.log(`📦 Total de produtos: ${totalProducts}`);

    const activeProducts = await prisma.product.count({
      where: { isActive: true }
    });
    console.log(`✅ Produtos ativos: ${activeProducts}`);

    const featuredProducts = await prisma.product.count({
      where: { 
        isActive: true,
        isFeatured: true 
      }
    });
    console.log(`⭐ Produtos em destaque: ${featuredProducts}`);

    // Produtos com imagens (corrigido)
    const productsWithImages = await prisma.product.count({
      where: {
        isActive: true,
        images: {
          hasSome: []
        }
      }
    });
    console.log(`🖼️  Produtos com imagens: ${productsWithImages}`);

    // Categorias
    const totalCategories = await prisma.category.count();
    console.log(`📂 Total de categorias: ${totalCategories}`);

    const activeCategories = await prisma.category.count({
      where: { isActive: true }
    });
    console.log(`✅ Categorias ativas: ${activeCategories}`);

    // Mostrar algumas categorias
    const categories = await prisma.category.findMany({
      where: { isActive: true },
      take: 5
    });
    console.log('\n📂 Categorias disponíveis:');
    categories.forEach(cat => {
      console.log(`   - ${cat.name} (${cat.slug})`);
    });

    // Mostrar alguns produtos
    const sampleProducts = await prisma.product.findMany({
      where: { isActive: true },
      include: { category: true },
      take: 5
    });
    console.log('\n📦 Produtos de exemplo:');
    sampleProducts.forEach(product => {
      console.log(`   - ${product.name} (R$ ${product.price}) - ${product.category?.name || 'Sem categoria'}`);
    });

    // Verificar produtos sem imagens
    const productsWithoutImages = await prisma.product.count({
      where: {
        isActive: true,
        images: {
          isEmpty: true
        }
      }
    });
    console.log(`⚠️  Produtos sem imagens: ${productsWithoutImages}`);

    // Verificar produtos com preços altos
    const expensiveProducts = await prisma.product.count({
      where: {
        isActive: true,
        price: { gt: 600 }
      }
    });
    console.log(`💰 Produtos acima de R$ 600: ${expensiveProducts}`);

    console.log('\n✅ Verificação do banco concluída!');

  } catch (error) {
    console.error('❌ Erro ao verificar banco:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkDatabase(); 