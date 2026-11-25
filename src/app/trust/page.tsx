import type { Metadata } from 'next';
import { TrustCenter } from '@/components/trust-center';

export const metadata: Metadata = {
  title: 'Trust Center | Amlok',
  description: 'Explore Amlok security, privacy, controls, and due diligence resources.',
  alternates: { canonical: '/trust' },
  robots: { index: false, follow: false },
};

export default function TrustPage() {
  return <TrustCenter />;
}
