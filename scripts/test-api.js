const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const BASE_URL = 'http://localhost:3000';

async function testAPI() {
  console.log('🧪 Iniciando testes da API...\n');

  const tests = [
    {
      name: 'API Produtos - Página Principal',
      url: `${BASE_URL}/api/products?featured=true&limit=8`,
      expected: 'products array'
    },
    {
      name: 'API Produtos - Todos',
      url: `${BASE_URL}/api/products?limit=12`,
      expected: 'products array'
    },
    {
      name: 'API Categorias',
      url: `${BASE_URL}/api/categories`,
      expected: 'categories array'
    },
    {
      name: 'API Busca - Furadeira',
      url: `${BASE_URL}/api/products?search=furadeira&limit=6`,
      expected: 'products array'
    },
    {
      name: 'API Produtos por Categoria',
      url: `${BASE_URL}/api/products?category=ferramentas-eletricas&limit=12`,
      expected: 'products array'
    }
  ];

  for (const test of tests) {
    try {
      console.log(`📡 Testando: ${test.name}`);
      const response = await fetch(test.url);
      
      if (!response.ok) {
        console.log(`❌ Erro HTTP: ${response.status} ${response.statusText}`);
        continue;
      }

      const data = await response.json();
      
      if (data.products && data.products.length > 0) {
        console.log(`✅ Sucesso: ${data.products.length} produtos encontrados`);
        console.log(`   Primeiro produto: ${data.products[0].name}`);
        console.log(`   Preço: R$ ${data.products[0].price}`);
        console.log(`   Imagens: ${data.products[0].images?.length || 0} imagens`);
      } else if (data.categories && data.categories.length > 0) {
        console.log(`✅ Sucesso: ${data.categories.length} categorias encontradas`);
        console.log(`   Primeira categoria: ${data.categories[0].name}`);
      } else {
        console.log(`⚠️  Aviso: Dados vazios ou formato inesperado`);
      }
    } catch (error) {
      console.log(`❌ Erro: ${error.message}`);
    }
    console.log('');
  }
}

testAPI(); 