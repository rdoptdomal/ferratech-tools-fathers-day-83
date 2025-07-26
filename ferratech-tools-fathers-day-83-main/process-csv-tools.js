import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Função para ler CSV
function parseCSV(csvContent) {
  const lines = csvContent.split('\n');
  const headers = lines[0].split(',');
  const data = [];
  
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim()) {
      const values = lines[i].split(',');
      const obj = {};
      headers.forEach((header, index) => {
        obj[header.trim()] = values[index] ? values[index].trim() : '';
      });
      data.push(obj);
    }
  }
  
  return data;
}

// Função para gerar especificações baseadas nos dados
function generateSpecifications(row) {
  const specs = {};
  
  if (row.potencia) specs.power = row.potencia;
  if (row.voltagem) specs.voltage = row.voltagem;
  if (row.peso) specs.weight = row.peso;
  if (row.dimensoes) specs.dimensions = row.dimensoes;
  if (row.material) specs.material = row.material;
  if (row.garantia) specs.warranty = row.garantia;
  
  return specs;
}

// Função para gerar imagem de referência baseada na categoria
function getImageByCategory(category, imageName) {
  const imageMap = {
    'ferramentas-eletricas': {
      'drill-machine.jpg': '/src/assets/drill-machine.jpg',
      'circular-saw.jpg': '/src/assets/circular-saw.jpg',
      'angle-grinder.jpg': '/src/assets/angle-grinder.jpg',
      'hammer-drill.jpg': '/src/assets/hammer-drill.jpg',
      'jigsaw.jpg': '/src/assets/jigsaw.jpg',
      'sander.jpg': '/src/assets/screwdriver.jpg',
      'screwdriver.jpg': '/src/assets/screwdriver.jpg',
      'compressor.jpg': '/src/assets/screwdriver.jpg'
    },
    'ferramentas-manuais': {
      'wrench-set.jpg': '/src/assets/screwdriver.jpg',
      'wrench.jpg': '/src/assets/screwdriver.jpg',
      'hammer.jpg': '/src/assets/screwdriver.jpg',
      'pliers.jpg': '/src/assets/screwdriver.jpg',
      'handsaw.jpg': '/src/assets/screwdriver.jpg',
      'tape-measure.jpg': '/src/assets/screwdriver.jpg',
      'level.jpg': '/src/assets/screwdriver.jpg'
    },
    'acessorios': {
      'drill-bits.jpg': '/src/assets/screwdriver.jpg',
      'cutting-disc.jpg': '/src/assets/screwdriver.jpg',
      'chuck.jpg': '/src/assets/screwdriver.jpg',
      'toolbox.jpg': '/src/assets/screwdriver.jpg',
      'charger.jpg': '/src/assets/screwdriver.jpg'
    },
    'epi': {
      'helmet.jpg': '/src/assets/screwdriver.jpg',
      'safety-glasses.jpg': '/src/assets/screwdriver.jpg',
      'safety-gloves.jpg': '/src/assets/screwdriver.jpg',
      'safety-boots.jpg': '/src/assets/screwdriver.jpg',
      'face-mask.jpg': '/src/assets/screwdriver.jpg'
    },
    'bancadas': {
      'workbench.jpg': '/src/assets/screwdriver.jpg',
      'adjustable-table.jpg': '/src/assets/screwdriver.jpg',
      'scaffold.jpg': '/src/assets/screwdriver.jpg'
    }
  };
  
  return imageMap[category]?.[imageName] || '/src/assets/screwdriver.jpg';
}

// Ler o arquivo CSV
const csvPath = path.join(__dirname, 'ferramentas.csv');
const csvContent = fs.readFileSync(csvPath, 'utf-8');

// Processar dados do CSV
const csvData = parseCSV(csvContent);

// Converter para formato de produtos
const processedProducts = csvData.map((row, index) => ({
  id: row.id || (index + 1).toString(),
  name: row.nome,
  description: row.descricao,
  technicalDescription: row.descricao_tecnica,
  price: parseFloat(row.preco) || 0,
  originalPrice: parseFloat(row.preco_original) || 0,
  category: row.categoria,
  image: getImageByCategory(row.categoria, row.imagem),
  brand: row.marca,
  sku: row.sku,
  inStock: Math.random() > 0.1, // 90% em estoque
  rating: (Math.random() * 2 + 3).toFixed(1), // 3.0-5.0
  reviews: Math.floor(Math.random() * 200) + 10, // 10-210 reviews
  specifications: generateSpecifications(row)
}));

// Salvar produtos processados
const outputPath = path.join(__dirname, 'csv-products.json');
fs.writeFileSync(outputPath, JSON.stringify(processedProducts, null, 2));

console.log(`\n✅ Produtos do CSV processados!`);
console.log(`📊 Total de produtos: ${processedProducts.length}`);
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
console.log(JSON.stringify(processedProducts.slice(0, 3), null, 2));

// Gerar arquivo TypeScript para importação
const tsContent = `export interface Product {
  id: string;
  name: string;
  description: string;
  technicalDescription: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  brand: string;
  sku: string;
  inStock: boolean;
  rating: number;
  reviews: number;
  specifications: {
    power?: string;
    voltage?: string;
    weight?: string;
    dimensions?: string;
    material?: string;
    warranty?: string;
  };
}

export const products: Product[] = ${JSON.stringify(processedProducts, null, 2)};

export const categories = [
  {
    id: "ferramentas-eletricas",
    name: "Ferramentas Elétricas",
    description: "Furadeiras, serras, esmerilhadeiras e mais",
    image: "/src/assets/drill-machine.jpg"
  },
  {
    id: "ferramentas-manuais",
    name: "Ferramentas Manuais",
    description: "Chaves, alicates, martelos e ferramentas básicas",
    image: "/src/assets/screwdriver.jpg"
  },
  {
    id: "acessorios",
    name: "Acessórios",
    description: "Discos, brocas, mandris e acessórios",
    image: "/src/assets/angle-grinder.jpg"
  },
  {
    id: "bancadas",
    name: "Bancadas",
    description: "Bancadas de trabalho e organizadores",
    image: "/src/assets/screwdriver.jpg"
  },
  {
    id: "epi",
    name: "EPI",
    description: "Equipamentos de proteção individual",
    image: "/src/assets/screwdriver.jpg"
  }
];

export const getProductsByCategory = (category: string) => {
  return products.filter(product => product.category === category);
};

export const getProductById = (id: string) => {
  return products.find(product => product.id === id);
};

export const searchProducts = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.brand.toLowerCase().includes(lowercaseQuery)
  );
};
`;

const tsPath = path.join(__dirname, 'src/data/products-from-csv.ts');
fs.writeFileSync(tsPath, tsContent);

console.log(`\n📝 Arquivo TypeScript gerado: ${tsPath}`);
console.log(`🎯 Produtos organizados e categorizados com imagens de referência!`); 