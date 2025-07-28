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
  console.log('🌱 Iniciando população massiva do catálogo...');

  try {
    // Criar categorias principais e subcategorias
    console.log('📂 Criando estrutura de categorias...');
    
    // FERRAMENTAS ELÉTRICAS
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

    // Subcategorias de Ferramentas Elétricas
    const furadeiras = await prisma.category.upsert({
      where: { slug: 'furadeiras' },
      update: {},
      create: {
        name: 'Furadeiras',
        slug: 'furadeiras',
        description: 'Furadeiras de impacto, parafusadeiras e acessórios',
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

    const lixadeiras = await prisma.category.upsert({
      where: { slug: 'lixadeiras' },
      update: {},
      create: {
        name: 'Lixadeiras',
        slug: 'lixadeiras',
        description: 'Lixadeiras orbitais, vibratórias e de cinta',
        parentId: ferramentasEletricas.id
      }
    });

    // FERRAMENTAS MANUAIS
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

    // Subcategorias de Ferramentas Manuais
    const chaves = await prisma.category.upsert({
      where: { slug: 'chaves' },
      update: {},
      create: {
        name: 'Chaves',
        slug: 'chaves',
        description: 'Chaves combinadas, fixas e estrela',
        parentId: ferramentasManuais.id
      }
    });

    const alicates = await prisma.category.upsert({
      where: { slug: 'alicates' },
      update: {},
      create: {
        name: 'Alicates',
        slug: 'alicates',
        description: 'Alicates universais, bico longo e corte',
        parentId: ferramentasManuais.id
      }
    });

    const martelos = await prisma.category.upsert({
      where: { slug: 'martelos' },
      update: {},
      create: {
        name: 'Martelos',
        slug: 'martelos',
        description: 'Martelos de carpinteiro, bola e unha',
        parentId: ferramentasManuais.id
      }
    });

    // UTENSÍLIOS PARA CASA
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

    // Subcategorias de Utensílios
    const panelas = await prisma.category.upsert({
      where: { slug: 'panelas' },
      update: {},
      create: {
        name: 'Panelas',
        slug: 'panelas',
        description: 'Panelas de pressão, frigideiras e caçarolas',
        parentId: utensiliosCasa.id
      }
    });

    const talheres = await prisma.category.upsert({
      where: { slug: 'talheres' },
      update: {},
      create: {
        name: 'Talheres',
        slug: 'talheres',
        description: 'Jogos de talheres e acessórios',
        parentId: utensiliosCasa.id
      }
    });

    // NOVAS CATEGORIAS
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

    const hidraulica = await prisma.category.upsert({
      where: { slug: 'hidraulica' },
      update: {},
      create: {
        name: 'Hidráulica',
        slug: 'hidraulica',
        description: 'Tubos, conexões e acessórios hidráulicos',
        image: 'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=300&fit=crop'
      }
    });

    const eletrica = await prisma.category.upsert({
      where: { slug: 'eletrica' },
      update: {},
      create: {
        name: 'Elétrica',
        slug: 'eletrica',
        description: 'Fios, cabos, disjuntores e acessórios elétricos',
        image: 'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=300&fit=crop'
      }
    });

    console.log('✅ Categorias criadas com sucesso');

    // Dados de produtos massivos
    const produtosMassivos = [
      // FURADEIRAS (150 produtos)
      ...Array.from({ length: 150 }, (_, i) => {
        const brands = ['Makita', 'DeWalt', 'Bosch', 'Milwaukee', 'Hitachi'];
        const brand = brands[i % brands.length];
        const power = [650, 800, 1000, 1200, 1500][i % 5];
        const originalPrice = 200 + (i * 15) + Math.random() * 300;
        const pricing = calculatePrice(originalPrice);
        
        return {
          name: `Furadeira de Impacto ${power}W ${brand}`,
          slug: `furadeira-impacto-${power}w-${brand.toLowerCase()}-${i}`,
          sku: generateSKU('FUR', brand, i),
          price: pricing.price,
          originalPrice: pricing.originalPrice,
          stock: Math.floor(Math.random() * 50) + 10,
          description: `Furadeira de impacto ${brand} com ${power}W de potência. Ideal para trabalhos profissionais em concreto, alvenaria e madeira. Sistema de vibração reduzida e empunhadura ergonômica.`,
          shortDescription: `Furadeira de impacto ${power}W ${brand} para trabalhos profissionais`,
          images: [`https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop&i=${i}`],
          brand: brand,
          categoryId: furadeiras.id,
          isFeatured: i < 10,
          features: [`Potência: ${power}W`, 'Impacto: 2.6 Joules', 'Velocidade: 0-1500 RPM'],
          specifications: { power: `${power}W`, impact: "2.6J", speed: "0-1500 RPM" },
        };
      }),

      // SERRAS (120 produtos)
      ...Array.from({ length: 120 }, (_, i) => {
        const brands = ['Makita', 'DeWalt', 'Bosch', 'Milwaukee'];
        const brand = brands[i % brands.length];
        const types = ['Circular', 'Tico-Tico', 'Esmerilhadeira', 'Recíproca'];
        const type = types[i % types.length];
        const originalPrice = 300 + (i * 20) + Math.random() * 400;
        const pricing = calculatePrice(originalPrice);
        
        return {
          name: `Serra ${type} ${brand}`,
          slug: `serra-${type.toLowerCase()}-${brand.toLowerCase()}-${i}`,
          sku: generateSKU('SER', brand, i),
          price: pricing.price,
          originalPrice: pricing.originalPrice,
          stock: Math.floor(Math.random() * 40) + 8,
          description: `Serra ${type.toLowerCase()} ${brand} de alta qualidade. Ideal para cortes precisos em diversos materiais. Motor potente e sistema de segurança.`,
          shortDescription: `Serra ${type.toLowerCase()} ${brand} profissional`,
          images: [`https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop&i=${i + 150}`],
          brand: brand,
          categoryId: serras.id,
          isFeatured: i < 8,
          features: ['Motor potente', 'Sistema de segurança', 'Cortes precisos'],
          specifications: { type: type, brand: brand, power: "High" },
        };
      }),

      // LIXADEIRAS (100 produtos)
      ...Array.from({ length: 100 }, (_, i) => {
        const brands = ['Bosch', 'DeWalt', 'Makita', 'Milwaukee'];
        const brand = brands[i % brands.length];
        const types = ['Orbital', 'Vibratória', 'De Cinta', 'Rotativa'];
        const type = types[i % types.length];
        const originalPrice = 150 + (i * 12) + Math.random() * 200;
        const pricing = calculatePrice(originalPrice);
        
        return {
          name: `Lixadeira ${type} ${brand}`,
          slug: `lixadeira-${type.toLowerCase()}-${brand.toLowerCase()}-${i}`,
          sku: generateSKU('LIX', brand, i),
          price: pricing.price,
          originalPrice: pricing.originalPrice,
          stock: Math.floor(Math.random() * 35) + 5,
          description: `Lixadeira ${type.toLowerCase()} ${brand} para acabamentos profissionais. Sistema de aspiração integrado e empunhadura ergonômica.`,
          shortDescription: `Lixadeira ${type.toLowerCase()} ${brand} profissional`,
          images: [`https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop&i=${i + 270}`],
          brand: brand,
          categoryId: lixadeiras.id,
          isFeatured: i < 6,
          features: ['Sistema de aspiração', 'Empunhadura ergonômica', 'Acabamento profissional'],
          specifications: { type: type, brand: brand, aspiration: true },
        };
      }),

      // CHAVES (80 produtos)
      ...Array.from({ length: 80 }, (_, i) => {
        const brands = ['Tramontina', 'Stanley', 'Vonder', 'Irwin'];
        const brand = brands[i % brands.length];
        const types = ['Combinada', 'Fixas', 'Estrela', 'Allen'];
        const type = types[i % types.length];
        const pieces = [6, 8, 10, 12, 15][i % 5];
        const originalPrice = 50 + (i * 8) + Math.random() * 100;
        const pricing = calculatePrice(originalPrice);
        
        return {
          name: `Jogo de Chaves ${type} ${pieces} Peças ${brand}`,
          slug: `jogo-chaves-${type.toLowerCase()}-${pieces}p-${brand.toLowerCase()}-${i}`,
          sku: generateSKU('CHV', brand, i),
          price: pricing.price,
          originalPrice: pricing.originalPrice,
          stock: Math.floor(Math.random() * 60) + 15,
          description: `Jogo de chaves ${type.toLowerCase()} ${brand} com ${pieces} peças. Aço cromo-vanádio de alta resistência. Acabamento cromado e empunhadura ergonômica.`,
          shortDescription: `Jogo de chaves ${type.toLowerCase()} ${pieces} peças ${brand}`,
          images: [`https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop&i=${i + 370}`],
          brand: brand,
          categoryId: chaves.id,
          isFeatured: i < 5,
          features: [`${pieces} peças`, 'Aço cromo-vanádio', 'Acabamento cromado'],
          specifications: { pieces: pieces, type: type, material: "Cromo-vanádio" },
        };
      }),

      // ALICATES (60 produtos)
      ...Array.from({ length: 60 }, (_, i) => {
        const brands = ['Stanley', 'Tramontina', 'Vonder', 'Irwin'];
        const brand = brands[i % brands.length];
        const types = ['Universal', 'Bico Longo', 'Corte', 'Bico Curvo'];
        const type = types[i % types.length];
        const size = [6, 7, 8, 10][i % 4];
        const originalPrice = 30 + (i * 5) + Math.random() * 50;
        const pricing = calculatePrice(originalPrice);
        
        return {
          name: `Alicate ${type} ${size}" ${brand}`,
          slug: `alicate-${type.toLowerCase()}-${size}-${brand.toLowerCase()}-${i}`,
          sku: generateSKU('ALI', brand, i),
          price: pricing.price,
          originalPrice: pricing.originalPrice,
          stock: Math.floor(Math.random() * 45) + 10,
          description: `Alicate ${type.toLowerCase()} ${brand} ${size}" com cabo isolado. Ideal para trabalhos elétricos e mecânicos. Pontas precisas e empunhadura confortável.`,
          shortDescription: `Alicate ${type.toLowerCase()} ${size}" ${brand}`,
          images: [`https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop&i=${i + 450}`],
          brand: brand,
          categoryId: alicates.id,
          isFeatured: i < 4,
          features: [`Tamanho: ${size}"`, 'Cabo isolado', 'Pontas precisas'],
          specifications: { size: `${size}"`, type: type, insulated: true },
        };
      }),

      // MARTELOS (50 produtos)
      ...Array.from({ length: 50 }, (_, i) => {
        const brands = ['Stanley', 'Tramontina', 'Vonder', 'Irwin'];
        const brand = brands[i % brands.length];
        const types = ['Carpinteiro', 'Bola', 'Unha', 'Médio'];
        const type = types[i % types.length];
        const weight = [500, 750, 1000, 1250][i % 4];
        const originalPrice = 25 + (i * 4) + Math.random() * 40;
        const pricing = calculatePrice(originalPrice);
        
        return {
          name: `Martelo ${type} ${weight}g ${brand}`,
          slug: `martelo-${type.toLowerCase()}-${weight}g-${brand.toLowerCase()}-${i}`,
          sku: generateSKU('MAR', brand, i),
          price: pricing.price,
          originalPrice: pricing.originalPrice,
          stock: Math.floor(Math.random() * 50) + 15,
          description: `Martelo ${type.toLowerCase()} ${brand} ${weight}g. Empunhadura ergonômica e cabeça temperada. Ideal para trabalhos de carpintaria e construção.`,
          shortDescription: `Martelo ${type.toLowerCase()} ${weight}g ${brand}`,
          images: [`https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop&i=${i + 510}`],
          brand: brand,
          categoryId: martelos.id,
          isFeatured: i < 3,
          features: [`Peso: ${weight}g`, 'Empunhadura ergonômica', 'Cabeça temperada'],
          specifications: { weight: `${weight}g`, type: type, handle: "Ergonomic" },
        };
      }),

      // PANELAS (80 produtos)
      ...Array.from({ length: 80 }, (_, i) => {
        const brands = ['Tramontina', 'Mor', 'Inox', 'Profissional'];
        const brand = brands[i % brands.length];
        const types = ['Pressão', 'Frigideira', 'Caçarola', 'Panela Alta'];
        const type = types[i % types.length];
        const size = [16, 20, 24, 28, 32][i % 5];
        const originalPrice = 80 + (i * 10) + Math.random() * 150;
        const pricing = calculatePrice(originalPrice);
        
        return {
          name: `Panela ${type} ${size}cm ${brand}`,
          slug: `panela-${type.toLowerCase()}-${size}cm-${brand.toLowerCase()}-${i}`,
          sku: generateSKU('PAN', brand, i),
          price: pricing.price,
          originalPrice: pricing.originalPrice,
          stock: Math.floor(Math.random() * 40) + 10,
          description: `Panela ${type.toLowerCase()} ${brand} ${size}cm em aço inox. Acabamento interno antiaderente e cabo ergonômico. Ideal para cozimento profissional.`,
          shortDescription: `Panela ${type.toLowerCase()} ${size}cm ${brand}`,
          images: [`https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop&i=${i + 560}`],
          brand: brand,
          categoryId: panelas.id,
          isFeatured: i < 6,
          features: [`Diâmetro: ${size}cm`, 'Aço inox', 'Antiaderente'],
          specifications: { diameter: `${size}cm`, type: type, material: "Stainless Steel" },
        };
      }),

      // TALHERES (60 produtos)
      ...Array.from({ length: 60 }, (_, i) => {
        const brands = ['Tramontina', 'Inox', 'Profissional', 'Luxo'];
        const brand = brands[i % brands.length];
        const pieces = [6, 12, 18, 24, 30][i % 5];
        const types = ['Básico', 'Profissional', 'Luxo', 'Infantil'];
        const type = types[i % types.length];
        const originalPrice = 60 + (i * 8) + Math.random() * 120;
        const pricing = calculatePrice(originalPrice);
        
        return {
          name: `Jogo de Talheres ${type} ${pieces} Peças ${brand}`,
          slug: `jogo-talheres-${type.toLowerCase()}-${pieces}p-${brand.toLowerCase()}-${i}`,
          sku: generateSKU('TAL', brand, i),
          price: pricing.price,
          originalPrice: pricing.originalPrice,
          stock: Math.floor(Math.random() * 35) + 8,
          description: `Jogo de talheres ${type.toLowerCase()} ${brand} ${pieces} peças em aço inox 18/10. Acabamento polido e design moderno.`,
          shortDescription: `Jogo de talheres ${type.toLowerCase()} ${pieces} peças ${brand}`,
          images: [`https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop&i=${i + 640}`],
          brand: brand,
          categoryId: talheres.id,
          isFeatured: i < 4,
          features: [`${pieces} peças`, 'Aço inox 18/10', 'Acabamento polido'],
          specifications: { pieces: pieces, type: type, material: "18/10 Stainless Steel" },
        };
      }),

      // ILUMINAÇÃO (50 produtos)
      ...Array.from({ length: 50 }, (_, i) => {
        const brands = ['Philips', 'Osram', 'GE', 'Sylvania'];
        const brand = brands[i % brands.length];
        const types = ['LED', 'Fluorescente', 'Incandescente', 'Halógena'];
        const type = types[i % types.length];
        const power = [9, 12, 15, 18, 20][i % 5];
        const originalPrice = 15 + (i * 3) + Math.random() * 30;
        const pricing = calculatePrice(originalPrice);
        
        return {
          name: `Lâmpada ${type} ${power}W ${brand}`,
          slug: `lampada-${type.toLowerCase()}-${power}w-${brand.toLowerCase()}-${i}`,
          sku: generateSKU('LAM', brand, i),
          price: pricing.price,
          originalPrice: pricing.originalPrice,
          stock: Math.floor(Math.random() * 100) + 25,
          description: `Lâmpada ${type.toLowerCase()} ${brand} ${power}W. Alta eficiência energética e longa durabilidade. Ideal para iluminação residencial e comercial.`,
          shortDescription: `Lâmpada ${type.toLowerCase()} ${power}W ${brand}`,
          images: [`https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop&i=${i + 700}`],
          brand: brand,
          categoryId: iluminacao.id,
          isFeatured: i < 3,
          features: [`Potência: ${power}W`, 'Alta eficiência', 'Longa durabilidade'],
          specifications: { power: `${power}W`, type: type, efficiency: "High" },
        };
      }),

      // HIDRÁULICA (40 produtos)
      ...Array.from({ length: 40 }, (_, i) => {
        const brands = ['Tigre', 'Amanco', 'Coral', 'Jomar'];
        const brand = brands[i % brands.length];
        const types = ['Tubo PVC', 'Conexão', 'Registro', 'Válvula'];
        const type = types[i % types.length];
        const size = [20, 25, 32, 40, 50][i % 5];
        const originalPrice = 8 + (i * 2) + Math.random() * 25;
        const pricing = calculatePrice(originalPrice);
        
        return {
          name: `${type} ${size}mm ${brand}`,
          slug: `${type.toLowerCase()}-${size}mm-${brand.toLowerCase()}-${i}`,
          sku: generateSKU('HID', brand, i),
          price: pricing.price,
          originalPrice: pricing.originalPrice,
          stock: Math.floor(Math.random() * 80) + 20,
          description: `${type} ${brand} ${size}mm. Material de alta qualidade para instalações hidráulicas. Resistente à pressão e corrosão.`,
          shortDescription: `${type} ${size}mm ${brand}`,
          images: [`https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop&i=${i + 750}`],
          brand: brand,
          categoryId: hidraulica.id,
          isFeatured: i < 2,
          features: [`Diâmetro: ${size}mm`, 'Alta resistência', 'Anti-corrosão'],
          specifications: { diameter: `${size}mm`, type: type, material: "PVC" },
        };
      }),

      // ELÉTRICA (50 produtos)
      ...Array.from({ length: 50 }, (_, i) => {
        const brands = ['Prysmian', 'Ficap', 'Cobrecom', 'Cord'];
        const brand = brands[i % brands.length];
        const types = ['Fio 2.5mm', 'Cabo 4mm', 'Disjuntor', 'Tomada'];
        const type = types[i % types.length];
        const originalPrice = 12 + (i * 3) + Math.random() * 35;
        const pricing = calculatePrice(originalPrice);
        
        return {
          name: `${type} ${brand}`,
          slug: `${type.toLowerCase()}-${brand.toLowerCase()}-${i}`,
          sku: generateSKU('ELE', brand, i),
          price: pricing.price,
          originalPrice: pricing.originalPrice,
          stock: Math.floor(Math.random() * 60) + 15,
          description: `${type} ${brand} para instalações elétricas. Material de alta qualidade e segurança. Certificado pelo INMETRO.`,
          shortDescription: `${type} ${brand}`,
          images: [`https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=500&h=500&fit=crop&i=${i + 790}`],
          brand: brand,
          categoryId: eletrica.id,
          isFeatured: i < 3,
          features: ['Alta qualidade', 'Certificado INMETRO', 'Segurança'],
          specifications: { type: type, certified: true, safety: "High" },
        };
      })
    ];

    console.log('🛍️ Criando produtos massivos...');
    
    // Criar produtos no banco
    for (const produto of produtosMassivos) {
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

    console.log('✅ Catálogo massivo criado com sucesso!');
    console.log(`📊 Total de produtos: ${produtosMassivos.length}`);
    console.log(`🏷️ Produtos em destaque: ${produtosMassivos.filter(p => p.isFeatured).length}`);
    console.log(`💰 Produtos com desconto: ${produtosMassivos.filter(p => p.originalPrice).length}`);

    // Resumo por categoria
    const furadeirasCount = produtosMassivos.filter(p => p.categoryId === furadeiras.id).length;
    const serrasCount = produtosMassivos.filter(p => p.categoryId === serras.id).length;
    const lixadeirasCount = produtosMassivos.filter(p => p.categoryId === lixadeiras.id).length;
    const chavesCount = produtosMassivos.filter(p => p.categoryId === chaves.id).length;
    const alicatesCount = produtosMassivos.filter(p => p.categoryId === alicates.id).length;
    const martelosCount = produtosMassivos.filter(p => p.categoryId === martelos.id).length;
    const panelasCount = produtosMassivos.filter(p => p.categoryId === panelas.id).length;
    const talheresCount = produtosMassivos.filter(p => p.categoryId === talheres.id).length;
    const iluminacaoCount = produtosMassivos.filter(p => p.categoryId === iluminacao.id).length;
    const hidraulicaCount = produtosMassivos.filter(p => p.categoryId === hidraulica.id).length;
    const eletricaCount = produtosMassivos.filter(p => p.categoryId === eletrica.id).length;

    console.log('\n📈 Resumo por categoria:');
    console.log(`🔌 Furadeiras: ${furadeirasCount} produtos`);
    console.log(`🪚 Serras: ${serrasCount} produtos`);
    console.log(`🔧 Lixadeiras: ${lixadeirasCount} produtos`);
    console.log(`🔑 Chaves: ${chavesCount} produtos`);
    console.log(`✂️ Alicates: ${alicatesCount} produtos`);
    console.log(`🔨 Martelos: ${martelosCount} produtos`);
    console.log(`🍳 Panelas: ${panelasCount} produtos`);
    console.log(`🍴 Talheres: ${talheresCount} produtos`);
    console.log(`💡 Iluminação: ${iluminacaoCount} produtos`);
    console.log(`🚰 Hidráulica: ${hidraulicaCount} produtos`);
    console.log(`⚡ Elétrica: ${eletricaCount} produtos`);

  } catch (error) {
    console.error('❌ Erro ao popular catálogo massivo:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .then(() => {
    console.log('🎉 Catálogo massivo concluído com sucesso!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Erro fatal:', error);
    process.exit(1);
  }); 