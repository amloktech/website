import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ContentPage } from '@/components/content-page';
import { findSitePage, sitePages } from '@/lib/site-content';
import { siteOrigin } from '@/lib/site-config';
import { blogPosts } from '@/content/blog-posts';
import '../content-pages.css';

export const dynamicParams = false;

export function generateStaticParams() {
  return sitePages.map(page => ({ slug: page.slug.split('/') }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = findSitePage(slug.join('/'));
  if (!page) notFound();
  const blogPost = blogPosts.find(post => page.slug === `blog/${post.slug}`);
  return {
    title: `${blogPost?.title || page.label} — AMLOK`,
    description: page.description,
    ...(blogPost ? { authors: [{ name: 'AMLOK', url: siteOrigin }] } : {}),
    alternates: { canonical: `/${page.slug}` },
    openGraph: {
      title: `${page.title} ${page.accent}`, description: page.description,
      type: page.kind === 'article' ? 'article' : 'website',
      ...(blogPost ? { authors: ['AMLOK'], publishedTime: blogPost.date } : {}),
      url: new URL(`/${page.slug}`, siteOrigin).href,
      images: [{ url: '/images/amlok-social-card.png', width: 1200, height: 630, alt: 'AMLOK — Infrastructure for risk intelligence' }],
    },
    twitter: { card: 'summary_large_image', images: ['/images/amlok-social-card.png'] },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const page = findSitePage(slug.join('/'));
  if (!page) notFound();
  return <ContentPage page={page} />;
}
