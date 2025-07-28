'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Star, ShoppingCart, Heart, Truck, Shield, CreditCard } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import Header from './Header';
import Footer from './Footer';

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  images: string[];
  variations?: any;
  stock: number;
  rating: number;
  reviews: number;
  brand?: string;
  description: string;
  shortDescription?: string;
  features?: string[];
  specifications?: any;
}

interface ProductDetailPageProps {
  slug: string;
}

export default function ProductDetailPage({ slug }: ProductDetailPageProps) {
  const router = useRouter();
  const { addToCart } = useCartStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVariations, setSelectedVariations] = useState<any>({});
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    loadProduct();
  }, [slug]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/products/${slug}`);
      
      if (!response.ok) {
        throw new Error('Produto não encontrado');
      }

      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error('Erro ao carregar produto:', error);
      setError('Erro ao carregar produto. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, selectedVariations);
      // Mostrar notificação de sucesso
      alert('Produto adicionado ao carrinho!');
    }
  };

  const handleVariationChange = (key: string, value: string) => {
    setSelectedVariations((prev: any) => ({
      ...prev,
      [key]: value
    }));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="aspect-square bg-gray-200 rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                <div className="h-12 bg-gray-200 rounded w-1/3"></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Produto não encontrado
            </h1>
            <p className="text-gray-600 mb-6">{error || 'O produto solicitado não foi encontrado.'}</p>
            <button
              onClick={() => router.push('/')}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90"
            >
              Voltar ao Início
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Galeria de Imagens */}
          <div className="space-y-4">
            <div className="aspect-square relative overflow-hidden rounded-lg">
              <Image
                src={product.images[selectedImage] || '/placeholder.jpg'}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            
            {/* Miniaturas */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square relative overflow-hidden rounded-lg border-2 ${
                      selectedImage === index ? 'border-primary' : 'border-gray-200'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} - Imagem ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Informações do Produto */}
          <div className="space-y-6">
            {/* Brand */}
            {product.brand && (
              <p className="text-sm text-gray-500">{product.brand}</p>
            )}

            {/* Nome */}
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">
                ({product.reviews} avaliações)
              </span>
            </div>

            {/* Preço */}
            <div className="space-y-2">
              {product.originalPrice ? (
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-primary">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="bg-red-500 text-white px-2 py-1 rounded text-sm">
                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </span>
                </div>
              ) : (
                <span className="text-3xl font-bold text-primary">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>

            {/* Variações */}
            {product.variations && Object.keys(product.variations).length > 0 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Opções</h3>
                {Object.entries(product.variations).map(([key, values]) => (
                  <div key={key}>
                    <label className="text-sm text-gray-600 block mb-2">
                      {key}:
                    </label>
                    <select
                      value={selectedVariations[key] || ''}
                      onChange={(e) => handleVariationChange(key, e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Selecione {key}</option>
                      {Array.isArray(values) && values.map((value: string) => (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            )}

            {/* Quantidade */}
            <div className="space-y-2">
              <label className="text-sm text-gray-600 block">
                Quantidade:
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                >
                  -
                </button>
                <span className="w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                >
                  +
                </button>
              </div>
            </div>

            {/* Botões */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary/90 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart className="h-5 w-5" />
                {product.stock === 0 ? 'Esgotado' : 'Adicionar ao Carrinho'}
              </button>

              <button className="w-full border border-primary text-primary py-3 px-6 rounded-lg hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-2">
                <Heart className="h-5 w-5" />
                Adicionar aos Favoritos
              </button>
            </div>

            {/* Status do Estoque */}
            {product.stock > 0 && product.stock <= 5 && (
              <p className="text-sm text-orange-600">
                ⚠️ Apenas {product.stock} em estoque!
              </p>
            )}

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900">Características</h3>
                <ul className="space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Especificações */}
            {product.specifications && (
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900">Especificações</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-gray-600">{key}:</span>
                      <span className="font-medium">{value as string}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Descrição */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Descrição</h2>
          <div className="prose max-w-none">
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
} 