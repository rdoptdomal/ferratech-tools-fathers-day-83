import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import Index from "./pages/Index";
import Products from "./pages/Products";
import AdminPanel from "./pages/AdminPanel";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import CheckoutCallback from "./pages/CheckoutCallback";
import MyOrders from "./pages/MyOrders";
import Returns from "./pages/Returns";
import PaymentPix from "./pages/PaymentPix";
import PaymentBoleto from "./pages/PaymentBoleto";
import OrderSuccess from "./pages/OrderSuccess";
import Contact from "./pages/Contact";
import PrivacyControl from "./components/PrivacyControl";
import WelcomePopup from "./components/WelcomePopup";
import CookieConsent from "./components/CookieConsent";
import GoogleAnalytics from "./components/GoogleAnalytics";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:category" element={<Products />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/checkout/callback" element={<CheckoutCallback />} />
            <Route path="/meus-pedidos" element={<MyOrders />} />
            <Route path="/payment-pix" element={<PaymentPix />} />
            <Route path="/payment-boleto" element={<PaymentBoleto />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/contato" element={<Contact />} />
            <Route path="/devolucoes" element={<Returns />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <PrivacyControl />
          <WelcomePopup />
          <CookieConsent />
          <GoogleAnalytics />
        </BrowserRouter>
      </TooltipProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;
