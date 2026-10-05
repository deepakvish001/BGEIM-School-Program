# BGIEM School Program

Documents for the AI workshops that Baderia Global Institute of Engineering & Management, Jabalpur, runs in schools.

- **`BGIEM_AI_Workshop_Course_Curriculum.pdf`**: course curriculum for the AI Awareness & Hands-on Workshop for School Students. It covers the programme, the objectives, a course content table (modules, chapters, topics and practicals), course outcomes and the tools covered.
- **`BGIEM_AI_Innovation_Lab_Workshop_Plan.pdf`**: plan for the AI Innovation Lab, a fully hands-on lab workshop. It has a mission-wise lab plan, problem cards, Demo Day, the take-home starter kit, a continuation plan, lab requirements, a team worksheet and a prompt card.
- `source/`: the editable HTML source of each PDF
- `assets/`: college logo and font (Source Serif 4, SIL Open Font License)

## Rebuilding the PDFs

After editing a file in `source/`:

```bash
npm install
npm run build
```

This needs Node.js and Playwright (Chromium).
