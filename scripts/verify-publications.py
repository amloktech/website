"""Audit publication citations, data figures, routes, and worked calculations.

Evidence fixtures are unmodified public Amlok result manifests retrieved on
2026-11-02 from the source URLs cited in the featured report. They preserve the
publication's measurement snapshot; this audit does not rerun the experiments.
"""
import json
import math
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PUBLICATIONS = json.loads((ROOT / 'src/content/publications.json').read_text())
PAGES = json.loads((ROOT / 'src/content/site-pages.json').read_text())
INDEX = json.loads((ROOT / 'src/content/page-index.json').read_text())
BLOGS = json.loads((ROOT / 'src/content/blog-posts.json').read_text())
by_slug = {p['slug']: p for p in PUBLICATIONS}
assert len(by_slug) == len(PUBLICATIONS), 'Duplicate publication URL'

for p in PUBLICATIONS:
    ids = {s['id'] for s in p['sources']}
    assert len(ids) == len(p['sources']), p['slug'] + ': duplicate source ID'
    citations = set(re.findall(r'\[@([a-z0-9-]+)\]', json.dumps(p)))
    sections = {s['id'] for s in p['sections']}
    assert len(sections) == len(p['sections']), p['slug'] + ': duplicate anchor'
    assert 'references' not in sections and 'overview' not in sections
    figures = [s['figure'] for s in p['sections'] if 'figure' in s]
    assert figures, p['slug'] + ': missing visual'
    for s in p['sections']:
        for key in ['figure', 'table']:
            if key in s: citations.update(s[key]['sources'])
        if 'table' in s:
            t = s['table']
            assert all(len(row) == len(t['headings']) for row in t['rows'])
    assert citations == ids, (p['slug'], 'missing or unused sources', citations ^ ids)
    assert all(s['url'].startswith('https://') for s in p['sources'])
    assert all(slug in by_slug for slug in p['related'])
    assert any(page['slug'] == p['slug'] for page in PAGES)
    assert any(page['path'] == '/' + p['slug'] for page in INDEX)
    assert (ROOT / 'public' / p['image'].lstrip('/')).is_file()
    assert (ROOT / 'public/images/publications' / (p['slug'].split('/')[-1] + '.png')).is_file()
    for f in figures:
        assert f['caption'] and f['label']
        if f['kind'] == 'bars':
            assert f['max'] > 0
            assert all(0 <= row['value'] <= f['max'] for row in f['values'])
    if p['format'] == 'Article':
        post = next(b for b in BLOGS if 'blog/' + b['slug'] == p['slug'])
        assert post['title'] == p['title'] + ' ' + p['accent']
        assert post['author'] == 'Amlok'

# Check plotted measurements against the downloaded source manifests.
sba = json.loads((ROOT / 'scripts/fixtures/publication-evidence/sba-baseline-results.json').read_text())
finqa = json.loads((ROOT / 'scripts/fixtures/publication-evidence/finqa-retrieval-results.json').read_text())
report = by_slug['research/evidence-before-intelligence']
figures = [s['figure'] for s in report['sections'] if 'figure' in s]
assert [r['value'] for r in figures[1]['values']] == [round(m['test']['roc_auc'], 5) for m in sba['models']]
expected = [finqa['results'][method]['5'][metric] for method, metric in [('tfidf','recall'),('bm25','recall'),('tfidf','complete'),('bm25','complete')]]
assert [r['value'] for r in figures[2]['values']] == [round(v * 100, 2) for v in expected]
cohort = next(s['table'] for s in report['sections'] if 'table' in s)
for row, key in zip(cohort['rows'], ['train', 'validation', 'test']):
    assert [int(v.replace(',', '')) for v in row[1:]] == [sba['split_counts'][key][field] for field in ['rows','positives','entity_groups']]

# Recalculate worked tables from their displayed inputs, not hidden values.
def number(value): return float(value.replace('−', '-').replace(',', '').rstrip('%'))
def rows(slug):
    t = next(s['table'] for s in by_slug['research/' + slug]['sections'] if 'table' in s)
    return [[number(v) for v in row[1:]] for row in t['rows']]
mca = rows('follow-the-receipts')
for col in range(2):
    assert sum(mca[i][col] for i in range(4)) == mca[4][col]
    assert sum(mca[i][col] for i in [4,5,6]) == mca[7][col]
