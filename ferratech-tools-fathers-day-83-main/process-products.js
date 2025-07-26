import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ler os dados processados
const rawData = JSON.parse(fs.readFileSync('copafer-products.json', 'utf8'));

// Categorias de ferramentas baseadas nos dados
const categories = {
  'ferramentas-eletricas': [
    'Furadeira', 'Parafusadeira', 'Serra', 'Esmerilhadeira', 'Lixadeira', 
    'Martelete', 'Compressor', 'Solda', 'Multímetro', 'Osciloscópio'
  ],
  'ferramentas-manuais': [
    'Chave', 'Alicate', 'Martelo', 'Chave de fenda', 'Chave phillips',
    'Serra', 'Serrote', 'Trena', 'Nível', 'Esquadro'
  ],
  'acessorios': [
    'Disco', 'Broca', 'Mandril', 'Lâmina', 'Ponta', 'Maleta',
    'Bateria', 'Carregador', 'Cabo', 'Adaptador'
  ],
  'epi': [
    'Capacete', 'Óculos', 'Luva', 'Bota', 'Máscara', 'Protetor',
    'Capa', 'Avental', 'Cinto', 'Trava-quedas'
  ],
  'bancadas': [
    'Bancada', 'Mesa', 'Cavalete', 'Suporte', 'Organizador'
  ]
};

// Função para determinar categoria
function getCategory(productName) {
  const name = productName.toLowerCase();
  
  for (const [category, keywords] of Object.entries(categories)) {
    if (keywords.some(keyword => name.includes(keyword.toLowerCase()))) {
      return category;
    }
  }
  
  return 'acessorios'; // categoria padrão
}

// Função para gerar preço baseado no nome
function generatePrice(productName) {
  const name = productName.toLowerCase();
  
  // Preços base por categoria
  if (name.includes('furadeira') || name.includes('parafusadeira')) {
    return Math.floor(Math.random() * 400) + 200; // 200-600
  } else if (name.includes('serra') || name.includes('esmerilhadeira')) {
    return Math.floor(Math.random() * 300) + 150; // 150-450
  } else if (name.includes('chave') || name.includes('alicate')) {
    return Math.floor(Math.random() * 100) + 30; // 30-130
  } else if (name.includes('disco') || name.includes('broca')) {
    return Math.floor(Math.random() * 50) + 10; // 10-60
  } else if (name.includes('capacete') || name.includes('óculos')) {
    return Math.floor(Math.random() * 80) + 20; // 20-100
  } else {
    return Math.floor(Math.random() * 200) + 50; // 50-250
  }
}

// Função para gerar descrição técnica
function generateTechnicalDescription(productName) {
  const name = productName.toLowerCase();
  
  if (name.includes('furadeira')) {
    return `Furadeira profissional com alta potência, ideal para perfuração em madeira, metal e alvenaria. Equipada com sistema de redução de vibração e empunhadura ergonômica.`;
  } else if (name.includes('serra')) {
    return `Serra de alta precisão para cortes em madeira, compensado e MDF. Equipada com sistema de proteção e guia paralela.`;
  } else if (name.includes('chave')) {
    return `Chave profissional fabricada em aço cromo-vanádio com tratamento térmico. Superfície fosfatizada para resistência à corrosão.`;
  } else if (name.includes('disco')) {
    return `Disco de corte especializado com alta durabilidade. Dentes de tungstênio soldados para máxima resistência.`;
  } else if (name.includes('capacete')) {
    return `Capacete de segurança certificado, resistente a impactos. Sistema de ajuste ergonômico e ventilação integrada.`;
  } else {
    return `Produto de qualidade profissional, ideal para uso em obras e manutenções. Fabricado com materiais resistentes e duráveis.`;
  }
}

// Função para gerar especificações
function generateSpecifications(productName) {
  const name = productName.toLowerCase();
  const specs = {};
  
  if (name.includes('furadeira') || name.includes('parafusadeira')) {
    specs.power = `${Math.floor(Math.random() * 500) + 500}W`;
    specs.voltage = '220V';
    specs.weight = `${Math.floor(Math.random() * 2) + 1}.${Math.floor(Math.random() * 9)}kg`;
  } else if (name.includes('serra') || name.includes('esmerilhadeira')) {
    specs.power = `${Math.floor(Math.random() * 800) + 600}W`;
    specs.voltage = '220V';
    specs.weight = `${Math.floor(Math.random() * 3) + 1}.${Math.floor(Math.random() * 9)}kg`;
  } else if (name.includes('chave') || name.includes('alicate')) {
    specs.material = 'Aço cromo-vanádio';
    specs.weight = `${Math.floor(Math.random() * 500) + 100}g`;
  } else if (name.includes('disco') || name.includes('broca')) {
    specs.dimensions = `${Math.floor(Math.random() * 100) + 50}mm`;
    specs.material = 'Tungstênio';
  } else if (name.includes('capacete') || name.includes('óculos')) {
    specs.material = 'ABS resistente';
    specs.weight = `${Math.floor(Math.random() * 300) + 200}g`;
  }
  
  specs.warranty = '12 meses';
  return specs;
}

// Processar produtos
const processedProducts = [];
let id = 1;

rawData.forEach((item, index) => {
  const productName = item.data[0];
  
  if (productName && productName.length > 2) {
    const category = getCategory(productName);
    const price = generatePrice(productName);
    const originalPrice = Math.floor(price * (1 + Math.random() * 0.3 + 0.1)); // 10-40% mais caro
    
    const product = {
      id: id.toString(),
      name: productName,
      description: `${productName} profissional de alta qualidade, ideal para uso em obras e manutenções.`,
      technicalDescription: generateTechnicalDescription(productName),
      price: price,
      originalPrice: originalPrice,
      category: category,
      image: `/src/assets/screwdriver.jpg`, // imagem padrão
      brand: ['MAKITA', 'GEDORE', 'BOSCH', 'DEWALT', 'MILWAUKEE'][Math.floor(Math.random() * 5)],
      sku: `SKU-${id.toString().padStart(4, '0')}`,
      inStock: Math.random() > 0.1, // 90% em estoque
      rating: (Math.random() * 2 + 3).toFixed(1), // 3.0-5.0
      reviews: Math.floor(Math.random() * 200) + 10, // 10-210 reviews
      specifications: generateSpecifications(productName)
    };
    
    processedProducts.push(product);
    id++;
  }
});

// Salvar produtos processados
const outputPath = path.join(__dirname, 'processed-products.json');
fs.writeFileSync(outputPath, JSON.stringify(processedProducts, null, 2));

console.log(`\n✅ Processamento concluído!`);
console.log(`📊 Total de produtos processados: ${processedProducts.length}`);
console.log(`💾 Dados salvos em: ${outputPath}`);

// Estatísticas por categoria
const categoryStats = {};
processedProducts.forEach(product => {
  categoryStats[product.category] = (categoryStats[product.category] || 0) + 1;
});

console.log('\n📈 Estatísticas por categoria:');
Object.entries(categoryStats).forEach(([category, count]) => {
  console.log(`  ${category}: ${count} produtos`);
});

// Mostrar amostra
console.log('\n📋 Amostra dos produtos processados:');
console.log(JSON.stringify(processedProducts.slice(0, 5), null, 2)); 