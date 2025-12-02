import React, { useState, useMemo, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ComputerDesktopIcon,
  CheckCircleIcon,
  StarIcon,
  ChatBubbleLeftRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  Bars3Icon,
  XMarkIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";
import ProjectCard from "./ProjectCard";
import { projects } from "../data/portfolioData";
import logo from "../assets/logo/logo.png";

interface PortfolioProps {
  onNavigateToPricing: () => void;
}

const Portfolio: React.FC<PortfolioProps> = ({ onNavigateToPricing }) => {
  const [visibleProjects, setVisibleProjects] = useState(6);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Carregar preferência do localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme) {
      setDarkMode(JSON.parse(savedTheme));
    }
  }, []);

  // Salvar preferência no localStorage
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // WhatsApp number and message
  const whatsappNumber = "5519989357148";
  const whatsappMessage =
    "Olá! Gostaria de solicitar um orçamento para uma landing page.";

  const handleWhatsAppClick = (plan?: string) => {
    const message = plan
      ? `Olá! Gostaria de solicitar um orçamento para o plano ${plan}.`
      : whatsappMessage;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  // Scroll to pricing section
  const scrollToPricing = () => {
    const pricingSection = document.getElementById("pricing-section");
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const allProjects = useMemo(() => {
    return Object.values(projects)
      .flat()
      .filter((project) => !project.image.includes("unsplash.com"));
  }, []);

  // Lista de projetos (todas as categorias)
  const filteredProjects = allProjects;

  const loadMoreProjects = useCallback(() => {
    setVisibleProjects((prev) => prev + 6);
  }, []);

  // Preload inicial removido com listagem global

  const plans = [
    {
      name: "Plano Essencial",
      price: "R$ 500",
      description: "Site básico, mas profissional.",
      popular: false,
      features: [
        "1 página simples",
        "Sobre + serviços",
        "Contato/WhatsApp",
        "Responsivo",
        "Design básico usando seu template",
      ],
      notIncluded: [],
    },
    {
      name: "Landing Page Profissional",
      price: "R$ 1.000",
      description: "Perfeito para 90% dos sites.",
      popular: true,
      features: [
        "1 página completa e bonita",
        "Design personalizado",
        "Galeria / Portfólio",
        "SEO básico",
        "Sessão de depoimentos",
        "Sessão de serviços",
        "Chamadas para agendamento",
      ],
      notIncluded: [],
    },
    {
      name: "Site Personalizado",
      price: "R$ 2.500",
      description: "Excelente para projetos maiores.",
      popular: false,
      features: [
        "Site completo (3 a 6 páginas)",
        "Design totalmente exclusivo",
        "Sistema de agendamento completo",
        "Otimização de performance",
        "Ajustes extras",
        "30 dias de suporte",
      ],
      notIncluded: [],
    },
  ];

  const faqData = [
    {
      question: "O que inclui a manutenção?",
      answer:
        "A manutenção cobre atualizações do site, correção de pequenos bugs, backups periódicos e suporte técnico. É um serviço mensal que garante que seu site funcione sempre bem.",
    },
    {
      question: "Como funciona a integração com Google Analytics / Pixel?",
      answer:
        "Instalamos os códigos de acompanhamento no seu site para monitorar visitantes, analisar métricas e otimizar campanhas de marketing digital.",
    },
    {
      question: "Preciso comprar domínio e hospedagem separadamente?",
      answer:
        "Sim, o domínio e hospedagem são pagos diretamente pelo cliente, mas incluímos a configuração completa como serviço adicional, garantindo que o site funcione perfeitamente.",
    },
    {
      question: "O site será responsivo?",
      answer:
        "Sim! O site vai funcionar e aparecer certinho em qualquer aparelho, seja celular, tablet ou computador.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div
      className={`min-h-screen relative transition-colors duration-300 ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      {/* Header */}
      <header
        className={`shadow-sm border-b sticky top-0 z-40 transition-colors duration-300 ${
          darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center"
              >
                <img
                  src={logo}
                  alt="Logo"
                  className="h-16 w-auto transition-colors duration-200"
                />
              </motion.div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="#portfolio"
                onClick={(e) => {
                  e.preventDefault();
                  const portfolioSection = document.getElementById("portfolio");
                  if (portfolioSection) {
                    portfolioSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className={`font-medium transition-colors duration-200 ${
                  darkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Modelos de Layouts
              </a>
              <a
                href="#pricing"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToPricing();
                }}
                className={`font-medium transition-colors duration-200 ${
                  darkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Preços
              </a>
              <a
                href="#faq"
                onClick={(e) => {
                  e.preventDefault();
                  const faqSection = document.getElementById("faq");
                  if (faqSection) {
                    faqSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className={`font-medium transition-colors duration-200 ${
                  darkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                FAQ
              </a>

              {/* Dark Mode Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleDarkMode}
                className={`hidden p-2 rounded-lg transition-colors duration-200 ${
                  darkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                title={darkMode ? "Modo Claro" : "Modo Escuro"}
              >
                {darkMode ? (
                  <SunIcon className="w-5 h-5" />
                ) : (
                  <MoonIcon className="w-5 h-5" />
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleWhatsAppClick()}
                className="bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-all duration-300 flex items-center gap-2"
              >
                <ChatBubbleLeftRightIcon className="w-4 h-4" />
                Contato
              </motion.button>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleDarkMode}
                className={`hidden p-2 rounded-lg transition-colors duration-200 ${
                  darkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {darkMode ? (
                  <SunIcon className="w-5 h-5" />
                ) : (
                  <MoonIcon className="w-5 h-5" />
                )}
              </motion.button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 transition-colors duration-200 ${
                  darkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {mobileMenuOpen ? (
                  <XMarkIcon className="w-6 h-6" />
                ) : (
                  <Bars3Icon className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="md:hidden border-t border-gray-200 py-4"
              >
                <div className="flex flex-col space-y-4">
                  <a
                    href="#portfolio"
                    onClick={(e) => {
                      e.preventDefault();
                      const portfolioSection =
                        document.getElementById("portfolio");
                      if (portfolioSection) {
                        portfolioSection.scrollIntoView({ behavior: "smooth" });
                      }
                      setMobileMenuOpen(false);
                    }}
                    className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
                  >
                    Modelos de Layouts
                  </a>
                  <a
                    href="#pricing"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToPricing();
                      setMobileMenuOpen(false);
                    }}
                    className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
                  >
                    Preços
                  </a>
                  <a
                    href="#faq"
                    onClick={(e) => {
                      e.preventDefault();
                      const faqSection = document.getElementById("faq");
                      if (faqSection) {
                        faqSection.scrollIntoView({ behavior: "smooth" });
                      }
                      setMobileMenuOpen(false);
                    }}
                    className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
                  >
                    FAQ
                  </a>
                  <button
                    onClick={() => {
                      handleWhatsAppClick();
                      setMobileMenuOpen(false);
                    }}
                    className="bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-all duration-300 flex items-center gap-2 w-fit"
                  >
                    <ChatBubbleLeftRightIcon className="w-4 h-4" />
                    Contato
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Fixed WhatsApp Button */}
      <motion.button
        onClick={() => handleWhatsAppClick()}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
        title="Falar no WhatsApp"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
        </svg>
        <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
          Falar no WhatsApp
        </div>
      </motion.button>

      {/* Hero Section */}
      <section
        className={`border-b transition-colors duration-300 ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={`text-4xl md:text-6xl font-bold mb-6 leading-tight transition-colors duration-300 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Sites que
              <span className="text-orange-500"> Convertem</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`text-xl mb-8 leading-relaxed transition-colors duration-300 ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Layouts profissionais para impulsionar seu negócio digital.
              <br />
              Designs testados e otimizados para máxima conversão.
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleWhatsAppClick()}
                className="bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-600 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <ChatBubbleLeftRightIcon className="w-5 h-5" />
                Solicitar Orçamento
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToPricing}
                className="bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                Ver Preços
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className={`text-3xl font-bold mb-4 transition-colors duration-300 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Alguns Layouts Modelos
            </h2>
          </div>

          <div
            className={`rounded-2xl shadow-lg border overflow-hidden transition-colors duration-300 ${
              darkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            }`}
          >
            <div className={`p-8 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects
                  .slice(0, visibleProjects)
                  .map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <ProjectCard project={project} />
                    </motion.div>
                  ))}
              </div>

              {visibleProjects < filteredProjects.length && (
                <div className="text-center mt-12">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={loadMoreProjects}
                    className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                      darkMode
                        ? "bg-orange-500 text-white hover:bg-orange-600"
                        : "bg-gray-900 text-white hover:bg-gray-800"
                    }`}
                  >
                    Carregar Mais Projetos
                  </motion.button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section
        id="pricing-section"
        className={`py-20 transition-colors duration-300 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`text-4xl font-bold mb-4 transition-colors duration-300 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Escolha o Serviço Ideal
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className={`text-xl max-w-3xl mx-auto transition-colors duration-300 ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Sites profissionais que convertem visitantes em clientes. Todos os
              planos incluem design responsivo e otimização para conversão.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative rounded-2xl shadow-lg border-2 p-8 transition-colors duration-300 ${
                  darkMode
                    ? "bg-gray-700 border-gray-600"
                    : "bg-white border-gray-200"
                } ${
                  plan.popular
                    ? darkMode
                      ? "border-orange-500"
                      : "border-orange-500"
                    : ""
                } ${plan.popular ? "transform scale-105" : ""}`}
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
                  <h3
                    className={`text-2xl font-bold mb-2 transition-colors duration-300 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {plan.name}
                  </h3>
                  <div
                    className={`text-4xl font-bold mb-2 transition-colors duration-300 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {plan.price}
                  </div>
                  <p
                    className={`transition-colors duration-300 ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {plan.description}
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  <div>
                    <h4
                      className={`font-semibold mb-3 transition-colors duration-300 ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      ✅ Incluído:
                    </h4>
                    <ul className="space-y-2">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span
                            className={`transition-colors duration-300 ${
                              darkMode ? "text-gray-300" : "text-gray-700"
                            }`}
                          >
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {plan.notIncluded.length > 0 && (
                    <div>
                      <h4
                        className={`font-semibold mb-3 transition-colors duration-300 ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        ❌ Não incluído:
                      </h4>
                      <ul className="space-y-2">
                        {plan.notIncluded.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <div className="h-5 w-5 text-red-400 mr-3 mt-0.5 flex-shrink-0">
                              ✕
                            </div>
                            <span
                              className={`transition-colors duration-300 ${
                                darkMode ? "text-gray-400" : "text-gray-500"
                              }`}
                            >
                              {feature}
                            </span>
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
                      ? "bg-orange-500 hover:bg-orange-600 text-white"
                      : "bg-gray-900 hover:bg-gray-800 text-white"
                  }`}
                >
                  Solicitar Orçamento
                </button>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className={`rounded-2xl p-8 mb-16 transition-colors duration-300 ${
              darkMode ? "bg-gray-700" : "bg-gray-50"
            }`}
          >
            <h3
              className={`text-2xl font-bold mb-8 text-center transition-colors duration-300 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Serviços Adicionais
            </h3>
            <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6">
              <div
                className={`text-center p-6 rounded-xl shadow hover:shadow-lg transition-all duration-300 ${
                  darkMode ? "bg-gray-600 hover:bg-gray-500" : "bg-white"
                }`}
              >
                <div
                  className={`text-lg font-semibold mb-2 transition-colors duration-300 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Manutenção
                </div>
                <div className="text-2xl font-bold text-orange-500 mb-2">
                  R$ 99,90
                </div>
                <p
                  className={`text-sm transition-colors duration-300 ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Atualizações e suporte
                </p>
              </div>

              <div
                className={`text-center p-6 rounded-xl shadow hover:shadow-lg transition-all duration-300 ${
                  darkMode ? "bg-gray-600 hover:bg-gray-500" : "bg-white"
                }`}
              >
                <div
                  className={`text-lg font-semibold mb-2 transition-colors duration-300 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Google Analytics / Pixel
                </div>
                <div className="text-2xl font-bold text-orange-500 mb-2">
                  R$ 149,90
                </div>
                <p
                  className={`text-sm transition-colors duration-300 ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Monitoramento e anúncios
                </p>
              </div>

              <div
                className={`text-center p-6 rounded-xl shadow hover:shadow-lg transition-all duration-300 ${
                  darkMode ? "bg-gray-600 hover:bg-gray-500" : "bg-white"
                }`}
              >
                <div
                  className={`text-lg font-semibold mb-2 transition-colors duration-300 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Domínio + Hospedagem
                </div>
                <div className="text-2xl font-bold text-orange-500 mb-2">
                  R$ 199,90
                </div>
                <p
                  className={`text-sm transition-colors duration-300 ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Configuração completa
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="faq" className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-xl text-gray-300">
              Tire suas dúvidas sobre nossos serviços
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-700 transition-colors duration-200"
                >
                  <span className="text-lg font-semibold text-white">
                    {faq.question}
                  </span>
                  {openFAQ === index ? (
                    <ChevronUpIcon className="w-6 h-6 text-orange-500" />
                  ) : (
                    <ChevronDownIcon className="w-6 h-6 text-gray-400" />
                  )}
                </button>
                {openFAQ === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-4"
                  >
                    <p className="text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-900 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Pronto para Transformar seu Negócio?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Não perca mais clientes por falta de presença digital
              profissional. Vamos criar seu site hoje mesmo!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleWhatsAppClick()}
                className="bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-600 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <ChatBubbleLeftRightIcon className="w-5 h-5" />
                Solicitar Orçamento
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToPricing}
                className="border-2 border-gray-300 text-gray-300 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-300 hover:text-gray-900 transition-all duration-300"
              >
                Ver Preços
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()}. Transformando ideias em conversões.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
