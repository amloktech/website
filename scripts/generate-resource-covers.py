"""Generate the editable AMLOK research book series (no publication claims).

Run: python3 scripts/generate-resource-covers.py
The diagrams are editorial illustrations, not research results or data plots.
"""

from html import escape
from pathlib import Path
import math
import re

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public/images/resources"
BRAND = (ROOT / "public/brand/amlok-logo-blue.svg").read_text()
BRAND_PATHS = "\n".join(re.findall(r"<path[^>]+/>", BRAND))


def logo(x, y, width, color):
    return f'<svg x="{x}" y="{y}" width="{width}" height="{width * 29.553 / 158.973:.2f}" viewBox="4.125 17.449 158.973 29.553" fill="{color}">{BRAND_PATHS}</svg>'


def path(d, opacity=1, width=1.5, fill="none"):
    return f'<path d="{d}" fill="{fill}" stroke="currentColor" stroke-width="{width}" opacity="{opacity}" stroke-linecap="round" stroke-linejoin="round"/>'


def dot(x, y, r=3, opacity=1):
    return f'<circle cx="{x}" cy="{y}" r="{r}" fill="currentColor" opacity="{opacity}"/>'


def label(x, y, text, size=10, opacity=.7):
    return f'<text x="{x}" y="{y}" fill="currentColor" font-family="Arial, sans-serif" font-size="{size}" letter-spacing="1.6" opacity="{opacity}">{escape(text)}</text>'


def validation():
    parts = ['<text x="40" y="350" fill="currentColor" font-size="70" font-weight="500" letter-spacing="-4">275,019</text>', label(43, 375, "CLOSED DEALS · ONE CONNECTED VIEW", 10)]
    for row in range(5):
        y = 418 + row * 30
        for col in range(9):
            x = 44 + col * 42
            parts.append(f'<rect x="{x}" y="{y}" width="27" height="18" rx="2" fill="currentColor" opacity="{.1 + ((row * 3 + col * 5) % 7) * .055:.3f}"/>')
    for i in range(5):
        y = 425 + i * 29
        parts.append(path(f'M46 {y} C152 {y-35} 229 {y+25} 405 {y-33}', .5, 1))
        parts.append(dot(405, y - 33, 3.5))
    return ''.join(parts)


def merchant():
    parts = []
    for i, height in enumerate([53, 72, 42, 96, 80, 125, 108, 85, 139, 121, 154, 135]):
        x = 42 + i * 31
        parts.append(f'<rect x="{x}" y="{544-height}" width="17" height="{height}" rx="2" fill="currentColor" opacity="{.08+i*.015:.3f}"/>')
    for offset in [0, 25, 50]:
        parts.append(path(f'M40 {494+offset} C94 {492+offset} 102 {421+offset} 164 {442+offset} S245 {492+offset} 289 {413+offset} S355 {437+offset} 410 {368+offset}', .85-offset/100, 2))
    parts.extend([path('M40 555H412', .3), dot(289, 413, 5), dot(410, 368, 5), label(40, 586, 'CASH FLOW / REPAYMENT / RESILIENCE', 9)])
    return ''.join(parts)


def insurance():
    parts = []
    for i in range(6):
        inset = i * 13
        parts.append(path(f'M225 {310+inset} L{351-inset} {352+inset*.5} V{423-inset*.15} Q{351-inset} {500-inset*.4} 225 {567-inset} Q{99+inset} {500-inset*.4} {99+inset} {423-inset*.15} V{352+inset*.5}Z', .18+i*.11, 1.3))
    for angle in [10, 55, 105, 155, 205, 255, 310]:
        a = math.radians(angle)
        x, y = 225 + math.cos(a)*166, 440+math.sin(a)*136
        parts.extend([path(f'M225 439L{x:.1f} {y:.1f}', .2, 1), dot(x, y, 5, .8)])
    parts.extend([dot(225, 439, 8), '<circle cx="225" cy="439" r="18" fill="none" stroke="currentColor" opacity=".6"/>'])
    return ''.join(parts)


def mortgage():
    parts = [path('M40 493L224 390 414 493 225 596Z', .25), path('M40 509L225 612 414 509', .2)]
    for x, y, size in [(65, 424, .85), (199, 371, 1.15), (269, 467, .8)]:
        house = path('M0 40L55 0 113 34 58 75Z', .9, 1.4, 'url(#glass)')
        house += path('M0 40V112L58 148V75M58 148L113 111V34', .8)
        house += path('M68 142V98L91 83V126M12 64L39 81V107L12 90Z', .55)
        parts.append(f'<g transform="translate({x} {y}) scale({size})">{house}</g>')
    for x, y in [(44, 492), (225, 596), (414, 493)]:
        parts.append(dot(x, y, 4))
    return ''.join(parts)


