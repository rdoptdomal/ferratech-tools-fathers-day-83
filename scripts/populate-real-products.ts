import { PrismaClient } from '@prisma/client';

// Configurar DATABASE_URL se não estiver definido
if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = 'mongodb+srv://rdoptdomal:Helena2270184!@ferratech.wbmjhml.mongodb.net/ferratech?retryWrites=true&w=majority';
}

const prisma = new PrismaClient();

const realProducts = [
  {
    name: 'Furadeira de Impacto 650W Profissional',
    slug: 'furadeira-impacto-650w-profissional',
    sku: 'FUR-IMP-650W',
    description: 'Furadeira de impacto profissional com 650W de potência, ideal para trabalhos pesados em concreto, tijolo e metal. Inclui maleta e acessórios.',
    shortDescription: 'Furadeira de impacto 650W para trabalhos profissionais',
    price: 189.90,
    originalPrice: 249.90,
    images: [
      'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop'
    ],
    brand: 'Bosch',
    category: 'Ferramentas Elétricas',
    stock: 15,
    rating: 4.8,
    reviews: 127,
    isFeatured: true,
    features: ['Potência: 650W', 'Velocidade: 0-3000 RPM', 'Mandril: 13mm', 'Função impacto: 48.000 IPM'],
    specifications: {
      'Potência': '650W',
      'Velocidade': '0-3000 RPM',
      'Peso': '2.1 kg',
      'Garantia': '12 meses'
    }
  },
  {
    name: 'Serra Circular 185mm 1800W',
    slug: 'serra-circular-185mm-1800w',
    sku: 'SER-CIR-185MM',
    description: 'Serra circular profissional com 185mm de diâmetro e 1800W de potência. Ideal para cortes precisos em madeira, compensado e MDF.',
    shortDescription: 'Serra circular 185mm 1800W profissional',
    price: 599.90,
    originalPrice: 799.90,
    images: [
      'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop'
    ],
    brand: 'Makita',
    category: 'Ferramentas Elétricas',
    stock: 8,
    rating: 4.9,
    reviews: 89,
    isFeatured: true,
    features: ['Potência: 1800W', 'Diâmetro: 185mm', 'Velocidade: 5200 RPM', 'Proteção contra retrocesso'],
    specifications: {
      'Potência': '1800W',
      'Diâmetro': '185mm',
      'Velocidade': '5200 RPM',
      'Peso': '4.2 kg'
    }
  },
  {
    name: 'Esmerilhadeira Angular 4.5" 720W',
    slug: 'esmerilhadeira-angular-4-5-720w',
    sku: 'ESM-ANG-4.5',
    description: 'Esmerilhadeira angular profissional de 4.5 polegadas com 720W de potência. Perfeita para corte e desbaste de metais.',
    shortDescription: 'Esmerilhadeira angular 4.5" 720W',
    price: 159.90,
    originalPrice: 199.90,
    images: [
      'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop'
    ],
    brand: 'DeWalt',
    category: 'Ferramentas Elétricas',
    stock: 22,
    rating: 4.7,
    reviews: 156,
    isFeatured: false,
    features: ['Potência: 720W', 'Diâmetro: 115mm', 'Velocidade: 11000 RPM', 'Proteção contra partida acidental'],
    specifications: {
      'Potência': '720W',
      'Diâmetro': '115mm',
      'Velocidade': '11000 RPM',
      'Peso': '1.8 kg'
    }
  },
  {
    name: 'Parafusadeira 18V com 2 Baterias',
    slug: 'parafusadeira-18v-2-baterias',
    sku: 'PAR-18V-2BAT',
    description: 'Parafusadeira sem fio 18V com 2 baterias de 2.0Ah, torque ajustável e LED de iluminação.',
    shortDescription: 'Parafusadeira sem fio 18V com 2 baterias',
    price: 299.90,
    originalPrice: 399.90,
    images: [
      'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop'
    ],
    brand: 'Milwaukee',
    category: 'Ferramentas Elétricas',
    stock: 12,
    rating: 4.8,
    reviews: 203,
    isFeatured: true,
    features: ['Voltagem: 18V', 'Torque: 0-24 Nm', 'Velocidade: 0-1800 RPM', '2 baterias incluídas'],
    specifications: {
      'Voltagem': '18V',
      'Torque': '0-24 Nm',
      'Velocidade': '0-1800 RPM',
      'Baterias': '2x 2.0Ah'
    }
  },
  {
    name: 'Serra Tico-Tico 500W',
    slug: 'serra-tico-tico-500w',
    sku: 'SER-TIC-500W',
    description: 'Serra tico-tico profissional com 500W de potência, ideal para cortes curvos e precisos em madeira e metal.',
    shortDescription: 'Serra tico-tico 500W profissional',
    price: 129.90,
    originalPrice: 169.90,
    images: [
      'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop'
    ],
    brand: 'Black+Decker',
    category: 'Ferramentas Elétricas',
    stock: 18,
    rating: 4.6,
    reviews: 94,
    isFeatured: false,
    features: ['Potência: 500W', 'Curso: 20mm', 'Velocidade: 3000 SPM', 'Sistema anti-vibração'],
    specifications: {
      'Potência': '500W',
      'Curso': '20mm',
      'Velocidade': '3000 SPM',
      'Peso': '2.3 kg'
    }
  },
  {
    name: 'Lixadeira Orbital 5" 300W',
    slug: 'lixadeira-orbital-5-300w',
    sku: 'LIX-ORB-5',
    description: 'Lixadeira orbital de 5 polegadas com 300W de potência, perfeita para acabamento em madeira e superfícies.',
    shortDescription: 'Lixadeira orbital 5" 300W',
    price: 89.90,
    originalPrice: 119.90,
    images: [
      'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop'
    ],
    brand: 'Bosch',
    category: 'Ferramentas Elétricas',
    stock: 25,
    rating: 4.5,
    reviews: 78,
    isFeatured: false,
    features: ['Potência: 300W', 'Diâmetro: 125mm', 'Velocidade: 12000 OPM', 'Sistema de aspiração'],
    specifications: {
      'Potência': '300W',
      'Diâmetro': '125mm',
      'Velocidade': '12000 OPM',
      'Peso': '1.2 kg'
    }
  },
  {
    name: 'Martelo Demolidor 1100W',
    slug: 'martelo-demolidor-1100w',
    sku: 'MAR-DEM-1100W',
    description: 'Martelo demolidor profissional com 1100W de potência, ideal para demolição de concreto e alvenaria.',
    shortDescription: 'Martelo demolidor 1100W profissional',
    price: 899.90,
    originalPrice: 1299.90,
    images: [
      'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop'
    ],
    brand: 'Makita',
    category: 'Ferramentas Elétricas',
    stock: 5,
    rating: 4.9,
    reviews: 45,
    isFeatured: true,
    features: ['Potência: 1100W', 'Energia de Impacto: 28 J', 'Frequência: 1500 BPM', 'Sistema anti-vibração'],
    specifications: {
      'Potência': '1100W',
      'Energia de Impacto': '28 J',
      'Frequência': '1500 BPM',
      'Peso': '11.5 kg'
    }
  },
  {
    name: 'Compressor de Ar 2HP 50L',
    slug: 'compressor-ar-2hp-50l',
    sku: 'COM-AR-2HP',
    description: 'Compressor de ar portátil com motor 2HP e reservatório de 50 litros, ideal para pintura e ferramentas pneumáticas.',
    shortDescription: 'Compressor de ar 2HP 50L portátil',
    price: 449.90,
    originalPrice: 599.90,
    images: [
      'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop'
    ],
    brand: 'Schulz',
    category: 'Ferramentas Elétricas',
    stock: 10,
    rating: 4.7,
    reviews: 67,
    isFeatured: false,
    features: ['Potência: 2HP', 'Reservatório: 50L', 'Pressão: 8 bar', 'Motor de indução'],
    specifications: {
      'Potência': '2HP',
      'Reservatório': '50L',
      'Pressão': '8 bar',
      'Peso': '35 kg'
    }
  }
];

