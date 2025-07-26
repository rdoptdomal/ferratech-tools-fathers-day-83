-- =====================================================
-- SCHEMA DO BANCO DE DADOS FERRATECH TOOLS
-- =====================================================

-- Tabela de produtos
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  brand VARCHAR NOT NULL,
  category VARCHAR NOT NULL,
  specifications TEXT[],
  in_stock BOOLEAN DEFAULT true,
  rating DECIMAL(3,2) DEFAULT 4.5,
  image VARCHAR,
  detailed_specs JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de pedidos
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  customer_name VARCHAR NOT NULL,
  customer_email VARCHAR NOT NULL,
  customer_phone VARCHAR NOT NULL,
  customer_cpf VARCHAR NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  shipping_address JSONB NOT NULL,
  payment_method VARCHAR NOT NULL,
  payment_status VARCHAR DEFAULT 'pending',
  order_status VARCHAR DEFAULT 'pending',
  blackcat_payment_id VARCHAR,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de itens do pedido
CREATE TABLE IF NOT EXISTS order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id VARCHAR NOT NULL,
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de usuários
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  name VARCHAR NOT NULL,
  role VARCHAR DEFAULT 'customer',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- ÍNDICES PARA PERFORMANCE
-- =====================================================

-- Índices para produtos
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand);
CREATE INDEX IF NOT EXISTS idx_products_in_stock ON products(in_stock);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at);

-- Índices para pedidos
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON orders(payment_status);
CREATE INDEX IF NOT EXISTS idx_orders_order_status ON orders(order_status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);

-- Índices para itens do pedido
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON order_items(product_id);

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Habilitar RLS em todas as tabelas
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Políticas para produtos (leitura pública, escrita apenas para admins)
CREATE POLICY "Products are viewable by everyone" ON products
  FOR SELECT USING (true);

CREATE POLICY "Only admins can insert products" ON products
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

CREATE POLICY "Only admins can update products" ON products
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

CREATE POLICY "Only admins can delete products" ON products
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

-- Políticas para pedidos
CREATE POLICY "Users can view their own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own orders" ON orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own orders" ON orders
  FOR UPDATE USING (auth.uid() = user_id);

-- Políticas para itens do pedido
CREATE POLICY "Users can view their own order items" ON order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert their own order items" ON order_items
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()
    )
  );

-- Políticas para usuários
CREATE POLICY "Users can view their own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- =====================================================
-- FUNÇÕES E TRIGGERS
-- =====================================================

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para atualizar updated_at
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- DADOS INICIAIS (OPCIONAL)
-- =====================================================

-- Inserir alguns produtos de exemplo
INSERT INTO products (name, description, price, original_price, brand, category, specifications, image, detailed_specs) VALUES
(
  'Furadeira de Impacto 650W',
  'Furadeira de impacto profissional com 650W de potência, ideal para trabalhos pesados.',
  189.90,
  249.90,
  'Ferratech Pro',
  'ferramentas-eletricas',
  ARRAY['650W de potência', 'Velocidade variável', 'Mandril de 13mm', 'Inclui maleta'],
  '/src/assets/drill-machine.jpg',
  '{"power": "650W", "voltage": "220V", "speed": "0-3000 RPM", "weight": "2.5kg", "warranty": "12 meses"}'
),
(
  'Esmerilhadeira Angular 900W',
  'Esmerilhadeira angular de alta performance para corte e desbaste.',
  149.90,
  199.90,
  'Ferratech Pro',
  'ferramentas-eletricas',
  ARRAY['900W de potência', 'Disco de 115mm', 'Proteção contra partículas', 'Empunhadura lateral'],
  '/src/assets/angle-grinder.jpg',
  '{"power": "900W", "voltage": "220V", "speed": "11000 RPM", "weight": "1.8kg", "warranty": "12 meses"}'
),
(
  'Serra Circular 1400W',
  'Serra circular profissional para cortes precisos em madeira e outros materiais.',
  299.90,
  399.90,
  'Ferratech Pro',
  'ferramentas-eletricas',
  ARRAY['1400W de potência', 'Disco de 184mm', 'Guia paralela', 'Base em alumínio'],
  '/src/assets/circular-saw.jpg',
  '{"power": "1400W", "voltage": "220V", "speed": "5500 RPM", "weight": "4.2kg", "warranty": "12 meses"}'
);

-- =====================================================
-- COMENTÁRIOS DAS TABELAS
-- =====================================================

COMMENT ON TABLE products IS 'Tabela de produtos da loja Ferratech';
COMMENT ON TABLE orders IS 'Tabela de pedidos dos clientes';
COMMENT ON TABLE order_items IS 'Itens de cada pedido';
COMMENT ON TABLE users IS 'Tabela de usuários do sistema';

-- =====================================================
-- FIM DO SCHEMA
-- ===================================================== 