mortgage = rows('mortgage-after-the-application')
for col in range(3): assert sum(row[col] for row in mortgage[:-1]) == mortgage[-1][col]
auto = rows('two-risks-in-auto-finance')
for col in range(2):
    assert auto[1][col] + auto[2][col] == auto[3][col]
    assert auto[0][col] - auto[3][col] == auto[4][col]
    assert round(auto[4][col] / auto[0][col] * 100, 1) == auto[5][col]
consumer = rows('affordability-in-motion')
for col in range(2): assert consumer[0][col] - consumer[1][col] == consumer[2][col]
assert 6393 - 1409 - 71 - 2550 == 2363
assert round(80 / (80 + 9900 * .05) * 100, 1) == 13.9
assert round((1 - finqa['results']['bm25']['5']['complete']) * 100, 2) == 38.19

# Check the industry guides and their worked examples independently of the
# editorial generation process. External statistics retain their cited scope.
guides = [p for p in PUBLICATIONS if p['slug'].startswith('industry-guides/')]
assert len(guides) == 18
assert {family: sum(p['industry'] == family for p in guides) for family in {p['industry'] for p in guides}} == {
    'Consumer Lending': 5, 'Business Lending': 4, 'Financial Institutions': 3,
    'Fintech': 3, 'Insurtech': 3,
}
guide_index = json.loads((ROOT / 'src/content/industry-guide-index.json').read_text())
assert {g['href'] for g in guide_index} == {'/' + p['slug'] for p in guides}
for p in guides:
    assert len(p['sections']) >= 8
    assert len([s for s in p['sections'] if 'figure' in s]) >= 2
    assert len([s for s in p['sections'] if 'table' in s]) >= 2

def example(key):
    return next(s['table']['rows'] for s in by_slug['industry-guides/' + key]['sections'] if s['id'] == 'worked-example')
def cell(key, row, col=1):
    return float(example(key)[row][col].replace(',', '').replace('−','-').replace('%','').replace('×',''))

for col in (1, 2):
    assert cell('consumer-personal',0,col) - sum(cell('consumer-personal',r,col) for r in (1,2,3)) == cell('consumer-personal',4,col)
    assert round((cell('consumer-personal',2,col)+cell('consumer-personal',3,col))/cell('consumer-personal',0,col)*100,1) == cell('consumer-personal',5,col)
assert sum(cell('consumer-auto',r) for r in (0,1,2)) == cell('consumer-auto',3)
assert round(41000/38000*100,1) == cell('consumer-auto',4)
assert 27000-2000 == cell('consumer-auto',5)
assert round((34000-25000)/34000*100,1) == cell('consumer-auto',6)
for col, rate in [(1,.025),(2,.05)]:
    monthly=(1+rate/2)**(1/6)-1
    payment=400000*monthly/(1-(1+monthly)**-240)
    assert round(payment) == cell('consumer-mortgage',1,col)
    assert cell('consumer-mortgage',0,col) - sum(cell('consumer-mortgage',r,col) for r in (1,2,3,4)) == cell('consumer-mortgage',5,col)
for row in example('consumer-student'):
    assert number(row[1])-number(row[2]) == number(row[3])
assert cell('consumer-rent',0)+cell('consumer-rent',1) == cell('consumer-rent',2)
assert cell('consumer-rent',2)-cell('consumer-rent',3)-cell('consumer-rent',4) == cell('consumer-rent',5)
assert sum(cell('business-smb',r) for r in (0,1,2)) == cell('business-smb',3)
assert sum(cell('business-smb',r) for r in (3,4,5)) == cell('business-smb',6)
assert round(cell('business-smb',6)/cell('business-smb',7),2) == cell('business-smb',8)
for col in (1,2):
    assert round(cell('business-commercial',0,col)/cell('business-commercial',1,col),2) == cell('business-commercial',2,col)
    assert round(cell('business-commercial',3,col)-cell('business-commercial',2,col),2) == cell('business-commercial',4,col)
