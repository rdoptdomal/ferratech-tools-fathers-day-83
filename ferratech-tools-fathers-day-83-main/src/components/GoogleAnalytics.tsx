import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

const GA_TRACKING_ID = 'G-1234567890'; // ID do Google Analytics 4 para FerraTech

const GoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Inicializar Google Analytics
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };

    window.gtag('js', new Date());
    window.gtag('config', GA_TRACKING_ID, {
      page_title: document.title,
      page_location: window.location.href,
    });

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    // Rastrear mudanças de página
    if (window.gtag) {
      window.gtag('config', GA_TRACKING_ID, {
        page_path: location.pathname + location.search,
        page_title: document.title,
      });
    }
  }, [location]);

  return null;
};

// Funções para eventos de conversão
export const trackAddToCart = (productId: string, productName: string, price: number, quantity: number = 1) => {
  if (window.gtag) {
    window.gtag('event', 'add_to_cart', {
      currency: 'BRL',
      value: price * quantity,
      items: [
        {
          item_id: productId,
          item_name: productName,
          price: price,
          quantity: quantity,
          currency: 'BRL',
          item_category: 'Ferramentas',
        },
      ],
    });
  }
};

export const trackBeginCheckout = (cartItems: any[], total: number) => {
  if (window.gtag) {
    window.gtag('event', 'begin_checkout', {
      currency: 'BRL',
      value: total,
      items: cartItems.map(item => ({
        item_id: item.product.id,
        item_name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        currency: 'BRL',
        item_category: 'Ferramentas',
      })),
    });
  }
};

export const trackPurchase = (orderId: string, cartItems: any[], total: number, paymentMethod: string) => {
  if (window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: orderId,
      value: total,
      currency: 'BRL',
      tax: 0,
      shipping: 0,
      payment_type: paymentMethod,
      items: cartItems.map(item => ({
        item_id: item.product.id,
        item_name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        currency: 'BRL',
        item_category: 'Ferramentas',
      })),
    });
  }
};

export const trackViewItem = (productId: string, productName: string, price: number, category: string) => {
  if (window.gtag) {
    window.gtag('event', 'view_item', {
      currency: 'BRL',
      value: price,
      items: [
        {
          item_id: productId,
          item_name: productName,
          price: price,
          currency: 'BRL',
          item_category: category,
        },
      ],
    });
  }
};

export const trackSearch = (searchTerm: string) => {
  if (window.gtag) {
    window.gtag('event', 'search', {
      search_term: searchTerm,
    });
  }
};

export default GoogleAnalytics; 