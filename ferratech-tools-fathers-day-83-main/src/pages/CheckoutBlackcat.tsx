import React from "react";

const CheckoutBlackcat = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-4 text-center text-primary">Checkout Seguro</h1>
        <p className="mb-6 text-center text-muted-foreground">
          Finalize sua compra com segurança usando a Blackcat!
        </p>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nome completo"
            className="border rounded-md px-4 py-2 focus:outline-primary"
          />
          <input
            type="email"
            placeholder="E-mail"
            className="border rounded-md px-4 py-2 focus:outline-primary"
          />
          <input
            type="text"
            placeholder="Endereço de entrega"
            className="border rounded-md px-4 py-2 focus:outline-primary"
          />
        </div>
        <div className="my-6 flex flex-col items-center">
          <img
            src="https://cdn.blackcatpay.com.br/assets/logo-blackcat.svg"
            alt="Blackcat Pagamentos"
            className="h-10 mb-2"
            style={{ background: '#fff', borderRadius: 8, padding: 4 }}
          />
          <button
            className="w-full bg-black text-white font-bold py-3 rounded-lg mt-2 hover:bg-primary transition-colors text-lg flex items-center justify-center gap-2"
            onClick={() => window.open('https://blackcatpay.com.br/', '_blank')}
          >
            <span>Finalizar com Blackcat</span>
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-lock"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </button>
        </div>
        <p className="text-xs text-center text-muted-foreground mt-4">
          Pagamento 100% seguro via Blackcat. Seus dados estão protegidos.
        </p>
      </div>
    </div>
  );
};

export default CheckoutBlackcat; 