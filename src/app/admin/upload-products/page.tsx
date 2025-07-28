'use client';

import React, { useState, useEffect } from 'react';

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface ProductUpload {
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  stock: number;
  brand: string;
  categoryId: string;
  imageUrls: string[];
  features: string[];
  isFeatured: boolean;
}

export default function UploadProductsPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [productData, setProductData] = useState<ProductUpload>({
    name: '',
    description: '',
    shortDescription: '',
    price: 0,
    originalPrice: 0,
    stock: 0,
    brand: '',
    categoryId: '',
    imageUrls: [''],
    features: [''],
    isFeatured: false
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setProductData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUrlChange = (index: number, value: string) => {
    const newImageUrls = [...productData.imageUrls];
    newImageUrls[index] = value;
    setProductData(prev => ({ ...prev, imageUrls: newImageUrls }));
  };

  const addImageUrl = () => {
    setProductData(prev => ({ 
      ...prev, 
      imageUrls: [...prev.imageUrls, ''] 
    }));
  };

  const removeImageUrl = (index: number) => {
    const newImageUrls = productData.imageUrls.filter((_, i) => i !== index);
    setProductData(prev => ({ ...prev, imageUrls: newImageUrls }));
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...productData.features];
    newFeatures[index] = value;
    setProductData(prev => ({ ...prev, features: newFeatures }));
  };

  const addFeature = () => {
    setProductData(prev => ({ 
      ...prev, 
      features: [...prev.features, ''] 
    }));
  };

  const removeFeature = (index: number) => {
    const newFeatures = productData.features.filter((_, i) => i !== index);
    setProductData(prev => ({ ...prev, features: newFeatures }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      // Validar dados
      if (!productData.name || !productData.description || !productData.categoryId) {
        throw new Error('Preencha todos os campos obrigatórios');
      }

      // Filtrar URLs de imagem vazias
      const validImageUrls = productData.imageUrls.filter(url => url.trim() !== '');
      const validFeatures = productData.features.filter(feature => feature.trim() !== '');

      const productToUpload = {
        ...productData,
        imageUrls: validImageUrls,
        features: validFeatures,
        originalPrice: productData.originalPrice || undefined
      };

      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productToUpload)
      });

      if (response.ok) {
        setSuccess('Produto cadastrado com sucesso!');
        // Limpar formulário
        setProductData({
          name: '',
          description: '',
          shortDescription: '',
          price: 0,
          originalPrice: 0,
          stock: 0,
          brand: '',
          categoryId: '',
          imageUrls: [''],
          features: [''],
          isFeatured: false
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao cadastrar produto');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Cadastrar Novo Produto
          </h1>

          {success && (
            <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg">
              {success}
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-100 text-red-800 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Informações Básicas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome do Produto *
                </label>
                <input
                  type="text"
                  value={productData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Marca *
                </label>
                <input
                  type="text"
                  value={productData.brand}
                  onChange={(e) => handleInputChange('brand', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categoria *
                </label>
                <select
                  value={productData.categoryId}
                  onChange={(e) => handleInputChange('categoryId', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Selecione uma categoria</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Produto em Destaque
                </label>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={productData.isFeatured}
                    onChange={(e) => handleInputChange('isFeatured', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    Marcar como produto em destaque
                  </label>
                </div>
              </div>
            </div>

            {/* Preços e Estoque */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preço de Venda (R$) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={productData.price}
                  onChange={(e) => handleInputChange('price', parseFloat(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preço Original (R$)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={productData.originalPrice}
                  onChange={(e) => handleInputChange('originalPrice', parseFloat(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Deixe vazio se não há desconto"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estoque *
                </label>
                <input
                  type="number"
                  value={productData.stock}
                  onChange={(e) => handleInputChange('stock', parseInt(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Descrições */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição Curta *
              </label>
              <input
                type="text"
                value={productData.shortDescription}
                onChange={(e) => handleInputChange('shortDescription', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Descrição breve do produto"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição Completa *
              </label>
              <textarea
                value={productData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Descrição detalhada do produto, características, benefícios..."
                required
              />
            </div>

            {/* URLs das Imagens */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URLs das Imagens *
              </label>
              <div className="space-y-3">
                {productData.imageUrls.map((url, index) => (
                  <div key={index} className="flex space-x-2">
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => handleImageUrlChange(index, e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://exemplo.com/imagem.jpg"
                      required={index === 0}
                    />
                    {productData.imageUrls.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeImageUrl(index)}
                        className="px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Remover
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addImageUrl}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  + Adicionar Imagem
                </button>
              </div>
            </div>

            {/* Características */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Características
              </label>
              <div className="space-y-3">
                {productData.features.map((feature, index) => (
                  <div key={index} className="flex space-x-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Ex: Potência: 650W"
                    />
                    {productData.features.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Remover
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addFeature}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  + Adicionar Característica
                </button>
              </div>
            </div>

            {/* Botão de Envio */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Cadastrando...' : 'Cadastrar Produto'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 