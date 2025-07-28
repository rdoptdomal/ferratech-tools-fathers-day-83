'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, Heart, User, Menu, X, Search } from 'lucide-react';
import SearchBar from './SearchBar';

interface HeaderProps {
  categories?: any[];
}

export default function Header({ categories = [] }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - SEMPRE volta para home */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity" aria-label="Ir para página inicial">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <span className="text-xl font-bold text-gray-900">FerraTech</span>
          </Link>

          {/* Navegação Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/produtos" 
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              aria-label="Ver todos os produtos"
            >
              Produtos
            </Link>
            {categories && categories.length > 0 && (
              <div className="relative group">
                <button 
                  className="text-gray-700 hover:text-blue-600 transition-colors font-medium flex items-center"
                  aria-label="Ver categorias de produtos"
                  aria-expanded="false"
                >
                  Categorias
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-2">
                    {categories.slice(0, 8).map((category) => (
                      <Link
                        key={category.id}
                        href={`/categoria/${category.slug}`}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                        aria-label={`Ver produtos da categoria ${category.name}`}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
            <Link 
              href="/sobre" 
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              aria-label="Sobre a FerraTech"
            >
              Sobre
            </Link>
            <Link 
              href="/contato" 
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              aria-label="Entre em contato conosco"
            >
              Contato
            </Link>
          </nav>

          {/* Ações Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
              aria-label="Abrir busca"
              aria-expanded={isSearchOpen}
            >
              <Search className="w-5 h-5" />
            </button>
            <Link 
              href="/favoritos" 
              className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
              aria-label="Ver produtos favoritos"
            >
              <Heart className="w-5 h-5" />
            </Link>
            <Link 
              href="/carrinho" 
              className="p-2 text-gray-600 hover:text-blue-600 transition-colors relative"
              aria-label="Ver carrinho de compras"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Link>
            <Link 
              href="/minha-conta" 
              className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
              aria-label="Acessar minha conta"
            >
              <User className="w-5 h-5" />
            </Link>
          </div>

          {/* Botão Mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors"
            aria-label="Abrir menu de navegação"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Busca Desktop */}
        {isSearchOpen && (
          <div className="py-4 border-t border-gray-200">
            <SearchBar onClose={() => setIsSearchOpen(false)} />
          </div>
        )}

        {/* Menu Mobile */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Ir para página inicial"
              >
                Home
              </Link>
              <Link
                href="/produtos"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Ver todos os produtos"
              >
                Produtos
              </Link>
              {categories && categories.length > 0 && (
                <div>
                  <div className="px-3 py-2 text-sm font-medium text-gray-500">Categorias</div>
                  {categories.slice(0, 6).map((category) => (
                    <Link
                      key={category.id}
                      href={`/categoria/${category.slug}`}
                      className="block px-6 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                      aria-label={`Ver produtos da categoria ${category.name}`}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
              <Link
                href="/sobre"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Sobre a FerraTech"
              >
                Sobre
              </Link>
              <Link
                href="/contato"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Entre em contato conosco"
              >
                Contato
              </Link>
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex space-x-4 px-3">
                  <Link
                    href="/favoritos"
                    className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                    aria-label="Ver produtos favoritos"
                  >
                    <Heart className="w-5 h-5" />
                  </Link>
                  <Link
                    href="/carrinho"
                    className="p-2 text-gray-600 hover:text-blue-600 transition-colors relative"
                    onClick={() => setIsMenuOpen(false)}
                    aria-label="Ver carrinho de compras"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      0
                    </span>
                  </Link>
                  <Link
                    href="/minha-conta"
                    className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                    aria-label="Acessar minha conta"
                  >
                    <User className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
} 