import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import styles from './home-featured-resources.module.css';

// Editorial previews only. Add publication URLs when the research is released.
// Cover diagrams are illustrations, not measured results.
const resources = [
  {
    category: 'Featured research',
    gradientTitle: 'Building a foundational risk graph:',
    title: 'Retrospective validation across 275,019 closed deals.',
    description: 'An upcoming look at how AMLOK retrospectively validated its models against historical lending outcomes across the institutions featured above.',
    image: 'retrospective-validation',
  },
  {
    category: 'Merchant cash advance',
    title: 'Reading the rhythm of merchant cash flow',
    description: 'Daily receipts, revenue volatility, and repayment capacity: exploring the signals behind merchant resilience.',
    image: 'merchant-cash-advance',
  },
  {
    category: 'Insurtech',
    title: 'A clearer view of changing exposure',
    description: 'Connecting policy, claims, and financial behaviour to understand how risk evolves between renewal dates.',
    image: 'insurtech',
  },
  {
    category: 'Mortgage lending',
    title: 'Beyond the mortgage application',
    description: 'Income stability, household cash flow, and the changing context behind long-term mortgage risk.',
    image: 'mortgage',
  },
  {
    category: 'Auto finance',
    title: 'The road ahead for auto credit',
    description: 'Bringing borrower behaviour, affordability, and vehicle exposure into a connected view of the lending lifecycle.',
    image: 'auto-finance',
  },
  {
    category: 'Fintech',
    title: 'Intelligence for embedded finance',
    description: 'How financial products can connect fragmented data and keep risk decisions grounded as they scale.',
    image: 'fintech',
  },
  {
    category: 'Business lending',
    title: 'The connected business borrower',
    description: 'Reading working capital, cash conversion, and trading relationships to see beyond the balance sheet.',
    image: 'business-lending',
  },
  {
    category: 'Consumer credit',
    title: 'A living view of consumer credit',
    description: 'Understanding affordability and repayment resilience as household circumstances change.',
    image: 'consumer-credit',
  },
] as const;

function ResourceCard({ resource, featured = false }: {
  resource: typeof resources[number];
  featured?: boolean;
}) {
  return <article
    className={`${styles.card}${featured ? ` ${styles.featured}` : ''}`}
  >
    <div className={styles.media}>
      <Image src={`/images/resources/${resource.image}.svg`} alt="" width={1200} height={650} draggable={false} />
    </div>
    <div className={styles.copy}>
      <div className={styles.meta}>
        <span className={styles.category}>{resource.category}</span>
        <span className={styles.status}>Coming soon</span>
      </div>
      <h3>{'gradientTitle' in resource && <><span className="home-heading-gradient">{resource.gradientTitle}</span>{' '}</>}{resource.title}</h3>
      <p>{resource.description}</p>
    </div>
  </article>;
}

export function HomeFeaturedResources() {
  return <section className={styles.section} id="featured-resources" aria-labelledby="featured-resources-title">
    <div className={styles.inner}>
      <span className={`home-features-eyebrow ${styles.eyebrow}`}><i aria-hidden="true" />RESOURCES LIBRARY</span>
      <h2 id="featured-resources-title">Our thoughts on <span className="home-heading-gradient">risk intelligence</span></h2>
      <div className={styles.layout}>
        <div className={styles.featureColumn}>
          <ResourceCard resource={resources[0]} featured />
        </div>
        <div className={styles.mobileHint} aria-hidden="true">Explore the series <span>Swipe <ArrowRight size={16} /></span></div>
        <div className={styles.rail} role="region" aria-label="Upcoming industry research. Scroll to explore." tabIndex={0}>
          {resources.slice(1).map(resource => <ResourceCard key={resource.image} resource={resource} />)}
        </div>
      </div>
    </div>
  </section>;
}
