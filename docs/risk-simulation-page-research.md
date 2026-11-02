# Risk simulation page — editorial grounding

Reviewed November 2, 2026. Website-only implementation.

## AMLOK sources

Read local official documentation corresponding to:
- https://docs.amlok.io/research/business-underwriting — scenario analysis, explicit cost and repayment assumptions, avoiding double-counting shocks.
- https://docs.amlok.io/research/consumer-underwriting — product-specific affordability, consistent financial periods, explicit stress assumptions.
- https://docs.amlok.io/research/industries/insurtech/trade-credit — seller liquidity, buyer non-payment, and claims are separate outcomes.

The existing website explicitly requires simulation methodology and delivery scope to be agreed for the deployment. The expanded page preserves that qualification. It does not imply a generally available production simulation API or regulatory stress-testing engine.

## Market references

- https://www.moodys.com/web/en/us/solutions/model-risk-governance.html — transparent scenario review and model governance.
- https://swissquant.com/geopolitical-portfolio-stress-simulator/ — explicit hypothetical inputs and instrument-level transmission as a demonstration pattern.
- https://www.msci.com/research-and-insights/blog-post/scenario-analysis-tracing-credit-stress-across-private-and-public-markets — channels of credit stress across connected exposures.

These informed organization and interaction design. No competitor claims, metrics, models, proprietary visuals, or performance results were adopted as AMLOK capabilities.

## Calculator definitions and verification

All examples are fictional deterministic monthly sensitivities in CAD. No outcome probabilities are calculated.

Business: receipts 100,000; operating outflows 70,000; debt payments 15,000. Residual = receipts × (1 − receipt reduction) − costs × (1 + cost increase) − debt. Baseline 15,000; 20% receipt decline, unchanged costs: −5,000 and 0.67× coverage proxy.

Consumer: net income 6,000; essential expenses 3,500; debt payments 1,500. Same residual formula. Baseline 1,000; 10% income decline and 10% expense increase: 50. This is not mortgage GDS/TDS, a credit score, or an approval threshold.

Trade: opening cash 40,000; expected collections 100,000; outflows 110,000. Deferred collections = 100,000 × buyer share × share deferred. Closing cash = 40,000 + 100,000 − deferred collections − 110,000. Baseline 30,000; 40% buyer share with half deferred: 10,000. Maximum controls (60% share, 100% deferred): −30,000. The deferred receipt is excluded from the period, not assumed lost forever or insured.

Browser checks covered all initial calculations, keyboard tab navigation, maximum trade controls, return to baseline, and mobile overflow. Type check, production build, and site link validation passed.
