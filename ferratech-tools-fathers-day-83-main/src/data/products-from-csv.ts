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
    "id": "1",
    "name": "Furadeira de Impacto 18V 2.0Ah Bivolt",
    "description": "Furadeira de impacto profissional com bateria de 18V e 2.0Ah",
    "technicalDescription": "ideal para trabalhos pesados em madeira",
    "price": 0,
    "originalPrice": 0,
    "category": "velocidade de 0-600/0-2000 rpm",
    "image": "/src/assets/screwdriver.jpg",
    "brand": "mandril de 13mm. Sistema de bateria de 18V com 2.0Ah incluída. Equipada com LED para iluminação e empunhadura ergonômica anti-vibração.",
    "sku": "459.90",
    "inStock": false,
    "rating": "4.1",
    "reviews": 178,
    "specifications": {
      "power": "599.90",
      "voltage": "ferramentas-eletricas",
      "weight": "MAKITA",
      "dimensions": "DF331DW",
      "material": "18V",
      "warranty": "Bivolt"
    }
  },
  {
    "id": "2",
    "name": "Serra Circular 190mm 1.800W 220V",
    "description": "Serra circular profissional com alta potência para cortes precisos em madeira",
    "technicalDescription": "compensado e MDF.",
    "price": 0,
    "originalPrice": 0,
    "category": "profundidade máxima de corte de 65mm. Equipada com sistema de proteção da lâmina",
    "image": "/src/assets/screwdriver.jpg",
    "brand": "guia paralela e base em alumínio fundido. Inclui lâmina de corte para madeira.",
    "sku": "459.90",
    "inStock": true,
    "rating": "4.7",
    "reviews": 116,
    "specifications": {
      "power": "549.90",
      "voltage": "ferramentas-eletricas",
      "weight": "MAKITA",
      "dimensions": "5007MG",
      "material": "1.800W",
      "warranty": "220V"
    }
  },
  {
    "id": "3",
    "name": "Esmerilhadeira Angular 115mm 720W 220V",
    "description": "Esmerilhadeira angular compacta e potente para corte e desbaste em metal",
    "technicalDescription": "concreto e pedra.",
    "price": 0,
    "originalPrice": 0,
    "category": "diâmetro do disco de 115mm. Equipada com sistema de proteção contra reinício",
    "image": "/src/assets/screwdriver.jpg",
    "brand": "empunhadura lateral e sistema de troca rápida do disco.",
    "sku": "289.90",
    "inStock": true,
    "rating": "3.8",
    "reviews": 175,
    "specifications": {
      "power": "349.90",
      "voltage": "ferramentas-eletricas",
      "weight": "MAKITA",
      "dimensions": "GA4530",
      "material": "720W",
      "warranty": "220V"
    }
  },
  {
    "id": "4",
    "name": "Martelete Combinado 24mm 800W SDS-Plus",
    "description": "Martelete combinado profissional com sistema SDS-Plus para perfuração em concreto e alvenaria pesada.",
    "technicalDescription": "Martelete combinado com potência de 800W",
    "price": 0,
    "originalPrice": 0,
    "category": "899.90",
    "image": "/src/assets/screwdriver.jpg",
    "brand": "999.90",
    "sku": "ferramentas-eletricas",
    "inStock": true,
    "rating": "4.8",
    "reviews": 128,
    "specifications": {
      "power": "MAKITA",
      "voltage": "HR2470X21",
      "weight": "800W",
      "dimensions": "220V",
      "material": "2.8kg",
      "warranty": "320 x 85 x 210mm"
    }
  },
  {
    "id": "5",
    "name": "Serra Tico-Tico 110mm 500W 220V",
    "description": "Serra tico-tico versátil para cortes curvos e retos em madeira",
    "technicalDescription": "plástico e metal fino.",
    "price": 0,
    "originalPrice": 0,
    "category": "curso de 18mm. Equipada com sistema de inclinação de 0° a 45°",
    "image": "/src/assets/screwdriver.jpg",
    "brand": "base em alumínio fundido e sistema de aspiração de pó.",
    "sku": "189.90",
    "inStock": true,
    "rating": "3.4",
    "reviews": 139,
    "specifications": {
      "power": "229.90",
      "voltage": "ferramentas-eletricas",
      "weight": "MAKITA",
      "dimensions": "4329K",
      "material": "500W",
      "warranty": "220V"
    }
  },
  {
    "id": "6",
    "name": "Lixadeira Orbital 125mm 300W 220V",
    "description": "Lixadeira orbital para acabamentos finos em madeira",
    "technicalDescription": "plástico e metal.",
    "price": 0,
    "originalPrice": 0,
    "category": "diâmetro do disco de 125mm. Sistema de aspiração integrado e empunhadura ergonômica para maior conforto.",
    "image": "/src/assets/screwdriver.jpg",
    "brand": "159.90",
    "sku": "199.90",
    "inStock": true,
    "rating": "4.9",
    "reviews": 138,
    "specifications": {
      "power": "ferramentas-eletricas",
      "voltage": "BOSCH",
      "weight": "GSS1400",
      "dimensions": "300W",
      "material": "220V",
      "warranty": "1.2kg"
    }
  },
  {
    "id": "7",
    "name": "Parafusadeira 18V 1.5Ah Bivolt",
    "description": "Parafusadeira sem fio com bateria de lítio e carregador rápido. Ideal para trabalhos precisos.",
    "technicalDescription": "Parafusadeira com torque de 35Nm",
    "price": 0,
    "originalPrice": 0,
    "category": "299.90",
    "image": "/src/assets/screwdriver.jpg",
    "brand": "399.90",
    "sku": "ferramentas-eletricas",
    "inStock": false,
    "rating": "3.4",
    "reviews": 115,
    "specifications": {
      "power": "DEWALT",
      "voltage": "DCF887N",
      "weight": "18V",
      "dimensions": "Bivolt",
      "material": "1.1kg",
      "warranty": "180 x 65 x 170mm"
    }
  },
  {
    "id": "8",
    "name": "Compressor de Ar 2HP 50L 220V",
    "description": "Compressor de ar portátil para trabalhos pneumáticos e pintura.",
    "technicalDescription": "Compressor de ar com motor de 2HP",
    "price": 0,
    "originalPrice": 0,
    "category": "manômetro e válvula de segurança. Ideal para pistolas de pintura e ferramentas pneumáticas.",
    "image": "/src/assets/screwdriver.jpg",
    "brand": "799.90",
    "sku": "999.90",
    "inStock": true,
    "rating": "4.0",
    "reviews": 34,
    "specifications": {
      "power": "ferramentas-eletricas",
      "voltage": "SCHULZ",
      "weight": "CS50",
      "dimensions": "2HP",
      "material": "220V",
      "warranty": "35kg"
    }
  },
  {
    "id": "9",
    "name": "Jogo de Chaves Combinadas 6-32mm 12 Peças",
    "description": "Jogo completo de chaves combinadas profissionais em aço cromo-vanádio",
    "technicalDescription": "ideal para mecânica e manutenção.",
    "price": 0,
    "originalPrice": 8,
    "category": "10",
    "image": "/src/assets/screwdriver.jpg",
    "brand": "12",
    "sku": "14",
    "inStock": true,
    "rating": "4.4",
    "reviews": 131,
    "specifications": {
      "power": "17",
      "voltage": "19",
      "weight": "22",
      "dimensions": "24",
      "material": "27",
      "warranty": "30 e 32mm. Fabricadas em aço cromo-vanádio com tratamento térmico"
    }
  },
  {
    "id": "10",
    "name": "Chave Biela 14mm - GEDORE RED",
    "description": "Chave biela profissional de 14mm com cabo longo para maior torque e alcance.",
    "technicalDescription": "Chave biela de 14mm com cabo de 250mm",
    "price": 0,
    "originalPrice": 26.16,
    "category": "37.90",
    "image": "/src/assets/screwdriver.jpg",
    "brand": "ferramentas-manuais",
    "sku": "GEDORE",
    "inStock": true,
    "rating": "4.9",
    "reviews": 171,
    "specifications": {
      "power": "3301514",
      "dimensions": "250mm",
      "material": "Aço cromo-vanádio",
      "warranty": "Lifetime"
    }
  },
  {
    "id": "11",
    "name": "Martelo de Bola 1kg - GEDORE",
    "description": "Martelo de bola profissional para trabalhos de mecânica e construção.",
    "technicalDescription": "Martelo de bola com peso de 1kg",
    "price": 0,
    "originalPrice": 0,
    "category": "marcenaria e construção civil.",
    "image": "/src/assets/screwdriver.jpg",
    "brand": "45.90",
    "sku": "59.90",
    "inStock": false,
    "rating": "4.1",
    "reviews": 17,
    "specifications": {
      "power": "ferramentas-manuais",
      "voltage": "GEDORE",
      "weight": "GED-MB-1KG",
      "warranty": "1kg"
    }
  },
  {
    "id": "12",
    "name": "Alicate Universal 8\" - GEDORE",
    "description": "Alicate universal profissional para corte e torção de fios e cabos.",
    "technicalDescription": "Alicate universal de 8 polegadas (200mm)",
    "price": 0,
    "originalPrice": 32.9,
    "category": "42.90",
    "image": "/src/assets/screwdriver.jpg",
    "brand": "ferramentas-manuais",
    "sku": "GEDORE",
    "inStock": true,
    "rating": "4.2",
    "reviews": 43,
    "specifications": {
      "power": "GED-AU-8",
      "dimensions": "200mm",
      "material": "Aço cromo-vanádio",
      "warranty": "Lifetime"
    }
  },
  {
    "id": "13",
    "name": "Serra de Mão 24\" - GEDORE",
    "description": "Serra de mão profissional para corte em madeira e plástico.",
    "technicalDescription": "Serra de mão de 24 polegadas (600mm)",
    "price": 0,
    "originalPrice": 0,
    "category": "28.90",
    "image": "/src/assets/screwdriver.jpg",
    "brand": "38.90",
    "sku": "ferramentas-manuais",
    "inStock": true,
    "rating": "3.4",
    "reviews": 69,
    "specifications": {
      "power": "GEDORE",
      "voltage": "GED-SM-24",
      "material": "600mm",
      "warranty": "Aço carbono"
    }
  },
  {
    "id": "14",
    "name": "Trena 5m - GEDORE",
    "description": "Trena métrica profissional com fita de aço e case resistente.",
    "technicalDescription": "Trena métrica de 5 metros com fita de aço inoxidável",
    "price": 0,
    "originalPrice": 15.9,
    "category": "22.90",
    "image": "/src/assets/screwdriver.jpg",
    "brand": "ferramentas-manuais",
    "sku": "GEDORE",
    "inStock": false,
    "rating": "4.0",
    "reviews": 205,
    "specifications": {
      "power": "GED-TR-5M",
      "dimensions": "5m",
      "material": "Aço inoxidável",
      "warranty": "12 meses"
    }
  },
  {
    "id": "15",
    "name": "Nível de Bolha 60cm - GEDORE",
    "description": "Nível de bolha profissional para alinhamentos precisos.",
    "technicalDescription": "Nível de bolha de 60cm com corpo em alumínio extrudado",
    "price": 0,
    "originalPrice": 35.9,
    "category": "45.90",
    "image": "/src/assets/screwdriver.jpg",
    "brand": "ferramentas-manuais",
    "sku": "GEDORE",
    "inStock": false,
    "rating": "4.8",
    "reviews": 70,
    "specifications": {
      "power": "GED-NB-60",
      "dimensions": "60cm",
      "material": "Alumínio",
      "warranty": "Lifetime"
    }
  },
  {
    "id": "16",
    "name": "Jogo De Brocas Multiconstrução HEX-9 Com 5 Peças",
    "description": "Jogo de brocas multiconstrução para perfuração em diversos materiais.",
    "technicalDescription": "Jogo de 5 brocas multiconstrução com medidas 4",
    "price": 5,
    "originalPrice": 6,
    "category": "6 e 8mm. Sistema HEX-9 para maior estabilidade e precisão. Ideal para perfuração em madeira",
    "image": "/src/assets/screwdriver.jpg",
    "brand": "metal",
    "sku": "plástico e alvenaria.",
    "inStock": true,
    "rating": "4.7",
    "reviews": 87,
    "specifications": {
      "power": "94.99",
      "voltage": "149.99",
      "weight": "acessorios",
      "dimensions": "BOSCH",
      "material": "2608900585000"
    }
  },
  {
    "id": "17",
    "name": "Disco de Corte de Tungstênio para Madeira 110mm x 20mm",
    "description": "Disco de corte especializado para madeira",
    "technicalDescription": "compensado e MDF com alta durabilidade.",
    "price": 0,
    "originalPrice": 0,
    "category": "MDF e aglomerado. Dentes de tungstênio soldados para máxima durabilidade.",
    "image": "/src/assets/screwdriver.jpg",
    "brand": "48.36",
    "sku": "64.90",
    "inStock": false,
    "rating": "3.1",
    "reviews": 165,
    "specifications": {
      "power": "acessorios",
      "voltage": "CORTAG",
      "weight": "61346",
      "warranty": "110mm x 20mm"
    }
  },
  {
    "id": "18",
    "name": "Conjunto Mandril S13 (13mm) com Chave e Adaptador SDS-Plus",
    "description": "Conjunto completo de mandril para furadeiras e parafusadeiras profissionais.",
    "technicalDescription": "Mandril de 13mm com sistema de aperto rápido",
    "price": 0,
    "originalPrice": 73.06,
    "category": "105.99",
    "image": "/src/assets/screwdriver.jpg",
    "brand": "acessorios",
    "sku": "MAKITA",
    "inStock": true,
    "rating": "4.3",
    "reviews": 181,
    "specifications": {
      "power": "B-12887",
      "dimensions": "13mm",
      "material": "Aço temperado",
      "warranty": "12 meses"
    }
  },
  {
    "id": "19",
    "name": "Maleta Modular Makpac 1 29",
    "description": "5 x 39",
    "technicalDescription": "5 x 10",
    "price": 5,
    "originalPrice": 0,
    "category": "Maleta modular Makpac com dimensões 29",
    "image": "/src/assets/screwdriver.jpg",
    "brand": "5 x 39",
    "sku": "5 x 10",
    "inStock": true,
    "rating": "4.4",
    "reviews": 88,
    "specifications": {
      "power": "5 cm. Sistema de encaixe modular",
      "voltage": "resistente a impactos e intempéries. Ideal para organização e transporte seguro de ferramentas.",
      "weight": "159.59",
      "dimensions": "264.90",
      "material": "acessorios",
      "warranty": "MAKITA"
    }
  },
  {
    "id": "20",
    "name": "Carregador de Bateria Duplo DC18RD 110 Volts",
    "description": "Carregador duplo para baterias de 18V com sistema de carregamento rápido.",
    "technicalDescription": "Carregador duplo para baterias de 18V",
    "price": 0,
    "originalPrice": 294.49,
    "category": "351.90",
    "image": "/src/assets/screwdriver.jpg",
    "brand": "acessorios",
    "sku": "MAKITA",
    "inStock": true,
    "rating": "4.1",
    "reviews": 203,
    "specifications": {
      "power": "196928-9",
      "voltage": "110V",
      "dimensions": "0.8kg",
      "material": "150 x 80 x 60mm",
      "warranty": "Plástico resistente"
    }
  },
  {
    "id": "21",
    "name": "Capacete de Segurança Amarelo - KSEG",
    "description": "Capacete de segurança certificado para proteção contra impactos na construção civil.",
    "technicalDescription": "Capacete de segurança em ABS resistente a impactos",
    "price": 0,
    "originalPrice": 25.9,
    "category": "35.90",
    "image": "/src/assets/screwdriver.jpg",
    "brand": "epi",
    "sku": "KSEG",
    "inStock": true,
    "rating": "4.9",
    "reviews": 184,
    "specifications": {
      "power": "CAP-AM",
      "dimensions": "400g",
      "material": "Ajustável",
      "warranty": "ABS resistente"
    }
  },
  {
    "id": "22",
    "name": "Óculos de Proteção Transparente - KSEG",
    "description": "Óculos de proteção para trabalhos com ferramentas elétricas e soldagem.",
    "technicalDescription": "Óculos de proteção com lentes transparentes anti-risco e anti-UV. Armação em policarbonato resistente a impactos. Proteção lateral e sistema de ajuste ergonômico.",
    "price": 18.9,
    "originalPrice": 25.9,
    "category": "epi",
    "image": "/src/assets/screwdriver.jpg",
    "brand": "KSEG",
    "sku": "OCU-TR",
    "inStock": true,
    "rating": "3.3",
    "reviews": 92,
    "specifications": {
      "weight": "50g",
      "dimensions": "Universal",
      "material": "Policarbonato",
      "warranty": "12 meses"
    }
  },
  {
    "id": "23",
    "name": "Luvas de Segurança Manga Longa - KSEG",
    "description": "Luvas de segurança para proteção das mãos em trabalhos com ferramentas.",
    "technicalDescription": "Luvas de segurança em couro natural com manga longa para proteção total dos braços. Revestimento interno em algodão para conforto. Ideal para trabalhos com ferramentas elétricas e manuais.",
    "price": 32.9,
    "originalPrice": 42.9,
    "category": "epi",
    "image": "/src/assets/screwdriver.jpg",
    "brand": "KSEG",
    "sku": "LUV-ML",
    "inStock": true,
    "rating": "3.7",
    "reviews": 185,
    "specifications": {
      "weight": "Manga longa",
      "dimensions": "Couro natural",
      "material": "6 meses",
      "warranty": "safety-gloves.jpg"
    }
  },
  {
    "id": "24",
    "name": "Botas de Segurança com Biqueira de Aço - KSEG",
    "description": "Botas de segurança com biqueira de aço para proteção dos pés em obras.",
    "technicalDescription": "Botas de segurança com biqueira de aço",
    "price": 0,
    "originalPrice": 89.9,
    "category": "119.90",
    "image": "/src/assets/screwdriver.jpg",
    "brand": "epi",
    "sku": "KSEG",
    "inStock": true,
    "rating": "4.4",
    "reviews": 25,
    "specifications": {
      "power": "BOT-BQ",
      "dimensions": "800g",
      "material": "Cano alto",
      "warranty": "Couro natural"
    }
  },
  {
    "id": "25",
    "name": "Máscara de Proteção PFF2 - KSEG",
    "description": "Máscara de proteção respiratória PFF2 para trabalhos com poeira e partículas.",
    "technicalDescription": "Máscara de proteção respiratória PFF2 com filtro de alta eficiência. Elásticos ajustáveis e clip nasal para melhor vedação. Certificada conforme normas de segurança respiratória.",
    "price": 12.9,
    "originalPrice": 18.9,
    "category": "epi",
    "image": "/src/assets/screwdriver.jpg",
    "brand": "KSEG",
    "sku": "MAS-PFF2",
    "inStock": true,
    "rating": "4.3",
    "reviews": 143,
    "specifications": {
      "weight": "Universal",
      "dimensions": "TNT + filtro",
      "material": "6 meses",
      "warranty": "face-mask.jpg"
    }
  },
  {
    "id": "26",
    "name": "Bancada Com Tampo de Compensado 2 Gavetas 200x60x92cm",
    "description": "Bancada de trabalho profissional com tampo de compensado e 2 gavetas organizadoras.",
    "technicalDescription": "Bancada de trabalho com tampo de compensado de 200x60cm",
    "price": 0,
    "originalPrice": 0,
    "category": "1804.99",
    "image": "/src/assets/screwdriver.jpg",
    "brand": "2339.99",
    "sku": "bancadas",
    "inStock": true,
    "rating": "4.8",
    "reviews": 173,
    "specifications": {
      "power": "FERCAR",
      "voltage": "202CD",
      "material": "200x60x92cm",
      "warranty": "Aço carbono + compensado"
    }
  },
  {
    "id": "27",
    "name": "Mesa de Trabalho Ajustável 120x60cm - FERCAR",
    "description": "Mesa de trabalho ajustável para diferentes alturas de trabalho.",
    "technicalDescription": "Mesa de trabalho com tampo de 120x60cm",
    "price": 0,
    "originalPrice": 459.9,
    "category": "599.90",
    "image": "/src/assets/screwdriver.jpg",
    "brand": "bancadas",
    "sku": "FERCAR",
    "inStock": true,
    "rating": "3.4",
    "reviews": 161,
    "specifications": {
      "power": "MT-120",
      "dimensions": "120x60cm",
      "material": "Aço carbono",
      "warranty": "12 meses"
    }
  },
  {
    "id": "28",
    "name": "Cavalete de Alumínio 2m - FERCAR",
    "description": "Cavalete de alumínio leve e resistente para trabalhos em altura.",
    "technicalDescription": "Cavalete de alumínio com altura de 2 metros",
    "price": 0,
    "originalPrice": 189.9,
    "category": "249.90",
    "image": "/src/assets/screwdriver.jpg",
    "brand": "bancadas",
    "sku": "FERCAR",
    "inStock": true,
    "rating": "3.3",
    "reviews": 131,
    "specifications": {
      "power": "CAV-2M",
      "dimensions": "2m altura",
      "material": "Alumínio",
      "warranty": "12 meses"
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
