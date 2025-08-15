import React, { useState, useMemo, useCallback } from "react";
import { Tab } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CameraIcon,
  ShoppingBagIcon,
  HeartIcon,
  ComputerDesktopIcon,
  BuildingStorefrontIcon,
  ShieldCheckIcon,
  ScissorsIcon,
  BeakerIcon,
  PaintBrushIcon,
  CheckCircleIcon,
  StarIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import ProjectCard from "./ProjectCard";
import { categories, projects } from "../data/portfolioData";

const Portfolio: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [visibleProjects, setVisibleProjects] = useState(6);

  const categoryIcons: Record<string, any> = {
    restaurantes: BuildingStorefrontIcon,
    beleza: ScissorsIcon,
    tatuagem: PaintBrushIcon,
    petshop: HeartIcon,
    saude: HeartIcon,
    fotografia: CameraIcon,
    fitness: BeakerIcon,
    tecnologia: ShieldCheckIcon,
    agropecuaria: BeakerIcon,
    comercio: ShoppingBagIcon,
    digital: ComputerDesktopIcon,
  };

  // Preload das primeiras imagens da categoria ativa
  const preloadImages = useCallback((categoryId: string) => {
    const categoryProjects = projects[categoryId];
    if (categoryProjects) {
      categoryProjects.slice(0, 3).forEach((project) => {
        const img = new Image();
        img.src = project.image;
      });
    }
  }, []);

  // Memoiza os projetos filtrados para evitar recálculos
  const filteredProjects = useMemo(() => {
    const currentCategory = categories[selectedIndex];
    if (!currentCategory) return [];

    const categoryProjects = projects[currentCategory.id];
    if (!categoryProjects) return [];

    return categoryProjects.filter(
      (project) => !project.image.includes("unsplash.com")
    );
  }, [selectedIndex]);

  const handleTabChange = useCallback(
    (index: number) => {
      setSelectedIndex(index);
      setVisibleProjects(6);

      const newCategory = categories[index];
      if (newCategory) {
        preloadImages(newCategory.id);
      }
    },
    [preloadImages]
  );

  const loadMoreProjects = useCallback(() => {
    setVisibleProjects((prev) => prev + 6);
  }, []);

  // Preload inicial
  React.useEffect(() => {
    const initialCategory = categories[0];
    if (initialCategory) {
      preloadImages(initialCategory.id);
    }
  }, [preloadImages]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight"
            >
              Landing Pages que
              <span className="text-orange-500"> Convertem</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-gray-600 mb-8 leading-relaxed"
            >
              Layouts profissionais para impulsionar seu negócio digital.
              <br />
              Designs testados e otimizados para máxima conversão.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
            >
              Solicitar Orçamento
              <ArrowRightIcon className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Portfólio por Segmento
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore nossos layouts organizados por área de atuação
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <Tab.Group selectedIndex={selectedIndex} onChange={handleTabChange}>
              {/* Category Tabs */}
              <div className="border-b border-gray-200 p-8 bg-gray-50">
                <Tab.List className="flex flex-wrap gap-3 justify-center">
                  {categories.map((category, index) => {
                    const IconComponent =
                      categoryIcons[category.id as keyof typeof categoryIcons];
                    return (
                      <Tab key={category.id} className="focus:outline-none">
                        {({ selected }) => (
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`
                              flex items-center gap-2 px-5 py-3 rounded-lg font-semibold transition-all duration-200 cursor-pointer border
                              ${
                                selected
                                  ? "bg-gray-900 text-white shadow-lg border-gray-900"
                                  : "bg-white text-gray-700 hover:bg-gray-100 border-gray-300 hover:border-gray-400"
                              }
                            `}
                          >
                            <IconComponent className="w-4 h-4" />
                            <span className="text-sm">{category.name}</span>
                          </motion.div>
                        )}
                      </Tab>
                    );
                  })}
                </Tab.List>
              </div>

              {/* Projects Grid */}
              <Tab.Panels className="p-8">
                <AnimatePresence mode="wait">
                  {categories.map((category, index) => (
                    <Tab.Panel key={category.id} className="focus:outline-none">
                      {selectedIndex === index && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          {/* Category Info */}
                          <div className="text-center mb-12">
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">
                              {category.title}
                            </h3>
                            <p className="text-gray-600 text-lg">
                              {category.description}
                            </p>
                          </div>

                          {/* Projects */}
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {(() => {
                              const hasRealProjects =
                                filteredProjects.length > 0;

                              if (!hasRealProjects) {
                                return (
                                  <div className="col-span-full flex flex-col items-center justify-center py-20">
                                    <motion.div
                                      initial={{ opacity: 0, scale: 0.8 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      transition={{ duration: 0.6 }}
                                      className="text-center"
                                    >
                                      <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                                        <BeakerIcon className="w-10 h-10 text-gray-500" />
                                      </div>
                                      <h4 className="text-xl font-semibold text-gray-900 mb-3">
                                        Em Desenvolvimento
                                      </h4>
                                      <p className="text-gray-500 max-w-sm mx-auto">
                                        Novos layouts para esta categoria em
                                        breve!
                                      </p>
                                    </motion.div>
                                  </div>
                                );
                              }

                              return (
                                <>
                                  {filteredProjects
                                    .slice(0, visibleProjects)
                                    .map((project, projectIndex) => (
                                      <motion.div
                                        key={project.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                          duration: 0.4,
                                          delay: projectIndex * 0.05,
                                        }}
                                      >
                                        <ProjectCard project={project} />
                                      </motion.div>
                                    ))}

                                  {visibleProjects <
                                    filteredProjects.length && (
                                    <div className="col-span-full flex justify-center mt-12">
                                      <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={loadMoreProjects}
                                        className="bg-gray-100 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-200 border border-gray-300"
                                      >
                                        Ver Mais (
                                        {filteredProjects.length -
                                          visibleProjects}{" "}
                                        restantes)
                                      </motion.button>
                                    </div>
                                  )}
                                </>
                              );
                            })()}
                          </div>
                        </motion.div>
                      )}
                    </Tab.Panel>
                  ))}
                </AnimatePresence>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Pronto para Impulsionar seu Negócio?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Solicite um orçamento personalizado e receba sua landing page em
              até 48h
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-600 transition-all duration-300 shadow-lg"
              >
                Solicitar Orçamento
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
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
