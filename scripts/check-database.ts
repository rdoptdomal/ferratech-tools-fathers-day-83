import { PrismaClient } from '@prisma/client';

if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = 'mongodb+srv://rdoptdomal:Helena2270184!@ferratech.wbmjhml.mongodb.net/ferratech?retryWrites=true&w=majority';
}

const prisma = new PrismaClient();

async function checkDatabase() {
  try {
    console.log('🔍 Verificando banco de dados...');

    // Testar conexão
    await prisma.$connect();
    console.log('✅ Conexão com banco estabelecida');

    // Contar produtos
    const totalProducts = await prisma.product.count();
    console.log(`📊 Total de produtos: ${totalProducts}`);

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

    // Verificar produtos com imagens (corrigido)
    const productsWithImages = await prisma.product.count({
      where: {
        isActive: true,
        images: {
          isEmpty: false
        }
      }
    });
    console.log(`🖼️ Produtos com imagens: ${productsWithImages}`);

    // Mostrar alguns produtos de exemplo
    const sampleProducts = await prisma.product.findMany({
      where: { isActive: true },
      take: 5,
      include: { category: true },
      orderBy: { createdAt: 'desc' }
    });

    console.log('\n📋 Produtos de exemplo:');
    sampleProducts.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name}`);
      console.log(`   Preço: R$ ${product.price}`);
      console.log(`   Categoria: ${product.category?.name || 'Sem categoria'}`);
      console.log(`   Imagens: ${product.images?.length || 0}`);
      console.log(`   Destaque: ${product.isFeatured ? 'Sim' : 'Não'}`);
      if (product.images && product.images.length > 0) {
        console.log(`   Primeira imagem: ${product.images[0]}`);
      }
      console.log('');
    });

    // Verificar categorias
    const categories = await prisma.category.findMany({
      where: { isActive: true }
    });
    console.log(`📂 Categorias ativas: ${categories.length}`);

    console.log('\n✅ Verificação concluída!');

  } catch (error) {
    console.error('❌ Erro durante a verificação:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkDatabase(); 