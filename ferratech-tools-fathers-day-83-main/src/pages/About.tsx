import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const [cartItems] = useState([]);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-heading font-bold text-text-primary mb-8">Sobre a FerraTech</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-text-secondary font-sans leading-relaxed mb-6">
              A FerraTech Ferramentas é uma empresa com mais de 52 anos de tradição no mercado de ferramentas profissionais. 
              Nossa missão é fornecer as melhores ferramentas e equipamentos para profissionais e entusiastas do faça-você-mesmo.
            </p>
            
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">Nossa História</h2>
            <p className="text-text-secondary font-sans mb-6">
              Fundada em 1972, a FerraTech começou como uma pequena loja de ferramentas no centro da cidade. 
              Ao longo dos anos, expandimos nossas operações para atender todo o Brasil, sempre mantendo 
              o compromisso com a qualidade e o atendimento personalizado.
            </p>
            
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">Nossos Valores</h2>
            <ul className="list-disc list-inside text-text-secondary font-sans mb-6 space-y-2">
              <li><strong className="text-text-primary">Qualidade:</strong> Trabalhamos apenas com as melhores marcas do mercado</li>
              <li><strong className="text-text-primary">Confiança:</strong> Mais de 15.000 clientes satisfeitos</li>
              <li><strong className="text-text-primary">Inovação:</strong> Sempre buscando as tecnologias mais avançadas</li>
              <li><strong className="text-text-primary">Atendimento:</strong> Suporte especializado para cada necessidade</li>
            </ul>
            
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">Nossa Missão</h2>
            <p className="text-text-secondary font-sans mb-6">
              Fornecer ferramentas profissionais de alta qualidade, com preços competitivos e um atendimento 
              excepcional, contribuindo para o sucesso de nossos clientes em seus projetos.
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;