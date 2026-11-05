import type { Metadata } from 'next';
import { HomeHero } from '@/components/home-hero';
import { siteDescription, siteOrigin, siteSocialImage, siteTitle } from '@/lib/site-config';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    type: 'website',
    siteName: 'Amlok',
    url: siteOrigin,
    images: [siteSocialImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: [siteSocialImage],
  },
};

export default function Home() {
  return <HomeHero />;
}
