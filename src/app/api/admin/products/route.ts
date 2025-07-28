import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      description,
      shortDescription,
      price,
      originalPrice,
      stock,
      brand,
      categoryId,
      imageUrls,
      features,
      isFeatured
    } = body;

    // Validar dados obrigatórios
    if (!name || !description || !shortDescription || !price || !brand || !categoryId || !imageUrls || imageUrls.length === 0) {
      return NextResponse.json(
        { error: 'Dados obrigatórios não fornecidos' },
        { status: 400 }
      );
    }

    // Gerar slug único
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');

    // Gerar SKU único
    const timestamp = Date.now();
    const sku = `${brand.substring(0, 3).toUpperCase()}-${timestamp}`;

    // Criar produto
    const product = await prisma.product.create({
      data: {
        name,
        slug,
        sku,
        price,
        originalPrice: originalPrice || null,
        stock,
        description,
        shortDescription,
        images: imageUrls,
        brand,
        categoryId,
        isFeatured: isFeatured || false,
        features: features.filter((f: string) => f.trim() !== ''),
        specifications: {},
        isActive: true
      }
    });

    return NextResponse.json({
      success: true,
      product,
      message: 'Produto cadastrado com sucesso'
    });

  } catch (error) {
    console.error('Erro ao cadastrar produto:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
} 