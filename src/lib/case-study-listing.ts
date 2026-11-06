import cards from '@/content/case-study-cards.json';

export const caseStudyCards = cards;
export const caseStudyTypes = ['All cases', 'Banks', 'Credit unions', 'Alternative lenders', 'Fintech'];
export const caseStudySectors = [...new Set(cards.map(item => item.sector))].sort();
export const caseStudyWorkflows = ['Verify', 'Underwrite', 'Monitor', 'Investigate', 'Service'];
