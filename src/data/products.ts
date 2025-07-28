import { Product } from '@/types';
import drillMachine from '@/assets/drill-machine.jpg';
import angleGrinder from '@/assets/angle-grinder.jpg';
import circularSaw from '@/assets/circular-saw.jpg';
import hammerDrill from '@/assets/hammer-drill.jpg';
import screwdriver from '@/assets/screwdriver.jpg';
import jigsaw from '@/assets/jigsaw.jpg';

export const products: Product[] = [
  {
    id: "1",
    name: "Furadeira de Impacto 650W Profissional",
    slug: "furadeira-impacto-650w-profissional",
    description: "Furadeira de impacto robusta com alta potência para trabalhos pesados em alvenaria, madeira e metal.",
    price: 189.90,
    originalPrice: 299.90,
    images: [drillMachine.src],
    stock: 15,
    rating: 4.8,
    reviews: 127,
    specifications: [
      "Potência: 650W",
      "Velocidade: 0-3000 RPM",
      "Mandril: 13mm",
      "Função impacto: 48.000 IPM"
    ],
    brand: "Ferratech Pro",
    inStock: true,
    category: "ferramentas-eletricas",
    detailedSpecs: {
      power: "650W",
      voltage: "220V",
      speed: "0-3000 RPM",
      capacity: "Mandril 13mm",
      weight: "1.8kg",
      dimensions: "25 x 8 x 22 cm",
      warranty: "12 meses",
      includes: ["Furadeira", "Mandril com chave", "Punho auxiliar", "Limitador de profundidade", "Maleta"]
    }
  },
  {
    id: "2",
    name: "Esmerilhadeira Angular 900W 4.1/2\" Premium",
    slug: "esmerilhadeira-angular-900w-premium",
    description: "Esmerilhadeira angular de alta performance com sistema de proteção contra poeira e motor potente.",
    price: 149.90,
    originalPrice: 219.90,
    images: [angleGrinder.src],
    stock: 8,
    rating: 4.6,
    reviews: 89,
    specifications: [
      "Potência: 900W",
      "Disco: 4.1/2\" (115mm)",
      "Velocidade: 11.000 RPM",
      "Proteção contra religamento"
    ],
    brand: "Ferratech Pro",
    inStock: true,
    category: "ferramentas-eletricas",
    detailedSpecs: {
      power: "900W",
      voltage: "220V",
      speed: "11.000 RPM",
      capacity: "Disco 115mm (4.1/2\")",
      weight: "1.6kg",
      dimensions: "28 x 10 x 12 cm",
      warranty: "12 meses",
      includes: ["Esmerilhadeira", "Protetor", "Punho auxiliar", "Chave de flange", "Manual"]
    }
  },
  {
    id: "3",
    name: "Serra Circular 1200W 7.1/4\" Profissional",
    slug: "serra-circular-1200w-profissional",
    description: "Serra circular de alta precisão com guia laser e base de alumínio para cortes perfeitos.",
    price: 299.90,
    originalPrice: 449.90,
    images: [circularSaw.src],
    stock: 12,
    rating: 4.9,
    reviews: 156,
    specifications: [
      "Potência: 1200W",
      "Lâmina: 7.1/4\" (184mm)",
      "Profundidade de corte: 63mm",
      "Guia laser integrado"
    ],
    brand: "Ferratech Pro",
    inStock: true,
    category: "ferramentas-eletricas",
    detailedSpecs: {
      power: "1200W",
      voltage: "220V",
      speed: "5.800 RPM",
      capacity: "Lâmina 184mm (7.1/4\")",
      weight: "3.2kg",
      dimensions: "35 x 25 x 22 cm",
      warranty: "12 meses",
      includes: ["Serra circular", "Lâmina 24 dentes", "Guia paralelo", "Chave sextavada", "Manual"]
    }
  },
  {
    id: "4",
    name: "Martelete Perfurador SDS-Plus 800W",
    slug: "martelete-perfurador-sds-plus-800w",
    description: "Martelete robusto com sistema SDS-Plus para perfuração em concreto e alvenaria pesada.",
    price: 259.90,
    originalPrice: 389.90,
    images: [hammerDrill.src],
    stock: 6,
    rating: 4.7,
    reviews: 93,
    specifications: [
      "Potência: 800W",
      "Sistema: SDS-Plus",
      "Impacto: 2.7J",
      "Velocidade: 0-900 RPM"
    ],
    brand: "Ferratech Pro",
    inStock: true,
    category: "ferramentas-eletricas",
    detailedSpecs: {
      power: "800W",
      voltage: "220V",
      speed: "0-900 RPM",
      capacity: "SDS-Plus",
      weight: "2.1kg",
      dimensions: "32 x 9 x 25 cm",
      warranty: "12 meses",
      includes: ["Martelete", "Ponta SDS-Plus", "Punho auxiliar", "Maleta"]
    }
  },
  {
    id: "5",
    name: "Parafusadeira de Impacto 18V Profissional",
    slug: "parafusadeira-impacto-18v-profissional",
    description: "Parafusadeira de impacto sem fio com bateria de lítio e torque ajustável para aplicações profissionais.",
    price: 199.90,
    originalPrice: 299.90,
    images: [screwdriver.src],
    stock: 20,
    rating: 4.8,
    reviews: 203,
    specifications: [
      "Voltagem: 18V",
      "Torque: 0-200 Nm",
      "Velocidade: 0-3200 RPM",
      "Bateria: Li-ion 2.0Ah"
    ],
    brand: "Ferratech Pro",
    inStock: true,
    category: "ferramentas-eletricas",
    detailedSpecs: {
      power: "18V",
      voltage: "18V",
      speed: "0-3200 RPM",
      capacity: "Torque 200 Nm",
      weight: "1.2kg",
      dimensions: "18 x 7 x 15 cm",
      warranty: "12 meses",
      includes: ["Parafusadeira", "Bateria Li-ion", "Carregador", "Maleta"]
    }
  },
  {
    id: "6",
    name: "Serra Tico-Tico 500W 3.1/2\"",
    slug: "serra-tico-tico-500w",
    description: "Serra tico-tico versátil para cortes em madeira, plástico e metal com lâmina de alta durabilidade.",
    price: 179.90,
    originalPrice: 259.90,
    images: [jigsaw.src],
    stock: 10,
    rating: 4.5,
    reviews: 67,
    specifications: [
      "Potência: 500W",
      "Lâmina: 3.1/2\" (89mm)",
      "Velocidade: 0-3000 SPM",
      "Corte: 45°"
    ],
    brand: "Ferratech Pro",
    inStock: true,
    category: "ferramentas-eletricas",
    detailedSpecs: {
      power: "500W",
      voltage: "220V",
      speed: "0-3000 SPM",
      capacity: "Lâmina 89mm (3.1/2\")",
      weight: "1.4kg",
      dimensions: "22 x 8 x 18 cm",
      warranty: "12 meses",
      includes: ["Serra tico-tico", "Lâmina bimetálica", "Base de corte", "Manual"]
    }
  }
];

export const categories = [
  {
    id: "ferramentas-eletricas",
    name: "Ferramentas Elétricas",
    description: "Linha completa de ferramentas elétricas profissionais",
    icon: "⚡",
  },
  {
    id: "construcao",
    name: "Material de Construção",
    description: "Tudo para sua obra",
    icon: "🏗️",
  },
  {
    id: "eletrica",
    name: "Material Elétrico",
    description: "Instalações elétricas seguras",
    icon: "💡",
  },
];

export const getProductsByCategory = (categoryId: string) => {
  return products.filter(product => product.category === categoryId);
};

export const getProductById = (id: string) => {
  return products.find(product => product.id === id);
};

export const getFeaturedProducts = () => {
  return products.slice(0, 4);
};