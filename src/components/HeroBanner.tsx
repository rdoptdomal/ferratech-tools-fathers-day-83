import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBanner from "@/assets/hero-banner.jpg";

interface BannerSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaAction?: () => void;
  backgroundImage?: string;
  textColor?: string;
}

const defaultSlides: BannerSlide[] = [
  {
    id: "1",
    title: "ESPECIAL DIA DOS PAIS",
    subtitle: "ATÉ 50% OFF",
    description: "Ferramentas profissionais com qualidade superior. O presente perfeito para quem trabalha com as mãos!",
    ctaText: "Ver Ofertas",
    backgroundImage: heroBanner,
  },
  {
    id: "2",
    title: "FEIRÃO DA ELÉTRICA",
    subtitle: "COM ATÉ 30% OFF",
    description: "Tomadas, interruptores e materiais elétricos com os melhores preços do mercado!",
    ctaText: "Eu Quero",
  },
  {
    id: "3",
    title: "BOSCH TOOLS",
    subtitle: "QUALIDADE ALEMÃ",
    description: "Linha completa de ferramentas Bosch com tecnologia de ponta e durabilidade incomparável.",
    ctaText: "Explorar",
  },
];

interface HeroBannerProps {
  slides?: BannerSlide[];
  autoPlay?: boolean;
  interval?: number;
}

const HeroBanner = ({ 
  slides = defaultSlides, 
  autoPlay = true, 
  interval = 5000 
}: HeroBannerProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <section className="relative h-[400px] md:h-[500px] overflow-hidden bg-gradient-to-r from-primary to-primary-glow">
      {/* Background Image */}
      {currentSlideData.backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
          style={{
            backgroundImage: `url(${currentSlideData.backgroundImage})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary-glow/80"></div>
        </div>
      )}

      {/* Content */}
      <div className="container mx-auto px-4 h-full flex items-center relative z-10">
        <div className="max-w-2xl text-primary-foreground">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
            {currentSlideData.title}
          </h1>
          <h2 className="text-2xl md:text-4xl font-bold mb-4 text-secondary animate-fade-in">
            {currentSlideData.subtitle}
          </h2>
          <p className="text-lg md:text-xl mb-8 max-w-lg animate-fade-in">
            {currentSlideData.description}
          </p>
          <Button
            variant="cta"
            size="xl"
            className="animate-fade-in animate-pulse-glow"
            onClick={currentSlideData.ctaAction || (() => navigate('/products'))}
          >
            {currentSlideData.ctaText}
          </Button>
        </div>
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/20 hover:bg-background/40 text-primary-foreground"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/20 hover:bg-background/40 text-primary-foreground"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-secondary"
                : "bg-primary-foreground/50 hover:bg-primary-foreground/70"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroBanner;