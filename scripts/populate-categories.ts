import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Set DATABASE_URL if not already set
if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = 'mongodb+srv://rdoptdomal:rdoptdomal@cluster0.mongodb.net/ferratech?retryWrites=true&w=majority';
}

async function populateCategories() {
  try {
    console.log('🌱 Populando categorias...');

    // Categorias principais
    const mainCategories = [
      {
        name: 'Ferramentas Elétricas',
        slug: 'ferramentas-eletricas',
        description: 'Ferramentas elétricas profissionais e domésticas',
        image: 'https://images.unsplash.com/photo-1581147030014-1e8c5c2c5c5c?w=400&h=300&fit=crop'
      },
      {
        name: 'Ferramentas Manuais',
        slug: 'ferramentas-manuais',
        description: 'Ferramentas manuais de qualidade profissional',
        image: 'https://images.unsplash.com/photo-1581147030014-1e8c5c2c5c5c?w=400&h=300&fit=crop'
      },
      {
        name: 'Equipamentos de Segurança',
        slug: 'equipamentos-seguranca',
        description: 'EPIs e equipamentos de segurança',
        image: 'https://images.unsplash.com/photo-1581147030014-1e8c5c2c5c5c?w=400&h=300&fit=crop'
      },
      {
        name: 'Acessórios',
        slug: 'acessorios',
        description: 'Acessórios e consumíveis para ferramentas',
        image: 'https://images.unsplash.com/photo-1581147030014-1e8c5c2c5c5c?w=400&h=300&fit=crop'
      }
    ];

    // Criar categorias principais
    for (const category of mainCategories) {
      await prisma.category.upsert({
        where: { slug: category.slug },
        update: category,
        create: category
      });
      console.log(`✅ Categoria criada: ${category.name}`);
    }

    // Buscar categorias principais para criar subcategorias
    const eletricas = await prisma.category.findUnique({ where: { slug: 'ferramentas-eletricas' } });
    const manuais = await prisma.category.findUnique({ where: { slug: 'ferramentas-manuais' } });
    const seguranca = await prisma.category.findUnique({ where: { slug: 'equipamentos-seguranca' } });
    const acessorios = await prisma.category.findUnique({ where: { slug: 'acessorios' } });

    // Subcategorias de Ferramentas Elétricas
    if (eletricas) {
      const eletricasSubcategories = [
        { name: 'Furadeiras', slug: 'furadeiras', parentId: eletricas.id },
        { name: 'Esmerilhadeiras', slug: 'esmerilhadeiras', parentId: eletricas.id },
        { name: 'Serras', slug: 'serras', parentId: eletricas.id },
        { name: 'Lixadeiras', slug: 'lixadeiras', parentId: eletricas.id },
        { name: 'Aspiradores', slug: 'aspiradores', parentId: eletricas.id }
      ];

      for (const sub of eletricasSubcategories) {
        await prisma.category.upsert({
          where: { slug: sub.slug },
          update: sub,
          create: sub
        });
        console.log(`✅ Subcategoria criada: ${sub.name}`);
      }
    }

    // Subcategorias de Ferramentas Manuais
    if (manuais) {
      const manuaisSubcategories = [
        { name: 'Chaves', slug: 'chaves', parentId: manuais.id },
        { name: 'Alicates', slug: 'alicates', parentId: manuais.id },
        { name: 'Chaves de Fenda', slug: 'chaves-fenda', parentId: manuais.id },
        { name: 'Martelos', slug: 'martelos', parentId: manuais.id },
        { name: 'Serrotes', slug: 'serrotes', parentId: manuais.id }
      ];

      for (const sub of manuaisSubcategories) {
        await prisma.category.upsert({
          where: { slug: sub.slug },
          update: sub,
          create: sub
        });
        console.log(`✅ Subcategoria criada: ${sub.name}`);
      }
    }

    // Subcategorias de Equipamentos de Segurança
    if (seguranca) {
      const segurancaSubcategories = [
        { name: 'Proteção Auditiva', slug: 'protecao-auditiva', parentId: seguranca.id },
        { name: 'Proteção Visual', slug: 'protecao-visual', parentId: seguranca.id },
        { name: 'Proteção Respiratória', slug: 'protecao-respiratoria', parentId: seguranca.id },
        { name: 'Luvas', slug: 'luvas', parentId: seguranca.id },
        { name: 'Calçados', slug: 'calcados', parentId: seguranca.id }
      ];

      for (const sub of segurancaSubcategories) {
        await prisma.category.upsert({
          where: { slug: sub.slug },
          update: sub,
          create: sub
        });
        console.log(`✅ Subcategoria criada: ${sub.name}`);
      }
    }

    // Subcategorias de Acessórios
    if (acessorios) {
      const acessoriosSubcategories = [
        { name: 'Discos e Lixas', slug: 'discos-lixas', parentId: acessorios.id },
        { name: 'Brocas', slug: 'brocas', parentId: acessorios.id },
        { name: 'Pilhas e Baterias', slug: 'pilhas-baterias', parentId: acessorios.id },
        { name: 'Cabos e Extensões', slug: 'cabos-extensoes', parentId: acessorios.id },
        { name: 'Organizadores', slug: 'organizadores', parentId: acessorios.id }
      ];

      for (const sub of acessoriosSubcategories) {
        await prisma.category.upsert({
          where: { slug: sub.slug },
          update: sub,
          create: sub
        });
        console.log(`✅ Subcategoria criada: ${sub.name}`);
      }
    }

    console.log('🎉 Categorias populadas com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao popular categorias:', error);
  } finally {
    await prisma.$disconnect();
  }
}

populateCategories(); 