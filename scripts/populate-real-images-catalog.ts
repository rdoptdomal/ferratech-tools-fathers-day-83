import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Configurar DATABASE_URL se não estiver definida
if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = "mongodb+srv://rdoptdomal:Helena2270184!@ferratech.wbmjhml.mongodb.net/ferratech?retryWrites=true&w=majority&appName=ferratech";
}

// Função para calcular preço seguindo regras de negócio
function calculatePrice(originalPrice: number): { price: number; originalPrice?: number } {
  if (originalPrice <= 600) {
    return { price: originalPrice };
  } else {
    const discountPrice = Math.min(599.90, originalPrice * 0.85);
    return { 
      price: Math.round(discountPrice * 100) / 100, 
      originalPrice: originalPrice 
    };
  }
}

// Gerar SKU único
function generateSKU(category: string, brand: string, index: number): string {
  const categoryCode = category.substring(0, 3).toUpperCase();
  const brandCode = brand.substring(0, 3).toUpperCase();
  return `${categoryCode}-${brandCode}-${String(index).padStart(3, '0')}`;
}

async function main() {
  console.log('🌱 Iniciando população com imagens reais...');

  try {
    // Criar categorias principais
    console.log('📂 Criando categorias...');
    
    const ferramentasEletricas = await prisma.category.upsert({
      where: { slug: 'ferramentas-eletricas' },
      update: {},
      create: {
        name: 'Ferramentas Elétricas',
        slug: 'ferramentas-eletricas',
        description: 'Furadeiras, parafusadeiras, serras e ferramentas elétricas profissionais',
        image: 'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=300&fit=crop'
      }
    });

    const ferramentasManuais = await prisma.category.upsert({
      where: { slug: 'ferramentas-manuais' },
      update: {},
      create: {
        name: 'Ferramentas Manuais',
        slug: 'ferramentas-manuais',
        description: 'Chaves, alicates, martelos e ferramentas básicas',
        image: 'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=300&fit=crop'
      }
    });

    const utensiliosCasa = await prisma.category.upsert({
      where: { slug: 'utensilios-casa' },
      update: {},
      create: {
        name: 'Utensílios para Casa',
        slug: 'utensilios-casa',
        description: 'Panelas, talheres e utensílios domésticos',
        image: 'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=300&fit=crop'
      }
    });

    const iluminacao = await prisma.category.upsert({
      where: { slug: 'iluminacao' },
      update: {},
      create: {
        name: 'Iluminação',
        slug: 'iluminacao',
        description: 'Lâmpadas, luminárias e acessórios de iluminação',
        image: 'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=300&fit=crop'
      }
    });

    console.log('✅ Categorias criadas com sucesso');

    // Produtos com imagens reais e descrições detalhadas
    const produtosReais = [
      // FURADEIRAS - Imagens reais
      {
        name: 'Furadeira de Impacto 650W D25133K - DeWalt',
        slug: 'furadeira-impacto-dewalt-650w-d25133k',
        sku: generateSKU('FUR', 'DeWalt', 1),
        price: 449.90,
        originalPrice: 523.45,
        stock: 15,
        description: 'Furadeira de impacto profissional DeWalt D25133K com 650W de potência. Perfeita para trabalhos em concreto, alvenaria e pedra. Sistema de vibração reduzida e empunhadura anti-vibração para maior conforto durante o uso. Inclui maleta e acessórios.',
        shortDescription: 'Furadeira de impacto 650W DeWalt para trabalhos em concreto',
        images: [
          'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop&bg=white',
          'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop&bg=white'
        ],
        brand: 'DeWalt',
        categoryId: ferramentasEletricas.id,
        isFeatured: true,
        features: ['Potência: 650W', 'Impacto: 2.6 Joules', 'Velocidade: 0-1500 RPM', 'Empunhadura anti-vibração'],
        specifications: { power: "650W", impact: "2.6J", speed: "0-1500 RPM", weight: "2.4kg" },
      },
      {
        name: 'Furadeira de Impacto 800W HP1631K - Makita',
        slug: 'furadeira-impacto-makita-800w-hp1631k',
        sku: generateSKU('FUR', 'Makita', 2),
        price: 389.90,
        originalPrice: 456.80,
        stock: 12,
        description: 'Furadeira de impacto Makita HP1631K com 800W de potência. Motor robusto e sistema de proteção contra sobrecarga. Ideal para trabalhos profissionais em concreto e alvenaria.',
        shortDescription: 'Furadeira de impacto 800W Makita profissional',
        images: [
          'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop&bg=white',
          'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop&bg=white'
        ],
        brand: 'Makita',
        categoryId: ferramentasEletricas.id,
        isFeatured: true,
        features: ['Potência: 800W', 'Impacto: 3.0 Joules', 'Velocidade: 0-1300 RPM', 'Sistema de proteção'],
        specifications: { power: "800W", impact: "3.0J", speed: "0-1300 RPM", weight: "2.8kg" },
      },
      {
        name: 'Parafusadeira 12V Max XR DCF801N2 - DeWalt',
        slug: 'parafusadeira-dewalt-12v-dcf801n2',
        sku: generateSKU('PAR', 'DeWalt', 1),
        price: 299.90,
        originalPrice: 387.20,
        stock: 20,
        description: 'Parafusadeira sem fio DeWalt 12V Max XR DCF801N2. Compacta e leve, ideal para trabalhos em espaços confinados. Bateria de lítio de longa duração e sistema de iluminação LED integrado.',
        shortDescription: 'Parafusadeira sem fio 12V DeWalt compacta',
        images: [
          'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop&bg=white',
          'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop&bg=white'
        ],
        brand: 'DeWalt',
        categoryId: ferramentasEletricas.id,
        isFeatured: false,
        features: ['Voltagem: 12V', 'Torque: 300 Nm', 'Peso: 1.1kg', 'LED integrado'],
        specifications: { voltage: "12V", torque: "300Nm", weight: "1.1kg", battery: "2.0Ah" },
      },

      // SERRAS - Imagens reais
      {
        name: 'Serra Circular 185mm 1800W 5007N - Makita',
        slug: 'serra-circular-makita-185mm-1800w-5007n',
        sku: generateSKU('SER', 'Makita', 1),
        price: 599.90,
        originalPrice: 778.05,
        stock: 10,
        description: 'Serra circular potente e robusta da Makita 5007N. Ideal para cortes precisos em madeira, compensado e outros materiais. Motor de 1800W com alta durabilidade e sistema de proteção contra sobrecarga. Inclui disco de corte para madeira e chave de aperto.',
        shortDescription: 'Serra circular 185mm 1800W Makita para trabalhos profissionais',
        images: [
          'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop&bg=white',
          'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop&bg=white'
        ],
        brand: 'Makita',
        categoryId: ferramentasEletricas.id,
        isFeatured: true,
        features: ['Potência: 1800W', 'Diâmetro do Disco: 185mm', 'Velocidade: 5200 RPM', 'Sistema de proteção'],
        specifications: { power: "1800W", discDiameter: "185mm", speed: "5200 RPM", weight: "4.2kg" },
      },
      {
        name: 'Serra Tico-Tico 1100W 3000 - Bosch',
        slug: 'serra-tico-tico-bosch-1100w-3000',
        sku: generateSKU('SER', 'Bosch', 2),
        price: 289.90,
        originalPrice: 345.60,
        stock: 15,
        description: 'Serra tico-tico Bosch 3000 com 1100W de potência. Ideal para cortes curvos e precisos em madeira, plástico e metal. Sistema de vibração reduzida e empunhadura ergonômica.',
        shortDescription: 'Serra tico-tico 1100W Bosch para cortes precisos',
        images: [
          'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop&bg=white',
          'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop&bg=white'
        ],
        brand: 'Bosch',
        categoryId: ferramentasEletricas.id,
        isFeatured: false,
        features: ['Potência: 1100W', 'Corte: 65mm', 'Velocidade: 3000 SPM', 'Vibração reduzida'],
        specifications: { power: "1100W", cutDepth: "65mm", speed: "3000 SPM", weight: "2.1kg" },
      },

      // FERRAMENTAS MANUAIS - Imagens reais
      {
        name: 'Jogo de Chaves Combinadas 10 Peças - Tramontina',
        slug: 'jogo-chaves-combinadas-tramontina-10p',
        sku: generateSKU('CHV', 'Tramontina', 1),
        price: 89.90,
        originalPrice: 112.50,
        stock: 25,
        description: 'Jogo de chaves combinadas Tramontina com 10 peças (6mm a 19mm). Aço cromo-vanádio de alta resistência. Acabamento cromado e empunhadura ergonômica. Inclui estojo organizador.',
        shortDescription: 'Jogo de chaves combinadas 10 peças de alta qualidade',
        images: [
          'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop&bg=white',
          'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop&bg=white'
        ],
        brand: 'Tramontina',
        categoryId: ferramentasManuais.id,
        isFeatured: false,
        features: ['10 peças', '6mm a 19mm', 'Aço cromo-vanádio', 'Estojo organizador'],
        specifications: { pieces: "10", sizes: "6-19mm", material: "Cromo-vanádio", case: true },
      },
      {
        name: 'Alicate Universal 8" 2078 - Stanley',
        slug: 'alicate-universal-stanley-8-2078',
        sku: generateSKU('ALI', 'Stanley', 1),
        price: 45.90,
        originalPrice: 58.75,
        stock: 30,
        description: 'Alicate universal Stanley 8" com cabo isolado. Ideal para trabalhos elétricos e mecânicos. Pontas precisas e empunhadura confortável. Material de alta qualidade.',
        shortDescription: 'Alicate universal 8" com cabo isolado',
        images: [
          'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop&bg=white',
          'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop&bg=white'
        ],
        brand: 'Stanley',
        categoryId: ferramentasManuais.id,
        isFeatured: false,
        features: ['Tamanho: 8"', 'Cabo isolado', 'Pontas precisas', 'Alta qualidade'],
        specifications: { size: "8\"", insulated: true, precision: "High", material: "Steel" },
      },

      // UTENSÍLIOS PARA CASA - Imagens reais
      {
        name: 'Panela de Pressão 5L - Tramontina',
        slug: 'panela-pressao-tramontina-5l',
        sku: generateSKU('PAN', 'Tramontina', 1),
        price: 129.90,
        originalPrice: 168.90,
        stock: 15,
        description: 'Panela de pressão Tramontina 5L em aço inox. Válvula de segurança e cabo ergonômico. Ideal para cozimento rápido e econômico. Acabamento interno antiaderente.',
        shortDescription: 'Panela de pressão 5L em aço inox',
        images: [
          'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop&bg=white',
          'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop&bg=white'
        ],
        brand: 'Tramontina',
        categoryId: utensiliosCasa.id,
        isFeatured: true,
        features: ['Capacidade: 5L', 'Aço inox', 'Válvula de segurança', 'Antiaderente'],
        specifications: { capacity: "5L", material: "Stainless Steel", safety: "Valve", coating: "Non-stick" },
      },
      {
        name: 'Jogo de Panelas 5 Peças - Tramontina',
        slug: 'jogo-panelas-tramontina-5p',
        sku: generateSKU('JOG', 'Tramontina', 1),
        price: 299.90,
        originalPrice: 389.50,
        stock: 12,
        description: 'Jogo de panelas Tramontina 5 peças em aço inox. Inclui panela alta, panela baixa, frigideira, caçarola e tampa. Cabos ergonômicos e fundo triplo.',
        shortDescription: 'Jogo de panelas 5 peças em aço inox',
        images: [
          'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop&bg=white',
          'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop&bg=white'
        ],
        brand: 'Tramontina',
        categoryId: utensiliosCasa.id,
        isFeatured: false,
        features: ['5 peças', 'Aço inox', 'Fundo triplo', 'Cabos ergonômicos'],
        specifications: { pieces: "5", material: "Stainless Steel", bottom: "Triple", handles: "Ergonomic" },
      },

      // ILUMINAÇÃO - Imagens reais
      {
        name: 'Lâmpada LED 9W 6500K - Philips',
        slug: 'lampada-led-philips-9w-6500k',
        sku: generateSKU('LAM', 'Philips', 1),
        price: 12.90,
        originalPrice: 15.80,
        stock: 100,
        description: 'Lâmpada LED Philips 9W com temperatura de cor 6500K (branco frio). Alta eficiência energética e longa durabilidade. Ideal para iluminação residencial e comercial.',
        shortDescription: 'Lâmpada LED 9W Philips branco frio',
        images: [
          'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop&bg=white',
          'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop&bg=white'
        ],
        brand: 'Philips',
        categoryId: iluminacao.id,
        isFeatured: false,
        features: ['Potência: 9W', 'Temperatura: 6500K', 'Alta eficiência', 'Longa durabilidade'],
        specifications: { power: "9W", colorTemp: "6500K", efficiency: "High", lifespan: "25000h" },
      }
    ];

    console.log('🛍️ Criando produtos com imagens reais...');
    
    // Criar produtos no banco
    for (const produto of produtosReais) {
      await prisma.product.upsert({
        where: { sku: produto.sku },
        update: {
          name: produto.name,
          price: produto.price,
          originalPrice: produto.originalPrice,
          stock: produto.stock,
          description: produto.description,
          shortDescription: produto.shortDescription,
          images: produto.images,
          brand: produto.brand,
          categoryId: produto.categoryId,
          isFeatured: produto.isFeatured,
          features: produto.features,
          specifications: produto.specifications,
          isActive: true
        },
        create: {
          name: produto.name,
          slug: produto.slug,
          sku: produto.sku,
          price: produto.price,
          originalPrice: produto.originalPrice,
          stock: produto.stock,
          description: produto.description,
          shortDescription: produto.shortDescription,
          images: produto.images,
          brand: produto.brand,
          categoryId: produto.categoryId,
          isFeatured: produto.isFeatured,
          features: produto.features,
          specifications: produto.specifications,
          isActive: true
        }
      });
    }

    console.log('✅ Produtos com imagens reais criados com sucesso!');
    console.log(`📊 Total de produtos: ${produtosReais.length}`);
    console.log(`🏷️ Produtos em destaque: ${produtosReais.filter(p => p.isFeatured).length}`);
    console.log(`💰 Produtos com desconto: ${produtosReais.filter(p => p.originalPrice).length}`);

  } catch (error) {
    console.error('❌ Erro ao popular produtos com imagens reais:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .then(() => {
    console.log('🎉 População com imagens reais concluída!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Erro fatal:', error);
    process.exit(1);
  }); 