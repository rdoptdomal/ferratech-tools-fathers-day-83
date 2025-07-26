import drillMachine from "@/assets/drill-machine.jpg";
import angleGrinder from "@/assets/angle-grinder.jpg";
import circularSaw from "@/assets/circular-saw.jpg";
import hammerDrill from "@/assets/hammer-drill.jpg";
import screwdriver from "@/assets/screwdriver.jpg";
import jigsaw from "@/assets/jigsaw.jpg";
import sander from "@/assets/sander.jpg";

export interface Product {
  id: string;
  name: string;
  description: string;
  technicalDescription: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  brand: string;
  sku: string;
  inStock: boolean;
  rating: number;
  reviews: number;
  specifications: {
    power?: string;
    voltage?: string;
    weight?: string;
    dimensions?: string;
    material?: string;
    warranty?: string;
  };
}

export const products: Product[] = [
  {
    id: "1",
    name: "Furadeira de Impacto 18V 2.0Ah Bivolt",
    description: "Furadeira de impacto profissional com bateria de 18V e 2.0Ah, ideal para trabalhos pesados em madeira, metal e alvenaria.",
    technicalDescription: "Furadeira de impacto com torque de 60Nm, velocidade de 0-600/0-2000 rpm, mandril de 13mm. Sistema de bateria de 18V com 2.0Ah incluída. Equipada com LED para iluminação e empunhadura ergonômica anti-vibração.",
    price: 459.90,
    originalPrice: 599.90,
    category: "ferramentas-eletricas",
    image: "/src/assets/drill-machine.jpg",
    brand: "MAKITA",
    sku: "DF331DW",
    inStock: true,
    rating: 4.7,
    reviews: 156,
    specifications: {
      power: "18V",
      voltage: "Bivolt",
      weight: "1.3kg",
      dimensions: "200 x 70 x 180mm",
      material: "Aço carbono",
      warranty: "12 meses"
    }
  },
  {
    id: "2",
    name: "Serra Circular 190mm 1.800W 220V",
    description: "Serra circular profissional com alta potência para cortes precisos em madeira, compensado e MDF.",
    technicalDescription: "Serra circular com motor de 1.800W, velocidade de 5.500 rpm, profundidade máxima de corte de 65mm. Equipada com sistema de proteção da lâmina, guia paralela e base em alumínio fundido. Inclui lâmina de corte para madeira.",
    price: 459.90,
    originalPrice: 549.90,
    category: "ferramentas-eletricas",
    image: "/src/assets/circular-saw.jpg",
    brand: "MAKITA",
    sku: "5007MG",
    inStock: true,
    rating: 4.6,
    reviews: 89,
    specifications: {
      power: "1.800W",
      voltage: "220V",
      weight: "4.1kg",
      dimensions: "250 x 190 x 110mm",
      material: "Alumínio fundido",
      warranty: "12 meses"
    }
  },
  {
    id: "3",
    name: "Esmerilhadeira Angular 115mm 720W 220V",
    description: "Esmerilhadeira angular compacta e potente para corte e desbaste em metal, concreto e pedra.",
    technicalDescription: "Esmerilhadeira angular com motor de 720W, velocidade de 11.000 rpm, diâmetro do disco de 115mm. Equipada com sistema de proteção contra reinício, empunhadura lateral e sistema de troca rápida do disco.",
    price: 289.90,
    originalPrice: 349.90,
    category: "ferramentas-eletricas",
    image: "/src/assets/angle-grinder.jpg",
    brand: "MAKITA",
    sku: "GA4530",
    inStock: true,
    rating: 4.5,
    reviews: 134,
    specifications: {
      power: "720W",
      voltage: "220V",
      weight: "1.8kg",
      dimensions: "280 x 100 x 80mm",
      material: "Aço carbono",
      warranty: "12 meses"
    }
  },
  {
    id: "4",
    name: "Martelete Combinado 24mm 800W SDS-Plus",
    description: "Martelete combinado profissional com sistema SDS-Plus para perfuração em concreto e alvenaria pesada.",
    technicalDescription: "Martelete combinado com potência de 800W, velocidade de 0-1.100 rpm, impacto de 0-4.000 bpm. Sistema SDS-Plus para brocas de até 24mm. Equipado com sistema de redução de vibração e empunhadura anti-vibração.",
    price: 899.90,
    originalPrice: 999.90,
    category: "ferramentas-eletricas",
    image: "/src/assets/hammer-drill.jpg",
    brand: "MAKITA",
    sku: "HR2470X21",
    inStock: true,
    rating: 4.8,
    reviews: 203,
    specifications: {
      power: "800W",
      voltage: "220V",
      weight: "2.8kg",
      dimensions: "320 x 85 x 210mm",
      material: "Aço carbono",
      warranty: "12 meses"
    }
  },
  {
    id: "5",
    name: "Serra Tico-Tico 110mm 500W 220V",
    description: "Serra tico-tico versátil para cortes curvos e retos em madeira, plástico e metal fino.",
    technicalDescription: "Serra tico-tico com motor de 500W, velocidade de 3.000 rpm, curso de 18mm. Equipada com sistema de inclinação de 0° a 45°, base em alumínio fundido e sistema de aspiração de pó.",
    price: 189.90,
    originalPrice: 229.90,
    category: "ferramentas-eletricas",
    image: "/src/assets/jigsaw.jpg",
    brand: "MAKITA",
    sku: "4329K",
    inStock: true,
    rating: 4.4,
    reviews: 67,
    specifications: {
      power: "500W",
      voltage: "220V",
      weight: "2.1kg",
      dimensions: "300 x 90 x 200mm",
      material: "Alumínio fundido",
      warranty: "12 meses"
    }
  },
  {
    id: "6",
    name: "Lixadeira Orbital 125mm 300W 220V",
    description: "Lixadeira orbital para acabamentos finos em madeira, plástico e metal.",
    technicalDescription: "Lixadeira orbital com motor de 300W, velocidade de 12.000 opm, diâmetro do disco de 125mm. Sistema de aspiração integrado e empunhadura ergonômica para maior conforto.",
    price: 159.90,
    originalPrice: 199.90,
    category: "ferramentas-eletricas",
    image: "/src/assets/sander.jpg",
    brand: "BOSCH",
    sku: "GSS1400",
    inStock: true,
    rating: 4.2,
    reviews: 95,
    specifications: {
      power: "300W",
      voltage: "220V",
      weight: "1.2kg",
      dimensions: "250 x 120 x 80mm",
      material: "Plástico resistente",
      warranty: "12 meses"
    }
  },
  {
    id: "7",
    name: "Parafusadeira 18V 1.5Ah Bivolt",
    description: "Parafusadeira sem fio com bateria de lítio e carregador rápido. Ideal para trabalhos precisos.",
    technicalDescription: "Parafusadeira com torque de 35Nm, velocidade de 0-400/0-1400 rpm, mandril de 10mm. Sistema de bateria de 18V com 1.5Ah incluída. Equipada com LED para iluminação da área de trabalho.",
    price: 299.90,
    originalPrice: 399.90,
    category: "ferramentas-eletricas",
    image: "/src/assets/screwdriver.jpg",
    brand: "DEWALT",
    sku: "DCF887N",
    inStock: true,
    rating: 4.6,
    reviews: 178,
    specifications: {
      power: "18V",
      voltage: "Bivolt",
      weight: "1.1kg",
      dimensions: "180 x 65 x 170mm",
      material: "Aço carbono",
      warranty: "12 meses"
    }
  },
  {
    id: "8",
    name: "Compressor de Ar 2HP 50L 220V",
    description: "Compressor de ar portátil para trabalhos pneumáticos e pintura.",
    technicalDescription: "Compressor de ar com motor de 2HP, tanque de 50L, pressão máxima de 8 bar. Equipado com regulador de pressão, manômetro e válvula de segurança. Ideal para pistolas de pintura e ferramentas pneumáticas.",
    price: 799.90,
    originalPrice: 999.90,
    category: "ferramentas-eletricas",
    image: "/src/assets/screwdriver.jpg",
    brand: "SCHULZ",
    sku: "CS50",
    inStock: true,
    rating: 4.3,
    reviews: 112,
    specifications: {
      power: "2HP",
      voltage: "220V",
      weight: "35kg",
      dimensions: "60 x 30 x 80cm",
      material: "Aço carbono",
      warranty: "12 meses"
    }
  },
  {
    id: "9",
    name: "Jogo de Chaves Combinadas 6-32mm 12 Peças",
    description: "Jogo completo de chaves combinadas profissionais em aço cromo-vanádio, ideal para mecânica e manutenção.",
    technicalDescription: "Jogo de 12 chaves combinadas com medidas de 6, 8, 10, 12, 14, 17, 19, 22, 24, 27, 30 e 32mm. Fabricadas em aço cromo-vanádio com tratamento térmico, superfície fosfatizada para resistência à corrosão.",
    price: 159.90,
    originalPrice: 199.90,
    category: "ferramentas-manuais",
    image: "/src/assets/screwdriver.jpg",
    brand: "GEDORE",
    sku: "GED-COMBO-12",
    inStock: true,
    rating: 4.8,
    reviews: 245,
    specifications: {
      material: "Aço cromo-vanádio",
      weight: "1.2kg",
      warranty: "Lifetime"
    }
  },
  {
    id: "10",
    name: "Chave Biela 14mm - GEDORE RED",
    description: "Chave biela profissional de 14mm com cabo longo para maior torque e alcance.",
    technicalDescription: "Chave biela de 14mm com cabo de 250mm, fabricada em aço cromo-vanádio com tratamento térmico. Superfície fosfatizada para resistência à corrosão. Ideal para aplicações automotivas e industriais.",
    price: 26.16,
    originalPrice: 37.90,
    category: "ferramentas-manuais",
    image: "/src/assets/screwdriver.jpg",
    brand: "GEDORE",
    sku: "3301514",
    inStock: true,
    rating: 4.6,
    reviews: 89,
    specifications: {
      material: "Aço cromo-vanádio",
      dimensions: "250mm",
      warranty: "Lifetime"
    }
  },
  {
    id: "11",
    name: "Martelo de Bola 1kg - GEDORE",
    description: "Martelo de bola profissional para trabalhos de mecânica e construção.",
    technicalDescription: "Martelo de bola com peso de 1kg, cabeça em aço carbono temperado, cabo em madeira de freixo. Ideal para trabalhos de mecânica, marcenaria e construção civil.",
    price: 45.90,
    originalPrice: 59.90,
    category: "ferramentas-manuais",
    image: "/src/assets/screwdriver.jpg",
    brand: "GEDORE",
    sku: "GED-MB-1KG",
    inStock: true,
    rating: 4.4,
    reviews: 156,
    specifications: {
      material: "Aço carbono",
      weight: "1kg",
      dimensions: "300mm",
      warranty: "Lifetime"
    }
  },
  {
    id: "12",
    name: "Alicate Universal 8\" - GEDORE",
    description: "Alicate universal profissional para corte e torção de fios e cabos.",
    technicalDescription: "Alicate universal de 8 polegadas (200mm), fabricado em aço cromo-vanádio com tratamento térmico. Cabos isolados para segurança elétrica. Ideal para trabalhos elétricos e mecânicos.",
    price: 32.90,
    originalPrice: 42.90,
    category: "ferramentas-manuais",
    image: "/src/assets/screwdriver.jpg",
    brand: "GEDORE",
    sku: "GED-AU-8",
    inStock: true,
    rating: 4.5,
    reviews: 203,
    specifications: {
      material: "Aço cromo-vanádio",
      dimensions: "200mm",
      warranty: "Lifetime"
    }
  },
  {
    id: "13",
    name: "Serra de Mão 24\" - GEDORE",
    description: "Serra de mão profissional para corte em madeira e plástico.",
    technicalDescription: "Serra de mão de 24 polegadas (600mm), lâmina em aço carbono temperado com dentes endurecidos. Cabo ergonômico em plástico resistente. Ideal para cortes em madeira, plástico e materiais similares.",
    price: 28.90,
    originalPrice: 38.90,
    category: "ferramentas-manuais",
    image: "/src/assets/screwdriver.jpg",
    brand: "GEDORE",
    sku: "GED-SM-24",
    inStock: true,
    rating: 4.2,
    reviews: 98,
    specifications: {
      material: "Aço carbono",
      dimensions: "600mm",
      warranty: "Lifetime"
    }
  },
  {
    id: "14",
    name: "Trena 5m - GEDORE",
    description: "Trena métrica profissional com fita de aço e case resistente.",
    technicalDescription: "Trena métrica de 5 metros com fita de aço inoxidável, case em ABS resistente a impactos. Sistema de retorno automático e trava de segurança. Graduação em centímetros e polegadas.",
    price: 15.90,
    originalPrice: 22.90,
    category: "ferramentas-manuais",
    image: "/src/assets/screwdriver.jpg",
    brand: "GEDORE",
    sku: "GED-TR-5M",
    inStock: true,
    rating: 4.7,
    reviews: 267,
    specifications: {
      material: "Aço inoxidável",
      dimensions: "5m",
      warranty: "12 meses"
    }
  },
  {
    id: "15",
    name: "Nível de Bolha 60cm - GEDORE",
    description: "Nível de bolha profissional para alinhamentos precisos.",
    technicalDescription: "Nível de bolha de 60cm com corpo em alumínio extrudado, bolhas de precisão em acrílico. Base plana e lateral para medições horizontais e verticais. Ideal para alvenaria e marcenaria.",
    price: 35.90,
    originalPrice: 45.90,
    category: "ferramentas-manuais",
    image: "/src/assets/screwdriver.jpg",
    brand: "GEDORE",
    sku: "GED-NB-60",
    inStock: true,
    rating: 4.3,
    reviews: 134,
    specifications: {
      material: "Alumínio",
      dimensions: "60cm",
      warranty: "Lifetime"
    }
  },
  {
    id: "16",
    name: "Jogo De Brocas Multiconstrução HEX-9 Com 5 Peças",
    description: "Jogo de brocas multiconstrução para perfuração em diversos materiais.",
    technicalDescription: "Jogo de 5 brocas multiconstrução com medidas 4, 5, 6, 6 e 8mm. Sistema HEX-9 para maior estabilidade e precisão. Ideal para perfuração em madeira, metal, plástico e alvenaria.",
    price: 94.99,
    originalPrice: 149.99,
    category: "acessorios",
    image: "/src/assets/screwdriver.jpg",
    brand: "BOSCH",
    sku: "2608900585000",
    inStock: true,
    rating: 4.7,
    reviews: 156,
    specifications: {
      dimensions: "4, 5, 6, 6, 8mm",
      material: "Aço rápido",
      warranty: "12 meses"
    }
  },
  {
    id: "17",
    name: "Disco de Corte de Tungstênio para Madeira 110mm x 20mm",
    description: "Disco de corte especializado para madeira, compensado e MDF com alta durabilidade.",
    technicalDescription: "Disco de corte de tungstênio com diâmetro de 110mm e furo de 20mm. Especializado para corte em madeira, compensado, MDF e aglomerado. Dentes de tungstênio soldados para máxima durabilidade.",
    price: 48.36,
    originalPrice: 64.90,
    category: "acessorios",
    image: "/src/assets/screwdriver.jpg",
    brand: "CORTAG",
    sku: "61346",
    inStock: true,
    rating: 4.4,
    reviews: 67,
    specifications: {
      dimensions: "110mm x 20mm",
      material: "Tungstênio",
      warranty: "6 meses"
    }
  },
  {
    id: "18",
    name: "Conjunto Mandril S13 (13mm) com Chave e Adaptador SDS-Plus",
    description: "Conjunto completo de mandril para furadeiras e parafusadeiras profissionais.",
    technicalDescription: "Mandril de 13mm com sistema de aperto rápido, chave de ajuste e adaptador SDS-Plus incluídos. Compatível com furadeiras e parafusadeiras de 13mm. Fabricado em aço temperado com alta resistência.",
    price: 73.06,
    originalPrice: 105.99,
    category: "acessorios",
    image: "/src/assets/screwdriver.jpg",
    brand: "MAKITA",
    sku: "B-12887",
    inStock: true,
    rating: 4.5,
    reviews: 112,
    specifications: {
      dimensions: "13mm",
      material: "Aço temperado",
      warranty: "12 meses"
    }
  },
  {
    id: "19",
    name: "Maleta Modular Makpac 1 29,5 x 39,5 x 10,5 cm",
    description: "Maleta modular para organização e transporte de ferramentas profissionais.",
    technicalDescription: "Maleta modular Makpac com dimensões 29,5 x 39,5 x 10,5 cm. Sistema de encaixe modular, resistente a impactos e intempéries. Ideal para organização e transporte seguro de ferramentas.",
    price: 159.59,
    originalPrice: 264.90,
    category: "acessorios",
    image: "/src/assets/screwdriver.jpg",
    brand: "MAKITA",
    sku: "196647-7",
    inStock: true,
    rating: 4.6,
    reviews: 134,
    specifications: {
      dimensions: "29,5 x 39,5 x 10,5 cm",
      material: "PP resistente",
      warranty: "12 meses"
    }
  },
  {
    id: "20",
    name: "Carregador de Bateria Duplo DC18RD 110 Volts",
    description: "Carregador duplo para baterias de 18V com sistema de carregamento rápido.",
    technicalDescription: "Carregador duplo para baterias de 18V, tensão de entrada 110V. Sistema de carregamento rápido com indicador LED de status. Compatível com baterias de 18V da linha Makita.",
    price: 294.49,
    originalPrice: 351.90,
    category: "acessorios",
    image: "/src/assets/screwdriver.jpg",
    brand: "MAKITA",
    sku: "196928-9",
    inStock: true,
    rating: 4.5,
    reviews: 78,
    specifications: {
      voltage: "110V",
      weight: "0.8kg",
      dimensions: "150 x 80 x 60mm",
      warranty: "12 meses"
    }
  },
  {
    id: "21",
    name: "Capacete de Segurança Amarelo - KSEG",
    description: "Capacete de segurança certificado para proteção contra impactos na construção civil.",
    technicalDescription: "Capacete de segurança em ABS resistente a impactos, cor amarela para alta visibilidade. Sistema de ajuste ergonômico com fita de nylon. Certificado conforme normas de segurança.",
    price: 25.90,
    originalPrice: 35.90,
    category: "epi",
    image: "/src/assets/screwdriver.jpg",
    brand: "KSEG",
    sku: "CAP-AM",
    inStock: true,
    rating: 4.8,
    reviews: 312,
    specifications: {
      material: "ABS resistente",
      weight: "400g",
      dimensions: "Ajustável",
      warranty: "12 meses"
    }
  },
  {
    id: "22",
    name: "Óculos de Proteção Transparente - KSEG",
    description: "Óculos de proteção para trabalhos com ferramentas elétricas e soldagem.",
    technicalDescription: "Óculos de proteção com lentes transparentes anti-risco e anti-UV. Armação em policarbonato resistente a impactos. Proteção lateral e sistema de ajuste ergonômico.",
    price: 18.90,
    originalPrice: 25.90,
    category: "epi",
    image: "/src/assets/screwdriver.jpg",
    brand: "KSEG",
    sku: "OCU-TR",
    inStock: true,
    rating: 4.6,
    reviews: 189,
    specifications: {
      material: "Policarbonato",
      weight: "50g",
      dimensions: "Universal",
      warranty: "12 meses"
    }
  },
  {
    id: "23",
    name: "Luvas de Segurança Manga Longa - KSEG",
    description: "Luvas de segurança para proteção das mãos em trabalhos com ferramentas.",
    technicalDescription: "Luvas de segurança em couro natural com manga longa para proteção total dos braços. Revestimento interno em algodão para conforto. Ideal para trabalhos com ferramentas elétricas e manuais.",
    price: 32.90,
    originalPrice: 42.90,
    category: "epi",
    image: "/src/assets/screwdriver.jpg",
    brand: "KSEG",
    sku: "LUV-ML",
    inStock: true,
    rating: 4.4,
    reviews: 145,
    specifications: {
      material: "Couro natural",
      dimensions: "Manga longa",
      warranty: "6 meses"
    }
  },
  {
    id: "24",
    name: "Botas de Segurança com Biqueira de Aço - KSEG",
    description: "Botas de segurança com biqueira de aço para proteção dos pés em obras.",
    technicalDescription: "Botas de segurança com biqueira de aço, solado antiderrapante e cano alto. Cabedal em couro natural resistente à água e óleo. Ideal para trabalhos em construção civil e indústria.",
    price: 89.90,
    originalPrice: 119.90,
    category: "epi",
    image: "/src/assets/screwdriver.jpg",
    brand: "KSEG",
    sku: "BOT-BQ",
    inStock: true,
    rating: 4.7,
    reviews: 223,
    specifications: {
      material: "Couro natural",
      weight: "800g",
      dimensions: "Cano alto",
      warranty: "12 meses"
    }
  },
  {
    id: "25",
    name: "Máscara de Proteção PFF2 - KSEG",
    description: "Máscara de proteção respiratória PFF2 para trabalhos com poeira e partículas.",
    technicalDescription: "Máscara de proteção respiratória PFF2 com filtro de alta eficiência. Elásticos ajustáveis e clip nasal para melhor vedação. Certificada conforme normas de segurança respiratória.",
    price: 12.90,
    originalPrice: 18.90,
    category: "epi",
    image: "/src/assets/screwdriver.jpg",
    brand: "KSEG",
    sku: "MAS-PFF2",
    inStock: true,
    rating: 4.5,
    reviews: 178,
    specifications: {
      material: "TNT + filtro",
      dimensions: "Universal",
      warranty: "6 meses"
    }
  },
  {
    id: "26",
    name: "Bancada Com Tampo de Compensado 2 Gavetas 200x60x92cm",
    description: "Bancada de trabalho profissional com tampo de compensado e 2 gavetas organizadoras.",
    technicalDescription: "Bancada de trabalho com tampo de compensado de 200x60cm, altura de 92cm. 2 gavetas organizadoras, estrutura em aço carbono pintado. Ideal para oficinas e trabalhos de marcenaria.",
    price: 1804.99,
    originalPrice: 2339.99,
    category: "bancadas",
    image: "/src/assets/screwdriver.jpg",
    brand: "FERCAR",
    sku: "202CD",
    inStock: true,
    rating: 4.8,
    reviews: 45,
    specifications: {
      dimensions: "200x60x92cm",
      material: "Aço carbono + compensado",
      warranty: "12 meses"
    }
  },
  {
    id: "27",
    name: "Mesa de Trabalho Ajustável 120x60cm - FERCAR",
    description: "Mesa de trabalho ajustável para diferentes alturas de trabalho.",
    technicalDescription: "Mesa de trabalho com tampo de 120x60cm, altura ajustável de 70 a 110cm. Estrutura em aço carbono com sistema de regulagem por parafuso. Ideal para trabalhos de precisão.",
    price: 459.90,
    originalPrice: 599.90,
    category: "bancadas",
    image: "/src/assets/screwdriver.jpg",
    brand: "FERCAR",
    sku: "MT-120",
    inStock: true,
    rating: 4.3,
    reviews: 89,
    specifications: {
      dimensions: "120x60cm",
      material: "Aço carbono",
      warranty: "12 meses"
    }
  },
  {
    id: "28",
    name: "Cavalete de Alumínio 2m - FERCAR",
    description: "Cavalete de alumínio leve e resistente para trabalhos em altura.",
    technicalDescription: "Cavalete de alumínio com altura de 2 metros, peso máximo de 150kg. Pernas dobráveis para fácil transporte e armazenamento. Ideal para trabalhos de pintura e manutenção.",
    price: 189.90,
    originalPrice: 249.90,
    category: "bancadas",
    image: "/src/assets/screwdriver.jpg",
    brand: "FERCAR",
    sku: "CAV-2M",
    inStock: true,
    rating: 4.6,
    reviews: 134,
    specifications: {
      dimensions: "2m altura",
      material: "Alumínio",
      weight: "8kg",
      warranty: "12 meses"
    }
  }
];

export const categories = [
  {
    id: "ferramentas-eletricas",
    name: "Ferramentas Elétricas",
    description: "Furadeiras, serras, esmerilhadeiras e mais",
    image: "/src/assets/drill-machine.jpg"
  },
  {
    id: "ferramentas-manuais",
    name: "Ferramentas Manuais",
    description: "Chaves, alicates, martelos e ferramentas básicas",
    image: "/src/assets/screwdriver.jpg"
  },
  {
    id: "acessorios",
    name: "Acessórios",
    description: "Discos, brocas, mandris e acessórios",
    image: "/src/assets/angle-grinder.jpg"
  },
  {
    id: "bancadas",
    name: "Bancadas",
    description: "Bancadas de trabalho e organizadores",
    image: "/src/assets/screwdriver.jpg"
  },
  {
    id: "epi",
    name: "EPI",
    description: "Equipamentos de proteção individual",
    image: "/src/assets/screwdriver.jpg"
  }
];

export const getProductsByCategory = (category: string) => {
  return products.filter(product => product.category === category);
};

export const getProductById = (id: string) => {
  return products.find(product => product.id === id);
};

export const searchProducts = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.brand.toLowerCase().includes(lowercaseQuery)
  );
};