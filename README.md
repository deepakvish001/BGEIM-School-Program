# BGIEM School Program

Course module for the 2-hour **AI Awareness & Hands-on Workshop for School Students**, run in schools by Baderia Global Institute of Engineering & Management, Jabalpur.

- **`BGIEM_AI_Workshop_Course_Module.pdf`**: the final document, ready to submit (cover page, objectives, session plan, 9 modules, tools, school requirements, sample prompts, end quiz)
- `source/course-module.html`: the editable source of the PDF
- `assets/`: college logo and fonts (Source Sans 3, Source Serif 4, Noto Sans Devanagari; SIL Open Font License)

## Rebuilding the PDF

After editing `source/course-module.html`:

```bash
npm install
npm run build
```

This needs Node.js and Playwright (Chromium).
