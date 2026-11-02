import data from '@/content/publications.json';

export type PublicationSource = { id: string; title: string; publisher: string; url: string; note: string };
export type PublicationFigure = {
  title: string; kind: 'bars' | 'flow'; label: string; caption: string; sources: string[];
  unit?: string; max?: number;
  values?: { label: string; value: number; display: string }[];
  steps?: { title: string; detail: string }[];
};
export type PublicationSection = {
  id: string; title: string; paragraphs: string[];
  bullets?: string[]; figure?: PublicationFigure;
  table?: { caption: string; headings: string[]; rows: string[][]; sources: string[] };
  takeaway?: string;
};
export type Publication = {
  slug: string; title: string; accent: string; description: string;
  format: 'Report' | 'Whitepaper' | 'Guide' | 'Article'; category: string; industry?: string;
  image: string; date: string; readMinutes: number;
  abstract: string; evidence: string; takeaways: string[];
  sections: PublicationSection[]; sources: PublicationSource[]; related: string[];
};
export const publications = data as Publication[];
export function findPublication(slug: string) { return publications.find(publication => publication.slug === slug); }
