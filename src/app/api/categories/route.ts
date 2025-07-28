import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  isActive: boolean;
  parentId?: string | null;
  children: Category[];
  _count: { products: number };
  createdAt: Date;
  updatedAt: Date;
}

export async function GET(request: NextRequest) {
  try {
    // Tentar buscar categorias do banco
    let categories: any[] = [];
    try {
      categories = await prisma.category.findMany({
        where: {
          isActive: true
        },
        include: {
          children: {
            where: {
              isActive: true
            },
            include: {
              children: {
                where: {
                  isActive: true
                }
              }
            }
          },
          _count: {
            select: {
              products: true
            }
          }
        },
        orderBy: {
          name: 'asc'
        }
      });
    } catch (dbError) {
      console.error('Erro ao conectar com banco de dados:', dbError);
      // Continuar com categorias mockadas
    }

    // Se não há categorias no banco, retornar categorias mockadas
    if (!categories || categories.length === 0) {
      const mockCategories: Category[] = [
        {
          id: '1',
          name: 'Ferramentas Elétricas',
          slug: 'ferramentas-eletricas',
          description: 'Ferramentas elétricas profissionais e domésticas',
          image: 'https://images.unsplash.com/photo-1581147030014-1e8c5c2c5c5c?w=400&h=300&fit=crop',
          isActive: true,
          parentId: null,
          children: [],
          _count: { products: 0 },
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: '2',
          name: 'Ferramentas Manuais',
          slug: 'ferramentas-manuais',
          description: 'Ferramentas manuais de qualidade profissional',
          image: 'https://images.unsplash.com/photo-1581147030014-1e8c5c2c5c5c?w=400&h=300&fit=crop',
          isActive: true,
          parentId: null,
          children: [],
          _count: { products: 0 },
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: '3',
          name: 'Equipamentos de Segurança',
          slug: 'equipamentos-seguranca',
          description: 'EPIs e equipamentos de segurança',
          image: 'https://images.unsplash.com/photo-1581147030014-1e8c5c2c5c5c?w=400&h=300&fit=crop',
          isActive: true,
          parentId: null,
          children: [],
          _count: { products: 0 },
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: '4',
          name: 'Acessórios',
          slug: 'acessorios',
          description: 'Acessórios e consumíveis para ferramentas',
          image: 'https://images.unsplash.com/photo-1581147030014-1e8c5c2c5c5c?w=400&h=300&fit=crop',
          isActive: true,
          parentId: null,
          children: [],
          _count: { products: 0 },
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];

      return NextResponse.json(mockCategories);
    }

    return NextResponse.json(categories);

  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    
    // Em caso de erro, retornar categorias mockadas
    const mockCategories: Category[] = [
      {
        id: '1',
        name: 'Ferramentas Elétricas',
        slug: 'ferramentas-eletricas',
        description: 'Ferramentas elétricas profissionais e domésticas',
        image: 'https://images.unsplash.com/photo-1581147030014-1e8c5c2c5c5c?w=400&h=300&fit=crop',
        isActive: true,
        parentId: null,
        children: [],
        _count: { products: 0 },
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '2',
        name: 'Ferramentas Manuais',
        slug: 'ferramentas-manuais',
        description: 'Ferramentas manuais de qualidade profissional',
        image: 'https://images.unsplash.com/photo-1581147030014-1e8c5c2c5c5c?w=400&h=300&fit=crop',
        isActive: true,
        parentId: null,
        children: [],
        _count: { products: 0 },
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '3',
        name: 'Equipamentos de Segurança',
        slug: 'equipamentos-seguranca',
        description: 'EPIs e equipamentos de segurança',
        image: 'https://images.unsplash.com/photo-1581147030014-1e8c5c2c5c5c?w=400&h=300&fit=crop',
        isActive: true,
        parentId: null,
        children: [],
        _count: { products: 0 },
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '4',
        name: 'Acessórios',
        slug: 'acessorios',
        description: 'Acessórios e consumíveis para ferramentas',
        image: 'https://images.unsplash.com/photo-1581147030014-1e8c5c2c5c5c?w=400&h=300&fit=crop',
        isActive: true,
        parentId: null,
        children: [],
        _count: { products: 0 },
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    return NextResponse.json(mockCategories);
  }
} 