import type { Metadata } from 'next';
import { BrandSystem } from '@/components/brand-system';

export const metadata: Metadata = {
  title: 'Amlok: Design system',
  description: 'The Amlok system for identity, web, marketing, and enterprise interfaces. Rounded surfaces, precise graphics, and clear signals.',
  robots: { index: false, follow: false },
};

export default function BrandPage() { return <BrandSystem />; }
