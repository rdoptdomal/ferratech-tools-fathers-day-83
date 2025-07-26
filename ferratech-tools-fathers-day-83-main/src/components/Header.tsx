import { useState, useEffect } from "react";
import { Search, ShoppingCart, User, Menu, X, Phone, MapPin, HelpCircle, ChevronDown, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import MiniCart from "./MiniCart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);
  const { getCartItemsCount } = useCart();

  // Categorias principais com subcategorias
  const categories = [
    {
      name: "Acessórios para Ferramentas",
      icon: "🔧",
      subcategories: ["Lâminas e Discos", "Brocas e Bits", "Discos de Corte", "Acessórios para Furadeiras"]
    },
    {
      name: "Ferramentas Elétricas",
      icon: "⚡",
      subcategories: [
        "Furadeiras",
        "Esmerilhadeiras",
        "Serras",
        "Lixadeiras",
        "Plaina Elétrica"
      ]
    },
    {
      name: "Ferramentas Manuais",
      icon: "🔨",
      subcategories: [
        "Chaves",
        "Alicates",
        "Martelos",
        "Chaves de Fenda",
        "Serras Manuais"
      ]
    },
    {
      name: "Geradores",
      icon: "⚡",
      subcategories: [
        "Geradores Portáteis",
        "Geradores Industriais",
        "Geradores a Gasolina",
        "Geradores a Diesel"
      ]
    },
    {
      name: "Lavadoras e Aspiradores",
      icon: "🧹",
      subcategories: [
        "Lavadoras de Alta Pressão",
        "Aspiradores Industriais",
        "Aspiradores de Pó",
        "Acessórios para Limpeza"
      ]
    },
    {
      name: "Motores e Acessórios",
      icon: "🔌",
      subcategories: [
        "Motores Elétricos",
        "Motores a Gasolina",
        "Motores a Diesel",
        "Acessórios para Motores"
      ]
    },
    {
      name: "Compressores",
      icon: "💨",
      subcategories: [
        "Compressores Portáteis",
        "Compressores Industriais",
        "Compressores de Ar",
        "Acessórios para Compressores"
      ]
    },
    {
      name: "Equipamentos de Segurança",
      icon: "🛡️",
      subcategories: [
        "Capacetes",
        "Óculos de Proteção",
        "Luvas",
        "Calçados de Segurança",
        "Proteção Auditiva"
      ]
    }
  ];

  useEffect(() => {
    if (searchQuery.length > 2) {
      const suggestions = [
        "Furadeira de Impacto", "Esmerilhadeira Angular", "Serra Circular",
        "Compressor de Ar", "Gerador Portátil", "Lavadora de Alta Pressão",
        "Capacete de Segurança", "Óculos de Proteção", "Luvas de Trabalho"
      ].filter(item =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchSuggestions(suggestions);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="bg-background border-b border-border shadow-soft sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-primary to-primary/90 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4" />
                52 anos de Tradição
              </span>
              <span className="flex items-center gap-1">
                💳 Compra Faturada
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                Encontre uma loja FerraTech
              </span>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                (51) 98145-6622
              </span>
              <span className="flex items-center gap-1">
                <HelpCircle className="h-4 w-4" />
                Central de ajuda
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="relative">
              <div className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-lg font-heading font-bold text-2xl shadow-medium">
                FERRATECH
              </div>
              <div className="absolute -bottom-1 -right-1 bg-secondary text-text-primary text-xs px-2 py-1 rounded-full font-heading font-bold">
                FERRAMENTAS
              </div>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-4 relative">
            <div className="relative">
              <Input
                type="text"
                placeholder="Encontre ferramentas, acessórios e muito mais..."
                className="pr-12 h-12 border-2 focus:border-primary text-lg font-sans"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                onFocus={() => searchQuery.length > 2 && setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              />
              <Button
                size="icon"
                variant="default"
                className="absolute right-1 top-1 h-10 w-10 bg-primary hover:bg-primary/90"
                onClick={handleSearch}
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>

            {/* Search Suggestions */}
            {showSuggestions && searchSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white border border-border rounded-lg shadow-medium z-50 mt-1">
                {searchSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="px-4 py-3 hover:bg-background-secondary cursor-pointer border-b border-border last:border-b-0 font-sans"
                    onClick={() => {
                      setSearchQuery(suggestion);
                      setShowSuggestions(false);
                      window.location.href = `/products?search=${encodeURIComponent(suggestion)}`;
                    }}
                  >
                    <Search className="h-4 w-4 inline mr-2 text-text-secondary" />
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="hidden md:flex font-sans">
                  <User className="h-4 w-4 mr-2" />
                  Minha Conta
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel className="font-heading">Minha Conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => window.location.href = '/auth'} className="font-sans">
                  Entrar / Cadastrar
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => window.location.href = '/meus-pedidos'} className="font-sans">
                  Meus Pedidos
                </DropdownMenuItem>
                <DropdownMenuItem className="font-sans">
                  Favoritos
                </DropdownMenuItem>
                <DropdownMenuItem className="font-sans">
                  Configurações
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" size="icon" className="relative" onClick={() => setIsMiniCartOpen(true)}>
              <ShoppingCart className="h-5 w-5" />
              {getCartItemsCount() > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs font-heading font-bold"
                >
                  {getCartItemsCount()}
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

      {/* Mega Menu Navigation */}
      <nav className={`border-t border-border bg-white ${isMenuOpen ? 'block' : 'hidden md:block'}`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center py-2">
            {/* Todos os Departamentos */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 px-4 py-3 md:py-2 text-sm hover:bg-background-secondary hover:text-primary transition-colors font-sans">
                  <span>🏪</span>
                  Todos os Departamentos
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-96 p-4">
                <div className="grid grid-cols-2 gap-4">
                  {categories.map((category) => (
                    <div key={category.name} className="space-y-2">
                      <h4 className="font-heading font-semibold text-sm flex items-center gap-2">
                        <span>{category.icon}</span>
                        {category.name}
                      </h4>
                      <ul className="space-y-1">
                        {category.subcategories.slice(0, 3).map((sub) => (
                          <li key={sub}>
                            <Link
                              to={`/products/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                              className="text-xs text-text-secondary hover:text-primary block font-sans"
                            >
                              {sub}
                            </Link>
                          </li>
                        ))}
                        {category.subcategories.length > 3 && (
                          <li>
                            <Link
                              to={`/products/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                              className="text-xs text-primary hover:text-primary/80 font-heading font-medium block"
                            >
                              Ver todos...
                            </Link>
                          </li>
                        )}
                      </ul>
                    </div>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Categorias Principais */}
            {categories.slice(0, 6).map((category) => (
              <Link
                key={category.name}
                to={`/products/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="flex items-center gap-2 px-4 py-3 md:py-2 text-sm hover:bg-background-secondary hover:text-primary transition-colors font-sans"
              >
                <span>{category.icon}</span>
                {category.name}
              </Link>
            ))}

            {/* Ofertas */}
            <Link
              to="/ofertas"
              className="flex items-center gap-2 px-4 py-3 md:py-2 text-sm hover:bg-background-secondary hover:text-primary transition-colors font-heading font-bold text-primary"
            >
              <span>🔥</span>
              OFERTAS
            </Link>
          </div>
        </div>
      </nav>

      {/* Mini Cart */}
      <MiniCart isOpen={isMiniCartOpen} onClose={() => setIsMiniCartOpen(false)} />
    </header>
  );
};

export default Header;