def auto():
    parts = [path('M58 596C52 488 377 526 359 332', .22, 55), path('M58 596C52 488 377 526 359 332', .7, 1.5)]
    parts.append('<path d="M58 596C52 488 377 526 359 332" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="7 12" opacity=".8"/>')
    parts.append('<g transform="translate(67 363)">' + path('M0 78L35 58 63 13 188 13 231 59 261 78V123H0Z', .95, 2, 'url(#glass)') + path('M35 58H231M63 13L78 58M188 13L176 58M129 15V57M13 85H61V101H13ZM202 85H249V101H202ZM86 105H176', .7, 1.4) + '<circle cx="48" cy="124" r="18" fill="url(#cover)" stroke="currentColor" stroke-width="2"/><circle cx="215" cy="124" r="18" fill="url(#cover)" stroke="currentColor" stroke-width="2"/>' + '</g>')
    for x, y in [(58, 596), (340, 432), (359, 332)]:
        parts.append(dot(x, y, 5))
    return ''.join(parts)


def fintech():
    parts = []
    for y in [469, 426, 383]:
        parts.extend([path(f'M225 {y-63}L388 {y+22} 225 {y+108} 62 {y+22}Z', .8, 1.5, 'url(#glass)'), path(f'M62 {y+22}V{y+35}L225 {y+121} 388 {y+35}V{y+22}M225 {y+108}V{y+121}', .35, 1)])
    for x, y in [(225, 343), (138, 389), (310, 389), (225, 433)]:
        parts.append(f'<rect x="{x-13}" y="{y-13}" width="26" height="26" rx="5" transform="rotate(30 {x} {y})" fill="currentColor" opacity=".8"/>')
    parts.extend([path('M138 389L225 433 310 389 225 343Z', .5), label(40, 611, 'CONNECTED DATA. EMBEDDED INTELLIGENCE.', 9)])
    return ''.join(parts)


def business():
    parts = [path('M57 478L224 382 402 482 226 581Z', .25)]
    for x, y, h in [(100, 453, 77), (189, 405, 111), (273, 456, 147)]:
        parts.append(path(f'M{x} {y-h}L{x+48} {y-h-27} {x+96} {y-h} {x+48} {y-h+27}Z', .9, 1.4, 'url(#glass)'))
        parts.append(path(f'M{x} {y-h}V{y}L{x+48} {y+27} {x+96} {y}V{y-h}M{x+48} {y-h+27}V{y+27}', .8))
        for level in range(1, 4):
            ly = y - h + level * h / 5
            parts.append(path(f'M{x+10} {ly:.1f}L{x+37} {ly+15:.1f}M{x+59} {ly+15:.1f}L{x+85} {ly:.1f}', .3))
    parts.extend([path('M57 478V522L226 620 402 522V482', .45), path('M100 506L225 576 356 502', .7), dot(225, 576, 7), dot(100, 506, 4), dot(356, 502, 4)])
    return ''.join(parts)


def consumer():
    parts = []
    for r in [59, 86, 113, 140, 167]:
        parts.append(f'<circle cx="225" cy="466" r="{r}" fill="none" stroke="currentColor" stroke-width="1" opacity="{.7-r/300:.2f}"/>')
    parts.extend(['<circle cx="225" cy="440" r="25" fill="url(#glass)" stroke="currentColor" stroke-width="1.5"/>', path('M181 510V498C181 459 269 459 269 498V510Z', .8, 1.5, 'url(#glass)')])
    for angle, r in [(5, 86), (70, 113), (136, 140), (210, 113), (278, 167), (322, 140)]:
        a = math.radians(angle)
        x, y = 225 + math.cos(a)*r, 466+math.sin(a)*r
        parts.extend([dot(x, y, 5), f'<circle cx="{x}" cy="{y}" r="12" fill="none" stroke="currentColor" opacity=".5"/>'])
    return ''.join(parts)


BOOKS = [
    ('retrospective-validation', 'RESEARCH REPORT', 'RETROSPECTIVE VALIDATION', ['Looking back.', 'Seeing risk', 'earlier.'], 'Retrospective model validation', '#174bef', '#092b99', '#ffffff', '#dce7ff', validation),
    ('merchant-cash-advance', 'INDUSTRY OUTLOOK', 'MERCHANT CASH ADVANCE', ['Reading the', 'rhythm of', 'merchant cash flow.'], 'Signals behind merchant resilience', '#c9dfff', '#9fbef0', '#073095', '#e7effc', merchant),
    ('insurtech', 'INDUSTRY OUTLOOK', 'INSURTECH', ['A clearer view', 'of changing', 'exposure.'], 'Risk intelligence for insurance', '#123878', '#061d4b', '#eef5ff', '#d5dfed', insurance),
    ('mortgage', 'INDUSTRY OUTLOOK', 'MORTGAGE LENDING', ['Beyond the', 'mortgage', 'application.'], 'A fuller picture of borrower risk', '#eaf2ff', '#c2d6fa', '#073095', '#e0e9f8', mortgage),
    ('auto-finance', 'INDUSTRY OUTLOOK', 'AUTO FINANCE', ['The road ahead', 'for auto', 'credit.'], 'From origination to the last payment', '#2364e2', '#1246b0', '#ffffff', '#cfdef5', auto),
    ('fintech', 'INDUSTRY OUTLOOK', 'FINTECH', ['Intelligence for', 'embedded', 'finance.'], 'Connecting decisions at scale', '#ffffff', '#e4edfd', '#0c36a3', '#cfddf3', fintech),
    ('business-lending', 'INDUSTRY OUTLOOK', 'BUSINESS LENDING', ['The connected', 'business', 'borrower.'], 'Beyond the balance sheet', '#153b9a', '#082361', '#ffffff', '#d7e2f5', business),
    ('consumer-credit', 'INDUSTRY OUTLOOK', 'CONSUMER CREDIT', ['A living view', 'of consumer', 'credit.'], 'Affordability in a changing world', '#4775f1', '#244aba', '#ffffff', '#e1e8fc', consumer),
]


