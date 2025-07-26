import XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ler o arquivo Excel
const workbook = XLSX.readFile('copafer.xlsx');

// Obter todas as planilhas
const sheetNames = workbook.SheetNames;
console.log('Planilhas encontradas:', sheetNames);

// Processar cada planilha
const allProducts = [];

sheetNames.forEach(sheetName => {
  const worksheet = workbook.Sheets[sheetName];
  const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  
  console.log(`\nProcessando planilha: ${sheetName}`);
  console.log('Colunas encontradas:', jsonData[0]);
  console.log('Número de linhas:', jsonData.length - 1);
  
  // Processar produtos (pular cabeçalho)
  for (let i = 1; i < jsonData.length; i++) {
    const row = jsonData[i];
    if (row && row.length > 0) {
      const product = {
        sheet: sheetName,
        row: i + 1,
        data: row
      };
      allProducts.push(product);
    }
  }
});

// Salvar dados processados
const outputPath = path.join(__dirname, 'copafer-products.json');
fs.writeFileSync(outputPath, JSON.stringify(allProducts, null, 2));

console.log(`\n✅ Processamento concluído!`);
console.log(`📊 Total de produtos encontrados: ${allProducts.length}`);
console.log(`💾 Dados salvos em: ${outputPath}`);

// Mostrar amostra dos dados
if (allProducts.length > 0) {
  console.log('\n📋 Amostra dos dados:');
  console.log(JSON.stringify(allProducts.slice(0, 3), null, 2));
} 