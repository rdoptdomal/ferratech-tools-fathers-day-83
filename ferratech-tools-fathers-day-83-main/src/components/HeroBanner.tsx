import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, Star, Truck, Shield, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const banners = [
    {
      id: 1,
      title: "FERRAMENTAS PROFISSIONAIS",
      subtitle: "Até 50% OFF + Frete Grátis",
      description: "Linha completa de ferramentas elétricas, manuais e acessórios das melhores marcas",
      image: "/src/assets/hero-banner.jpg",
      ctaText: "Ver Ofertas",
      ctaLink: "/products",
      badge: "🔥 OFERTA ESPECIAL",
      features: ["Frete Grátis", "Garantia Estendida", "Parcelamento"]
    },
    {
      id: 2,
      title: "FERRAMENTAS A BATERIA",
      subtitle: "Tecnologia de Ponta",
      description: "Furadeiras, parafusadeiras e esmerilhadeiras com a melhor autonomia do mercado",
      image: "/src/assets/hero-banner.jpg",
      ctaText: "Explorar",
      ctaLink: "/products/ferramentas-a-bateria",
      badge: "⚡ NOVIDADE",
      features: ["Alta Durabilidade", "Carregamento Rápido", "Design Ergonômico"]
    },
    {
      id: 3,
      title: "EQUIPAMENTOS DE SEGURANÇA",
      subtitle: "Proteção Total",
      description: "Capacetes, óculos, luvas e calçados de segurança para todos os trabalhos",
      image: "/src/assets/hero-banner.jpg",
      ctaText: "Ver Produtos",
      ctaLink: "/products/equipamentos-de-seguranca",
      badge: "🛡️ SEGURANÇA",
      features: ["Certificação INMETRO", "Conforto Superior", "Durabilidade"]
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [banners.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const currentBanner = banners[currentSlide];

  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10"></div>
      </div>

      <div className="relative container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-white space-y-8">
            {/* Badge */}
            <Badge variant="secondary" className="bg-yellow-400 text-black font-bold px-4 py-2 text-sm">
              {currentBanner.badge}
            </Badge>

            {/* Title */}
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              {currentBanner.title}
            </h1>

            {/* Subtitle */}
            <h2 className="text-2xl lg:text-3xl font-semibold text-yellow-400">
              {currentBanner.subtitle}
            </h2>

            {/* Description */}
            <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
              {currentBanner.description}
            </p>

            {/* Features */}
            <div className="flex flex-wrap gap-4">
              {currentBanner.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-gray-300">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 text-lg font-bold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
                onClick={() => navigate(currentBanner.ctaLink)}
              >
                {currentBanner.ctaText}
                <Play className="ml-2 h-5 w-5" />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-bold rounded-lg"
                onClick={() => navigate('/products')}
              >
                Ver Todos os Produtos
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-8 pt-8 border-t border-gray-700">
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-yellow-400" />
                <span className="text-sm">Frete Grátis</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-yellow-400" />
                <span className="text-sm">Garantia</span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-yellow-400" />
                <span className="text-sm">Parcelamento</span>
              </div>
            </div>
          </div>

          {/* Image/Visual */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-red-600/20 to-yellow-500/20 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
              <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl mb-4">🔧</div>
                  <h3 className="text-2xl font-bold text-white mb-2">FerraTech</h3>
                  <p className="text-gray-400">Ferramentas Profissionais</p>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-yellow-400 text-black px-4 py-2 rounded-full font-bold text-sm">
                -50% OFF
              </div>
              <div className="absolute -bottom-4 -left-4 bg-red-600 text-white px-4 py-2 rounded-full font-bold text-sm">
                FRETE GRÁTIS
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-12 gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-yellow-400 scale-125"
                  : "bg-gray-600 hover:bg-gray-500"
              }`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-200"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-200"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </section>
  );
};

export default HeroBanner;