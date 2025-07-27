import { Button } from "@/components/ui/button";

interface CategoryBannerProps {
  title: string;
  subtitle: string;
  description: string;
  backgroundImage?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

const CategoryBanner = ({
  title,
  subtitle,
  description,
  backgroundImage,
  ctaText = "Ver Ofertas",
  onCtaClick,
}: CategoryBannerProps) => {
  return (
    <section
      className="relative bg-gradient-to-r from-primary/90 to-primary-glow/90 text-primary-foreground py-16 md:py-24 overflow-hidden"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "overlay",
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-10 w-16 h-16 border border-primary-foreground/20 rotate-45 animate-float"></div>
        <div className="absolute top-1/2 right-20 w-12 h-12 border border-primary-foreground/20 rotate-12 animate-float" style={{ animationDelay: "1s" }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-8 h-8 border border-primary-foreground/20 rotate-45 animate-float" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
            {title}
          </h1>
          <p className="text-xl md:text-2xl mb-6 opacity-90 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            {subtitle}
          </p>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-80 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            {description}
          </p>
          {onCtaClick && (
            <Button
              variant="secondary"
              size="xl"
              onClick={onCtaClick}
              className="animate-fade-in"
              style={{ animationDelay: "0.6s" }}
            >
              {ctaText}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default CategoryBanner;