import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  { id: 1, title: 'Projet 1', description: 'Description du projet 1', image: 'https://source.unsplash.com/random/800x600?web' },
  { id: 2, title: 'Projet 2', description: 'Description du projet 2', image: 'https://source.unsplash.com/random/800x600?design' },
  { id: 3, title: 'Projet 3', description: 'Description du projet 3', image: 'https://source.unsplash.com/random/800x600?code' },
];

const Portfolio = () => {
  return (
    <section id="portfolio" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl font-bold text-center mb-12"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Mon Portfolio
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="bg-gray-800 rounded-lg shadow-lg overflow-hidden"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-400">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;