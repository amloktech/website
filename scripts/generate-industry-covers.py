"""Render the industry guide book series using editable, native SVG artwork.

The cover illustrations are conceptual. Source-backed data charts live inside
each guide, where their units, populations and citations remain accessible.
"""
import importlib.util
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('books', ROOT / 'scripts/generate-resource-covers.py')
books = importlib.util.module_from_spec(spec)
spec.loader.exec_module(books)
p, dot = books.path, books.dot


def student():
    return ''.join([
        p('M55 387L224 307 395 387 224 469Z', .9, 2, 'url(#glass)'),
        p('M113 419V471Q223 530 336 471V419M395 387V491', .8, 2),
        dot(395, 492, 6), p('M385 511L395 491 405 511', .8, 2),
        p('M70 534L225 569 378 534M70 554L225 589 378 554', .5, 2),
        p('M70 534V554M378 534V554', .5, 2),
    ])


def rent():
    return ''.join([
        p('M83 320H276L317 361V567H83Z', .8, 2, 'url(#glass)'),
        p('M276 320V361H317M113 389H273M113 414H241M113 439H258', .55, 2),
        '<circle cx="291" cy="486" r="48" fill="url(#cover)" stroke="currentColor" stroke-width="2"/>',
        '<circle cx="291" cy="486" r="15" fill="none" stroke="currentColor" stroke-width="2"/>',
        p('M258 519L199 578H172V551L233 490M188 563L200 575M207 544L219 556', .9, 2),
    ])


def commercial():
    out = [p('M225 363V403M94 431V403H355V431M225 403V431', .6, 2)]
    for x, y, w in [(162, 306, 126), (45, 431, 98), (176, 431, 98), (307, 431, 98)]:
        out.append(f'<rect x="{x}" y="{y}" width="{w}" height="65" rx="5" fill="url(#glass)" stroke="currentColor" stroke-width="1.5"/>')
        out.append(p(f'M{x+18} {y+26}H{x+w-18}M{x+18} {y+42}H{x+w-32}', .65))
    out.extend([p('M94 497V542H355V497M225 497V542', .4), dot(225, 542, 8)])
    return ''.join(out)


def financing():
    out = []
    for x, y in [(55, 320), (150, 378), (245, 436)]:
        out.extend([p(f'M{x} {y}H{x+128}V{y+136}H{x}Z', .9, 1.5, 'url(#glass)'),
                    p(f'M{x+22} {y+30}H{x+105}M{x+22} {y+51}H{x+92}M{x+22} {y+72}H{x+70}', .5)])
        out.append(dot(x+105, y+109, 8))
    return ''.join(out)


def bank():
    out = [p('M57 383L225 300 393 383ZM57 552H393V573H57Z', .9, 2, 'url(#glass)')]
    for x in [91, 168, 245, 322]:
        out.extend([p(f'M{x} 402H{x+33}V532H{x}Z', .85, 1.5, 'url(#glass)'), p(f'M{x-5} 394H{x+38}M{x-5} 541H{x+38}', .55)])
    out.append(dot(225, 354, 9))
    return ''.join(out)


def cooperative():
    out = [p('M225 397L109 496H341Z', .5, 1.5)]
    for x, y in [(225, 357), (109, 475), (341, 475)]:
        out.extend([f'<circle cx="{x}" cy="{y}" r="24" fill="url(#glass)" stroke="currentColor" stroke-width="1.5"/>',
                    p(f'M{x-42} {y+78}V{y+60}C{x-42} {y+18} {x+42} {y+18} {x+42} {y+60}V{y+78}Z', .8, 1.5, 'url(#glass)')])
    out.extend([dot(225, 481, 10), '<circle cx="225" cy="481" r="23" fill="none" stroke="currentColor" opacity=".3"/>'])
    return ''.join(out)


def alternative():
    out = [p('M65 551H150V448H228V353H379M65 551H239V499H379', .4, 2),
           p('M65 551C149 551 145 328 232 328S306 445 379 355', .9, 3)]
    for x, y in [(65, 551), (232, 328), (379, 355)]:
        out.extend([dot(x, y, 7), f'<circle cx="{x}" cy="{y}" r="18" fill="none" stroke="currentColor" opacity=".3"/>'])
    return ''.join(out)


