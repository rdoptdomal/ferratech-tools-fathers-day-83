import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

// Configurar variáveis de ambiente
process.env.DATABASE_URL = "mongodb+srv://rdoptdomal:Helena2270184!@ferratech.wbmjhml.mongodb.net/ferratech?retryWrites=true&w=majority&appName=ferratech";

const prisma = new PrismaClient();

async function populateRealProducts() {
  console.log('🌱 Populando FerraTech com produtos reais...');

  try {
    // 1. Criar categorias principais
    const ferramentasEletricas = await prisma.category.upsert({
      where: { slug: 'ferramentas-eletricas' },
      update: {},
      create: {
        name: 'Ferramentas Elétricas',
        slug: 'ferramentas-eletricas',
        description: 'Furadeiras, parafusadeiras, serras e muito mais',
        image: 'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop'
      }
    });

    const ferramentasManuais = await prisma.category.upsert({
      where: { slug: 'ferramentas-manuais' },
      update: {},
      create: {
        name: 'Ferramentas Manuais',
        slug: 'ferramentas-manuais',
        description: 'Martelos, chaves, alicates e ferramentas básicas',
        image: 'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop'
      }
    });

    const acessorios = await prisma.category.upsert({
      where: { slug: 'acessorios' },
      update: {},
      create: {
        name: 'Acessórios',
        slug: 'acessorios',
        description: 'Brocas, lâminas, discos e acessórios',
        image: 'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop'
      }
    });

    const bancadas = await prisma.category.upsert({
      where: { slug: 'bancadas' },
      update: {},
      create: {
        name: 'Bancadas e Organização',
        slug: 'bancadas',
        description: 'Bancadas de trabalho e sistemas de organização',
        image: 'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop'
      }
    });

    // 2. Criar subcategorias
    const furadeiras = await prisma.category.upsert({
      where: { slug: 'furadeiras' },
      update: {},
      create: {
        name: 'Furadeiras',
        slug: 'furadeiras',
        description: 'Furadeiras de impacto, rotativas e parafusadeiras',
        parentId: ferramentasEletricas.id
      }
    });

    const serras = await prisma.category.upsert({
      where: { slug: 'serras' },
      update: {},
      create: {
        name: 'Serras',
        slug: 'serras',
        description: 'Serras circulares, tico-tico e esmerilhadeiras',
        parentId: ferramentasEletricas.id
      }
    });

    // 3. Produtos reais da FerraTech
    const produtos = [
      {
        name: 'Furadeira de Impacto 650W Profissional',
        slug: 'furadeira-impacto-650w-profissional',
        sku: 'FUR-IMP-650W',
        price: 189.90,
        originalPrice: 299.90,
        stock: 15,
        description: 'Furadeira de impacto robusta com alta potência para trabalhos pesados em alvenaria, madeira e metal. Ideal para profissionais que precisam de ferramentas confiáveis e duráveis.',
        shortDescription: 'Furadeira de impacto 650W para trabalhos profissionais',
        images: [
          'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop',
          'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop'
        ],
        brand: 'Ferratech Pro',
        rating: 4.8,
        reviews: 127,
        categoryId: furadeiras.id,
        isFeatured: true,
        features: [
          'Potência: 650W',
          'Velocidade: 0-3000 RPM',
          'Mandril: 13mm',
          'Função impacto: 48.000 IPM'
        ],
        specifications: {
          power: '650W',
          voltage: '220V',
          speed: '0-3000 RPM',
          capacity: 'Mandril 13mm',
          weight: '1.8kg',
          dimensions: '25 x 8 x 22 cm',
          warranty: '12 meses',
          includes: ['Furadeira', 'Mandril com chave', 'Punho auxiliar', 'Limitador de profundidade', 'Maleta']
        }
      },
      {
        name: 'Serra Circular 1400W com Mesa',
        slug: 'serra-circular-1400w-mesa',
        sku: 'SER-CIR-1400W',
        price: 299.90,
        originalPrice: 399.90,
        stock: 8,
        description: 'Serra circular profissional com mesa de corte incluída. Perfeita para cortes precisos em madeira, compensado e MDF. Sistema de segurança e ajuste de profundidade.',
        shortDescription: 'Serra circular 1400W com mesa de corte incluída',
        images: [
          'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop',
          'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop'
        ],
        brand: 'Ferratech Pro',
        rating: 4.9,
        reviews: 89,
        categoryId: serras.id,
        isFeatured: true,
        features: [
          'Potência: 1400W',
          'Diâmetro do disco: 184mm',
          'Profundidade máxima: 65mm',
          'Mesa de corte incluída'
        ],
        specifications: {
          power: '1400W',
          voltage: '220V',
          bladeDiameter: '184mm',
          maxDepth: '65mm',
          weight: '3.2kg',
          dimensions: '35 x 25 x 15 cm',
          warranty: '12 meses',
          includes: ['Serra circular', 'Mesa de corte', 'Disco de corte', 'Guia paralela', 'Chave de ajuste']
        }
      },
      {
        name: 'Parafusadeira 18V com 2 Baterias',
        slug: 'parafusadeira-18v-2-baterias',
        sku: 'PAR-18V-2BAT',
        price: 159.90,
        originalPrice: 249.90,
        stock: 22,
        description: 'Parafusadeira sem fio 18V com duas baterias incluídas. Ideal para montagem de móveis, instalações elétricas e trabalhos domésticos.',
        shortDescription: 'Parafusadeira sem fio 18V com 2 baterias',
        images: [
          'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop',
          'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop'
        ],
        brand: 'Ferratech',
        rating: 4.7,
        reviews: 203,
        categoryId: furadeiras.id,
        isFeatured: true,
        features: [
          'Tensão: 18V',
          'Torque: 35Nm',
          'Velocidade: 0-1500 RPM',
          '2 baterias incluídas'
        ],
        specifications: {
          voltage: '18V',
          torque: '35Nm',
          speed: '0-1500 RPM',
          batteryCapacity: '1.5Ah',
          weight: '1.2kg',
          dimensions: '20 x 6 x 18 cm',
          warranty: '12 meses',
          includes: ['Parafusadeira', '2 baterias 1.5Ah', 'Carregador', 'Maleta']
        }
      },
      {
        name: 'Esmerilhadeira Angular 4.5" 850W',
        slug: 'esmerilhadeira-angular-4-5-850w',
        sku: 'ESM-ANG-4.5',
        price: 89.90,
        originalPrice: 129.90,
        stock: 18,
        description: 'Esmerilhadeira angular compacta e potente. Ideal para cortes em metal, pedra e cerâmica. Sistema de segurança e empunhadura ergonômica.',
        shortDescription: 'Esmerilhadeira angular 4.5" 850W',
        images: [
          'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop',
          'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop'
        ],
        brand: 'Ferratech Pro',
        rating: 4.6,
        reviews: 156,
        categoryId: serras.id,
        isFeatured: true,
        features: [
          'Potência: 850W',
          'Diâmetro do disco: 115mm',
          'Velocidade: 11.000 RPM',
          'Sistema de segurança'
        ],
        specifications: {
          power: '850W',
          voltage: '220V',
          bladeDiameter: '115mm',
          speed: '11.000 RPM',
          weight: '1.5kg',
          dimensions: '28 x 10 x 12 cm',
          warranty: '12 meses',
          includes: ['Esmerilhadeira', 'Disco de corte', 'Protetor', 'Empunhadura auxiliar']
        }
      },
      {
        name: 'Jogo de Brocas HSS 10 Peças',
        slug: 'jogo-brocas-hss-10-pecas',
        sku: 'BRO-HSS-10',
        price: 29.90,
        originalPrice: 49.90,
        stock: 45,
        description: 'Jogo completo de brocas HSS para metal, madeira e alvenaria. Inclui 10 brocas de diferentes diâmetros em estojo organizador.',
        shortDescription: 'Jogo de brocas HSS 10 peças',
        images: [
          'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop',
          'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop'
        ],
        brand: 'Ferratech',
        rating: 4.5,
        reviews: 89,
        categoryId: acessorios.id,
        isFeatured: false,
        features: [
          '10 brocas HSS',
          'Diâmetros: 1-10mm',
          'Para metal, madeira e alvenaria',
          'Estojo organizador'
        ],
        specifications: {
          pieces: '10',
          material: 'HSS',
          diameters: '1-10mm',
          applications: 'Metal, Madeira, Alvenaria',
          weight: '0.3kg',
          dimensions: '15 x 10 x 2 cm',
          warranty: '6 meses',
          includes: ['10 brocas HSS', 'Estojo organizador']
        }
      },
      {
        name: 'Martelo de Unha 500g',
        slug: 'martelo-unha-500g',
        sku: 'MAR-UNH-500G',
        price: 19.90,
        originalPrice: 29.90,
        stock: 67,
        description: 'Martelo de unha profissional com cabo ergonômico. Ideal para carpintaria, construção e trabalhos domésticos.',
        shortDescription: 'Martelo de unha 500g com cabo ergonômico',
        images: [
          'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop',
          'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop'
        ],
        brand: 'Ferratech',
        rating: 4.4,
        reviews: 234,
        categoryId: ferramentasManuais.id,
        isFeatured: false,
        features: [
          'Peso da cabeça: 500g',
          'Cabo ergonômico',
          'Cabeça temperada',
          'Cabo de madeira'
        ],
        specifications: {
          headWeight: '500g',
          handleMaterial: 'Madeira',
          headMaterial: 'Aço temperado',
          totalLength: '30cm',
          weight: '0.8kg',
          dimensions: '30 x 8 x 4 cm',
          warranty: '12 meses',
          includes: ['Martelo de unha']
        }
      },
      {
        name: 'Bancada de Trabalho 120cm',
        slug: 'bancada-trabalho-120cm',
        sku: 'BAN-TRA-120CM',
        price: 199.90,
        originalPrice: 299.90,
        stock: 12,
        description: 'Bancada de trabalho robusta com 120cm de largura. Superfície resistente e gavetas organizadoras. Ideal para oficinas e garagens.',
        shortDescription: 'Bancada de trabalho 120cm com gavetas',
        images: [
          'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop',
          'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop'
        ],
        brand: 'Ferratech Pro',
        rating: 4.8,
        reviews: 67,
        categoryId: bancadas.id,
        isFeatured: true,
        features: [
          'Largura: 120cm',
          'Altura: 90cm',
          '3 gavetas organizadoras',
          'Superfície resistente'
        ],
        specifications: {
          width: '120cm',
          height: '90cm',
          depth: '60cm',
          material: 'Aço e madeira',
          drawers: '3',
          weight: '25kg',
          dimensions: '120 x 60 x 90 cm',
          warranty: '12 meses',
          includes: ['Bancada', '3 gavetas', 'Parafusos de montagem']
        }
      },
      {
        name: 'Chave de Fenda Phillips #2',
        slug: 'chave-fenda-phillips-2',
        sku: 'CHA-FEN-PH2',
        price: 8.90,
        originalPrice: 12.90,
        stock: 120,
        description: 'Chave de fenda Phillips #2 com cabo ergonômico. Ideal para trabalhos de montagem e manutenção.',
        shortDescription: 'Chave de fenda Phillips #2',
        images: [
          'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop',
          'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop'
        ],
        brand: 'Ferratech',
        rating: 4.3,
        reviews: 189,
        categoryId: ferramentasManuais.id,
        isFeatured: false,
        features: [
          'Tamanho: #2',
          'Cabo ergonômico',
          'Ponta magnetizada',
          'Material resistente'
        ],
        specifications: {
          size: '#2',
          handleMaterial: 'Plástico ergonômico',
          tipMaterial: 'Aço temperado',
          length: '15cm',
          weight: '0.1kg',
          dimensions: '15 x 1 x 1 cm',
          warranty: '6 meses',
          includes: ['Chave de fenda Phillips #2']
        }
      }
    ];

    // 4. Inserir produtos
    for (const produto of produtos) {
      await prisma.product.upsert({
        where: { slug: produto.slug },
        update: {},
        create: produto
      });
    }

    console.log('✅ Produtos populados com sucesso!');
    console.log(`📦 ${produtos.length} produtos criados`);
    console.log(`📂 4 categorias principais criadas`);
    console.log(`🔧 2 subcategorias criadas`);
    console.log(`⭐ ${produtos.filter(p => p.isFeatured).length} produtos em destaque`);

  } catch (error) {
    console.error('❌ Erro ao popular produtos:', error);
  } finally {
    await prisma.$disconnect();
  }
}

populateRealProducts(); 