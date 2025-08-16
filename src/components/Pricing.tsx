import React from 'react';
import { motion } from 'framer-motion';
import {
  CheckIcon,
  XMarkIcon,
  StarIcon,
  ArrowLeftIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';

interface PricingProps {
  onBackToPortfolio: () => void;
}

const Pricing: React.FC<PricingProps> = ({ onBackToPortfolio }) => {
  const whatsappNumber = "5519989357148";
  
  const handleWhatsAppClick = (plan: string) => {
    const message = `Olá! Gostaria de solicitar um orçamento para o plano ${plan}.`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const plans = [
    {
      name: "Básico",
      price: "R$ 497",
      description: "Ideal para pequenos negócios que precisam de presença online",
      features: [
        "Landing page responsiva",
        "Design profissional",
        "Formulário de contato",
        "Integração WhatsApp",
        "Otimização para mobile",
        "Entrega em 3-5 dias",
      ],
      notIncluded: [
        "Domínio e hospedagem",
        "Múltiplas páginas",
        "Sistema de agendamento",
      ],
      popular: false,
      color: "gray",
    },
    {
      name: "Profissional",
      price: "R$ 897",
      description: "Para negócios que querem se destacar da concorrência",
      features: [
        "Tudo do plano Básico",
        "Design premium personalizado",
        "Até 3 páginas",
        "Galeria de imagens",
        "Mapa integrado",
        "Formulários avançados",
        "Otimização SEO básica",
        "Entrega em 5-7 dias",
      ],
      notIncluded: [
        "Domínio e hospedagem",
        "Sistema de agendamento",
      ],
      popular: true,
      color: "orange",
    },
    {
      name: "Premium",
      price: "R$ 1.497",
      description: "Solução completa para negócios que querem máxima conversão",
      features: [
        "Tudo do plano Profissional",
        "Sistema de agendamento",
        "Até 5 páginas",
        "Integração com redes sociais",
        "Chat online",
        "Analytics configurado",
        "Otimização SEO avançada",
        "1 mês de suporte gratuito",
        "Entrega em 7-10 dias",
      ],
      notIncluded: [
        "Domínio e hospedagem",
      ],
      popular: false,
      color: "blue",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={onBackToPortfolio}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Voltar ao Portfólio
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Preços e Pacotes</h1>
            <div></div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Escolha o Plano Ideal
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Landing pages profissionais que convertem visitantes em clientes.
            Todos os planos incluem design responsivo e otimização para conversão.
          </motion.p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-white rounded-2xl shadow-lg border-2 ${
                plan.popular ? 'border-orange-500' : 'border-gray-200'
              } p-8 ${plan.popular ? 'transform scale-105' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                    <StarIcon className="h-4 w-4 mr-1" />
                    Mais Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold text-gray-900 mb-2">{plan.price}</div>
                <p className="text-gray-600">{plan.description}</p>
              </div>

              <div className="space-y-4 mb-8">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">✅ Incluído:</h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {plan.notIncluded.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">❌ Não incluído:</h4>
                    <ul className="space-y-2">
                      {plan.notIncluded.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <XMarkIcon className="h-5 w-5 text-red-400 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-500">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <button
                onClick={() => handleWhatsAppClick(plan.name)}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                  plan.popular
                    ? 'bg-orange-500 hover:bg-orange-600 text-white'
                    : 'bg-gray-900 hover:bg-gray-800 text-white'
                }`}
              >
                Solicitar Orçamento
              </button>
            </motion.div>
          ))}
        </div>

        {/* Additional Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Serviços Adicionais
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-900 mb-2">Domínio + Hospedagem</div>
              <div className="text-2xl font-bold text-orange-500 mb-2">R$ 200/ano</div>
              <p className="text-gray-600 text-sm">Configuração completa</p>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-900 mb-2">Manutenção</div>
              <div className="text-2xl font-bold text-orange-500 mb-2">R$ 150/mês</div>
              <p className="text-gray-600 text-sm">Atualizações e suporte</p>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-900 mb-2">Logo Design</div>
              <div className="text-2xl font-bold text-orange-500 mb-2">R$ 300</div>
              <p className="text-gray-600 text-sm">Logo profissional</p>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-900 mb-2">Copywriting</div>
              <div className="text-2xl font-bold text-orange-500 mb-2">R$ 400</div>
              <p className="text-gray-600 text-sm">Textos persuasivos</p>
            </div>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Perguntas Frequentes
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Quanto tempo leva para ficar pronto?</h4>
              <p className="text-gray-600 mb-4">Entre 3 a 10 dias úteis, dependendo do plano escolhido e complexidade do projeto.</p>
              
              <h4 className="font-semibold text-gray-900 mb-2">Posso fazer alterações depois?</h4>
              <p className="text-gray-600 mb-4">Sim! Oferecemos revisões durante o desenvolvimento e serviços de manutenção pós-entrega.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">O que não está incluído?</h4>
              <p className="text-gray-600 mb-4">Domínio, hospedagem e conteúdo (textos e imagens) ficam por conta do cliente, mas podemos ajudar.</p>
              
              <h4 className="font-semibold text-gray-900 mb-2">Como é o processo de pagamento?</h4>
              <p className="text-gray-600">50% no início do projeto e 50% na entrega. Aceitamos PIX, cartão e transferência.</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Fixed WhatsApp Button */}
      <button
        onClick={() => handleWhatsAppClick('Geral')}
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-200 z-50"
        aria-label="Contato via WhatsApp"
      >
        <ChatBubbleLeftRightIcon className="h-6 w-6" />
      </button>
    </div>
  );
};

export default Pricing;