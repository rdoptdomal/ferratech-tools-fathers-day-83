const puppeteer = require('puppeteer');

async function testNavigation() {
  console.log('🧪 Iniciando testes de navegação...\n');

  const browser = await puppeteer.launch({ 
    headless: false,
    defaultViewport: { width: 1280, height: 720 }
  });

  try {
    const page = await browser.newPage();
    
    // Teste 1: Página Principal
    console.log('📄 Teste 1: Página Principal');
    await page.goto('http://localhost:3000');
    await page.waitForTimeout(2000);
    
    const title = await page.title();
    console.log(`   Título: ${title}`);
    
    // Verificar se há produtos
    const products = await page.$$('.product-card, [class*="product"]');
    console.log(`   Produtos encontrados: ${products.length}`);
    
    // Teste 2: Navegação para Produtos
    console.log('\n📄 Teste 2: Página de Produtos');
    await page.goto('http://localhost:3000/produtos');
    await page.waitForTimeout(2000);
    
    const productsPage = await page.$$('.product-card, [class*="product"]');
    console.log(`   Produtos na página: ${productsPage.length}`);
    
    // Teste 3: Busca
    console.log('\n🔍 Teste 3: Funcionalidade de Busca');
    await page.goto('http://localhost:3000');
    await page.waitForTimeout(1000);
    
    // Tentar encontrar e usar a busca
    const searchInput = await page.$('input[placeholder*="buscar"], input[type="search"]');
    if (searchInput) {
      await searchInput.type('furadeira');
      await page.keyboard.press('Enter');
      await page.waitForTimeout(2000);
      console.log('   Busca executada');
    } else {
      console.log('   Campo de busca não encontrado');
    }
    
    // Teste 4: Carrinho
    console.log('\n🛒 Teste 4: Carrinho');
    await page.goto('http://localhost:3000/carrinho');
    await page.waitForTimeout(2000);
    
    const cartTitle = await page.$eval('h1, h2', el => el.textContent).catch(() => 'Título não encontrado');
    console.log(`   Página do carrinho: ${cartTitle}`);
    
    // Teste 5: Checkout
    console.log('\n💳 Teste 5: Checkout');
    await page.goto('http://localhost:3000/checkout');
    await page.waitForTimeout(2000);
    
    const checkoutTitle = await page.$eval('h1, h2', el => el.textContent).catch(() => 'Título não encontrado');
    console.log(`   Página de checkout: ${checkoutTitle}`);
    
    // Teste 6: Páginas Institucionais
    const institutionalPages = [
      { name: 'Sobre', url: '/sobre' },
      { name: 'Contato', url: '/contato' },
      { name: 'Política de Privacidade', url: '/politica-privacidade' },
      { name: 'Trocas e Devoluções', url: '/trocas-devolucoes' }
    ];
    
    console.log('\n📄 Teste 6: Páginas Institucionais');
    for (const pageInfo of institutionalPages) {
      try {
        await page.goto(`http://localhost:3000${pageInfo.url}`);
        await page.waitForTimeout(1000);
        
        const pageTitle = await page.$eval('h1, h2', el => el.textContent).catch(() => 'Título não encontrado');
        console.log(`   ${pageInfo.name}: ${pageTitle}`);
      } catch (error) {
        console.log(`   ${pageInfo.name}: Erro - ${error.message}`);
      }
    }
    
    console.log('\n✅ Testes de navegação concluídos!');
    
  } catch (error) {
    console.error('❌ Erro durante os testes:', error);
  } finally {
    await browser.close();
  }
}

testNavigation(); 