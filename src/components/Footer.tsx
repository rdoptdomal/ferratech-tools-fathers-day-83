'use client';

import Link from 'next/link';
import { 
  Facebook, 
  Instagram, 
  Youtube, 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle,
  Wrench,
  Shield,
  Truck,
  CreditCard,
  Trophy,
  Package
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-100">
      {/* Newsletter Section */}
      <div className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2">
              <Mail className="h-6 w-6" />
              Receba nossas ofertas exclusivas
            </h3>
            <p className="mb-6">
              Cadastre-se e seja o primeiro a saber das promoções e novidades!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Digite seu e-mail"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900"
              />
              <button className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Cadastrar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-gradient-to-r from-primary to-primary/90 text-white px-3 py-2 rounded font-bold text-lg">
                FERRATECH
              </div>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Há mais de 50 anos fornecendo ferramentas e materiais de construção 
              com qualidade superior e atendimento especializado.
            </p>
            <div className="flex space-x-3">
              <button className="p-2 text-gray-400 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white flex items-center gap-2">
              <Wrench className="h-5 w-5" />
              Categorias
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/categoria/ferramentas-eletricas" className="text-gray-300 hover:text-primary transition-colors">
                  Ferramentas Elétricas
                </Link>
              </li>
              <li>
                <Link href="/categoria/motores-e-acessorios" className="text-gray-300 hover:text-primary transition-colors">
                  Motores e Acessórios
                </Link>
              </li>
              <li>
                <Link href="/categoria/lavadoras-e-aspiradores" className="text-gray-300 hover:text-primary transition-colors">
                  Lavadoras e Aspiradores
                </Link>
              </li>
              <li>
                <Link href="/categoria/compressores" className="text-gray-300 hover:text-primary transition-colors">
                  Compressores
                </Link>
              </li>
              <li>
                <Link href="/categoria/geradores" className="text-gray-300 hover:text-primary transition-colors">
                  Geradores
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Atendimento
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/minha-conta" className="text-gray-300 hover:text-primary transition-colors">
                  Minha Conta
                </Link>
              </li>
              <li>
                <Link href="/meus-pedidos" className="text-gray-300 hover:text-primary transition-colors">
                  Meus Pedidos
                </Link>
              </li>
              <li>
                <Link href="/trocas-devolucoes" className="text-gray-300 hover:text-primary transition-colors">
                  Trocas e Devoluções
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-primary transition-colors">
                  Perguntas Frequentes
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="text-gray-300 hover:text-primary transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/politica-privacidade" className="text-gray-300 hover:text-primary transition-colors">
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Contato
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">
                    <strong>(51) 98145-6622</strong>
                  </p>
                  <p className="text-sm text-gray-400">
                    Seg à Sex: 8h às 18h<br />
                    Sáb: 8h às 17h
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <MessageCircle className="h-5 w-5 text-primary flex-shrink-0" />
                <a
                  href="https://wa.me/5551981456622?text=Olá! Vim pelo site e gostaria de saber mais sobre os produtos!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-green-400 transition-colors"
                >
                  WhatsApp: (51) 98145-6622
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <a
                  href="mailto:contato@ferratech.com.br"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  contato@ferratech.com.br
                </a>
              </div>
              
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <p className="text-gray-300">
                  Rua das Ferramentas, 1234<br />
                  Porto Alegre - RS<br />
                  CEP: 90000-000
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="border-t border-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <Truck className="h-8 w-8 text-primary mb-2" />
              <h5 className="font-semibold text-primary mb-1">Frete Grátis</h5>
              <p className="text-sm text-gray-400">Compras acima de R$ 199</p>
            </div>
            <div className="flex flex-col items-center">
              <Shield className="h-8 w-8 text-primary mb-2" />
              <h5 className="font-semibold text-primary mb-1">Garantia</h5>
              <p className="text-sm text-gray-400">12 meses de garantia</p>
            </div>
            <div className="flex flex-col items-center">
              <CreditCard className="h-8 w-8 text-primary mb-2" />
              <h5 className="font-semibold text-primary mb-1">Parcelamento</h5>
              <p className="text-sm text-gray-400">Até 12x sem juros</p>
            </div>
            <div className="flex flex-col items-center">
              <Trophy className="h-8 w-8 text-primary mb-2" />
              <h5 className="font-semibold text-primary mb-1">Experiência</h5>
              <p className="text-sm text-gray-400">50+ anos no mercado</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Ferratech. Todos os direitos reservados.
            </p>
            <div className="flex items-center space-x-4 text-sm">
              <Link href="/sobre" className="text-gray-400 hover:text-primary transition-colors">
                Termos de Uso
              </Link>
              <Link href="/sobre" className="text-gray-400 hover:text-primary transition-colors">
                Política de Privacidade
              </Link>
              <Link href="/sobre" className="text-gray-400 hover:text-primary transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Float Button */}
      <a
        href="https://wa.me/5551981456622?text=Olá! Vim pelo site e gostaria de saber mais sobre os produtos!"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 z-50 animate-pulse-glow"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.785"/>
        </svg>
      </a>
    </footer>
  );
} 