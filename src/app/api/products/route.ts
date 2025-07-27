import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const search = searchParams.get('search');

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

    // Buscar produtos com paginação
    const [products, totalProducts] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: true
        },
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc'
        }
      }),
      prisma.product.count({ where })
    ]);

    const totalPages = Math.ceil(totalProducts / limit);

    return NextResponse.json({
      products,
      totalPages,
      currentPage: page,
      totalProducts,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    });

  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
} 