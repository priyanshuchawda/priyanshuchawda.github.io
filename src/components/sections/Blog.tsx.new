import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card, { CardBody } from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import OptimizedImage from '../common/OptimizedImage';
import { getFeaturedPosts } from '../../data/blog';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../../utils/animation';

const BlogSection: React.FC = () => {
  const navigate = useNavigate();
  const featuredPosts = getFeaturedPosts(3);

  const handlePostClick = (slug: string) => {
    navigate(`/blog/${slug}`);
  };

  const handleViewAllClick = () => {
    navigate('/blog');
  };
  
  return (
    <section id="blog" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeIn('up')}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Latest Articles</h2>
            <div className="w-20 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mb-6"></div>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Explore my thoughts on development, design, and technology trends
            </p>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          >
            {featuredPosts.map((post, idx) => (
              <motion.div 
                variants={fadeIn('up', idx * 0.1)}
                key={post.slug} 
                className="h-full cursor-pointer"
              >
                <Card 
                  hoverable 
                  className="h-full"
                  onClick={() => handlePostClick(post.slug)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <OptimizedImage
                        src={post.coverImage}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform"
                      />
                    </motion.div>
                  </div>
                  
                  <CardBody>
                    <motion.div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.slice(0, 3).map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </motion.div>
                    
                    <motion.h3 className="text-xl font-bold mb-2">
                      {post.title}
                    </motion.h3>
                    
                    <motion.p className="text-gray-600 dark:text-gray-300 mb-4 text-sm line-clamp-2">
                      {post.excerpt}
                    </motion.p>
                    
                    <motion.div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                      <span>{post.author}</span>
                      <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}</time>
                    </motion.div>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button onClick={handleViewAllClick} variant="primary" size="lg">
                View All Articles
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
