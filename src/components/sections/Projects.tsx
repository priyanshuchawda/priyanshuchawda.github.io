import React, { useState } from 'react';
import { Github, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../../utils/animation';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  demoUrl: string;
  githubUrl: string;
  tags: string[];
  category: string[];
}

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const projects: Project[] = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A complete e-commerce solution with product management, cart functionality, payment processing, and user authentication.',
      image: 'https://images.pexels.com/photos/6956903/pexels-photo-6956903.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      demoUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      category: ['web', 'fullstack']
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'A productivity application for organizing tasks with features like drag-and-drop, categories, due dates, and reminders.',
      image: 'https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      demoUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      tags: ['React', 'Redux', 'Firebase'],
      category: ['web', 'frontend']
    },
    {
      id: 3,
      title: 'Fitness Tracking Dashboard',
      description: 'A comprehensive dashboard for tracking workouts, nutrition, and progress with data visualization and goal setting.',
      image: 'https://images.pexels.com/photos/5412270/pexels-photo-5412270.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      demoUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      tags: ['React', 'D3.js', 'Node.js', 'PostgreSQL'],
      category: ['web', 'fullstack', 'data']
    },
    {
      id: 4,
      title: 'Weather App',
      description: 'A weather application that provides current conditions and forecasts for locations worldwide using a weather API.',
      image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      demoUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      tags: ['JavaScript', 'HTML', 'CSS', 'API'],
      category: ['web', 'frontend']
    },
    {
      id: 5,
      title: 'Inventory Management System',
      description: 'A system for tracking inventory, managing orders, and generating reports for small businesses.',
      image: 'https://images.pexels.com/photos/4480452/pexels-photo-4480452.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      demoUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      tags: ['React', 'Express', 'MySQL', 'Charts.js'],
      category: ['web', 'fullstack', 'database']
    },
    {
      id: 6,
      title: 'Chat Application',
      description: 'A real-time chat application with features like user authentication, private messaging, and group channels.',
      image: 'https://images.pexels.com/photos/6253272/pexels-photo-6253272.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      demoUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      tags: ['React', 'Socket.io', 'Express', 'MongoDB'],
      category: ['web', 'fullstack', 'realtime']
    }
  ];

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'fullstack', label: 'Full Stack' },
    { id: 'data', label: 'Data' },
    { id: 'realtime', label: 'Real-time' },
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => project.category.includes(activeFilter));

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeIn('up')}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">My Projects</h2>
            <div className="w-20 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mb-6"></div>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Explore my recent projects showcasing my skills and experience in web development, from responsive interfaces to full-stack applications.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {filters.map((filter, index) => (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + (index * 0.1) }}
                key={filter.id}
                onClick={() => {
                  setActiveFilter(filter.id);
                  
                  // Track filter selection
                  import('../../utils/analytics').then(({ event }) => {
                    event({
                      action: 'filter',
                      category: 'projects',
                      label: filter.label,
                      user_properties: {
                        filter_id: filter.id,
                        filter_name: filter.label
                      }
                    });
                  });
                }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                  activeFilter === filter.id
                    ? 'bg-blue-600 dark:bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {filter.label}
              </motion.button>
            ))}
          </motion.div>
          
          <motion.div 
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, idx) => (
              <motion.div
                variants={fadeIn('up', idx * 0.1)}
                key={project.id}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                onViewportEnter={() => {
                  // Track when a project card enters the viewport (impression)
                  import('../../utils/analytics').then(({ event }) => {
                    event({
                      action: 'impression',
                      category: 'project',
                      label: project.title,
                      user_properties: {
                        project_id: project.id.toString(),
                        project_title: project.title,
                        project_category: project.category.join(',')
                      }
                    });
                  });
                }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <motion.div 
                  className="relative h-56 w-full overflow-hidden"
                  whileHover={{
                    transition: { duration: 0.4 }
                  }}
                >
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                
                <div className="p-6">
                  <motion.h3 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="text-xl font-bold mb-2 relative inline-block"
                  >
                    {project.title}
                    <motion.span 
                      className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 dark:bg-blue-400"
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      viewport={{ once: true }}
                    />
                  </motion.h3>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3"
                  >
                    {project.description}
                  </motion.p>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap gap-2 mb-4"
                  >
                    {project.tags.map((tag, index) => (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.3 + (index * 0.1) }}
                        viewport={{ once: true }}
                        whileHover={{ 
                          scale: 1.1, 
                          backgroundColor: "#3b82f6",
                          color: "white" 
                        }}
                        key={index}
                        className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 text-xs rounded-full transition-all"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="flex justify-between mt-4"
                  >
                    <motion.a
                      whileHover={{ scale: 1.05, x: -2 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      onClick={() => {
                        // Track GitHub link click
                        import('../../utils/analytics').then(({ trackOutboundLink, event }) => {
                          trackOutboundLink(project.githubUrl, 'GitHub Repository', 'project', true);
                          event({
                            action: 'click',
                            category: 'project',
                            label: `github_${project.title}`,
                            user_properties: {
                              project_id: project.id.toString(),
                              project_title: project.title,
                              project_category: project.category.join(',')
                            }
                          });
                        });
                      }}
                    >
                      <Github className="w-5 h-5 mr-1" />
                      Code
                    </motion.a>
                    
                    <motion.a
                      whileHover={{ scale: 1.05, x: 2 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.demoUrl}
                      onClick={() => {
                        // Track demo link click
                        import('../../utils/analytics').then(({ trackOutboundLink, event }) => {
                          trackOutboundLink(project.demoUrl, 'Live Demo', 'project', true);
                          event({
                            action: 'click',
                            category: 'project',
                            label: `demo_${project.title}`,
                            user_properties: {
                              project_id: project.id.toString(),
                              project_title: project.title,
                              project_category: project.category.join(',')
                            }
                          });
                        });
                      }}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <ExternalLink className="w-5 h-5 mr-1" />
                      Live Demo
                    </motion.a>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="text-center mt-12">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300"
            >
              <Github className="w-5 h-5 mr-2" />
              See More on GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;