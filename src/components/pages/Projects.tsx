import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import SEO from '../SEO';
import MainLayout from '../layouts/MainLayout';
import OptimizedImage from '../common/OptimizedImage';
import { projectsData } from '../../data/projects';

const Projects: React.FC = () => {
  return (
    <>
      <SEO
        title="Projects | Priyanshu Chawda"
        description="Explore my portfolio of web development and software engineering projects including websites, applications, and technical solutions."
        canonicalUrl="/projects"
      />
      <MainLayout>
        <section className="container mx-auto px-4 py-16">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            My Projects
          </motion.h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-12 text-center max-w-3xl mx-auto">
            Here's a collection of my recent work in web development and software engineering. Each project demonstrates different skills and technologies.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsData.map((project, index) => (
              <motion.div
                key={project.id}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >                <Link to={`/projects/${project.slug}`} className="block">
                  <div className="h-48 overflow-hidden">
                    <OptimizedImage
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                      width={400}
                      height={192}
                    />
                  </div>
                </Link>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">
                    <Link
                      to={`/projects/${project.slug}`}
                      className="hover:text-blue-600 transition-colors"
                    >
                      {project.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {project.description.length > 120
                      ? `${project.description.substring(0, 120)}...`
                      : project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="bg-gray-100 dark:bg-gray-700 text-xs px-2 py-1 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <Link
                      to={`/projects/${project.slug}`}
                      className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                    >
                      View Details
                    </Link>
                    <div className="flex gap-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
                          aria-label={`${project.title} GitHub repository`}
                        >
                          <Github size={20} />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
                          aria-label={`${project.title} live demo`}
                        >
                          <ExternalLink size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </MainLayout>
    </>
  );
};

export default Projects;
