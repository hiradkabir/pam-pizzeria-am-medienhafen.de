const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const failures = [];
const results = [];

const fail = message => failures.push(message);
const pass = message => results.push(message);
const read = relativePath => fs.readFileSync(path.join(root, relativePath), 'utf8');
const normalizeText = value => value
  .replace(/<script[\s\S]*?<\/script>/gi, ' ')
  .replace(/<style[\s\S]*?<\/style>/gi, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replaceAll('&amp;', '&')
  .replaceAll('&nbsp;', ' ')
  .replace(/\s+/g, ' ')
  .trim();

const pages = [
  {
    file: 'index.html',
    canonical: 'https://pam-pizzeria-am-medienhafen.de/'
  },
  {
    file: 'about/index.html',
    canonical: 'https://pam-pizzeria-am-medienhafen.de/about/'
  },
  {
    file: 'speisekarte/index.html',
    canonical: 'https://pam-pizzeria-am-medienhafen.de/speisekarte/'
  }
];

const schemas = new Map();

for (const page of pages) {
  const html = read(page.file);
  const h1Count = (html.match(/<h1\b/gi) || []).length;
  if (h1Count === 1) pass(`${page.file}: exactly one H1`);
  else fail(`${page.file}: expected one H1, found ${h1Count}`);

  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1];
  if (canonical === page.canonical) pass(`${page.file}: canonical is correct`);
  else fail(`${page.file}: canonical is ${canonical || 'missing'}`);

  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
  if (!blocks.length) {
    fail(`${page.file}: no JSON-LD found`);
    continue;
  }

  const parsed = [];
  blocks.forEach((match, index) => {
    try {
      parsed.push(JSON.parse(match[1]));
    } catch (error) {
      fail(`${page.file}: JSON-LD block ${index + 1} is invalid (${error.message})`);
    }
  });
  schemas.set(page.file, parsed);
  if (parsed.length === blocks.length) pass(`${page.file}: ${parsed.length} JSON-LD block(s) parse`);
}

const allNodes = [];
const visit = value => {
  if (!value || typeof value !== 'object') return;
  if (Array.isArray(value)) {
    value.forEach(visit);
    return;
  }
  allNodes.push(value);
  Object.values(value).forEach(visit);
};

for (const blocks of schemas.values()) blocks.forEach(visit);

const nodesOfType = type => allNodes.filter(node => {
  const nodeType = node['@type'];
  return Array.isArray(nodeType) ? nodeType.includes(type) : nodeType === type;
});

const expectedTypes = new Map([
  ['Restaurant', 1],
  ['WebSite', 1],
  ['WebPage', 2],
  ['AboutPage', 1],
  ['Menu', 1],
  ['MenuItem', 76],
  ['Offer', 76],
  ['FAQPage', 1],
  ['BreadcrumbList', 2],
  ['DigitalDocument', 1]
]);

for (const [type, expected] of expectedTypes) {
  const count = nodesOfType(type).length;
  if (count === expected) pass(`JSON-LD: ${count} ${type} node(s)`);
  else fail(`JSON-LD: expected ${expected} ${type} node(s), found ${count}`);
}

const ids = allNodes
  .filter(node => node['@type'])
  .map(node => node['@id'])
  .filter(Boolean);
const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
if (!duplicateIds.length) pass('JSON-LD: all @id values are unique');
else fail(`JSON-LD: duplicate @id values: ${duplicateIds.join(', ')}`);

const aboutHtml = read('about/index.html');
const comparableText = value => normalizeText(value).replace(/\s+([.,;:!?])/g, '$1');
const aboutVisibleText = comparableText(aboutHtml);
const faqPages = nodesOfType('FAQPage');
for (const faq of faqPages) {
  for (const question of faq.mainEntity || []) {
    const answer = question.acceptedAnswer?.text;
    if (!aboutVisibleText.includes(comparableText(question.name))) fail(`FAQ question is not visible: ${question.name}`);
    if (!answer || !aboutVisibleText.includes(comparableText(answer))) fail(`FAQ answer is not visible: ${question.name}`);
  }
}
if (!failures.some(message => message.startsWith('FAQ '))) {
  pass('FAQ JSON-LD matches visible questions and answers');
}