def digital():
    return ''.join([p('M58 326H392V561H58ZM58 367H392', .85, 2, 'url(#glass)'),
                    dot(80, 347, 4), dot(95, 347, 4), dot(110, 347, 4),
                    p('M85 405H245M85 430H215M85 455H231M85 480H176', .55, 2),
                    '<circle cx="316" cy="482" r="52" fill="url(#cover)" stroke="currentColor" stroke-width="2"/>',
                    p('M289 482L308 501 345 460', .95, 4)])


def platform():
    out = []
    for x, y in [(84, 345), (330, 345), (84, 535), (330, 535)]:
        out.extend([p(f'M225 440L{x+18} {y+18}', .5, 2),
                    f'<rect x="{x}" y="{y}" width="36" height="36" rx="5" fill="url(#glass)" stroke="currentColor" stroke-width="1.5"/>'])
    out.extend([p('M161 406L225 372 289 406V477L225 512 161 477ZM161 406L225 443 289 406M225 443V512', .85, 2, 'url(#glass)'),
                p('M102 363H348M102 553H348', .2)])
    return ''.join(out)


def surety():
    return ''.join([p('M78 568H384M117 566V329H298M117 329L238 288 298 329M117 329L238 329V288M158 329V568', .8, 2),
                    p('M117 350L158 391 117 432 158 473 117 514 158 555', .5, 1.5),
                    p('M280 329V418M266 418Q280 447 294 418', .9, 2),
                    p('M220 490L290 451 360 490V568H220ZM220 490H360M245 515V541M275 515V541M305 515V541M335 515V541', .7, 1.5, 'url(#glass)')])


def premium():
    out = [p('M72 325H320V556H72ZM72 377H320M113 309V341M279 309V341', .85, 2, 'url(#glass)')]
    for row in range(3):
        for col in range(4):
            out.append(f'<rect x="{102+col*51}" y="{401+row*42}" width="23" height="18" rx="2" fill="currentColor" opacity="{.15+row*.12}"/>')
    out.extend([p('M318 425L381 448V500Q381 548 318 577Q255 548 255 500V448Z', .9, 2, 'url(#cover)'),
                p('M290 496L310 517 347 475', .9, 3)])
    return ''.join(out)


def mca():
    # A storefront, settlement path and receipt: an editorial diagram, not data.
    out = [p('M60 403V529H260V403M48 403L74 345H247L273 403Z', .9, 2, 'url(#glass)'),
           p('M91 403V345M137 403V345M183 403V345M229 403V345', .55, 1.5),
           p('M85 529V443H137V529M162 443H234V483H162Z', .8, 1.5),
           p('M259 440H302V476H326', .6, 2),
           p('M296 394H388V568L377 561 365 568 353 561 341 568 329 561 317 568 305 561 296 568Z', .9, 2, 'url(#cover)'),
           p('M314 421H371M314 439H361M314 458H367M314 495H371', .6, 1.5),
           p('M322 528L336 542 363 513', .95, 3),
           p('M83 565H222M222 565L210 558M222 565L210 572', .5, 1.5), dot(83, 565, 4)]
    return ''.join(out)


illustrations = {name: getattr(books, name) for name in ['consumer', 'auto', 'mortgage', 'business', 'fintech', 'insurance']}
illustrations.update(student=student, rent=rent, commercial=commercial, financing=financing, bank=bank, cooperative=cooperative, alternative=alternative, digital=digital, platform=platform, surety=surety, premium=premium, mca=mca)
palettes = [
    ('#2259ef', '#092b99', '#ffffff', '#dce7ff'),
    ('#c9dfff', '#a1bfee', '#073095', '#e7effc'),
    ('#173d89', '#071f50', '#f1f6ff', '#dbe5f4'),
    ('#ecf3ff', '#c5d8f9', '#073095', '#e3ebf8'),
    ('#426dea', '#173b9a', '#ffffff', '#dce6fb'),
]

guides = json.loads((ROOT / 'src/content/industry-guide-index.json').read_text())
for index, guide in enumerate(guides):
    first, second, subtitle, art = guide['cover']
    book = (guide['image'], 'INDUSTRY GUIDE', guide['category'].upper(), [first, second], subtitle, *palettes[index % len(palettes)], illustrations[art])
    (books.OUTPUT / f"{guide['image']}.svg").write_text(books.render(book, index + 1))
print(f'Generated {len(guides)} industry guide covers.')
