import { Suspense } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CheckoutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Finalizar Compra
          </h1>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <p className="text-gray-600 text-center mb-6">
              Para finalizar sua compra, adicione produtos ao carrinho primeiro.
            </p>
            <div className="text-center">
              <a
                href="/produtos"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Ver Produtos
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 