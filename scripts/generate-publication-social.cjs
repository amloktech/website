// Render the editable SVG covers to shareable 1200 x 630 social images.
// Uses the same Sharp dependency as Next.js; no remote artwork is fetched.
const fs = require('node:fs');
const path = require('node:path');
const sharp = require(require.resolve('sharp', { paths: [path.dirname(require.resolve('next/package.json'))] }));
const root = path.resolve(__dirname, '..');
const publications = JSON.parse(fs.readFileSync(path.join(root, 'src/content/publications.json'), 'utf8'));
(async () => {
  const output = path.join(root, 'public/images/publications');
  fs.mkdirSync(output, { recursive: true });
  for (const publication of publications) {
    const slug = publication.slug.split('/').pop();
    await sharp(path.join(root, 'public', publication.image))
      .resize(1200, 630, { fit: 'cover' })
      .png({ compressionLevel: 9 }).toFile(path.join(output, `${slug}.png`));
  }
  console.log(`Rendered ${publications.length} publication share images.`);
})().catch(error => { console.error(error); process.exitCode = 1; });
