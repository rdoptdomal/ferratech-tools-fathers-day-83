'use client';

import Link from 'next/link';
import { 
  Package, 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Instagram, 
  Twitter,
  Youtube
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Package className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">FerraTech</span>
            </div>
            <p className="text-gray-300 mb-4">
              Sua loja de ferramentas de confiança. Qualidade, preço e atendimento excepcional.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/produtos" className="text-gray-300 hover:text-white transition-colors">
                  Todos os Produtos
                </Link>
              </li>
              <li>
                <Link href="/categoria/ferramentas-eletricas" className="text-gray-300 hover:text-white transition-colors">
                  Ferramentas Elétricas
                </Link>
              </li>
              <li>
                <Link href="/categoria/ferramentas-manuais" className="text-gray-300 hover:text-white transition-colors">
                  Ferramentas Manuais
                </Link>
              </li>
              <li>
                <Link href="/categoria/equipamentos-seguranca" className="text-gray-300 hover:text-white transition-colors">
                  Equipamentos de Segurança
                </Link>
              </li>
              <li>
                <Link href="/categoria/acessorios" className="text-gray-300 hover:text-white transition-colors">
                  Acessórios
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Atendimento</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/sobre" className="text-gray-300 hover:text-white transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-gray-300 hover:text-white transition-colors">
                  Contato
                </Link>
              </li>
              <li>
                <Link href="/trocas-devolucoes" className="text-gray-300 hover:text-white transition-colors">
                  Trocas e Devoluções
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/politica-privacidade" className="text-gray-300 hover:text-white transition-colors">
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-gray-300">(11) 99999-9999</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-gray-300">contato@ferratech.shop</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-primary mt-1" />
                <span className="text-gray-300">
                  Rua das Ferramentas, 123<br />
                  São Paulo - SP, 01234-567
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 text-sm">
              © 2024 FerraTech. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/politica-privacidade" className="text-gray-400 hover:text-white text-sm transition-colors">
                Política de Privacidade
              </Link>
              <Link href="/termos-uso" className="text-gray-400 hover:text-white text-sm transition-colors">
                Termos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 