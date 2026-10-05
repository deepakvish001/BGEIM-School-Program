// Builds the course curriculum PDF from source/course-curriculum.html using headless Chromium.
// Usage: node scripts/build-pdf.js
const path = require('path');
const fs = require('fs');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..');
const src = path.join(root, 'source', 'course-curriculum.html');
const out = path.join(root, 'BGIEM_AI_Workshop_Course_Curriculum.pdf');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file://' + src, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: out, preferCSSPageSize: true, printBackground: true });
  await browser.close();

  // Document properties (optional: needs `npm install`)
  try {
    const { PDFDocument } = require('pdf-lib');
    const doc = await PDFDocument.load(fs.readFileSync(out));
    doc.setTitle('Course Curriculum - AI Awareness & Hands-on Workshop for School Students');
    doc.setAuthor('Deepak Vishwakarma, Trainer, BGIEM');
    doc.setSubject('Module-wise curriculum for the AI workshop conducted by BGIEM in schools');
    doc.setKeywords(['BGIEM', 'AI workshop', 'school outreach', 'course curriculum']);
    doc.setCreator('Baderia Global Institute of Engineering & Management, Jabalpur');
    fs.writeFileSync(out, await doc.save());
  } catch (e) {
    console.warn('Skipped PDF metadata:', e.message);
  }
  console.log('Wrote', path.relative(root, out));
})();
