import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import styles from './home-featured-resources.module.css';

import { resources } from '@/content/research-resources';

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
