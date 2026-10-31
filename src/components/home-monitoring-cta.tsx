import Image from 'next/image';
import { ArrowRight, CircleAlert } from 'lucide-react';

export function HomeMonitoringCta({ apiHref = '#loan-scale-slide-4' }: { apiHref?: string }) {
  return <section className="home-monitoring-cta" id="continuous-risk" aria-labelledby="home-monitoring-cta-title">
    <div className="home-monitoring-cta-inner">
      <div className="home-monitoring-cta-copy">
        <span className="home-products-eyebrow"><i aria-hidden="true" />CONTINUOUS RISK INTELLIGENCE</span>
        <h2 id="home-monitoring-cta-title"><span className="home-monitoring-title-line">Keep up with <span className="home-heading-gradient">risk</span></span><span className="home-monitoring-title-line">as fast as it <span className="home-heading-gradient">changes</span></span></h2>
        <p>A point-in-time decision does not need to become a blind spot for the life of the deal.</p>
        <div className="home-monitoring-cta-actions">
          <a href="/contact">Get a demo <ArrowRight size={18} aria-hidden="true" /></a>
          <a href={apiHref}>Explore API <ArrowRight size={18} aria-hidden="true" /></a>
        </div>
      </div>
      <figure className="home-monitoring-cta-figure">
        <div className="home-monitoring-cta-photo">
          <Image src="/images/monitoring-cafe-customer.png" alt="A barista handing a coffee to a customer across a wooden café counter, with pale brick walls and cool natural daylight." fill sizes="(max-width: 900px) 100vw, 50vw" />
          <div className="home-monitoring-photo-cards" aria-label="Illustrative monitoring signals">
            <div className="home-monitoring-photo-card is-early"><span className="home-monitoring-card-label"><CircleAlert size={14} aria-hidden="true" />Early signal</span><strong>Revenue trend changed</strong><small>-18% against baseline</small></div>
            <div className="home-monitoring-photo-card is-baseline"><span className="home-monitoring-card-label">Portfolio baseline</span><strong>90 days</strong><small>Continuously refreshed</small></div>
            <div className="home-monitoring-photo-card is-active"><span className="home-monitoring-card-label"><i aria-hidden="true" />Monitoring active</span><strong>Risk trajectory updated</strong><small>Evidence attached · team notified</small></div>
          </div>
          <div className="home-monitoring-photo-frame" aria-hidden="true"><i /><i /></div>
        </div>
        {/* Photo attribution retained for the future terms page: <figcaption><span>Illustrative photography and signals</span><span>Image: AI-generated</span></figcaption> */}
      </figure>
    </div>
  </section>;
}
