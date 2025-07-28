import { PrismaClient } from '@prisma/client';

// Configurar variáveis de ambiente
process.env.DATABASE_URL = "mongodb+srv://rdoptdomal:Helena2270184!@ferratech.wbmjhml.mongodb.net/ferratech?retryWrites=true&w=majority&appName=ferratech";

const prisma = new PrismaClient();

// Regra de negócio de precificação
function calculatePrice(originalPrice: number): { price: number; originalPrice?: number } {
  if (originalPrice <= 600) {
    return { price: originalPrice };
  } else {
    // Calcular preço atrativo abaixo de R$ 600
    const discountPrice = Math.min(599.90, originalPrice * 0.85);
    return { 
      price: Math.round(discountPrice * 100) / 100, 
      originalPrice: originalPrice 
    };
  }
}

async function populateRealGMADProducts() {
  console.log('🌱 Populando FerraTech com produtos reais da GMAD...');

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

    const utensiliosCasa = await prisma.category.upsert({
      where: { slug: 'utensilios-casa' },
      update: {},
      create: {
        name: 'Utensílios para Casa',
        slug: 'utensilios-casa',
        description: 'Panelas, jogos de cozinha e utensílios domésticos',
        image: 'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop'
      }
    });

    // 2. Produtos reais da GMAD - Ferramentas Elétricas
    const produtosEletricas = [
      {
        name: 'Serra Circular 185mm 1800W 5007N - Makita',
        slug: 'serra-circular-185mm-1800w-5007n-makita',
        sku: 'MAK-5007N',
        originalPrice: 778.05,
        stock: 15,
        description: 'Serra circular profissional Makita com motor de 1800W e diâmetro de disco de 185mm. Ideal para cortes precisos em madeira, compensado e MDF. Inclui disco de corte, guia paralela e maleta.',
        shortDescription: 'Serra circular 185mm 1800W Makita para trabalhos profissionais',
        images: [
          'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop',
          'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop'
        ],
        brand: 'Makita',
        rating: 4.9,
        reviews: 127,
        categoryId: ferramentasEletricas.id,
        isFeatured: true,
        features: [
          'Potência: 1800W',
          'Diâmetro do disco: 185mm',
          'Profundidade máxima: 70mm',
          'Velocidade: 5200 RPM',
          'Peso: 4.2kg'
        ],
        specifications: {
          power: '1800W',
          voltage: '220V',
          bladeDiameter: '185mm',
          maxDepth: '70mm',
          speed: '5200 RPM',
          weight: '4.2kg',
          dimensions: '35 x 25 x 15 cm',
          warranty: '12 meses',
          includes: ['Serra circular', 'Disco de corte', 'Guia paralela', 'Maleta', 'Chave de ajuste']
        }
      },
      {
        name: 'Furadeira de Impacto 18V 2.0Ah - DeWalt',
        slug: 'furadeira-impacto-18v-2-0ah-dewalt',
        sku: 'DEW-D25133K',
        originalPrice: 899.90,
        stock: 12,
        description: 'Furadeira de impacto DeWalt 18V com bateria de 2.0Ah. Alta performance para trabalhos pesados em alvenaria, madeira e metal. Sistema de controle de torque e empunhadura ergonômica.',
        shortDescription: 'Furadeira de impacto 18V DeWalt com bateria 2.0Ah',
        images: [
          'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop',
          'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop'
        ],
        brand: 'DeWalt',
        rating: 4.8,
        reviews: 89,
        categoryId: ferramentasEletricas.id,
        isFeatured: true,
        features: [
          'Tensão: 18V',
          'Bateria: 2.0Ah',
          'Torque: 1500 in-lbs',
          'Velocidade: 0-3000 RPM',
          'Impactos: 0-48000 IPM'
        ],
        specifications: {
          voltage: '18V',
          batteryCapacity: '2.0Ah',
          torque: '1500 in-lbs',
          speed: '0-3000 RPM',
          impacts: '0-48000 IPM',
          weight: '1.4kg',
          dimensions: '20 x 8 x 18 cm',
          warranty: '12 meses',
          includes: ['Furadeira', 'Bateria 2.0Ah', 'Carregador', 'Maleta']
        }
      },
      {
        name: 'Parafusadeira 12V 1.5Ah - Bosch',
        slug: 'parafusadeira-12v-1-5ah-bosch',
        sku: 'BOS-GSR12V-15',
        originalPrice: 299.90,
        stock: 25,
        description: 'Parafusadeira Bosch 12V compacta e leve. Ideal para trabalhos de montagem, instalações elétricas e trabalhos domésticos. Bateria de 1.5Ah com longa duração.',
        shortDescription: 'Parafusadeira 12V Bosch compacta e leve',
        images: [
          'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop',
          'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop'
        ],
        brand: 'Bosch',
        rating: 4.7,
        reviews: 156,
        categoryId: ferramentasEletricas.id,
        isFeatured: false,
        features: [
          'Tensão: 12V',
          'Bateria: 1.5Ah',
          'Torque: 30Nm',
          'Velocidade: 0-1300 RPM',
          'Peso: 0.8kg'
        ],
        specifications: {
          voltage: '12V',
          batteryCapacity: '1.5Ah',
          torque: '30Nm',
          speed: '0-1300 RPM',
          weight: '0.8kg',
          dimensions: '18 x 6 x 15 cm',
          warranty: '12 meses',
          includes: ['Parafusadeira', 'Bateria 1.5Ah', 'Carregador', 'Maleta']
        }
      },
      {
        name: 'Esmerilhadeira Angular 4.5" 850W - Makita',
        slug: 'esmerilhadeira-angular-4-5-850w-makita',
        sku: 'MAK-9553NB',
        originalPrice: 189.90,
        stock: 18,
        description: 'Esmerilhadeira angular Makita 4.5" com motor de 850W. Ideal para cortes em metal, pedra e cerâmica. Sistema de segurança e empunhadura ergonômica.',
        shortDescription: 'Esmerilhadeira angular 4.5" 850W Makita',
        images: [
          'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop',
          'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop'
        ],
        brand: 'Makita',
        rating: 4.6,
        reviews: 203,
        categoryId: ferramentasEletricas.id,
        isFeatured: false,
        features: [
          'Potência: 850W',
          'Diâmetro do disco: 115mm',
          'Velocidade: 11000 RPM',
          'Peso: 1.8kg',
          'Sistema de segurança'
        ],
        specifications: {
          power: '850W',
          voltage: '220V',
          bladeDiameter: '115mm',
          speed: '11000 RPM',
          weight: '1.8kg',
          dimensions: '28 x 10 x 12 cm',
          warranty: '12 meses',
          includes: ['Esmerilhadeira', 'Disco de corte', 'Protetor', 'Empunhadura auxiliar']
        }
      },
      {
        name: 'Lixadeira Orbital 5" 300W - DeWalt',
        slug: 'lixadeira-orbital-5-300w-dewalt',
        sku: 'DEW-DW421',
        originalPrice: 159.90,
        stock: 22,
        description: 'Lixadeira orbital DeWalt 5" com motor de 300W. Movimento orbital para acabamento perfeito em madeira, metal e plástico. Controle de velocidade variável.',
        shortDescription: 'Lixadeira orbital 5" 300W DeWalt',
        images: [
          'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop',
          'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop'
        ],
        brand: 'DeWalt',
        rating: 4.5,
        reviews: 98,
        categoryId: ferramentasEletricas.id,
        isFeatured: false,
        features: [
          'Potência: 300W',
          'Diâmetro da base: 125mm',
          'Velocidade: 12000 OPM',
          'Peso: 1.2kg',
          'Controle de velocidade'
        ],
        specifications: {
          power: '300W',
          voltage: '220V',
          baseDiameter: '125mm',
          speed: '12000 OPM',
          weight: '1.2kg',
          dimensions: '25 x 12 x 10 cm',
          warranty: '12 meses',
          includes: ['Lixadeira', 'Base de lixa', 'Maleta']
        }
      }
    ];

    // 3. Produtos reais da GMAD - Ferramentas Manuais
    const produtosManuais = [
      {
        name: 'Jogo de Chaves Combinadas 10 Peças - Tramontina',
        slug: 'jogo-chaves-combinadas-10-pecas-tramontina',
        sku: 'TRA-CHAV-10',
        originalPrice: 89.90,
        stock: 35,
        description: 'Jogo completo de chaves combinadas Tramontina com 10 peças. Aço carbono temperado, acabamento cromado. Tamanhos de 6mm a 19mm.',
        shortDescription: 'Jogo de chaves combinadas 10 peças Tramontina',
        images: [
          'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop',
          'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop'
        ],
        brand: 'Tramontina',
        rating: 4.4,
        reviews: 234,
        categoryId: ferramentasManuais.id,
        isFeatured: false,
        features: [
          '10 chaves combinadas',
          'Tamanhos: 6mm a 19mm',
          'Aço carbono temperado',
          'Acabamento cromado',
          'Estojo organizador'
        ],
        specifications: {
          pieces: '10',
          sizes: '6mm a 19mm',
          material: 'Aço carbono temperado',
          finish: 'Cromado',
          weight: '0.8kg',
          dimensions: '20 x 15 x 3 cm',
          warranty: '12 meses',
          includes: ['10 chaves combinadas', 'Estojo organizador']
        }
      },
      {
        name: 'Alicate Universal 8" - Vonder',
        slug: 'alicate-universal-8-vonder',
        sku: 'VON-ALI-8',
        originalPrice: 29.90,
        stock: 50,
        description: 'Alicate universal Vonder 8" com cabo ergonômico. Ideal para trabalhos elétricos, mecânicos e domésticos. Aço carbono temperado.',
        shortDescription: 'Alicate universal 8" Vonder',
        images: [
          'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop',
          'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop'
        ],
        brand: 'Vonder',
        rating: 4.3,
        reviews: 189,
        categoryId: ferramentasManuais.id,
        isFeatured: false,
        features: [
          'Comprimento: 8" (200mm)',
          'Aço carbono temperado',
          'Cabo ergonômico',
          'Corte de fios',
          'Acabamento cromado'
        ],
        specifications: {
          length: '8" (200mm)',
          material: 'Aço carbono temperado',
          handle: 'Ergonômico',
          weight: '0.3kg',
          dimensions: '20 x 5 x 2 cm',
          warranty: '12 meses',
          includes: ['Alicate universal']
        }
      },
      {
        name: 'Estilete Profissional com 5 Lâminas - Stanley',
        slug: 'estilete-profissional-5-laminas-stanley',
        sku: 'STA-EST-5',
        originalPrice: 19.90,
        stock: 80,
        description: 'Estilete profissional Stanley com 5 lâminas incluídas. Design ergonômico, trava de segurança e cabo antiderrapante.',
        shortDescription: 'Estilete profissional Stanley com 5 lâminas',
        images: [
          'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop',
          'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop'
        ],
        brand: 'Stanley',
        rating: 4.2,
        reviews: 156,
        categoryId: ferramentasManuais.id,
        isFeatured: false,
        features: [
          '5 lâminas incluídas',
          'Design ergonômico',
          'Trava de segurança',
          'Cabo antiderrapante',
          'Lâminas de alta qualidade'
        ],
        specifications: {
          blades: '5 incluídas',
          design: 'Ergonômico',
          safety: 'Trava de segurança',
          handle: 'Antiderrapante',
          weight: '0.1kg',
          dimensions: '15 x 2 x 1 cm',
          warranty: '6 meses',
          includes: ['Estilete', '5 lâminas']
        }
      },
      {
        name: 'Trena 5m Profissional - Stanley',
        slug: 'trena-5m-profissional-stanley',
        sku: 'STA-TRE-5M',
        originalPrice: 24.90,
        stock: 45,
        description: 'Trena profissional Stanley 5m com fita de aço. Trava automática, gancho magnético e case resistente.',
        shortDescription: 'Trena 5m profissional Stanley',
        images: [
          'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop',
          'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop'
        ],
        brand: 'Stanley',
        rating: 4.6,
        reviews: 267,
        categoryId: ferramentasManuais.id,
        isFeatured: false,
        features: [
          'Comprimento: 5m',
          'Fita de aço',
          'Trava automática',
          'Gancho magnético',
          'Case resistente'
        ],
        specifications: {
          length: '5m',
          tape: 'Aço',
          lock: 'Automática',
          hook: 'Magnético',
          weight: '0.2kg',
          dimensions: '8 x 6 x 2 cm',
          warranty: '12 meses',
          includes: ['Trena 5m', 'Case']
        }
      }
    ];

    // 4. Produtos reais da GMAD - Utensílios para Casa
    const produtosUtensilios = [
      {
        name: 'Panela de Pressão 5L Tramontina - Mor',
        slug: 'panela-pressao-5l-tramontina-mor',
        sku: 'TRA-PAN-5L',
        originalPrice: 129.90,
        stock: 30,
        description: 'Panela de pressão Tramontina Mor 5L com válvula de segurança e acabamento interno antiaderente. Ideal para cozimento rápido e econômico.',
        shortDescription: 'Panela de pressão 5L Tramontina Mor',
        images: [
          'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop',
          'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop'
        ],
        brand: 'Tramontina',
        rating: 4.8,
        reviews: 445,
        categoryId: utensiliosCasa.id,
        isFeatured: true,
        features: [
          'Capacidade: 5L',
          'Válvula de segurança',
          'Acabamento antiaderente',
          'Base tripla',
          'Tampa com trava'
        ],
        specifications: {
          capacity: '5L',
          safety: 'Válvula de segurança',
          finish: 'Antiaderente',
          base: 'Tripla',
          weight: '2.1kg',
          dimensions: '25 x 25 x 15 cm',
          warranty: '12 meses',
          includes: ['Panela de pressão', 'Tampa', 'Válvula']
        }
      },
      {
        name: 'Jogo de Panelas 5 Peças Tramontina - Profissional',
        slug: 'jogo-panelas-5-pecas-tramontina-profissional',
        sku: 'TRA-JOG-5P',
        originalPrice: 299.90,
        stock: 20,
        description: 'Jogo de panelas Tramontina Profissional com 5 peças. Acabamento interno antiaderente, base tripla e cabo ergonômico.',
        shortDescription: 'Jogo de panelas 5 peças Tramontina Profissional',
        images: [
          'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop',
          'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop'
        ],
        brand: 'Tramontina',
        rating: 4.9,
        reviews: 312,
        categoryId: utensiliosCasa.id,
        isFeatured: true,
        features: [
          '5 peças incluídas',
          'Acabamento antiaderente',
          'Base tripla',
          'Cabo ergonômico',
          'Tampa de vidro'
        ],
        specifications: {
          pieces: '5',
          finish: 'Antiaderente',
          base: 'Tripla',
          handle: 'Ergonômico',
          weight: '4.5kg',
          dimensions: '30 x 25 x 20 cm',
          warranty: '12 meses',
          includes: ['5 panelas', 'Tampas', 'Suporte']
        }
      },
      {
        name: 'Wok Tramontina 32cm - Profissional',
        slug: 'wok-tramontina-32cm-profissional',
        sku: 'TRA-WOK-32',
        originalPrice: 89.90,
        stock: 25,
        description: 'Wok Tramontina Profissional 32cm com acabamento interno antiaderente. Ideal para frituras e preparos asiáticos.',
        shortDescription: 'Wok 32cm Tramontina Profissional',
        images: [
          'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop',
          'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop'
        ],
        brand: 'Tramontina',
        rating: 4.7,
        reviews: 178,
        categoryId: utensiliosCasa.id,
        isFeatured: false,
        features: [
          'Diâmetro: 32cm',
          'Acabamento antiaderente',
          'Base tripla',
          'Cabo ergonômico',
          'Tampa de vidro'
        ],
        specifications: {
          diameter: '32cm',
          finish: 'Antiaderente',
          base: 'Tripla',
          handle: 'Ergonômico',
          weight: '1.8kg',
          dimensions: '35 x 35 x 8 cm',
          warranty: '12 meses',
          includes: ['Wok', 'Tampa', 'Suporte']
        }
      },
      {
        name: 'Poltrona Reclinável Tramontina - Comfort',
        slug: 'poltrona-reclinavel-tramontina-comfort',
        sku: 'TRA-POL-COM',
        originalPrice: 899.90,
        stock: 8,
        description: 'Poltrona reclinável Tramontina Comfort com tecido resistente e estrutura em aço. Múltiplas posições de reclinação.',
        shortDescription: 'Poltrona reclinável Tramontina Comfort',
        images: [
          'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop',
          'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop'
        ],
        brand: 'Tramontina',
        rating: 4.6,
        reviews: 89,
        categoryId: utensiliosCasa.id,
        isFeatured: true,
        features: [
          'Reclinação múltipla',
          'Tecido resistente',
          'Estrutura em aço',
          'Espuma de alta densidade',
          'Apoio para braços'
        ],
        specifications: {
          reclination: 'Múltipla',
          fabric: 'Resistente',
          structure: 'Aço',
          foam: 'Alta densidade',
          weight: '12kg',
          dimensions: '85 x 75 x 95 cm',
          warranty: '12 meses',
          includes: ['Poltrona', 'Manual de montagem']
        }
      }
    ];

    // 5. Combinar todos os produtos
    const todosProdutos = [
      ...produtosEletricas,
      ...produtosManuais,
      ...produtosUtensilios
    ];

    // 6. Inserir produtos com regra de precificação
    for (const produto of todosProdutos) {
      const pricing = calculatePrice(produto.originalPrice);
      
      await prisma.product.upsert({
        where: { slug: produto.slug },
        update: {},
        create: {
          ...produto,
          price: pricing.price,
          originalPrice: pricing.originalPrice
        }
      });
    }

    console.log('✅ Produtos reais da GMAD populados com sucesso!');
    console.log(`📦 ${todosProdutos.length} produtos criados`);
    console.log(`⚡ ${produtosEletricas.length} ferramentas elétricas`);
    console.log(`🔧 ${produtosManuais.length} ferramentas manuais`);
    console.log(`🏠 ${produtosUtensilios.length} utensílios para casa`);
    console.log(`⭐ ${todosProdutos.filter(p => p.isFeatured).length} produtos em destaque`);

  } catch (error) {
    console.error('❌ Erro ao popular produtos:', error);
  } finally {
    await prisma.$disconnect();
  }
}

populateRealGMADProducts(); 