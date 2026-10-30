import { Check, X } from 'lucide-react';

const workflows = [
  ['Transaction understanding', 'Cryptic descriptors reviewed manually', 'Bilingual financial semantics resolved automatically'],
  ['Business visibility', 'Flat statements and disconnected documents', 'A connected graph of entities, principals and obligations'],
  ['Revenue assessment', 'Deposits treated as reported revenue', 'Transfers, refunds and circular flows reconciled first'],
  ['Debt exposure', 'Relies on disclosed and bureau-reported debt', 'Hidden obligations and capital stacking detected'],
  ['Risk policy', 'Analysts translate policy file by file', 'Institution-owned policies applied consistently'],
  ['Underwriting time', 'Approximately 30–60 minutes of review per file', 'Targeting 1–5 minutes per file · ~80–95% time saved'],
  ['Decision evidence', 'A score with fragmented supporting material', 'Every factor linked to source evidence and lineage'],
  ['Portfolio monitoring', 'Periodic reviews after capital is deployed', 'Continuous behavioral signals and early-warning events'],
] as const;

export function HomeRiskComparison() {
  return <section className="home-risk-comparison" id="risk-comparison" aria-labelledby="risk-comparison-title">
    <span className="home-products-eyebrow"><i aria-hidden="true" />THE AMLOK DIFFERENCE</span>
    <h2 id="risk-comparison-title">What changes with<br /><span className="home-heading-gradient">continuous risk intelligence.</span></h2>
    <p className="home-risk-comparison-description">Move from disconnected snapshots to a connected view of risk: with evidence your team can trace, policies you control, and signals that keep evolving.</p>
    <div className="home-risk-comparison-scroll" role="region" aria-label="Risk workflow comparison" tabIndex={0}>
      <table className="home-risk-comparison-table">
        <colgroup><col /><col /><col /></colgroup>
        <thead><tr><th scope="col">Risk workflow</th><th scope="col">Before</th><th scope="col">With AMLOK</th></tr></thead>
        <tbody>{workflows.map(([workflow, before, after]) => <tr key={workflow}>
          <th scope="row">{workflow}</th>
          <td><div className="home-risk-comparison-cell"><X aria-hidden="true" /><span>{before}</span></div></td>
          <td><div className="home-risk-comparison-cell"><span className="home-risk-comparison-check"><Check aria-hidden="true" /></span><span>{after}</span></div></td>
        </tr>)}</tbody>
      </table>
    </div>
    <div className="home-risk-comparison-cards" aria-label="Risk workflow comparison">
      {workflows.map(([workflow, before, after]) => <article className="home-risk-comparison-card" key={workflow}>
        <h3>{workflow}</h3>
        <div className="home-risk-comparison-before"><span className="home-risk-comparison-card-label">Before</span><p><X aria-hidden="true" /><span>{before}</span></p></div>
        <div className="home-risk-comparison-after"><span className="home-risk-comparison-card-label">With AMLOK</span><p><span className="home-risk-comparison-check"><Check aria-hidden="true" /></span><span>{after}</span></p></div>
      </article>)}
    </div>
  </section>;
}
