import { useState } from "react";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface HeaderProps {
  cartItemsCount?: number;
}

const Header = ({ cartItemsCount = 0 }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { label: "Todos os departamentos", href: "/products", icon: "🏪" },
    { label: "Ferramentas Elétricas", href: "/products/ferramentas-eletricas", icon: "⚡" },
    { label: "Material de Construção", href: "/products/construcao", icon: "🏗️" },
    { label: "Material Elétrico", href: "/products/eletrica", icon: "💡" },
    { label: "Ofertas", href: "/ofertas", icon: "🔥" },
    { label: "Sobre a Loja", href: "/sobre", icon: "ℹ️" },
  ];

  return (
    <header className="bg-background border-b border-border shadow-sm sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1">
                🏆 52 anos de Tradição
              </span>
              <span className="flex items-center gap-1">
                💳 Compra Faturada
              </span>
              <span className="flex items-center gap-1">
                🏪 Encontre uma loja Ferratech
              </span>
            </div>
            <div className="hidden md:block">
              <span className="flex items-center gap-1">
                ❓ Central de ajuda
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground px-4 py-2 rounded-lg font-bold text-xl">
              FERRATECH
            </div>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Encontre o que você procura"
                className="pr-12 h-12 border-2 focus:border-primary"
              />
              <Button
                size="icon"
                variant="default"
                className="absolute right-1 top-1 h-10 w-10"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden md:flex" onClick={() => window.location.href = '/auth'}>
              <User className="h-4 w-4 mr-2" />
              Entre ou Cadastre-se
            </Button>

            <Button variant="ghost" size="icon" className="relative" onClick={() => window.location.href = '/cart'}>
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {cartItemsCount}
                </Badge>
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className={`border-t border-border ${isMenuOpen ? 'block' : 'hidden md:block'}`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center py-2">
            {navigationItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="flex items-center gap-2 px-4 py-3 md:py-2 text-sm hover:bg-muted hover:text-primary transition-colors"
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;