assert sum(cell('business-financing',r) for r in (0,1,2)) == cell('business-financing',3)
assert cell('business-financing',3)*.8 == cell('business-financing',4)
assert cell('business-financing',4)+cell('business-financing',5) == cell('business-financing',6)
assert cell('business-financing',6)+cell('business-financing',7) == cell('business-financing',8)
assert round((8000*.01+2000*.03)/10000*100,1) == cell('banks',4,1)
assert round((5000*.01+5000*.03)/10000*100,1) == cell('banks',4,2)
for col in (1,2):
    assert cell('credit-unions',1,col)+cell('credit-unions',2,col) == cell('credit-unions',3,col)
    assert round(cell('credit-unions',3,col)/cell('credit-unions',0,col)*100,1) == cell('credit-unions',4,col)
assert cell('alternative-lenders',0)*.1/12 == cell('alternative-lenders',1)
assert cell('alternative-lenders',1)*12 == cell('alternative-lenders',2)
assert cell('alternative-lenders',0)-cell('alternative-lenders',3) == cell('alternative-lenders',4)
for row in (1,2,3):
    assert cell('digital-lenders',row)/cell('digital-lenders',row-1)*100 == cell('digital-lenders',row,2)
assert sum(cell('embedded-finance',r) for r in (0,1,2,3)) == cell('embedded-finance',4)
assert cell('embedded-finance',0)+cell('embedded-finance',1) == cell('embedded-finance',5)
assert cell('embedded-finance',5)*.1 == cell('embedded-finance',6)
for row in range(4):
    assert cell('platforms',row)/cell('platforms',row,2)*100 == cell('platforms',row,3)
assert sum(cell('trade-credit',r) for r in (0,1,2)) == cell('trade-credit',3)
assert round(cell('trade-credit',3)/cell('trade-credit',4)*100,1) == cell('trade-credit',5)
assert cell('trade-credit',3)-cell('trade-credit',4) == cell('trade-credit',6)
for col in (1,2):
    assert cell('surety',1,col)+cell('surety',2,col) == cell('surety',3,col)
    assert cell('surety',0,col)-cell('surety',3,col) == cell('surety',4,col)
    assert round(cell('surety',1,col)/cell('surety',3,col)*100,1) == cell('surety',5,col)
assert cell('premium-finance',0)-cell('premium-finance',1) == cell('premium-finance',2)
assert cell('premium-finance',2)-cell('premium-finance',3) == cell('premium-finance',4)
assert round(cell('premium-finance',5)/cell('premium-finance',4)*100,1) == cell('premium-finance',6)
assert cell('premium-finance',4)-cell('premium-finance',5) == cell('premium-finance',7)

# Recalculate the MCA receipt bridge, variable remittances and stressed liquidity.
for col in (1,2):
    assert cell('merchant-cash-advance',0,col)+cell('merchant-cash-advance',1,col) == cell('merchant-cash-advance',2,col)
    assert sum(cell('merchant-cash-advance',r,col) for r in (2,3,4)) == cell('merchant-cash-advance',5,col)
    assert sum(cell('merchant-cash-advance',r,col) for r in (5,6,7)) == cell('merchant-cash-advance',8,col)
    assert cell('merchant-cash-advance',2,col)*-.12 == cell('merchant-cash-advance',9,col)
    assert sum(cell('merchant-cash-advance',r,col) for r in (8,9)) == cell('merchant-cash-advance',10,col)
    assert cell('merchant-cash-advance',8,col)-11520 == cell('merchant-cash-advance',11,col)
mca_guide = by_slug['industry-guides/merchant-cash-advance']
funding = next(s['table']['rows'] for s in mca_guide['sections'] if s['id']=='pricing-and-renewals')
amounts = [number(row[1]) for row in funding]
assert amounts[0]*1.3 == amounts[1]
assert amounts[0]-amounts[2] == amounts[3]
assert amounts[1]-amounts[3] == amounts[4]
assert round(amounts[4]/amounts[3]*100,1) == amounts[5]
assert math.ceil(amounts[1]/500) == amounts[6]
assert math.ceil(amounts[1]/350) == amounts[7]
agreement = next(s['table']['rows'] for s in mca_guide['sections'] if s['id']=='agreement')
assert number(agreement[1][1])-number(agreement[2][1]) == number(agreement[3][1])
print(f'PASS: {len(PUBLICATIONS)} publications, citation coverage, routes, assets, measured figures, and worked calculations.')
