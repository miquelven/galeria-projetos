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
} from "@heroicons/react/24/outline";
import ProjectCard from "./ProjectCard";
import { categories, projects } from "../data/portfolioData";

const Portfolio: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [visibleProjects, setVisibleProjects] = useState(6); // Carrega 6 projetos inicialmente

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

  const handleTabChange = useCallback((index: number) => {
    setSelectedIndex(index);
    setVisibleProjects(6); // Reset para 6 projetos ao trocar de categoria
    
    // Preload das imagens da nova categoria
    const newCategory = categories[index];
    if (newCategory) {
      preloadImages(newCategory.id);
    }
  }, [preloadImages]);

  const loadMoreProjects = useCallback(() => {
    setVisibleProjects(prev => prev + 6);
  }, []);

  // Preload inicial
  React.useEffect(() => {
    const initialCategory = categories[0];
    if (initialCategory) {
      preloadImages(initialCategory.id);
    }
  }, [preloadImages]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="glass-effect shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4"
            >
              Portfólio de Layouts
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Layouts profissionais para impulsionar seu negócio digital
            </motion.p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="glass-effect rounded-3xl shadow-2xl overflow-hidden">
          <Tab.Group selectedIndex={selectedIndex} onChange={handleTabChange}>
            {/* Tabs Navigation */}
            <div className="gradient-bg p-6">
              <Tab.List className="flex flex-wrap gap-2 justify-center">
                {categories.map((category, index) => {
                  const IconComponent =
                    categoryIcons[category.id as keyof typeof categoryIcons];
                  return (
                    <Tab key={category.id} className="focus:outline-none">
                      {({ selected }) => (
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`
                            flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 cursor-pointer
                            ${
                              selected
                                ? "bg-white text-gray-800 shadow-lg"
                                : "bg-white/20 text-white hover:bg-white/30"
                            }
                            ${window.innerWidth < 768 ? "px-3 py-2" : ""}
                          `}
                        >
                          <IconComponent className="w-5 h-5" />
                          <span
                            className={`${
                              window.innerWidth < 768 ? "hidden" : "block"
                            }`}
                          >
                            {category.name}
                          </span>
                        </motion.div>
                      )}
                    </Tab>
                  );
                })}
              </Tab.List>
            </div>

            {/* Tab Panels */}
            <Tab.Panels className="p-8">
              <AnimatePresence mode="wait">
                {categories.map((category, index) => (
                  <Tab.Panel key={category.id} className="focus:outline-none">
                    {selectedIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                      >
                        {/* Category Header */}
                        <div className="text-center mb-12">
                          <h2 className="text-3xl font-bold text-gray-800 mb-4">
                            {category.title}
                          </h2>
                          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            {category.description}
                          </p>
                        </div>

                        {/* Projects Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                          {(() => {
                            const hasRealProjects = filteredProjects.length > 0;

                            if (!hasRealProjects) {
                              return (
                                <div className="col-span-full flex flex-col items-center justify-center py-16">
                                  <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.6 }}
                                    className="text-center"
                                  >
                                    <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                                      <BeakerIcon className="w-12 h-12 text-blue-500" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-700 mb-3">
                                      Desenvolvimento em Progresso
                                    </h3>
                                    <p className="text-gray-500 max-w-md mx-auto leading-relaxed">
                                      Esta categoria está sendo desenvolvida. Em
                                      breve teremos layouts incríveis para você!
                                    </p>
                                    <div className="mt-6 flex justify-center">
                                      <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                                        <div
                                          className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                                          style={{ animationDelay: "0.1s" }}
                                        ></div>
                                        <div
                                          className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"
                                          style={{ animationDelay: "0.2s" }}
                                        ></div>
                                      </div>
                                    </div>
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
                                      initial={{ opacity: 0, y: 30 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{
                                        duration: 0.6,
                                        delay: projectIndex * 0.1,
                                      }}
                                    >
                                      <ProjectCard project={project} />
                                    </motion.div>
                                  ))}
                                
                                {/* Load More Button */}
                                {visibleProjects < filteredProjects.length && (
                                  <div className="col-span-full flex justify-center mt-8">
                                    <motion.button
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                      onClick={loadMoreProjects}
                                      className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300"
                                    >
                                      Carregar Mais ({filteredProjects.length - visibleProjects} restantes)
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
      </main>

      {/* Footer */}
      <footer className="bg-gray-800/95 backdrop-blur-sm text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-300">
            © 2024 Portfólio de Layouts. Transformando ideias em realidade
            digital.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
