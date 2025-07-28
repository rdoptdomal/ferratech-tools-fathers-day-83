import { Suspense } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CheckoutForm from '@/components/CheckoutForm';

export default function CheckoutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Finalizar Compra
          </h1>
          
          <Suspense fallback={<div>Carregando formulário de checkout...</div>}>
            <CheckoutForm />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
} 