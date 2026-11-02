import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ContentPage } from '@/components/content-page';
import { findSitePage, sitePages } from '@/lib/site-content';
import { siteOrigin } from '@/lib/site-config';
import { blogPosts } from '@/content/blog-posts';
import { findPublication } from '@/lib/publications';
import '../content-pages.css';

export const dynamicParams = false;

export function generateStaticParams() {
  return sitePages.map(page => ({ slug: page.slug.split('/') }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = findSitePage(slug.join('/'));
  if (!page) notFound();
  const publication = findPublication(page.slug);
  const blogPost = blogPosts.find(post => page.slug === `blog/${post.slug}`);
  const socialImage = publication ? `/images/publications/${publication.slug.split('/').pop()}.png` : '/images/amlok-social-card.png';
  return {
    title: `${publication ? `${publication.title} ${publication.accent}` : blogPost?.title || page.label} — AMLOK`,
    description: page.description,
    ...(publication ? { authors: [{ name: 'AMLOK', url: siteOrigin }] } : {}),
    alternates: { canonical: `/${page.slug}` },
    openGraph: {
      title: `${page.title} ${page.accent}`, description: page.description,
      type: page.kind === 'article' ? 'article' : 'website',
      ...(publication ? { authors: ['AMLOK'], publishedTime: publication.date, modifiedTime: publication.date } : {}),
      url: new URL(`/${page.slug}`, siteOrigin).href,
      images: [{ url: socialImage, width: 1200, height: 630, alt: publication ? `${publication.title} ${publication.accent}` : 'AMLOK — Infrastructure for risk intelligence' }],
    },
    twitter: { card: 'summary_large_image', images: [socialImage] },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const page = findSitePage(slug.join('/'));
  if (!page) notFound();
  return <ContentPage page={page} />;
}
