import content from '@/content/case-studies.json';

export type CaseStudy = {
  slug: string;
  institution: string;
  type: string;
  sector: string;
  period: string;
  title: string;
  summary: string;
  image: string;
  logos: string[];
  workflows: string[];
  facts: { value: string; label: string; source: number }[];
  context: string[];
  contextSources: number[];
  problem: string;
  evidence: string[];
  questions: string[];
  workflow: { title: string; body: string }[];
  boundary: string;
  chain: string[];
  sources: { title: string; url: string; type: string }[];
  chart?: {
    title: string; unit: string; bars: { label: string; value: number }[];
    source: number; note: string;
  };
};

export const caseStudies = content as CaseStudy[];
export type CaseStudyCard = (typeof import('@/lib/case-study-listing').caseStudyCards)[number];
