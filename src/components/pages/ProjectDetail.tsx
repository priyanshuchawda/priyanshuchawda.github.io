import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import SEO from '../SEO';
import MainLayout from '../layouts/MainLayout';
import OptimizedImage from '../common/OptimizedImage';
import ImageGallery, { ImageLightbox } from '../ui/ImageGallery';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import LoadingState from '../ui/LoadingState';
import { projectsData } from '../../data/projects';

const ProjectDetail: React.FC = () => {
  const { slug = '' } = useParams<{ slug: string }>();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState<typeof projectsData[0] | null>(null);
  
  useEffect(() => {
    // Simulate loading time with API call simulation
    const timer = setTimeout(() => {
      const foundProject = projectsData.find((p) => p.slug === slug);
      setProject(foundProject || null);
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [slug]);
    if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12">
          <LoadingState 
            message="Loading project details..." 
            size="md"
            color="blue"
            className="min-h-[70vh]"
          />
        </div>
      </MainLayout>
    );
  }
  
  // If project not found, show error
  if (!project) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
          <p className="mb-8">The project you're looking for doesn't exist.</p>          <Button
            href="/projects"
            isRouterLink
            variant="primary"
            leftIcon={<ArrowLeft size={20} />}
          >
            Back to Projects
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <>
      <SEO
        title={`${project.title} | Priyanshu Chawda`}
        description={project.description}
        image={project.imageUrl}
        canonicalUrl={`/projects/${project.slug}`}
        type="article"
      />
      <MainLayout>
        <article className="container mx-auto px-4 py-12 max-w-5xl">
          <div className="mb-8">            <Button
              href="/projects"
              isRouterLink
              variant="ghost"
              leftIcon={<ArrowLeft size={18} />}
              className="mb-4 p-0 hover:bg-transparent"
            >
              Back to all projects
            </Button>
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {project.title}
            </motion.h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="bg-gray-100 dark:bg-gray-800 text-sm px-3 py-1 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex gap-4 mb-8">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gray-900 hover:bg-black text-white font-medium px-4 py-2 rounded-lg transition-all"
                >
                  <Github size={18} />
                  GitHub
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-all"
                >
                  <ExternalLink size={18} />
                  Live Demo
                </a>
              )}
            </div>
          </div>          <motion.div
            className="mb-12 overflow-hidden rounded-xl shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <OptimizedImage
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-auto"
              width={1200}
              height={675}
            />
          </motion.div>

          <div className="prose prose-lg dark:prose-invert max-w-full">
            <h2>Project Overview</h2>
            <p>{project.overview}</p>

            {project.features && (
              <>
                <h2>Key Features</h2>
                <ul>
                  {project.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </>
            )}

            {project.challenges && (
              <>
                <h2>Challenges and Solutions</h2>
                <p>{project.challenges}</p>
              </>
            )}

            {project.outcome && (
              <>
                <h2>Outcome</h2>
                <p>{project.outcome}</p>
              </>
            )}
          </div>
        </article>
      </MainLayout>
    </>
  );
};

export default ProjectDetail;
