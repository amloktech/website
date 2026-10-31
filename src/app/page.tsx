import type { Metadata } from 'next';
import { HomeHero } from '@/components/home-hero';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

export default function Home() {
  return <HomeHero />;
}
