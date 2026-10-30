import { ChevronDown } from 'lucide-react';

const questions = [
  ['What is AMLOK?', 'AMLOK brings risk intelligence and AI workflows to the credit lifecycle. It organizes authorized financial evidence into a common data model and supports verification, underwriting, monitoring, and investigation. Your institution owns the final decision.'],
  ['What is the difference between Insights and Signal?', 'AMLOK Insights processes application evidence, analyzes risk, and produces underwriting outputs within your agreed workflow. AMLOK Signal monitors your existing portfolio for changes that warrant attention, including change-driven reassessment.'],
  ['Can AMLOK connect to the systems we already use?', 'The integration catalog covers payments and POS, ecommerce, accounting, inventory and ERP, bank-data providers, and lender systems. Availability and coverage depend on the provider, market, product, account permissions, and required approvals. Check the integration status catalog before planning a connection.'],
  ['How often is connected data refreshed?', 'Refresh timing depends on the source and the synchronization agreed for your connection. Supported methods include event notifications, scheduled API reads, scheduled source refreshes, and authorized on-demand exchanges. Provider timing, consent, API quotas, and outages can affect freshness.'],
  ['Who controls lending policies and credit decisions?', 'Your institution sets lending policy, approves model use, reviews exceptions, and owns credit decisions and notices. AMLOK processes agreed information and surfaces changes and risk signals within the authorized workflow. Borrower outreach and intervention take place in your institution’s own systems.'],
  ['How is borrower data protected?', 'AMLOK’s security program covers access controls, encryption, tenant separation, privacy, retention, and incident response. Processing scope, permitted locations, security requirements, and responsibilities are agreed before connecting live borrower data. Supporting assurance materials are available for scoped review, subject to availability and distribution permissions.'],
  ['How do developers integrate AMLOK?', 'Start with the API documentation, configuration discovery, and sandbox journeys. Authorized administrators create workspace-bound API keys in the client portal. The reference includes cURL, Python, and Node.js examples, required scopes, and error definitions. Signed webhooks support asynchronous results and change notifications.'],
  ['How do underwriting and monitoring charges work together?', 'Insights and Signal draw from one shared workspace balance. Eligible underwriting and monitoring usage consumes credits at the applicable rate. Signal includes monitoring and change-driven reassessment without an additional Insights charge. Your agreement records the final rates, workload limits, eligible products, and discounts.'],
  ['How can our team get support?', 'Contact support@amlok.tech for technical issues, product questions, or billing assistance. Enterprise clients can also work with their dedicated account manager. Support coverage and response targets follow your agreement and the documented service levels. Include request IDs and redacted diagnostics rather than borrower documents or credentials.'],
] as const;

export function HomeFaq() {
  return <section className="home-faq" id="faq" aria-labelledby="home-faq-title">
    <div className="home-faq-inner">
      <header className="home-faq-heading">
        <span className="home-products-eyebrow"><i aria-hidden="true" />FAQ</span>
        <h2 id="home-faq-title">Common questions</h2>
      </header>
      <div className="home-faq-list">
        {questions.map(([question, answer]) => <details className="home-faq-item" name="amlok-common-questions" key={question}>
          <summary><h3>{question}</h3><ChevronDown size={20} aria-hidden="true" /></summary>
          <div className="home-faq-answer"><p>{answer}</p></div>
        </details>)}
      </div>
      <a className="home-faq-documentation" href="https://amlok-docs.mintlify.site/overview/introduction">Explore the documentation</a>
    </div>
  </section>;
}
