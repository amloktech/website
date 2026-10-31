"""Check the static export after `pnpm build` without external dependencies."""
import json
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit
from xml.etree import ElementTree

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'out'
INDEX = json.loads((ROOT / 'src/content/page-index.json').read_text())
NEW_PAGES = json.loads((ROOT / 'src/content/site-pages.json').read_text())
errors = []


class Page(HTMLParser):
    def __init__(self, source):
        super().__init__()
        self.links, self.assets, self.ids, self.canonicals, self.robots = [], [], set(), [], []
        self.headings = 0
        self.feed(source)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if attrs.get('id'):
            self.ids.add(attrs['id'])
        if tag == 'a' and attrs.get('href'):
            self.links.append(attrs['href'])
        if tag in ('img', 'script') and attrs.get('src'):
            self.assets.append(attrs['src'])
        if tag == 'link' and attrs.get('rel') == 'stylesheet':
            self.assets.append(attrs['href'])
        if tag == 'link' and attrs.get('rel') == 'canonical':
            self.canonicals.append(attrs['href'])
        if tag == 'meta' and attrs.get('name') == 'robots':
            self.robots.append(attrs.get('content', ''))
        if tag == 'h1':
            self.headings += 1


def exported(path):
    clean = unquote(path).lstrip('/')
    candidates = [OUT / clean, OUT / (clean + '.html'), OUT / clean / 'index.html']
    return next((candidate for candidate in candidates if candidate.is_file()), None)


parsed = {}
for entry in INDEX + [{'path': '/brand'}]:
    path = entry['path']
    file = exported(path)
    if not file:
        errors.append(f'Missing exported page: {path}')
        continue
    parsed[path] = Page(file.read_text())

for path, page in parsed.items():
    for href in page.links:
        if href.startswith('//'):
            errors.append(f'Unexpected protocol-relative link on {path}: {href}')
            continue
        url = urlsplit(urljoin('https://local.invalid' + path, href))
        if url.netloc != 'local.invalid' or url.scheme not in ('http', 'https'):
            continue
        file = exported(url.path)
        if not file:
            errors.append(f'Broken link on {path}: {href}')
        elif url.fragment and file.suffix == '.html':
            target = parsed.get(url.path) or Page(file.read_text())
            if unquote(url.fragment) not in target.ids:
                errors.append(f'Missing anchor on {path}: {href}')
    for asset in page.assets:
        url = urlsplit(asset)
        if asset.startswith('/') and not url.netloc and not exported(url.path):
            errors.append(f'Missing asset on {path}: {asset}')

sitemap = ElementTree.fromstring((OUT / 'sitemap.xml').read_text())
urls = [node.text for node in sitemap.findall('{*}url/{*}loc')]
paths = {urlsplit(url).path or '/' for url in urls}
expected = {entry['path'] for entry in INDEX}
if paths != expected or len(urls) != len(expected):
    errors.append(f'Sitemap mismatch. Missing: {expected - paths}. Extra: {paths - expected}')
for url in urls:
    page = parsed.get(urlsplit(url).path or '/')
    if not page or page.canonicals != [url.rstrip('/')]:
        errors.append(f'Canonical mismatch: {url}')
    if page and any('noindex' in value for value in page.robots):
        errors.append(f'Noindex page in sitemap: {url}')
for page in NEW_PAGES:
    path = '/' + page['slug']
    if path in parsed and parsed[path].headings != 1:
        errors.append(f'Expected one main heading on {path}: {parsed[path].headings}')
if not any('noindex' in value for value in parsed['/brand'].robots):
    errors.append('Brand guidelines lost its noindex setting')
origin = urlsplit(urls[0])
if f'Sitemap: {origin.scheme}://{origin.netloc}/sitemap.xml' not in (OUT / 'robots.txt').read_text():
    errors.append('robots.txt does not point to the generated sitemap')

if errors:
    print('\n'.join(sorted(set(errors))))
    sys.exit(1)
print(f'PASS: {len(parsed)} pages, {len(urls)} sitemap URLs, internal links, anchors, assets, canonical URLs, and main headings.')
