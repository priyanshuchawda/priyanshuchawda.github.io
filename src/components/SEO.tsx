import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  type?: 'website' | 'article';
  canonicalUrl?: string;
  image?: string;
  keywords?: string;
  lang?: string;
  structuredData?: Record<string, any>;
  datePublished?: string;
  dateModified?: string;
  twitterHandle?: string;
  noIndex?: boolean;
}

const SEO: React.FC<SEOProps> = ({
  title = 'Priyanshu Chawda | Full Stack Developer & AI Explorer',
  description =
    'Portfolio of Priyanshu Chawda – crafting modern web experiences with React, Node.js, TypeScript, and AI-driven solutions.',
  type = 'website',
  canonicalUrl = '',
  image = '/images/og-image.jpg',
  keywords =
    'Priyanshu Chawda, Full Stack Developer, React, Node.js, TypeScript, AI, Portfolio, Web Development',
  lang = 'en',
  structuredData,
  datePublished,
  dateModified,
  twitterHandle = '@priyanshuchawda',
  noIndex = false,
}) => {
  const siteUrl = 'https://priyanshuchawda.com';
  const url = canonicalUrl ? `${siteUrl}${canonicalUrl}` : siteUrl;
  const imageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;

  const defaultSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Priyanshu Chawda',
    url: siteUrl,
    image: imageUrl,
    sameAs: [
      'https://github.com/priyanshuchawda',
      'https://linkedin.com/in/priyanshuchawda',
      'https://twitter.com/priyanshu_tech4',
    ],
    jobTitle: 'Full Stack Developer & AI Explorer',
    alumniOf: [
      {
        '@type': 'CollegeOrUniversity',
        name: 'PES Modern College of Engineering',
      },
    ],
    knowsAbout: [
      'React',
      'Node.js',
      'TypeScript',
      'JavaScript',
      'AI',
      'Data Science',
      'Competitive Programming',
    ],
  };

  const schema = structuredData || defaultSchema;

  return (
    <Helmet htmlAttributes={{ lang }}>
      {/* Primary Meta */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="author" content="Priyanshu Chawda" />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />
      <link rel="canonical" href={url} />

      {/* Mobile & Theme */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#2563eb" />
      <link rel="manifest" href="/manifest.json" />

      {/* Favicon */}
      <link rel="icon" href="/images/icons/favicon-32x32.png" sizes="32x32" />
      <link rel="icon" href="/images/icons/favicon-16x16.png" sizes="16x16" />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content="Priyanshu Chawda Portfolio" />
      {datePublished && <meta property="article:published_time" content={datePublished} />}
      {dateModified && <meta property="article:modified_time" content={dateModified} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Structured Data */}
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export default SEO;
