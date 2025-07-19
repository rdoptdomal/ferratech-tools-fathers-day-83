import drillMachine from "@/assets/drill-machine.jpg";
import angleGrinder from "@/assets/angle-grinder.jpg";
import circularSaw from "@/assets/circular-saw.jpg";
import hammerDrill from "@/assets/hammer-drill.jpg";
import screwdriver from "@/assets/screwdriver.jpg";
import jigsaw from "@/assets/jigsaw.jpg";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  discount?: number;
  specifications: string[];
  brand: string;
  inStock: boolean;
  category: string;
  detailedSpecs: {
    power?: string;
    voltage?: string;
    speed?: string;
    capacity?: string;
    weight?: string;
    dimensions?: string;
    warranty?: string;
    includes?: string[];
  };
}

export const products: Product[] = [
  {
    id: "1",
    name: "Furadeira de Impacto 650W Profissional",
    description: "Furadeira de impacto robusta com alta potência para trabalhos pesados em alvenaria, madeira e metal.",
    price: 189.90,
    originalPrice: 299.90,
    image: drillMachine,
    rating: 4.8,
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
    description: "Esmerilhadeira angular de alta performance com sistema de proteção contra poeira e motor potente.",
    price: 149.90,
    originalPrice: 219.90,
    image: angleGrinder,
    rating: 4.6,
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
    description: "Serra circular de alta precisão com guia laser e base de alumínio para cortes perfeitos.",
    price: 299.90,
    originalPrice: 449.90,
    image: circularSaw,
    rating: 4.9,
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
    description: "Martelete robusto com sistema SDS-Plus para perfuração em concreto e alvenaria pesada.",
    price: 259.90,
    originalPrice: 389.90,
    image: hammerDrill,
    rating: 4.7,
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
      capacity: "SDS-Plus até 26mm",
      weight: "2.8kg",
      dimensions: "32 x 9 x 22 cm",
      warranty: "12 meses",
      includes: ["Martelete", "Punho auxiliar", "Limitador de profundidade", "Maleta", "Kit 5 brocas SDS"]
    }
  },
  {
    id: "5",
    name: "Parafusadeira Furadeira 18V Li-ion Bivolt",
    description: "Parafusadeira sem fio com bateria de lítio e carregador rápido. Ideal para trabalhos precisos.",
    price: 199.90,
    originalPrice: 299.90,
    image: screwdriver,
    rating: 4.8,
    specifications: [
      "Tensão: 18V Li-ion",
      "Torque: 35Nm",
      "Mandril: 10mm",
      "Autonomia: até 4 horas"
    ],
    brand: "Ferratech Pro",
    inStock: true,
    category: "ferramentas-eletricas",
    detailedSpecs: {
      power: "18V Li-ion",
      voltage: "Bivolt",
      speed: "0-400/0-1400 RPM",
      capacity: "Mandril 10mm",
      weight: "1.3kg",
      dimensions: "22 x 7 x 20 cm",
      warranty: "12 meses",
      includes: ["Parafusadeira", "Bateria 18V 2.0Ah", "Carregador bivolt", "Kit 30 bits", "Maleta"]
    }
  },
  {
    id: "6",
    name: "Serra Tico-Tico Orbital 650W Profissional",
    description: "Serra tico-tico com ação orbital e base inclinável para cortes curvos e retos de alta precisão.",
    price: 179.90,
    originalPrice: 259.90,
    image: jigsaw,
    rating: 4.5,
    specifications: [
      "Potência: 650W",
      "Curso: 23mm",
      "Frequência: 3000 spm",
      "Base inclinável até 45°"
    ],
    brand: "Ferratech Pro",
    inStock: true,
    category: "ferramentas-eletricas",
    detailedSpecs: {
      power: "650W",
      voltage: "220V",
      speed: "500-3000 spm",
      capacity: "Madeira até 65mm",
      weight: "2.1kg",
      dimensions: "25 x 8 x 20 cm",
      warranty: "12 meses",
      includes: ["Serra tico-tico", "Protetor", "Kit 5 lâminas mistas", "Guia paralelo", "Maleta"]
    }
  },
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
  {
    id: "jardinagem",
    name: "Jardinagem",
    description: "Cuidado do seu jardim",
    icon: "🌱",
  },
  {
    id: "seguranca",
    name: "Segurança",
    description: "Equipamentos de proteção",
    icon: "🛡️",
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