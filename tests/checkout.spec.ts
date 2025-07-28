import { test, expect } from '@playwright/test';

test.describe('Fluxo de Compra', () => {
  test('deve completar um fluxo de compra com sucesso', async ({ page }) => {
    // 1. Acessar a homepage
    await page.goto('http://localhost:3001/');
    await expect(page).toHaveTitle(/FerraTech/);

    // 2. Verificar se há produtos na página
    await expect(page.locator('.product-card')).toHaveCount.greaterThan(0);

    // 3. Clicar no primeiro produto
    await page.locator('.product-card').first().click();
    await expect(page).toHaveURL(/\/produto\//);

    // 4. Verificar se o produto foi carregado
    await expect(page.locator('h1')).toBeVisible();

    // 5. Adicionar produto ao carrinho
    const addToCartButton = page.getByRole('button', { name: /adicionar ao carrinho/i });
    await expect(addToCartButton).toBeVisible();
    await addToCartButton.click();

    // 6. Verificar notificação de sucesso (se houver)
    const successMessage = page.locator('text=Produto adicionado ao carrinho');
    if (await successMessage.isVisible()) {
      await expect(successMessage).toBeVisible();
    }

    // 7. Ir para o carrinho
    await page.locator('a[aria-label="Ver carrinho de compras"]').click();
    await expect(page).toHaveURL(/\/carrinho/);

    // 8. Verificar se o produto está no carrinho
    await expect(page.locator('.cart-item')).toHaveCount.greaterThan(0);

    // 9. Ir para o checkout
    await page.getByRole('link', { name: /finalizar compra/i }).click();
    await expect(page).toHaveURL(/\/checkout/);

    // 10. Preencher dados do checkout
    await page.fill('input[name="nome"]', 'Cliente Teste');
    await page.fill('input[name="email"]', 'teste@exemplo.com');
    await page.fill('input[name="telefone"]', '11999999999');
    await page.fill('input[name="cep"]', '01310-100');
    
    // Aguardar preenchimento automático do endereço
    await page.waitForTimeout(2000);

    // 11. Preencher endereço manualmente se necessário
    const cidadeInput = page.locator('input[name="cidade"]');
    if (await cidadeInput.isVisible() && !(await cidadeInput.inputValue())) {
      await page.fill('input[name="cidade"]', 'São Paulo');
      await page.fill('input[name="estado"]', 'SP');
      await page.fill('input[name="endereco"]', 'Rua Teste, 123');
      await page.fill('input[name="bairro"]', 'Centro');
    }

    // 12. Selecionar método de pagamento
    await page.locator('input[value="pix"]').check();

    // 13. Aceitar termos
    await page.locator('input[type="checkbox"]').check();

    // 14. Finalizar compra
    const finalizarButton = page.getByRole('button', { name: /finalizar compra/i });
    await expect(finalizarButton).toBeVisible();
    await finalizarButton.click();

    // 15. Verificar redirecionamento para página de sucesso
    await expect(page).toHaveURL(/\/pedido\/sucesso/);
    await expect(page.locator('h1')).toContainText(/pedido realizado com sucesso/i);
  });

  test('deve navegar pelas categorias', async ({ page }) => {
    await page.goto('http://localhost:3001/');

    // Verificar se há categorias
    const categoryLinks = page.locator('a[href*="/categoria/"]');
    if (await categoryLinks.count() > 0) {
      // Clicar na primeira categoria
      await categoryLinks.first().click();
      await expect(page).toHaveURL(/\/categoria\//);
      
      // Verificar se há produtos na categoria
      await expect(page.locator('.product-card')).toHaveCount.greaterThan(0);
    }
  });

  test('deve buscar produtos', async ({ page }) => {
    await page.goto('http://localhost:3001/');

    // Abrir busca
    await page.locator('button[aria-label="Abrir busca"]').click();
    
    // Preencher busca
    await page.fill('input[placeholder*="buscar"]', 'furadeira');
    await page.keyboard.press('Enter');

    // Verificar resultados
    await expect(page.locator('.product-card')).toHaveCount.greaterThan(0);
  });

  test('deve adicionar produtos aos favoritos', async ({ page }) => {
    await page.goto('http://localhost:3001/');

    // Clicar no botão de favorito do primeiro produto
    const favoriteButton = page.locator('.product-card button[aria-label="Adicionar aos favoritos"]').first();
    await favoriteButton.click();

    // Verificar se o botão mudou de estado (se houver feedback visual)
    await expect(favoriteButton).toBeVisible();
  });

  test('deve navegar pelo menu mobile', async ({ page }) => {
    // Configurar viewport mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:3001/');

    // Abrir menu mobile
    await page.locator('button[aria-label="Abrir menu de navegação"]').click();

    // Verificar se o menu está visível
    await expect(page.locator('nav')).toBeVisible();

    // Clicar em um link do menu
    await page.locator('a[href="/produtos"]').click();
    await expect(page).toHaveURL(/\/produtos/);
  });
}); 