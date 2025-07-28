import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Testar conexão com banco primeiro
    await prisma.$connect();
    console.log('✅ Conexão com banco estabelecida');

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured') === 'true';
    const sortBy = searchParams.get('sortBy') || 'createdAt';

    const skip = (page - 1) * limit;

    // Construir filtros
    const where: any = {
      isActive: true
    };
    
    if (category) {
      where.category = {
        slug: category,
        isActive: true
      };
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { brand: { contains: search, mode: 'insensitive' } }
      ];
    }

    if (featured) {
      where.isFeatured = true;
    }

    // Definir ordenação
    let orderBy: any = { createdAt: 'desc' };
    
    if (featured) {
      orderBy = [
        { isFeatured: 'desc' },
        { rating: 'desc' }
      ];
    } else if (sortBy === 'price') {
      orderBy = { price: 'asc' };
    } else if (sortBy === 'price-desc') {
      orderBy = { price: 'desc' };
    } else if (sortBy === 'name') {
      orderBy = { name: 'asc' };
    } else if (sortBy === 'rating') {
      orderBy = { rating: 'desc' };
    }

    console.log('🔍 Buscando produtos com filtros:', { where, skip, take: limit, orderBy });

    // Buscar produtos com paginação
    const [products, totalProducts] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: true
        },
        skip,
        take: limit,
        orderBy
      }),
      prisma.product.count({ where })
    ]);

    console.log(`✅ Encontrados ${products.length} produtos de ${totalProducts} total`);

    // Verificar se produtos têm imagens válidas
    const productsWithValidImages = products.map(product => ({
      ...product,
      images: product.images && product.images.length > 0 
        ? product.images 
        : ['https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop']
    }));

    const totalPages = Math.ceil(totalProducts / limit);

    return NextResponse.json({
      products: productsWithValidImages,
      totalPages,
      currentPage: page,
      totalProducts,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    });

  } catch (error) {
    console.error('❌ Erro ao buscar produtos:', error);
    
    // Tentar buscar produtos básicos sem filtros complexos
    try {
      const basicProducts = await prisma.product.findMany({
        where: { isActive: true },
        include: { category: true },
        take: 20,
        orderBy: { createdAt: 'desc' }
      });

      if (basicProducts.length > 0) {
        console.log(`✅ Recuperados ${basicProducts.length} produtos básicos`);
        return NextResponse.json({
          products: basicProducts,
          totalPages: 1,
          currentPage: 1,
          totalProducts: basicProducts.length,
          hasNextPage: false,
          hasPrevPage: false
        });
      }
    } catch (fallbackError) {
      console.error('❌ Erro no fallback:', fallbackError);
    }
    
    // Último recurso: produtos mockados
    const mockProducts = [
      {
        id: '1',
        name: 'Furadeira de Impacto 650W Profissional',
        slug: 'furadeira-impacto-650w-profissional',
        description: 'Furadeira de impacto profissional com 650W de potência',
        price: 189.90,
        originalPrice: 249.90,
        images: ['https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop'],
        brand: 'Bosch',
        stock: 15,
        rating: 4.8,
        reviews: 127,
        isFeatured: true,
        isActive: true,
        category: {
          id: '1',
          name: 'Ferramentas Elétricas',
          slug: 'ferramentas-eletricas'
        }
      },
      {
        id: '2',
        name: 'Serra Circular 185mm 1800W',
        slug: 'serra-circular-185mm-1800w',
        description: 'Serra circular profissional com 185mm de diâmetro',
        price: 599.90,
        originalPrice: 799.90,
        images: ['https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop'],
        brand: 'Makita',
        stock: 8,
        rating: 4.9,
        reviews: 89,
        isFeatured: true,
        isActive: true,
        category: {
          id: '1',
          name: 'Ferramentas Elétricas',
          slug: 'ferramentas-eletricas'
        }
      }
    ];

    return NextResponse.json({
      products: mockProducts,
      totalPages: 1,
      currentPage: 1,
      totalProducts: mockProducts.length,
      hasNextPage: false,
      hasPrevPage: false
    });
  }
} 