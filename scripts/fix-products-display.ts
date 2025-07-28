import { PrismaClient } from '@prisma/client';

// Configurar DATABASE_URL se não estiver definido
if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = 'mongodb+srv://rdoptdomal:Helena2270184!@ferratech.wbmjhml.mongodb.net/ferratech?retryWrites=true&w=majority';
}

const prisma = new PrismaClient();

async function fixProductsDisplay() {
  try {
    console.log('🔍 Verificando produtos no banco de dados...');

    // Contar total de produtos
    const totalProducts = await prisma.product.count();
    console.log(`📊 Total de produtos: ${totalProducts}`);

    // Contar produtos ativos
    const activeProducts = await prisma.product.count({
      where: { isActive: true }
    });
    console.log(`✅ Produtos ativos: ${activeProducts}`);

    // Contar produtos em destaque
    const featuredProducts = await prisma.product.count({
      where: { 
        isActive: true,
        isFeatured: true 
      }
    });
    console.log(`⭐ Produtos em destaque: ${featuredProducts}`);

    // Se não há produtos em destaque, marcar alguns como destaque
    if (featuredProducts === 0) {
      console.log('🎯 Marcando produtos como destaque...');
      
      // Pegar os primeiros 8 produtos e marcar como destaque
      const productsToFeature = await prisma.product.findMany({
        where: { isActive: true },
        take: 8,
        orderBy: { createdAt: 'desc' }
      });

      for (const product of productsToFeature) {
        await prisma.product.update({
          where: { id: product.id },
          data: { isFeatured: true }
        });
        console.log(`✅ Marcado como destaque: ${product.name}`);
      }
    }

    // Verificar se há categorias
    const categories = await prisma.category.findMany({
      where: { isActive: true }
    });
    console.log(`📂 Categorias ativas: ${categories.length}`);

    // Verificar produtos sem categoria
    const productsWithoutCategory = await prisma.product.findMany({
      where: {
        isActive: true,
        categoryId: undefined
      }
    });
    console.log(`⚠️ Produtos sem categoria: ${productsWithoutCategory.length}`);

    // Se há produtos sem categoria, atribuir à primeira categoria
    if (productsWithoutCategory.length > 0 && categories.length > 0) {
      console.log('🔗 Atribuindo categoria aos produtos...');
      
      for (const product of productsWithoutCategory) {
        await prisma.product.update({
          where: { id: product.id },
          data: { categoryId: categories[0].id }
        });
        console.log(`✅ Categoria atribuída: ${product.name}`);
      }
    }

    // Verificar produtos com problemas de dados
    const productsWithIssues = await prisma.product.findMany({
      where: {
        isActive: true,
        OR: [
          { name: '' },
          { price: 0 },
          { images: { isEmpty: true } }
        ]
      }
    });
    console.log(`🚨 Produtos com problemas: ${productsWithIssues.length}`);

    // Mostrar alguns produtos de exemplo
    const sampleProducts = await prisma.product.findMany({
      where: { isActive: true },
      take: 5,
      include: { category: true },
      orderBy: { createdAt: 'desc' }
    });

    console.log('\n📋 Produtos de exemplo:');
    sampleProducts.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} - R$ ${product.price} - ${product.category?.name || 'Sem categoria'}`);
    });

    console.log('\n✅ Verificação concluída!');

  } catch (error) {
    console.error('❌ Erro durante a verificação:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixProductsDisplay(); 