def render(book, number):
    slug, category, industry, title, subtitle, cover_top, cover_bottom, ink, background, diagram = book
    title_size = 34 if slug == 'merchant-cash-advance' else 39
    title_text = ''.join(f'<tspan x="40" y="{124+i*44}">{escape(line)}</tspan>' for i, line in enumerate(title))
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="650" viewBox="0 0 1200 650">
  <title>AMLOK — {escape(industry.title())} research book cover</title>
  <desc>Blue editorial book mockup with an abstract industry illustration. Research preview; publication forthcoming.</desc>
  <defs>
    <linearGradient id="backdrop" x1="0" y1="1" x2="1" y2="0"><stop stop-color="{background}"/><stop offset="1" stop-color="#f6f9ff"/></linearGradient>
    <linearGradient id="cover" x1="0" y1="0" x2="1" y2="1"><stop stop-color="{cover_top}"/><stop offset="1" stop-color="{cover_bottom}"/></linearGradient>
    <linearGradient id="spine"><stop stop-color="#021d64"/><stop offset=".3" stop-color="{cover_bottom}"/><stop offset=".82" stop-color="{cover_top}"/><stop offset="1" stop-color="{cover_bottom}"/></linearGradient>
    <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1"><stop stop-color="{ink}" stop-opacity=".16"/><stop offset="1" stop-color="{ink}" stop-opacity=".02"/></linearGradient>
    <linearGradient id="sheen"><stop stop-color="#fff" stop-opacity=".16"/><stop offset=".4" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity=".03"/></linearGradient>
    <filter id="shadow" x="-70%" y="-30%" width="220%" height="180%"><feDropShadow dx="-28" dy="30" stdDeviation="25" flood-color="#031e59" flood-opacity=".26"/><feDropShadow dx="-5" dy="7" stdDeviation="5" flood-color="#031e59" flood-opacity=".2"/></filter>
  </defs>
  <rect width="1200" height="650" fill="url(#backdrop)"/>
  <path d="M540-70L1250 274V326L432-70Z" fill="#fff" opacity=".14"/>
  <path d="M715-70L1250 187V209L659-70Z" fill="#fff" opacity=".24"/>
  {logo(38, 36, 116, '#073095')}
  <g fill="#173768" font-family="Arial, sans-serif" font-size="11" letter-spacing="1.8"><text x="902" y="51">AMLOK RESEARCH</text><text x="1120" y="51">{number:02}</text><text x="38" y="612" font-size="10">{escape(industry)}</text></g>
  <g filter="url(#shadow)">
    <g transform="translate(375 112) rotate(-2 225 300)">
      <rect x="-17" y="1" width="30" height="600" rx="3" fill="url(#spine)"/>
      <path d="M450 4H456V594H450Z" fill="#f5f7fb"/>
      <path d="M452 8V591M454 8V591" stroke="#b4c5e1" stroke-width=".7"/>
      <rect width="450" height="600" rx="3" fill="url(#cover)"/>
      <path d="M14 1V600" stroke="#001d6b" stroke-opacity=".16"/>
      <path d="M17 1V600M1 1H446" stroke="#fff" stroke-opacity=".22"/>
      <rect width="450" height="600" rx="3" fill="url(#sheen)"/>
      <g fill="{ink}" font-family="Arial, sans-serif">
        <text x="40" y="47" font-size="9" letter-spacing="1.8">{category}</text>
        {logo(327, 32, 84, ink)}
        <text font-size="{title_size}" font-weight="500" letter-spacing="-1.3">{title_text}</text>
        <text x="40" y="240" font-size="12" opacity=".8">{escape(subtitle)}</text>
        <path d="M40 269H410" stroke="{ink}" stroke-opacity=".3"/>
      </g>
      <g color="{ink}" font-family="Arial, sans-serif">{diagram()}</g>
    </g>
  </g>
</svg>'''


if __name__ == '__main__':
    OUTPUT.mkdir(parents=True, exist_ok=True)
    for index, book in enumerate(BOOKS, 1):
        (OUTPUT / f'{book[0]}.svg').write_text(render(book, index))
    print(f'Generated {len(BOOKS)} research book covers in {OUTPUT}')
