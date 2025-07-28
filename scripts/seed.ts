import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

// Carregar variáveis de ambiente
dotenv.config({ path: '.env.local' });

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Criar categorias principais
  const ferramentasEletricas = await prisma.category.upsert({
    where: { slug: 'ferramentas-eletricas' },
    update: {},
    create: {
      name: 'Ferramentas Elétricas',
      slug: 'ferramentas-eletricas',
      description: 'Furadeiras, serras, esmerilhadeiras e mais ferramentas elétricas profissionais'
    }
  });

  const ferramentasManuais = await prisma.category.upsert({
    where: { slug: 'ferramentas-manuais' },
    update: {},
    create: {
      name: 'Ferramentas Manuais',
      slug: 'ferramentas-manuais',
      description: 'Chaves, alicates, martelos e ferramentas básicas'
    }
  });

  const acessorios = await prisma.category.upsert({
    where: { slug: 'acessorios' },
    update: {},
    create: {
      name: 'Acessórios',
      slug: 'acessorios',
      description: 'Discos, brocas, mandris e acessórios para ferramentas'
    }
  });

  const bancadas = await prisma.category.upsert({
    where: { slug: 'bancadas' },
    update: {},
    create: {
      name: 'Bancadas e Suportes',
      slug: 'bancadas',
      description: 'Bancadas de trabalho e suportes profissionais'
    }
  });

  // Criar subcategorias
  const furadeiras = await prisma.category.upsert({
    where: { slug: 'furadeiras' },
    update: {},
    create: {
      name: 'Furadeiras',
      slug: 'furadeiras',
      description: 'Furadeiras elétricas profissionais',
      parentId: ferramentasEletricas.id
    }
  });

  const serras = await prisma.category.upsert({
    where: { slug: 'serras' },
    update: {},
    create: {
      name: 'Serras',
      slug: 'serras',
      description: 'Serras circulares, tico-tico e mais',
      parentId: ferramentasEletricas.id
    }
  });

  // Criar produtos
  const produtos = [
    {
      name: 'Furadeira de Impacto 650W',
      slug: 'furadeira-impacto-650w',
      sku: 'FUR-650-001',
      price: 299.90,
      originalPrice: 399.90,
      stock: 15,
      description: 'Furadeira de impacto profissional com 650W de potência. Ideal para trabalhos em concreto, alvenaria e metal.',
      shortDescription: 'Furadeira de impacto 650W profissional',
      images: [
        'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop'
      ],
      variations: {
        'Cor': ['Vermelho', 'Azul', 'Preto'],
        'Potência': ['650W', '750W', '850W']
      },
      brand: 'FerraTech Pro',
      rating: 4.5,
      reviews: 127,
      features: [
        '650W de potência',
        'Velocidade variável',
        'Mandril de 13mm',
        'Cabo de 2m',
        'Maleta inclusa'
      ],
      specifications: {
        'Potência': '650W',
        'Velocidade': '0-3000 RPM',
        'Mandril': '13mm',
        'Peso': '2.1kg',
        'Garantia': '12 meses'
      },
      categoryId: furadeiras.id
    },
    {
      name: 'Serra Circular 1400W',
      slug: 'serra-circular-1400w',
      sku: 'SER-1400-001',
      price: 459.90,
      originalPrice: 599.90,
      stock: 8,
      description: 'Serra circular profissional com 1400W de potência. Corte preciso em madeira, MDF e compensado.',
      shortDescription: 'Serra circular 1400W profissional',
      images: [
        'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop'
      ],
      variations: {
        'Cor': ['Laranja', 'Vermelho'],
        'Potência': ['1400W', '1600W']
      },
      brand: 'FerraTech Pro',
      rating: 4.7,
      reviews: 89,
      features: [
        '1400W de potência',
        'Corte até 65mm',
        'Laser guide',
        'Proteção contra kickback',
        'Maleta inclusa'
      ],
      specifications: {
        'Potência': '1400W',
        'Velocidade': '5500 RPM',
        'Corte máximo': '65mm',
        'Peso': '4.2kg',
        'Garantia': '12 meses'
      },
      categoryId: serras.id
    },
    {
      name: 'Esmerilhadeira Angular 4.5"',
      slug: 'esmerilhadeira-angular-4-5',
      sku: 'ESM-4.5-001',
      price: 189.90,
      originalPrice: 249.90,
      stock: 25,
      description: 'Esmerilhadeira angular de 4.5 polegadas com 900W de potência. Ideal para corte e desbaste.',
      shortDescription: 'Esmerilhadeira angular 4.5" 900W',
      images: [
        'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop'
      ],
      variations: {
        'Cor': ['Laranja', 'Vermelho', 'Azul'],
        'Potência': ['900W', '1100W']
      },
      brand: 'FerraTech',
      rating: 4.3,
      reviews: 156,
      features: [
        '900W de potência',
        'Disco de 4.5"',
        'Proteção contra partículas',
        'Cabo de 2m',
        'Garantia de 12 meses'
      ],
      specifications: {
        'Potência': '900W',
        'Velocidade': '11000 RPM',
        'Disco': '4.5"',
        'Peso': '1.8kg',
        'Garantia': '12 meses'
      },
      categoryId: ferramentasEletricas.id
    },
    {
      name: 'Jogo de Chaves Combinadas',
      slug: 'jogo-chaves-combinadas',
      sku: 'CHV-COM-001',
      price: 89.90,
      originalPrice: 119.90,
      stock: 50,
      description: 'Jogo completo de chaves combinadas de 6 a 24mm. Aço cromo-vanádio de alta qualidade.',
      shortDescription: 'Jogo de chaves combinadas 6-24mm',
      images: [
        'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop'
      ],
      variations: {
        'Cor': ['Cromado', 'Fosco'],
        'Tamanho': ['6-24mm', '8-32mm']
      },
      brand: 'FerraTech',
      rating: 4.6,
      reviews: 203,
      features: [
        'Aço cromo-vanádio',
        'Tamanhos de 6 a 24mm',
        'Acabamento cromado',
        'Maleta organizadora',
        'Garantia vitalícia'
      ],
      specifications: {
        'Material': 'Aço cromo-vanádio',
        'Tamanhos': '6-24mm',
        'Acabamento': 'Cromado',
        'Peso': '1.2kg',
        'Garantia': 'Vitalícia'
      },
      categoryId: ferramentasManuais.id
    },
    {
      name: 'Brocas para Concreto 6mm',
      slug: 'brocas-concreto-6mm',
      sku: 'BRO-CON-6MM',
      price: 29.90,
      originalPrice: 39.90,
      stock: 100,
      description: 'Kit com 5 brocas para concreto de 6mm. Carbeto de tungstênio para máxima durabilidade.',
      shortDescription: 'Kit brocas concreto 6mm - 5 unidades',
      images: [
        'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop'
      ],
      variations: {
        'Diâmetro': ['6mm', '8mm', '10mm', '12mm'],
        'Quantidade': ['5 unidades', '10 unidades']
      },
      brand: 'FerraTech',
      rating: 4.4,
      reviews: 78,
      features: [
        'Carbeto de tungstênio',
        '5 brocas inclusas',
        'Diâmetro 6mm',
        'Para concreto e alvenaria',
        'Garantia de 6 meses'
      ],
      specifications: {
        'Material': 'Carbeto de tungstênio',
        'Diâmetro': '6mm',
        'Quantidade': '5 unidades',
        'Aplicação': 'Concreto e alvenaria',
        'Garantia': '6 meses'
      },
      categoryId: acessorios.id
    }
  ];

  for (const produto of produtos) {
    await prisma.product.upsert({
      where: { slug: produto.slug },
      update: {},
      create: produto
    });
  }

  console.log('✅ Seed concluído com sucesso!');
  console.log(`📦 ${produtos.length} produtos criados`);
  console.log(`📂 4 categorias principais criadas`);
  console.log(`🔧 2 subcategorias criadas`);
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 