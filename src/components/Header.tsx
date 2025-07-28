'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ShoppingCart, 
  User, 
  Menu, 
  X,
  Heart,
  Package,
  Phone,
  Mail,
  ChevronDown
} from 'lucide-react';
import { SearchBar } from './SearchBar';

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  children?: Category[];
  _count?: {
    products: number;
  };
}

interface HeaderProps {
  cartItemsCount?: number;
}

export default function Header({ cartItemsCount = 0 }: HeaderProps) {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  useEffect(() => {
    // Buscar categorias da API
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Erro ao carregar categorias:', error));
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-primary text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>(11) 99999-9999</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>contato@ferratech.shop</span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/sobre" className="hover:text-primary-foreground/80">
                Sobre Nós
              </Link>
              <Link href="/contato" className="hover:text-primary-foreground/80">
                Contato
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Package className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-text-primary">
              FerraTech
            </span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <SearchBar />
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden lg:flex items-center space-x-6">
            {categories.map((category) => (
              <div
                key={category.id}
                className="relative"
                onMouseEnter={() => setHoveredCategory(category.id)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <button className="flex items-center space-x-1 text-text-primary hover:text-primary transition-colors">
                  <span>{category.name}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {/* Mega Menu */}
                {hoveredCategory === category.id && category.children && (
                  <div className="absolute top-full left-0 w-96 bg-white border border-gray-200 rounded-lg shadow-lg p-6 z-50">
                    <div className="grid grid-cols-2 gap-4">
                      {category.children.map((subCategory) => (
                        <Link
                          key={subCategory.id}
                          href={`/categoria/${subCategory.slug}`}
                          className="block p-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <h4 className="font-semibold text-text-primary mb-1">
                            {subCategory.name}
                          </h4>
                          {subCategory._count && (
                            <p className="text-sm text-gray-500">
                              {subCategory._count.products} produtos
                            </p>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Wishlist */}
            <button className="hidden md:flex p-2 text-gray-600 hover:text-primary transition-colors">
              <Heart className="h-5 w-5" />
            </button>

            {/* Cart */}
            <Link href="/carrinho" className="relative p-2 text-gray-600 hover:text-primary transition-colors">
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* User */}
            <Link href="/minha-conta" className="p-2 text-gray-600 hover:text-primary transition-colors">
              <User className="h-5 w-5" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 text-gray-600 hover:text-primary transition-colors"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4">
            {/* Mobile Search */}
            <div className="mb-4">
              <SearchBar />
            </div>

            {/* Mobile Navigation */}
            <nav className="space-y-2">
              {categories.map((category) => (
                <div key={category.id}>
                  <Link
                    href={`/categoria/${category.slug}`}
                    className="block py-2 text-text-primary hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                  {category.children && (
                    <div className="ml-4 space-y-1">
                      {category.children.map((subCategory) => (
                        <Link
                          key={subCategory.id}
                          href={`/categoria/${subCategory.slug}`}
                          className="block py-1 text-sm text-gray-600 hover:text-primary transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {subCategory.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Mobile Actions */}
            <div className="mt-6 pt-4 border-t">
              <div className="flex items-center justify-between">
                <Link
                  href="/minha-conta"
                  className="flex items-center space-x-2 text-text-primary hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-5 w-5" />
                  <span>Minha Conta</span>
                </Link>
                <Link
                  href="/carrinho"
                  className="flex items-center space-x-2 text-text-primary hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Carrinho</span>
                  {cartItemsCount > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemsCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
} 