async function populateProducts() {
  try {
    console.log('🚀 Iniciando população de produtos reais...');

    // Primeiro, criar categorias se não existirem
    const categories = [
      { name: 'Ferramentas Elétricas', slug: 'ferramentas-eletricas', description: 'Ferramentas elétricas profissionais e domésticas' },
      { name: 'Ferramentas Manuais', slug: 'ferramentas-manuais', description: 'Ferramentas manuais de qualidade profissional' },
      { name: 'Equipamentos de Segurança', slug: 'equipamentos-seguranca', description: 'EPIs e equipamentos de segurança' },
      { name: 'Acessórios', slug: 'acessorios', description: 'Acessórios e consumíveis para ferramentas' }
    ];

    for (const catData of categories) {
      await prisma.category.upsert({
        where: { slug: catData.slug },
        update: {},
        create: {
          name: catData.name,
          slug: catData.slug,
          description: catData.description,
          isActive: true
        }
      });
    }

    console.log('✅ Categorias criadas/atualizadas');

    // Buscar categorias para usar nos produtos
    const categoryMap = new Map();
    const dbCategories = await prisma.category.findMany();
    dbCategories.forEach(cat => {
      categoryMap.set(cat.name, cat.id);
    });

    // Criar produtos
    for (const productData of realProducts) {
      const categoryId = categoryMap.get(productData.category);
      
      if (!categoryId) {
        console.log(`⚠️ Categoria não encontrada: ${productData.category}`);
        continue;
      }

      await prisma.product.upsert({
        where: { slug: productData.slug },
        update: {
          name: productData.name,
          description: productData.description,
          shortDescription: productData.shortDescription,
          price: productData.price,
          originalPrice: productData.originalPrice,
          images: productData.images,
          brand: productData.brand,
          categoryId: categoryId,
          stock: productData.stock,
          rating: productData.rating,
          reviews: productData.reviews,
          isFeatured: productData.isFeatured,
          features: productData.features,
          specifications: productData.specifications,
          isActive: true
        },
        create: {
          name: productData.name,
          slug: productData.slug,
          sku: productData.sku,
          description: productData.description,
          shortDescription: productData.shortDescription,
          price: productData.price,
          originalPrice: productData.originalPrice,
          images: productData.images,
          brand: productData.brand,
          categoryId: categoryId,
          stock: productData.stock,
          rating: productData.rating,
          reviews: productData.reviews,
          isFeatured: productData.isFeatured,
          features: productData.features,
          specifications: productData.specifications,
          isActive: true
        }
      });

      console.log(`✅ Produto criado/atualizado: ${productData.name}`);
    }

    console.log('🎉 População de produtos concluída com sucesso!');
    
    // Contar produtos criados
    const totalProducts = await prisma.product.count();
    const featuredProducts = await prisma.product.count({ where: { isFeatured: true } });
    
    console.log(`📊 Estatísticas:`);
    console.log(`   - Total de produtos: ${totalProducts}`);
    console.log(`   - Produtos em destaque: ${featuredProducts}`);

  } catch (error) {
    console.error('❌ Erro durante a população:', error);
  } finally {
    await prisma.$disconnect();
  }
}

populateProducts(); 