import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ContentPage } from '@/components/content-page';
import { findSitePage, sitePages } from '@/lib/site-content';
import { siteOrigin, siteSocialImage } from '@/lib/site-config';
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
  const socialImage = publication ? {
    url: `/images/publications/${publication.slug.split('/').pop()}.png`,
    width: 1200,
    height: 630,
    alt: `${publication.title} ${publication.accent}`,
  } : siteSocialImage;
  return {
    title: `${publication ? `${publication.title} ${publication.accent}` : blogPost?.title || page.label} | Amlok`,
    description: page.description,
    ...(publication ? { authors: [{ name: 'Amlok', url: siteOrigin }] } : {}),
    alternates: { canonical: `/${page.slug}` },
    openGraph: {
      title: `${page.title} ${page.accent}`, description: page.description,
      type: page.kind === 'article' ? 'article' : 'website',
      siteName: 'Amlok',
      ...(publication ? { authors: ['Amlok'] } : {}),
      url: new URL(`/${page.slug}`, siteOrigin).href,
      images: [socialImage],
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
