import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

// Caminho do CSV
const csvPath = path.join(__dirname, 'rpferramentas.csv');
const csvContent = fs.readFileSync(csvPath, 'utf-8');

// Parse do CSV (suporta campos com vírgula e aspas)
const records = parse(csvContent, { columns: true, skip_empty_lines: true });

// Lista de colunas que representam produtos em cada linha
const productColumns = [
  { name: 'product-name', price: 'current-price', image: 'swiper-lazy src', link: 'space-image href' },
  { name: 'product-name 2', price: 'current-price 2', image: 'swiper-lazy src 2', link: 'space-image href 2' },
  { name: 'product-name 3', price: 'current-price 3', image: 'swiper-lazy src 3', link: 'space-image href 3' },
  { name: 'product-name 4', price: 'current-price 4', image: 'swiper-lazy src 4', link: 'space-image href 4' },
  { name: 'product-name 5', price: 'current-price 5', image: 'swiper-lazy src 5', link: 'space-image href 5' },
  { name: 'product-name 6', price: 'current-price 6', image: 'swiper-lazy src 6', link: 'space-image href 6' },
  { name: 'product-name 7', price: 'current-price 7', image: 'swiper-lazy src 7', link: 'space-image href 7' },
  { name: 'product-name 8', price: 'current-price 8', image: 'swiper-lazy src 8', link: 'space-image href 8' },
  { name: 'product-name 9', price: 'current-price 9', image: 'swiper-lazy src 9', link: 'space-image href 9' },
  { name: 'product-name 10', price: 'current-price 10', image: 'swiper-lazy src 10', link: 'space-image href 10' },
  { name: 'product-name 11', price: 'current-price 11', image: 'swiper-lazy src 11', link: 'space-image href 11' },
  { name: 'product-name 12', price: 'current-price 12', image: 'swiper-lazy src 12', link: 'space-image href 12' }
];

let products = [];
let id = 1;
let totalLines = 0;
let totalProducts = 0;

for (const row of records) {
  totalLines++;
  let productsInLine = 0;
  for (const col of productColumns) {
    const name = row[col.name]?.trim();
    if (name && name.length > 2) {
      products.push({
        id: id.toString(),
        name,
        price: row[col.price]?.replace('R$', '').replace(',', '.').trim() || '',
        image: row[col.image]?.trim() || '',
        link: row[col.link]?.trim() || '',
        // Campos extras
        category: row['title-section'] || '',
        tag: row['tag'] || '',
        destaque: row['tag 2'] || '',
        oldPrice: row['old-price'] || '',
        // Adicione outros campos relevantes conforme necessário
      });
      id++;
      productsInLine++;
    }
  }
  if (productsInLine > 0) {
    totalProducts += productsInLine;
    console.log(`Linha ${totalLines}: ${productsInLine} produtos extraídos.`);
  }
}

// Salvar JSON
const outputPath = path.join(__dirname, 'rpferramentas-products.json');
fs.writeFileSync(outputPath, JSON.stringify(products, null, 2));

console.log(`\n✅ Total de linhas lidas: ${totalLines}`);
console.log(`✅ Total de produtos extraídos: ${products.length}`);
console.log(`💾 Salvo em: ${outputPath}`);
console.log('Exemplo:', products.slice(0, 3)); 