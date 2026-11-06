import { ArrowRight, ArrowUpRight, Download } from 'lucide-react';
import analysisContent from '@/content/case-study-analysis.json';
import { getCaseProjection } from '@/lib/case-projection-values';
import { formatProjectionNumber as number, type ProjectionInput } from '@/lib/case-projection-math';
import styles from './case-studies.module.css';

type Projection = ProjectionInput & {
  metricId: string;
  population: string;
  outcome: string;
  meaning: string;
  assumption: string;
};
type Analysis = {
  slug: string;
  thesis: string;
  access: string;
  steps: { title: string; evidence: string; output: string; action: string }[];
  projections: Projection[];
  validation: string;
  limit: string;
  productSources: string[];
};
const analyses = analysisContent as Analysis[];
const productReferences: Record<string, { label: string; href: string }> = {
  'business-underwriting': { label: 'Underwriting methodology', href: 'https://docs.amlok.io/research/business-underwriting' },
  'entity-graph': { label: 'Entity & relationship methodology', href: 'https://docs.amlok.io/research/entity-graph' },
  monitoring: { label: 'Monitoring methodology', href: 'https://docs.amlok.io/research/monitoring' },
  'data-foundations': { label: 'Data & evidence methodology', href: 'https://docs.amlok.io/research/data-foundations' },
};

function ProjectionCard({ spec }: { spec: Projection }) {
  const value = getCaseProjection(spec);
  const { metric } = value;
  const isCount = spec.mode === 'count';
  const isIndex = !isCount && metric.unit === '';
  const gain = isCount ? Math.abs(value.change) : Math.abs(value.relativeChange);
  const suffix = isCount ? '' : '%';
  const countPrefix = isCount && value.change > 0 ? '+' : '';
  const rateSuffix = metric.unit || ' index';
  const scope = isCount ? `Assumed population: ${number(spec.denominator!)} ${spec.population}.` : spec.population;

  return <article className={styles.projectionCard}>
    <span className={styles.projectionLabel}>MODELED SCENARIO</span>
    <h3>{metric.label}</h3>
    <p className={styles.projectionPopulation}>{scope}</p>
    <div className={styles.projectionComparison} aria-label="Scenario comparison">
      <div><span>Baseline scenario</span><strong>{number(value.baseline)}{!isCount && metric.unit}</strong></div>
      <ArrowRight size={20} aria-hidden="true" />
      <div><span>With Amlok, modeled</span><strong>≈{number(value.projected)}{!isCount && metric.unit}</strong></div>
    </div>
    <div className={styles.projectionBars} aria-hidden="true"><i style={{ width: `${metric.baseline}%` }} /><i style={{ width: `${metric.amlok}%` }} /></div>
    <div className={styles.projectionGain}><strong>{countPrefix}{number(gain)}{suffix}</strong><span>{spec.outcome}</span></div>
    <p className={styles.projectionMeaning}>{spec.meaning}</p>
    <details className={styles.projectionDetails}>
      <summary>Calculation & assumptions</summary>
      <div>
        <p><b>Comparison inputs:</b> {number(metric.baseline)}{rateSuffix} → ≈{number(metric.amlok)}{rateSuffix}.</p>
        {isCount && <p><b>Population calculation:</b> {number(spec.denominator!)} × {number(metric.baseline)}% = {number(value.baseline)}; {number(spec.denominator!)} × {number(metric.amlok)}% ≈ {number(value.projected)}. Difference: ≈{number(Math.abs(value.change))} {value.change < 0 ? 'fewer' : 'additional'}.</p>}
        <p><b>Relative change:</b> ({number(metric.amlok)} − {number(metric.baseline)}) ÷ {number(metric.baseline)} × 100 ≈ {value.relativeChange < 0 ? '−' : '+'}{number(Math.abs(value.relativeChange))}%.</p>
        <p>{number(Math.abs(value.rateChange))} {isIndex ? 'index points' : 'percentage points'} {value.rateChange < 0 ? 'lower' : 'higher'} than the input baseline. {spec.assumption}</p>
        <a href="/#retrovalidation">View the supplied comparison inputs <ArrowUpRight size={14} aria-hidden="true" /></a>
      </div>
    </details>
  </article>;
}

export function AmlokCaseAnalysis({ slug, institution }: { slug: string; institution: string }) {
  const analysis = analyses.find(item => item.slug === slug);
  if (!analysis) throw new Error(`Missing case analysis: ${slug}`);

  return <>
    <section id="workflow">
      <span className={styles.kicker}>03 / THE Amlok INTERVENTION</span>
      <h2>A different decision starts here.</h2>
      <p className={styles.analysisThesis}>{analysis.thesis}</p>
      <div className={styles.evidenceNeeded}><span>EVIDENCE THIS SCENARIO REQUIRES</span><p>{analysis.access}</p></div>
      <ol className={styles.interventions}>{analysis.steps.map((step, index) => <li key={step.title}>
        <header><span className={styles.stepNumber}>{String(index + 1).padStart(2, '0')}</span><h3>{step.title}</h3></header>
        <dl><div><dt>Evidence to connect</dt><dd>{step.evidence}</dd></div><div><dt>Amlok output</dt><dd>{step.output}</dd></div></dl>
        <div className={styles.interventionAction}><ArrowRight size={17} aria-hidden="true" /><p><b>Decision it could support</b>{step.action}</p></div>
      </li>)}</ol>
      <div className={styles.methodLinks}>{analysis.productSources.map(key => <a key={key} href={productReferences[key].href} target="_blank" rel="noopener noreferrer">{productReferences[key].label}<ArrowUpRight size={14} aria-hidden="true" /></a>)}</div>
    </section>
    <section id="projections">
      <span className={styles.kicker}>04 / MODELED IMPACT</span>
      <h2>Put numbers behind the opportunity.</h2>
      <p>These scenarios apply Amlok’s supplied comparison rates to the review described above. They are projections, not measured results at {institution}. Count-based scenarios use an assumed population, not the institution’s actual records.</p>
      <div className={styles.projectionGrid}>{analysis.projections.map(spec => <ProjectionCard key={spec.metricId} spec={spec} />)}</div>
      <div className={styles.projectionMethod}>
        <h3>From a projection to a validated result.</h3>
        <p>{analysis.validation}</p>
        <p>{analysis.limit} The supplied comparison rates are approximate scenario inputs; no institution-specific replay or confidence interval is available for these estimates. The two metrics describe separate dimensions and should not be added together.</p>
        <div className={styles.methodLinks}><a href="/#retrovalidation">Research inputs <ArrowUpRight size={14} aria-hidden="true" /></a><a href="/downloads/case-study-projections.json" download>Download all case calculations <Download size={14} aria-hidden="true" /></a></div>
      </div>
    </section>
  </>;
}
