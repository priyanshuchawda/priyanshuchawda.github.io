import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Section from '../ui/Section';
import Card, { CardBody } from '../ui/Card';
import Badge from '../ui/Badge';
import OptimizedImage from '../common/OptimizedImage';
import { BlogPost } from '../../data/blog';

interface BlogPageProps {
  posts: BlogPost[];
}

const BlogPage: React.FC<BlogPageProps> = ({ posts }) => {
  const navigate = useNavigate();
  
  // Make sure we have valid posts to work with
  const validPosts = Array.isArray(posts) ? posts : [];
  
  const handlePostClick = (slug: string) => {
    navigate(`/blog/${slug}`);
  };

  return (
    <MainLayout>
      <Helmet>
        <title>Blog | Priyanshu Chawda</title>
        <meta name="description" content="Articles and thoughts on web development, programming, and technology" />
      </Helmet>

      <Section className="py-16">
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Blog</h1>
          <div className="w-20 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mb-6"></div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Sharing my thoughts, learnings, and experiences in web development and technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {validPosts.map((post) => (
            <Card 
              key={post.slug} 
              hoverable
              className="h-full cursor-pointer"
              onClick={() => handlePostClick(post.slug)}
            >
              <div className="h-48 overflow-hidden">
                <OptimizedImage
                  src={post.coverImage}
                  alt={post.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <CardBody>
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>{post.author}</span>
                  <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}</time>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </Section>
    </MainLayout>
  );
};

export default BlogPage;