const localReferencePattern = /\b(src|href|poster|data-src|data-src-mobile|data-poster|data-poster-mobile)="([^"]+)"/gi;
for (const page of pages) {
  const html = read(page.file);
  const pageDir = path.dirname(path.join(root, page.file));
  for (const match of html.matchAll(localReferencePattern)) {
    const attribute = match[1].toLowerCase();
    const reference = match[2].split(/[?#]/)[0];
    if (!reference || /^(?:https?:|tel:|mailto:|data:|javascript:)/i.test(reference)) continue;
    const resolved = path.resolve(pageDir, reference);
    if (!resolved.startsWith(root)) {
      fail(`${page.file}: local reference escapes project root (${match[2]})`);
      continue;
    }
    if (!fs.existsSync(resolved)) {
      fail(`${page.file}: missing local reference (${match[2]})`);
      continue;
    }
    if (attribute === 'href' && fs.statSync(resolved).isDirectory() && !fs.existsSync(path.join(resolved, 'index.html'))) {
      fail(`${page.file}: local directory href has no index.html (${match[2]})`);
    }
  }
}

for (const cssFile of ['css/layout.css', 'css/components.css', 'css/responsive.css', 'css/gallery-carousel.css']) {
  const css = read(cssFile);
  const cssDir = path.dirname(path.join(root, cssFile));
  for (const match of css.matchAll(/url\(["']?([^"')]+)["']?\)/gi)) {
    const reference = match[1].split(/[?#]/)[0];
    if (!reference || /^(?:https?:|data:)/i.test(reference)) continue;
    const resolved = path.resolve(cssDir, reference);
    if (!fs.existsSync(resolved)) fail(`${cssFile}: missing local reference (${match[1]})`);
  }
}

if (!failures.some(message => message.includes('local reference'))) {
  pass('HTML/CSS: all local file references exist');
}

const sitemap = read('sitemap.xml');
for (const url of pages.map(page => page.canonical)) {
  if (sitemap.includes(`<loc>${url}</loc>`)) pass(`Sitemap contains ${url}`);
  else fail(`Sitemap is missing ${url}`);
}

// The dedicated menu is useful to guests and crawlers without executing JS.
const menuHtml = read('speisekarte/index.html');
const menuMain = menuHtml.match(/<main\b[\s\S]*?<\/main>/i)?.[0] || '';
const menuVisibleText = normalizeText(menuMain);
if (/role="tabpanel"|\shidden(?:[\s>]|=")|class="[^"]*\bhidden\b/.test(menuMain)) {
  fail('Menu: dishes must not be hidden behind JavaScript tabs');
} else pass('Menu: all categories are present without JavaScript');
for (const item of nodesOfType('MenuItem')) {
  const name = normalizeText(item.name);
  const price = item.offers?.price == null
    ? null
    : Number(item.offers.price).toFixed(2).replace('.', ',') + ' €';
  if (!menuVisibleText.includes(name)) fail(`Menu: structured dish is not visible (${name})`);
  if (price && !menuMain.split('\n').some(line => normalizeText(line).includes(name) && normalizeText(line).includes(price))) {
    fail(`Menu: structured price does not match the dish row (${name}: ${price})`);
  }
}
if (!failures.some(message => message.startsWith('Menu: structured'))) pass('Menu: all 75 structured dishes and prices appear in HTML');
const menuSchema = nodesOfType('Menu')[0];
const restaurant = nodesOfType('Restaurant')[0];
if (menuSchema?.url === pages[2].canonical && restaurant?.hasMenu?.['@id'] === menuSchema?.['@id']) {
  pass('Menu: Restaurant points to the dedicated canonical menu entity');
} else fail('Menu: Restaurant/menu canonical relationship is inconsistent');
const pdf = fs.readFileSync(path.join(root, 'assets/downloads/Sk_Aktuell.pdf'));
if (pdf.subarray(0, 5).toString() === '%PDF-' && menuHtml.includes('download="Sk_Aktuell.pdf"')) {
  pass('Menu: linked PDF download exists and has a valid PDF header');
} else fail('Menu: PDF download is missing or invalid');

results.forEach(message => console.log(`PASS  ${message}`));

if (failures.length) {
  failures.forEach(message => console.error(`FAIL  ${message}`));
  process.exitCode = 1;
} else {
  console.log(`\nSEO validation passed with ${results.length} checks.`);
}
