'use client';

import { useState, useEffect } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';

interface SearchResult {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  images: string[];
  brand?: string;
  shortDescription?: string;
}

interface SearchBarProps {
  onClose?: () => void;
}

export default function SearchBar({ onClose }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const searchProducts = async () => {
      if (query.length < 2) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(`/api/products?search=${encodeURIComponent(query)}&limit=6`);
        if (response.ok) {
          const data = await response.json();
          setResults(data.products || []);
        }
      } catch (error) {
        console.error('Erro na busca:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounce = setTimeout(searchProducts, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/produtos?search=${encodeURIComponent(query)}`;
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setQuery('');
    setResults([]);
    onClose?.();
  };

  return (
    <div className="relative w-full max-w-md">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Buscar produtos..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            className="pl-10 pr-10"
          />
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
              onClick={() => {
                setQuery('');
                setResults([]);
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </form>

      {/* Dropdown de resultados */}
      {isOpen && (query.length >= 2 || isLoading) && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center">
              <Loader2 className="h-6 w-6 animate-spin mx-auto text-gray-400" />
              <p className="text-sm text-gray-500 mt-2">Buscando...</p>
            </div>
          ) : results.length > 0 ? (
            <div className="p-2">
              {results.slice(0, 6).map((product) => (
                <Link
                  key={product.id}
                  href={`/produto/${product.slug}`}
                  onClick={handleClose}
                  className="block"
                >
                  <Card className="mb-2 hover:bg-gray-50 transition-colors cursor-pointer">
                    <CardContent className="p-3">
                      <div className="flex items-center space-x-3">
                        <div className="relative w-12 h-12 flex-shrink-0">
                          <Image
                            src={product.images[0] || '/placeholder.svg'}
                            alt={product.name}
                            fill
                            className="object-cover rounded"
                            sizes="48px"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 truncate">
                            {product.name}
                          </h4>
                          {product.brand && (
                            <p className="text-xs text-gray-500">{product.brand}</p>
                          )}
                          <div className="flex items-center mt-1">
                            <span className="text-sm font-semibold text-green-600">
                              R$ {product.price.toFixed(2).replace('.', ',')}
                            </span>
                            {product.originalPrice && product.originalPrice > product.price && (
                              <span className="text-xs text-gray-400 line-through ml-2">
                                R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
              {results.length > 6 && (
                <div className="p-3 text-center border-t">
                  <Link
                    href={`/produtos?search=${encodeURIComponent(query)}`}
                    onClick={handleClose}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Ver todos os {results.length} resultados
                  </Link>
                </div>
              )}
            </div>
          ) : query.length >= 2 ? (
            <div className="p-4 text-center">
              <p className="text-sm text-gray-500">Nenhum produto encontrado</p>
              <p className="text-xs text-gray-400 mt-1">Tente outros termos</p>
            </div>
          ) : null}
        </div>
      )}

      {/* Overlay para fechar o dropdown */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={handleClose}
        />
      )}
    </div>
  );
} 