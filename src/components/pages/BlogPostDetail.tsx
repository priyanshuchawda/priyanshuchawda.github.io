import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Calendar, User, Tag, Clock } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import Section from '../ui/Section';
import Badge from '../ui/Badge';
import OptimizedImage from '../common/OptimizedImage';
import LoadingState from '../ui/LoadingState';
import { BlogPost } from '../../data/blog';

interface BlogPostDetailProps {
  posts: BlogPost[];
}

const BlogPostDetail: React.FC<BlogPostDetailProps> = ({ posts }) => {
  const { slug } = useParams<{ slug: string }>();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<BlogPost | undefined>(undefined);

  useEffect(() => {
    // Simulate API loading time
    const timer = setTimeout(() => {
      const foundPost = posts.find((p) => p.slug === slug);
      setPost(foundPost);
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [posts, slug]);
  if (loading) {
    return (
      <MainLayout>
        <Section className="py-12">
          <LoadingState 
            message="Loading blog post..." 
            size="md" 
            color="blue"
            className="min-h-[60vh]" 
          />
        </Section>
      </MainLayout>
    );
  }

  if (!post) {
    return (
      <MainLayout>
        <Section className="py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-6">Post Not Found</h1>
            <p className="mb-6">Sorry, the blog post you're looking for doesn't exist.</p>
            <Link 
              to="/blog" 
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
          </div>
        </Section>
      </MainLayout>
    );
  }

  const readingTime = Math.max(1, Math.ceil(post.content.split(' ').length / 200));

  return (
    <MainLayout>
      <Helmet>
        <title>{post.title} | Priyanshu Chawda Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={`${post.title} | Priyanshu Chawda Blog`} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.coverImage} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content={post.author} />
        {post.tags.map((tag) => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
      </Helmet>

      <article>
        <header className="relative">
          <div className="h-64 md:h-96 overflow-hidden">
            <OptimizedImage
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
              priority={true}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          </div>

          <div className="container mx-auto px-4 relative -mt-32 mb-16">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-10">
              <Link 
                to="/blog" 
                className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-6"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Link>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{post.title}</h1>

              <div className="flex flex-wrap gap-4 items-center text-gray-600 dark:text-gray-300 mb-6">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                </div>

                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  {post.author}
                </div>

                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  {readingTime} min read
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </header>

        <Section className="py-8">
          <div className="prose prose-lg dark:prose-invert max-w-3xl mx-auto">
            {post.content.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </Section>
      </article>
    </MainLayout>
  );
};

export default BlogPostDetail;
