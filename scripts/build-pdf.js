// Builds the PDFs in the repo root from the HTML files in source/ using headless Chromium.
// Usage: node scripts/build-pdf.js
const path = require('path');
const fs = require('fs');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..');

const DOCS = [
  {
    src: 'course-curriculum.html',
    out: 'BGIEM_AI_Workshop_Course_Curriculum.pdf',
    title: 'Course Curriculum - AI Awareness & Hands-on Workshop for School Students',
    subject: 'Module-wise curriculum for the AI workshop conducted by BGIEM in schools',
    keywords: ['BGIEM', 'AI workshop', 'school outreach', 'course curriculum'],
  },
  {
    src: 'workshop-plan.html',
    out: 'BGIEM_AI_Innovation_Lab_Workshop_Plan.pdf',
    title: 'AI Innovation Lab - Workshop Plan',
    subject: 'Hands-on AI lab workshop plan for school students',
    keywords: ['BGIEM', 'AI Innovation Lab', 'workshop plan', 'school outreach'],
  },
  ...[
    ['Billabong High International School', 'Billabong High'],
    ['Satya Prakash Public School', 'Satya Prakash Public School'],
  ].map(([name, short]) => ({
    src: 'workshop-proposal.html',
    vars: { SCHOOL_NAME: name, SCHOOL_SHORT: short },
    out: `BGIEM_AI_Workshop_Proposal_${name.replace(/ /g, '_')}.pdf`,
    title: `Workshop Proposal - ${name}, Jabalpur`,
    subject: 'Proposal for a hands-on AI workshop for students of Classes 8 to 12',
    keywords: ['BGIEM', 'AI workshop', 'proposal', name],
  })),
];

(async () => {
  const browser = await chromium.launch();
  for (const d of DOCS) {
    const out = path.join(root, d.out);
    // Templates with {{VARS}} are filled into a temporary copy next to the source,
    // so that relative asset paths still resolve.
    let src = path.join(root, 'source', d.src);
    let tmp = null;
    if (d.vars) {
      const html = fs.readFileSync(src, 'utf8')
        .replace(/\{\{(\w+)\}\}/g, (m, k) => (k in d.vars ? d.vars[k] : m));
      tmp = src = path.join(root, 'source', `.build-${process.pid}-${path.basename(d.out, '.pdf')}.html`);
      fs.writeFileSync(tmp, html);
    }
    const page = await browser.newPage();
    try {
      await page.goto('file://' + src, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      await page.pdf({ path: out, preferCSSPageSize: true, printBackground: true });
    } finally {
      await page.close();
      if (tmp) fs.unlinkSync(tmp);
    }

    // Document properties (optional: needs `npm install`)
    try {
      const { PDFDocument } = require('pdf-lib');
      const doc = await PDFDocument.load(fs.readFileSync(out));
      doc.setTitle(d.title);
      doc.setAuthor('Deepak Vishwakarma, Trainer, BGIEM');
      doc.setSubject(d.subject);
      doc.setKeywords(d.keywords);
      doc.setCreator('Baderia Global Institute of Engineering & Management, Jabalpur');
      fs.writeFileSync(out, await doc.save());
    } catch (e) {
      console.warn('Skipped PDF metadata:', e.message);
    }
    console.log('Wrote', d.out);
  }
  await browser.close();
})();
