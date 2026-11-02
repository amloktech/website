"""Create original, editable AMLOK editorial illustrations for the journal.

Cover quantities labelled illustrative are worked examples, not customer data.
Run after editing article metadata: python3 scripts/generate-blog-covers.py
"""
from pathlib import Path
from html import escape
import json, re, math
ROOT=Path(__file__).resolve().parents[1]
POSTS=json.loads((ROOT/'src/content/blog-posts.json').read_text())
BRAND=(ROOT/'public/brand/amlok-logo-blue.svg').read_text()
PATHS=''.join(re.findall(r'<path[^>]+/>',BRAND))

def text(x,y,value,size=16,color='#17429c',weight=400):
 return f'<text x="{x}" y="{y}" font-family="Arial,sans-serif" font-size="{size}" fill="{color}" font-weight="{weight}">{escape(value)}</text>'
def rect(x,y,w,h,fill='#fff',stroke='#c3d4f3',r=12):return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="{fill}" stroke="{stroke}"/>'
def line(x,y,a,b,color='#5e89eb',dash=''):return f'<path d="M{x} {y}L{a} {b}" stroke="{color}" stroke-width="2" fill="none"'+(f' stroke-dasharray="{dash}"' if dash else '')+'/>'
def node(x,y,label,primary=False):
 return rect(x,y,145,66,'url(#blue)' if primary else '#fff')+text(x+16,y+39,label,16,'#fff' if primary else '#173879',600)
def bar(x,y,w,label,value):return text(x,y-10,label,14)+rect(x,y,360,24,'#dce6fb','none',4)+rect(x,y,w,24,'url(#blue)','none',4)+text(x+370,y+18,value,15,weight=600)

def art(index):
 if index==0:
  p=line(735,250,970,180,dash='6 7')+line(735,250,970,365)+line(970,180,970,365,dash='6 7')
  p+=node(650,220,'Business A',True)+node(910,145,'Shared address')+node(910,330,'Business B')
  return p+rect(675,435,400,55,'#e7efff')+text(696,469,'Observation ≠ ownership',21,weight=600)
 if index==1:
  p=line(680,350,1090,350)
  for i,(a,b) in enumerate([('01','BASELINE'),('02','EVIDENCE'),('03','REVIEW')]):
   x=690+i*185;p+=f'<circle cx="{x}" cy="350" r="14" fill="#275fff"/>'+text(x-26,305,a,26,weight=600)+text(x-35,403,b,12)
  return p+rect(685,175,390,64)+text(705,215,'Event time  +  knowledge time',20,weight=600)
 if index==2:return bar(665,240,360*.739,'MEAN RECALL@5','73.90%')+bar(665,345,360*.6181,'COMPLETE EVIDENCE@5','61.81%')+text(665,440,'MEASURED · FINQA / BM25',13)+text(665,468,'1,147 questions · AMLOK research 0.3',15)
 if index==3:
  p=rect(680,155,360,340)+text(708,200,'CASH INFLOWS',14,weight=600)
  for i,(a,b) in enumerate([('Customer receipts','50,000'),('Financing','20,000'),('Internal transfer','15,000')]):p+=line(704,225+i*67,1013,225+i*67,'#d4def1')+text(708,261+i*67,a,18)+text(929,261+i*67,b,18,weight=600)
  return p+text(708,464,'ILLUSTRATIVE · CAD',12)
 if index==4:
  p=rect(695,157,345,340,'#d7e4ff')+rect(675,138,345,340)+rect(675,138,345,75,'url(#blue)')+text(700,183,'DECISION / BASELINE',16,'#fff',600)
  for i,a in enumerate(['Source evidence','Material assumptions','Next review date']):p+=f'<circle cx="711" cy="{254+i*69}" r="6" fill="#2b62fb"/>'+text(733,260+i*69,a,19)
  return p
 if index==5:return bar(665,205,330,'PERIOD 2 · SALES','110k')+bar(665,310,263.1,'PERIOD 2 · SETTLEMENT','87.7k')+text(665,411,'REFUNDS / FEES / RESERVES',13)+text(665,448,'ILLUSTRATIVE · CAD',13)
 if index==6:
  p=rect(670,166,185,150,'#e5edff')+text(691,218,'TRUE POSITIVES',12)+text(691,281,'80',50,weight=600)
  p+=rect(872,166,215,150,'url(#blue)')+text(895,218,'FALSE POSITIVES',12,'#fff')+text(895,281,'495',50,'#fff',600)
  return p+text(677,385,'575 reviews · 13.9% precision',23,weight=600)+text(677,437,'ILLUSTRATIVE · 10,000 ACCOUNTS',12)
 if index==7:
  p=line(765,222,1005,222)+line(1005,222,1005,392)+line(1005,392,765,392)
  return p+node(680,190,'Receive')+node(930,190,'Verify')+node(930,360,'Review',True)+node(680,360,'Resolve')+text(696,487,'EVIDENCE + OWNER + HISTORY',13)
 p=rect(680,165,390,96)+text(706,202,'PROCESSOR A',13)+text(706,239,'Connected in both periods',21,weight=600)
 p+=rect(680,286,390,96,'url(#blue)')+text(706,323,'PROCESSOR B',13,'#fff')+text(706,360,'Newly connected',21,'#fff',600)
 return p+text(687,445,'Coverage changes the comparison.',19,weight=600)

LINES=[['A connection is not','a conclusion.'],['Before the signal,','save the baseline.'],['The answer needs','the evidence.'],['A deposit is not','always revenue.'],['The credit memo','should have a memory.'],['When sales rise','but cash does not.'],['An alert is a cost.','Make it earn the review.'],['Every event needs','an accountable','next step.'],['Connected does not','mean complete.']]
for i,post in enumerate(POSTS):
 title=' '.join(LINES[i]);subtitle=post['topic'].upper()
 main=''.join(text(58,265+n*57,line,46,'#0b2482',600) for n,line in enumerate(LINES[i]))
 svg=f'''<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="650" viewBox="0 0 1200 650">
<title>AMLOK — {escape(post['title'])}</title><desc>Original blue editorial illustration for {escape(post['topic'])}. {escape(title)}. Quantitative examples are labelled in the artwork and explained in the article.</desc>
<defs><linearGradient id="bg" x2="1" y2="1"><stop stop-color="#f0f5ff"/><stop offset="1" stop-color="#cadcff"/></linearGradient><linearGradient id="blue" x2="1" y2="1"><stop stop-color="#2867ff"/><stop offset="1" stop-color="#0b269e"/></linearGradient><pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="#8ba8e8" stroke-opacity=".12"/></pattern></defs>
<rect width="1200" height="650" fill="url(#bg)"/><rect width="1200" height="650" fill="url(#grid)"/><circle cx="1070" cy="170" r="380" fill="#fff" opacity=".22"/>
<svg x="58" y="44" width="126" height="24" viewBox="4.125 17.449 158.973 29.553" fill="#0d299c">{PATHS}</svg>
{text(938,62,f'JOURNAL / {i+1:02}',13)}
{text(58,194,subtitle,12,weight=600)}{main}
{text(58,572,'AMLOK PERSPECTIVES / NOVEMBER 2026',12)}
{art(i)}<path d="M1108 570L1140 538M1108 538H1140V570" stroke="#153b9c" fill="none" stroke-width="2"/>
</svg>'''
 (ROOT/'public'/post['image'].lstrip('/')).write_text(svg)
print(f'Generated {len(POSTS)} original journal covers')
