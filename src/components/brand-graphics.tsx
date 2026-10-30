'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { WebsiteGraphic, type WebsiteGraphicKind } from './website-graphic';

const specimens: { kind: WebsiteGraphicKind; label: string; title: string; description: string; construction: string; motion: string; alternative: string }[] = [
  { kind: 'income', label: 'Cash flow', title: 'Evidence becomes a pattern.', description: 'Use transaction rows and a simple bar chart to connect individual deposits to recurring income.', construction: 'Square evidence rows sit above a shared baseline. Solid bars show observed activity; hatched bars distinguish an expected pattern.', motion: 'Bars rise subtly from their baseline over a 5-second loop. Labels and transaction values stay still.', alternative: 'Sample operating revenue and contract payments above six bars; the final three bars are hatched to indicate an expected pattern.' },
  { kind: 'radar', label: 'Signal scan', title: 'Make discovery visible.', description: 'Use a scanning field to explain how AMLOK brings emerging signals into focus.', construction: 'A raised cobalt field with nested rectangular frames, fine crosshairs, and small white signal dots. One orange point introduces attention without turning the whole field into an alarm.', motion: 'A linear scan crosses the field over 5 seconds. Dots change opacity gently; nothing spins or flashes.', alternative: 'A raised cobalt scanning field with nested frames, two white signal dots, and one orange attention marker.' },
  { kind: 'portfolio', label: 'Trend', title: 'Show the change that matters.', description: 'Use one line and a labeled endpoint to explain movement across a defined period.', construction: 'A restrained grid, a blue trend line, and a single attention marker. Keep the time range and the interpretation beside the graphic.', motion: 'The line draws, holds, and resets over 7 seconds. The period and “Cash buffer declining” label remain visible.', alternative: 'An illustrative six-month liquidity trend with a declining endpoint and the label Cash buffer declining.' },
  { kind: 'offers', label: 'Capacity', title: 'Connect a signal to a review.', description: 'Use a segmented scale and a compact scenario card to show how evidence informs lending terms.', construction: 'A linear capacity scale, a clear indicator, and aligned label-value rows. Review and policy states use labeled semantic colors.', motion: 'The indicator moves gently within the scale over 6 seconds. The offer, amounts, and review labels remain stable.', alternative: 'A repayment capacity scale above a sample working capital offer of CAD 60,000 over 18 months, marked For review and Policy aligned.' },
  { kind: 'approvals', label: 'Assessment', title: 'Explain the fuller picture.', description: 'Use a ring only when the composition or proportion is the story. The surrounding interface uses the shared rounded surface system.', construction: 'One blue arc, a neutral remainder, and a hatched segment with a legend. A circular chart is a data shape, not a new card shape.', motion: 'The emphasized arc shifts slowly over 6 seconds. This is a conceptual illustration, not a changing approval rate.', alternative: 'A conceptual credit-assessment ring using a blue arc, a hatched segment, and a neutral remainder to show additional cash flow context.' },
  { kind: 'fraud', label: 'Review signals', title: 'Keep the evidence in context.', description: 'Use a short, labeled review list beside a borrower file to explain why a person should investigate.', construction: 'One warning surface, an outline icon, and specific evidence gaps. Describe what needs review without labeling a borrower as fraudulent.', motion: 'Only the review border changes emphasis over 6 seconds. The evidence remains legible throughout.', alternative: 'A sample borrower file with three review signals: declining reserves, incomplete revenue evidence, and concurrent borrowing.' },
  { kind: 'collections', label: 'Workflow', title: 'Connect intelligence to action.', description: 'Use a structured data field and a human-centered symbol to explain an approved operational workflow.', construction: 'Monospace sample data sits behind a square person tile. A persistent label makes human approval explicit.', motion: 'Background sample data travels slowly over 14 seconds. The person tile and approval label stay fixed.', alternative: 'Illustrative repayment data behind a person icon in a square frame, labeled Human-approved workflow.' },
];

export function BrandGraphics() {
  const [selected, setSelected] = useState(0);
  const [inView, setInView] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const specimen = specimens[selected];

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: .1 });
    if (previewRef.current) observer.observe(previewRef.current);
    return () => observer.disconnect();
  }, []);

  return <div className="ds-graphics-library">
    <div className="ds-graphics-library-heading"><span className="ds-meta"><i/>WEBSITE GRAPHICS / LIVE REFERENCE</span><a href="/#use-cases">View on the homepage <ArrowRight size={16}/></a></div>
    <div className="ds-graphics-tabs" role="tablist" aria-label="Website graphic examples">
      {specimens.map((item, index) => <button key={item.kind} ref={node => { tabRefs.current[index] = node; }} type="button" role="tab" id={`graphic-tab-${item.kind}`} aria-controls="website-graphic-panel" aria-selected={selected === index} tabIndex={selected === index ? 0 : -1} onClick={() => setSelected(index)} onKeyDown={event => {
        const next = event.key === 'ArrowRight' ? (index + 1) % specimens.length : event.key === 'ArrowLeft' ? (index - 1 + specimens.length) % specimens.length : event.key === 'Home' ? 0 : event.key === 'End' ? specimens.length - 1 : null;
        if (next !== null) { event.preventDefault(); setSelected(next); tabRefs.current[next]?.focus(); }
      }}>{item.label}</button>)}
    </div>
    <div className="ds-graphics-example" role="tabpanel" id="website-graphic-panel" aria-labelledby={`graphic-tab-${specimen.kind}`} tabIndex={0}>
      <figure className="ds-graphics-figure">
        <div ref={previewRef} className="ds-graphics-stage website-graphic" data-motion={inView ? 'running' : 'paused'} role="img" aria-label={specimen.alternative}><div aria-hidden="true" className="ds-graphics-art"><WebsiteGraphic key={specimen.kind} kind={specimen.kind}/></div></div>
        <figcaption><h3>{specimen.title}</h3><p>{specimen.description}</p></figcaption>
      </figure>
      <div className="ds-graphics-notes"><span className="ds-meta">PATTERN / {specimen.label.toUpperCase()}</span><dl><dt>Construction</dt><dd>{specimen.construction}</dd><dt>Motion</dt><dd>{specimen.motion}</dd><dt>Keep it honest</dt><dd>Use fictional, illustrative data in marketing. Real assessments need sources, units, and stable values; animation must never invent a result.</dd></dl><p className="ds-note">These are the same illustrations used on the homepage. Match the One platform graphics with ceramic-white faces, cobalt gradients, shallow side edges, and soft contact and lift shadows. Use the theme control to review their light and dark treatments.</p></div>
    </div>
  </div>;
}
