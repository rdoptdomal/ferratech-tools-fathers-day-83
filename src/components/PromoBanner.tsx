import { Button } from "@/components/ui/button";

interface PromoBannerProps {
  title: string;
  subtitle?: string;
  ctaText: string;
  ctaAction?: () => void;
  backgroundColor?: string;
  textColor?: string;
  icon?: string;
}

const PromoBanner = ({
  title,
  subtitle,
  ctaText,
  ctaAction,
  backgroundColor = "bg-secondary",
  textColor = "text-secondary-foreground",
  icon = "🔥",
}: PromoBannerProps) => {
  return (
    <div className={`${backgroundColor} ${textColor} py-4 text-center relative overflow-hidden`}>
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 transform rotate-45 translate-x-[-50%] translate-y-[-50%]">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="w-16 h-16 border border-current m-8 animate-float"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <span className="text-2xl animate-bounce">{icon}</span>
          <span className="font-bold text-lg md:text-xl">{title}</span>
          {subtitle && (
            <span className="hidden md:inline text-sm opacity-90">{subtitle}</span>
          )}
          {ctaAction && (
            <Button
              variant="outline"
              size="sm"
              onClick={ctaAction}
              className="ml-4 border-current text-current hover:bg-current hover:text-secondary"
            >
              {ctaText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;