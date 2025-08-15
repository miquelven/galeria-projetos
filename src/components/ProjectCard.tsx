import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowTopRightOnSquareIcon as ExternalLinkIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";

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
      whileHover={{ y: -6 }}
      className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl group"
    >
      {/* Project Image */}
      <div
        className="relative h-52 overflow-hidden bg-gray-100 cursor-pointer"
        onClick={handleImageClick}
      >
        {/* Loading Skeleton */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
        )}

        {/* Error Fallback */}
        {imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-center text-gray-400">
              <EyeIcon className="w-8 h-8 mx-auto mb-2" />
              <p className="text-sm font-medium">Preview indisponível</p>
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
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gray-900/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white text-gray-900 px-5 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-gray-50 transition-colors shadow-lg"
          >
            <ExternalLinkIcon className="w-4 h-4" />
            <span>Ver Demo</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
