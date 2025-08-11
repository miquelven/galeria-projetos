import React, { useState } from "react";
import { motion } from "framer-motion";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  previewUrl?: string;
  demoUrl?: string;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageClick = () => {
    if (project.demoUrl) {
      window.open(project.demoUrl, "_blank");
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl cursor-pointer"
      onClick={handleImageClick}
    >
      {/* Project Image */}
      <div className="relative h-64 overflow-hidden group bg-gray-100">
        {/* Loading Skeleton */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
        )}
        
        {/* Error Fallback */}
        {imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-center text-gray-500">
              <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
              <p className="text-sm">Imagem não disponível</p>
            </div>
          </div>
        )}
        
        {/* Main Image */}
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          decoding="async"
          onLoad={handleImageLoad}
          onError={handleImageError}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            contentVisibility: 'auto',
            containIntrinsicSize: '100% 256px'
          }}
        />

        {/* Overlay com efeito hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="bg-white text-gray-800 px-6 py-3 rounded-lg font-medium flex items-center gap-2 hover:bg-gray-100 transition-colors"
          >
            <span>Ver Projeto</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
