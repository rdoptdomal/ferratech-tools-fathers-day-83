import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query || query.length < 2) {
      return NextResponse.json({ products: [] });
    }

    // Busca case-insensitive em nome, descrição, marca e SKU
    const products = await prisma.product.findMany({
      where: {
        isActive: true,
        OR: [
          {
            name: {
              contains: query,
              mode: 'insensitive'
            }
          },
          {
            description: {
              contains: query,
              mode: 'insensitive'
            }
          },
          {
            shortDescription: {
              contains: query,
              mode: 'insensitive'
            }
          },
          {
            brand: {
              contains: query,
              mode: 'insensitive'
            }
          },
          {
            sku: {
              contains: query,
              mode: 'insensitive'
            }
          }
        ]
      },
      include: {
        category: true
      },
      take: 10,
      orderBy: [
        {
          isFeatured: 'desc'
        },
        {
          rating: 'desc'
        }
      ]
    });

    // Formatar resultados
    const formattedProducts = products.map(product => ({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      originalPrice: product.originalPrice,
      images: product.images,
      brand: product.brand,
      shortDescription: product.shortDescription,
      category: product.category.name
    }));

    return NextResponse.json({
      products: formattedProducts,
      total: formattedProducts.length
    });

  } catch (error) {
    console.error('Erro na busca:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
} 