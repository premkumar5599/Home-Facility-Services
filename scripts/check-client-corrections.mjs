import fs from 'node:fs';
import assert from 'node:assert/strict';
const home = fs.readFileSync('out/index.html', 'utf8');
const about = fs.readFileSync('out/about/index.html', 'utf8');
const contact = fs.readFileSync('out/contact/index.html', 'utf8');
const portfolio = fs.readFileSync('out/clients/index.html', 'utf8');
for (const text of ['400', '120', '30', 'Chennai, Vellore and Hosur']) {
  assert(home.includes(text), `Missing home fact: ${text}`);
  assert(about.includes(text), `Missing about fact: ${text}`);
}
for (const html of [home, about, contact, portfolio]) {
  assert(!/80720\s?07850|8072007850/.test(html), 'Old company phone found');
  assert(html.includes('tel:+917708241218'), 'Missing mobile link');
  assert(html.includes('tel:+914446406372'), 'Missing landline link');
}
assert.equal((portfolio.match(/class="portfolio-card /g) || []).length, 32);
assert(portfolio.includes('cult.fit'));
assert.equal((about.match(/class="founder-photo"/g) || []).length, 4);
const schemas = [...contact.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(m => JSON.parse(m[1]));
const company = schemas.find(s => s['@type'] === 'LocalBusiness');
assert.deepEqual(company.areaServed.map(s => s.name), ['Chennai', 'Vellore', 'Hosur']);
assert.equal(company.telephone, '+917708241218');
assert(company.contactPoint.some(c => c.telephone === '+914446406372'));
console.log('PASS: corrected contacts, company figures, three service cities, 32 clients and four founder portraits.');
