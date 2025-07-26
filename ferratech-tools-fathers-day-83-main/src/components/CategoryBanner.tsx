import { useState } from "react";
import { ChevronRight, Star, TrendingUp, Zap, Shield, Wrench, Battery, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface CategoryBannerProps {
  title?: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

const CategoryBanner = ({
  title = "CATEGORIAS EM DESTAQUE",
  subtitle = "Ferramentas Profissionais",
  description = "Explore nossa linha completa de ferramentas organizadas por categoria",
  ctaText = "Ver Todas as Categorias",
  onCtaClick
}: CategoryBannerProps) => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const categories = [
    {
      id: "ferramentas-eletricas",
      name: "Ferramentas Elétricas",
      icon: "⚡",
      description: "Furadeiras, esmerilhadeiras, serras e muito mais",
      productCount: "1.247 produtos",
      discount: "Até 40% OFF",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      id: "ferramentas-manuais",
      name: "Ferramentas Manuais",
      icon: "🔨",
      description: "Chaves, alicates, martelos e ferramentas básicas",
      productCount: "892 produtos",
      discount: "Até 35% OFF",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200"
    },
    {
      id: "ferramentas-a-bateria",
      name: "Ferramentas a Bateria",
      icon: "🔋",
      description: "Furadeiras e parafusadeiras sem fio",
      productCount: "456 produtos",
      discount: "Até 50% OFF",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      id: "equipamentos-de-seguranca",
      name: "Equipamentos de Segurança",
      icon: "🛡️",
      description: "Capacetes, óculos, luvas e calçados",
      productCount: "234 produtos",
      discount: "Até 30% OFF",
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200"
    },
    {
      id: "compressores",
      name: "Compressores",
      icon: "💨",
      description: "Compressores de ar portáteis e industriais",
      productCount: "123 produtos",
      discount: "Até 25% OFF",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    },
    {
      id: "acessorios-para-ferramentas",
      name: "Acessórios para Ferramentas",
      icon: "🔧",
      description: "Lâminas, brocas, discos e acessórios",
      productCount: "567 produtos",
      discount: "Até 45% OFF",
      color: "from-yellow-500 to-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="bg-red-600 text-white font-bold px-4 py-2 text-sm mb-4">
            🔥 CATEGORIAS EM DESTAQUE
          </Badge>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          
          <h3 className="text-2xl lg:text-3xl font-semibold text-red-600 mb-4">
            {subtitle}
          </h3>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/products/${category.id}`}
              className={`group relative overflow-hidden rounded-2xl border-2 ${category.borderColor} ${category.bgColor} p-6 transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:border-red-300`}
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon and Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl">{category.icon}</div>
                  <Badge variant="secondary" className="bg-red-600 text-white text-xs font-bold">
                    {category.discount}
                  </Badge>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors duration-300">
                  {category.name}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {category.description}
                </p>

                {/* Product Count */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 font-medium">
                    {category.productCount}
                  </span>
                  
                  <div className="flex items-center gap-1 text-red-600 font-semibold group-hover:gap-2 transition-all duration-300">
                    <span className="text-sm">Explorar</span>
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>

              {/* Hover Effect */}
              {hoveredCategory === category.id && (
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-red-600/5 rounded-2xl" />
              )}
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 text-lg font-bold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
            onClick={onCtaClick}
          >
            {ctaText}
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-12 border-t border-gray-200">
          <div className="text-center">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="h-8 w-8 text-red-600" />
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Frete Grátis</h4>
            <p className="text-sm text-gray-600">Compras acima de R$ 199</p>
          </div>
          
          <div className="text-center">
            <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-yellow-600" />
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Garantia Estendida</h4>
            <p className="text-sm text-gray-600">12 meses em todos os produtos</p>
          </div>
          
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="h-8 w-8 text-green-600" />
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Entrega Rápida</h4>
            <p className="text-sm text-gray-600">Em até 24h para região</p>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="h-8 w-8 text-blue-600" />
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Atendimento Premium</h4>
            <p className="text-sm text-gray-600">Suporte especializado</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryBanner;