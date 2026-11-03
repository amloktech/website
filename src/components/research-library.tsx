import Image from 'next/image';
import { ResearchAction } from './research-action';
import { resources } from '@/content/research-resources';
import { ResearchListing } from './research-listing';
import styles from './research-library.module.css';

export function ResearchLibrary() {
  const featured = resources[0];
  return <>
    <section className={styles.featuredSection} id="research-previews" aria-labelledby="featured-research-title">
      <div className="cp-inner">
        <article className={styles.featured}>
          <div className={styles.featuredCopy}>
            <div className={styles.metadata}><span className="cp-eyebrow">Featured report</span><span className="cp-pill" id="featured-research-status">Read the report</span></div>
            <h2 id="featured-research-title"><span className="home-heading-gradient">{featured.gradientTitle}</span> {featured.title}</h2>
            <p>{featured.description}</p>
            <ResearchAction resource={featured} className={`cp-button ${styles.featuredAction}`} availabilityId="featured-research-status"/>
          </div>
          <div className={styles.featuredArt}><Image src={`/images/resources/${featured.image}.svg`} alt="AMLOK research report: Evidence before intelligence" width={1200} height={650} priority/></div>
        </article>
      </div>
    </section>
    <ResearchListing/>
  </>;
}
