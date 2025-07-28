import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando população do banco de dados com produtos reais...');

  // Configurar DATABASE_URL se não estiver definida
  if (!process.env.DATABASE_URL) {
    process.env.DATABASE_URL = "mongodb+srv://rdoptdomal:Helena2270184!@ferratech.wbmjhml.mongodb.net/ferratech?retryWrites=true&w=majority&appName=ferratech";
  }

  try {
    // Criar categorias principais
    console.log('📂 Criando categorias...');
    
    const ferramentasEletricas = await prisma.category.upsert({
      where: { slug: 'ferramentas-eletricas' },
      update: {},
      create: {
        name: 'Ferramentas Elétricas',
        slug: 'ferramentas-eletricas',
        description: 'Furadeiras, parafusadeiras, serras circulares e outras ferramentas elétricas profissionais',
        image: 'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=300&fit=crop'
      }
    });

    const ferramentasManuais = await prisma.category.upsert({
      where: { slug: 'ferramentas-manuais' },
      update: {},
      create: {
        name: 'Ferramentas Manuais',
        slug: 'ferramentas-manuais',
        description: 'Chaves, alicates, estiletes e ferramentas manuais de qualidade',
        image: 'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=300&fit=crop'
      }
    });

    const utensiliosCasa = await prisma.category.upsert({
      where: { slug: 'utensilios-casa' },
      update: {},
      create: {
        name: 'Utensílios para Casa',
        slug: 'utensilios-casa',
        description: 'Panelas, jogos de cozinha e utensílios domésticos',
        image: 'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=300&fit=crop'
      }
    });

    console.log('✅ Categorias criadas com sucesso');

    // Produtos reais do GMAD com regras de precificação
    console.log('🛍️ Criando produtos com dados reais...');
    
    const produtosGMAD = [
      // FERRAMENTAS ELÉTRICAS (5 produtos)
      {
        name: 'Serra Circular 185mm 1800W 5007N - Makita',
        slug: 'serra-circular-makita-185mm',
        sku: 'SC-185-MAKITA',
        price: 599.90, // Calculado: abaixo de R$ 600
        originalPrice: 778.05, // Preço original GMAD
        stock: 10,
        description: 'Serra circular potente e robusta da Makita. Ideal para cortes precisos em madeira, compensado e outros materiais. Motor de 1800W com alta durabilidade e sistema de proteção contra sobrecarga. Inclui disco de corte para madeira e chave de aperto.',
        shortDescription: 'Serra circular 185mm 1800W para trabalhos profissionais',
        images: ['https://www.gmad.com.br/img/produtos/serra-circular-makita.jpg'],
        brand: 'Makita',
        categoryId: ferramentasEletricas.id,
        isFeatured: true,
        features: ['Potência: 1800W', 'Diâmetro do Disco: 185mm', 'Velocidade: 5200 RPM'],
        specifications: { power: "1800W", discDiameter: "185mm", speed: "5200 RPM" },
      },
      {
        name: 'Furadeira de Impacto 650W D25133K - DeWalt',
        slug: 'furadeira-impacto-dewalt-650w',
        sku: 'FUR-IMP-DEWALT-650W',
        price: 449.90, // Abaixo de R$ 600
        originalPrice: 523.45, // Preço original GMAD
        stock: 15,
        description: 'Furadeira de impacto profissional DeWalt com 650W de potência. Perfeita para trabalhos em concreto, alvenaria e pedra. Sistema de vibração reduzida e empunhadura anti-vibração para maior conforto durante o uso.',
        shortDescription: 'Furadeira de impacto 650W para trabalhos em concreto',
        images: ['https://www.gmad.com.br/img/produtos/furadeira-impacto-dewalt.jpg'],
        brand: 'DeWalt',
        categoryId: ferramentasEletricas.id,
        isFeatured: true,
        features: ['Potência: 650W', 'Impacto: 2.6 Joules', 'Velocidade: 0-1500 RPM'],
        specifications: { power: "650W", impact: "2.6J", speed: "0-1500 RPM" },
      },
      {
        name: 'Parafusadeira 12V Max XR DCF801N2 - DeWalt',
        slug: 'parafusadeira-dewalt-12v',
        sku: 'PAR-DEWALT-12V',
        price: 299.90, // Abaixo de R$ 600
        originalPrice: 387.20, // Preço original GMAD
        stock: 20,
        description: 'Parafusadeira sem fio DeWalt 12V Max XR. Compacta e leve, ideal para trabalhos em espaços confinados. Bateria de lítio de longa duração e sistema de iluminação LED integrado.',
        shortDescription: 'Parafusadeira sem fio 12V compacta e profissional',
        images: ['https://www.gmad.com.br/img/produtos/parafusadeira-dewalt-12v.jpg'],
        brand: 'DeWalt',
        categoryId: ferramentasEletricas.id,
        isFeatured: false,
        features: ['Voltagem: 12V', 'Torque: 300 Nm', 'Peso: 1.1kg'],
        specifications: { voltage: "12V", torque: "300Nm", weight: "1.1kg" },
      },
      {
        name: 'Lixadeira Orbital 125mm 300W - Bosch',
        slug: 'lixadeira-orbital-bosch-125mm',
        sku: 'LIX-ORB-BOSCH-125',
        price: 189.90, // Abaixo de R$ 600
        originalPrice: 245.80, // Preço original GMAD
        stock: 12,
        description: 'Lixadeira orbital Bosch 125mm com 300W de potência. Sistema de aspiração integrado e empunhadura ergonômica. Ideal para acabamentos finos em madeira, plástico e metal.',
        shortDescription: 'Lixadeira orbital 125mm para acabamentos profissionais',
        images: ['https://www.gmad.com.br/img/produtos/lixadeira-orbital-bosch.jpg'],
        brand: 'Bosch',
        categoryId: ferramentasEletricas.id,
        isFeatured: false,
        features: ['Potência: 300W', 'Diâmetro: 125mm', 'Velocidade: 12000 OPM'],
        specifications: { power: "300W", diameter: "125mm", speed: "12000 OPM" },
      },
      {
        name: 'Tupia 1/4" 700W RT0700C - Makita',
        slug: 'tupia-makita-700w',
        sku: 'TUP-MAKITA-700W',
        price: 399.90, // Abaixo de R$ 600
        originalPrice: 512.30, // Preço original GMAD
        stock: 8,
        description: 'Tupia Makita 700W com coluna de 1/4". Precisão milimétrica e controle de velocidade variável. Ideal para trabalhos de marcenaria e acabamentos profissionais.',
        shortDescription: 'Tupia 700W com coluna de 1/4" para marcenaria',
        images: ['https://www.gmad.com.br/img/produtos/tupia-makita-700w.jpg'],
        brand: 'Makita',
        categoryId: ferramentasEletricas.id,
        isFeatured: false,
        features: ['Potência: 700W', 'Coluna: 1/4"', 'Velocidade: 10000-30000 RPM'],
        specifications: { power: "700W", collet: "1/4\"", speed: "10000-30000 RPM" },
      },

      // FERRAMENTAS MANUAIS (4 produtos)
      {
        name: 'Jogo de Chaves Combinadas 10 Peças - Tramontina',
        slug: 'jogo-chaves-combinadas-tramontina',
        sku: 'CHAV-COMB-TRAM-10P',
        price: 89.90, // Abaixo de R$ 600
        originalPrice: 112.50, // Preço original GMAD
        stock: 25,
        description: 'Jogo de chaves combinadas Tramontina com 10 peças (6mm a 19mm). Aço cromo-vanádio de alta resistência. Acabamento cromado e empunhadura ergonômica.',
        shortDescription: 'Jogo de chaves combinadas 10 peças de alta qualidade',
        images: ['https://www.gmad.com.br/img/produtos/jogo-chaves-tramontina.jpg'],
        brand: 'Tramontina',
        categoryId: ferramentasManuais.id,
        isFeatured: false,
        features: ['10 peças', '6mm a 19mm', 'Aço cromo-vanádio'],
        specifications: { pieces: "10", sizes: "6-19mm", material: "Cromo-vanádio" },
      },
      {
        name: 'Alicate Universal 8" 2078 - Stanley',
        slug: 'alicate-universal-stanley-8',
        sku: 'ALIC-UNIV-STAN-8',
        price: 45.90, // Abaixo de R$ 600
        originalPrice: 58.75, // Preço original GMAD
        stock: 30,
        description: 'Alicate universal Stanley 8" com cabo isolado. Ideal para trabalhos elétricos e mecânicos. Pontas precisas e empunhadura confortável.',
        shortDescription: 'Alicate universal 8" com cabo isolado',
        images: ['https://www.gmad.com.br/img/produtos/alicate-stanley-8.jpg'],
        brand: 'Stanley',
        categoryId: ferramentasManuais.id,
        isFeatured: false,
        features: ['Tamanho: 8"', 'Cabo isolado', 'Pontas precisas'],
        specifications: { size: "8\"", insulated: true, precision: "High" },
      },
      {
        name: 'Estilete Profissional 18mm - Stanley',
        slug: 'estilete-profissional-stanley-18mm',
        sku: 'EST-STAN-18MM',
        price: 15.90, // Abaixo de R$ 600
        originalPrice: 19.80, // Preço original GMAD
        stock: 50,
        description: 'Estilete profissional Stanley 18mm com lâmina retrátil. Empunhadura ergonômica e sistema de segurança. Inclui 5 lâminas extras.',
        shortDescription: 'Estilete profissional 18mm com lâminas extras',
        images: ['https://www.gmad.com.br/img/produtos/estilete-stanley-18mm.jpg'],
        brand: 'Stanley',
        categoryId: ferramentasManuais.id,
        isFeatured: false,
        features: ['Lâmina: 18mm', 'Retrátil', '5 lâminas extras'],
        specifications: { blade: "18mm", retractable: true, extras: "5 blades" },
      },
      {
        name: 'Trena 5m Profissional - Stanley',
        slug: 'trena-profissional-stanley-5m',
        sku: 'TREN-STAN-5M',
        price: 32.90, // Abaixo de R$ 600
        originalPrice: 41.20, // Preço original GMAD
        stock: 40,
        description: 'Trena profissional Stanley 5m com fita de aço. Trava automática e empunhadura ergonômica. Medições precisas em milímetros e polegadas.',
        shortDescription: 'Trena profissional 5m com trava automática',
        images: ['https://www.gmad.com.br/img/produtos/trena-stanley-5m.jpg'],
        brand: 'Stanley',
        categoryId: ferramentasManuais.id,
        isFeatured: false,
        features: ['Comprimento: 5m', 'Trava automática', 'Fita de aço'],
        specifications: { length: "5m", autoLock: true, material: "Steel" },
      },

      // UTENSÍLIOS PARA CASA (4 produtos)
      {
        name: 'Panela de Pressão 5L - Tramontina',
        slug: 'panela-pressao-tramontina-5l',
        sku: 'PAN-PRES-TRAM-5L',
        price: 129.90, // Abaixo de R$ 600
        originalPrice: 168.90, // Preço original GMAD
        stock: 15,
        description: 'Panela de pressão Tramontina 5L em aço inox. Válvula de segurança e cabo ergonômico. Ideal para cozimento rápido e econômico.',
        shortDescription: 'Panela de pressão 5L em aço inox',
        images: ['https://www.gmad.com.br/img/produtos/panela-pressao-tramontina.jpg'],
        brand: 'Tramontina',
        categoryId: utensiliosCasa.id,
        isFeatured: true,
        features: ['Capacidade: 5L', 'Aço inox', 'Válvula de segurança'],
        specifications: { capacity: "5L", material: "Stainless Steel", safety: "Valve" },
      },
      {
        name: 'Jogo de Panelas 5 Peças - Tramontina',
        slug: 'jogo-panelas-tramontina-5p',
        sku: 'JOG-PAN-TRAM-5P',
        price: 299.90, // Abaixo de R$ 600
        originalPrice: 389.50, // Preço original GMAD
        stock: 12,
        description: 'Jogo de panelas Tramontina 5 peças em aço inox. Inclui panela alta, panela baixa, frigideira, caçarola e tampa. Cabos ergonômicos e fundo triplo.',
        shortDescription: 'Jogo de panelas 5 peças em aço inox',
        images: ['https://www.gmad.com.br/img/produtos/jogo-panelas-tramontina.jpg'],
        brand: 'Tramontina',
        categoryId: utensiliosCasa.id,
        isFeatured: false,
        features: ['5 peças', 'Aço inox', 'Fundo triplo'],
        specifications: { pieces: "5", material: "Stainless Steel", bottom: "Triple" },
      },
      {
        name: 'Wok 32cm Antiaderente - Tramontina',
        slug: 'wok-tramontina-32cm',
        sku: 'WOK-TRAM-32CM',
        price: 89.90, // Abaixo de R$ 600
        originalPrice: 115.30, // Preço original GMAD
        stock: 18,
        description: 'Wok Tramontina 32cm com revestimento antiaderente. Ideal para frituras e salteados. Cabo ergonômico e tampa de vidro.',
        shortDescription: 'Wok 32cm antiaderente para frituras',
        images: ['https://www.gmad.com.br/img/produtos/wok-tramontina-32cm.jpg'],
        brand: 'Tramontina',
        categoryId: utensiliosCasa.id,
        isFeatured: false,
        features: ['Diâmetro: 32cm', 'Antiaderente', 'Cabo ergonômico'],
        specifications: { diameter: "32cm", coating: "Non-stick", handle: "Ergonomic" },
      },
      {
        name: 'Jogo de Talheres 6 Peças - Tramontina',
        slug: 'jogo-talheres-tramontina-6p',
        sku: 'JOG-TAL-TRAM-6P',
        price: 159.90, // Abaixo de R$ 600
        originalPrice: 198.75, // Preço original GMAD
        stock: 22,
        description: 'Jogo de talheres Tramontina 6 peças em aço inox 18/10. Inclui garfo, faca e colher. Acabamento polido e design moderno.',
        shortDescription: 'Jogo de talheres 6 peças em aço inox',
        images: ['https://www.gmad.com.br/img/produtos/jogo-talheres-tramontina.jpg'],
        brand: 'Tramontina',
        categoryId: utensiliosCasa.id,
        isFeatured: false,
        features: ['6 peças', 'Aço inox 18/10', 'Acabamento polido'],
        specifications: { pieces: "6", material: "18/10 Stainless Steel", finish: "Polished" },
      }
    ];

    // Criar produtos no banco
    for (const produto of produtosGMAD) {
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

    console.log('✅ Produtos criados com sucesso!');
    console.log(`📊 Total de produtos: ${produtosGMAD.length}`);
    console.log(`🏷️ Produtos em destaque: ${produtosGMAD.filter(p => p.isFeatured).length}`);
    console.log(`💰 Produtos com desconto: ${produtosGMAD.filter(p => p.originalPrice).length}`);

    // Resumo por categoria
    const eletricas = produtosGMAD.filter(p => p.categoryId === ferramentasEletricas.id);
    const manuais = produtosGMAD.filter(p => p.categoryId === ferramentasManuais.id);
    const casa = produtosGMAD.filter(p => p.categoryId === utensiliosCasa.id);

    console.log('\n📈 Resumo por categoria:');
    console.log(`🔌 Ferramentas Elétricas: ${eletricas.length} produtos`);
    console.log(`🔧 Ferramentas Manuais: ${manuais.length} produtos`);
    console.log(`🏠 Utensílios para Casa: ${casa.length} produtos`);

  } catch (error) {
    console.error('❌ Erro ao popular banco de dados:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .then(() => {
    console.log('🎉 População concluída com sucesso!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Erro fatal:', error);
    process.exit(1);
  }); 