import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  images: string[];
  variations?: any;
  stock: number;
  rating: number;
  reviews: number;
  brand?: string;
}

interface CartItem {
  product: Product;
  quantity: number;
  variation?: any;
}

interface CartStore {
  items: CartItem[];
  addToCart: (product: Product, variation?: any) => void;
  removeFromCart: (productId: string, variation?: any) => void;
  updateQuantity: (productId: string, quantity: number, variation?: any) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemsCount: () => number;
  getItemQuantity: (productId: string, variation?: any) => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addToCart: (product: Product, variation?: any) => {
        const cart = get().items;
        const existingItem = cart.find(item => 
          item.product.id === product.id && 
          JSON.stringify(item.variation) === JSON.stringify(variation)
        );
        
        if (existingItem) {
          existingItem.quantity += 1;
          set({ items: [...cart] });
        } else {
          cart.push({ 
            product, 
            quantity: 1, 
            variation 
          });
          set({ items: [...cart] });
        }
      },
      
      removeFromCart: (productId: string, variation?: any) => {
        set({
          items: get().items.filter(item => 
            !(item.product.id === productId && 
              JSON.stringify(item.variation) === JSON.stringify(variation))
          )
        });
      },
      
      updateQuantity: (productId: string, quantity: number, variation?: any) => {
        const cart = get().items;
        const item = cart.find(item => 
          item.product.id === productId && 
          JSON.stringify(item.variation) === JSON.stringify(variation)
        );
        
        if (item) {
          if (quantity <= 0) {
            get().removeFromCart(productId, variation);
          } else {
            item.quantity = quantity;
            set({ items: [...cart] });
          }
        }
      },
      
      clearCart: () => set({ items: [] }),
      
      getTotal: () => {
        return get().items.reduce((total, item) => {
          const price = item.product.originalPrice || item.product.price;
          return total + (price * item.quantity);
        }, 0);
      },
      
      getItemsCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      
      getItemQuantity: (productId: string, variation?: any) => {
        const item = get().items.find(item => 
          item.product.id === productId && 
          JSON.stringify(item.variation) === JSON.stringify(variation)
        );
        return item ? item.quantity : 0;
      }
    }),
    {
      name: 'ferratech-cart-storage',
    }
  )
); 