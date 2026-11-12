# BGIEM School Program

Documents for the AI workshops that Baderia Global Institute of Engineering & Management, Jabalpur, runs in schools.

- **`BGIEM_AI_Workshop_Course_Curriculum.pdf`**: course curriculum for the AI Awareness & Hands-on Workshop for School Students. It covers the programme, the objectives, a course content table (modules, chapters, topics and practicals), course outcomes and the tools covered.
- **`BGIEM_AI_Innovation_Lab_Workshop_Plan.pdf`**: plan for the AI Innovation Lab, a fully hands-on lab workshop. It has a mission-wise lab plan, problem cards, Demo Day, the take-home starter kit, a continuation plan, lab requirements, a team worksheet and a prompt card.
- **`BGIEM_AI_Workshop_Proposal_<School>.pdf`**: formal workshop proposals for Billabong High International School and Satya Prakash Public School, Jabalpur. Each has a covering letter to the Principal and the detailed proposal: Track A (Voice AI Agent, Classes 11–12) and Track B (Sign2Speak, Classes 8–10), with levels, session plans, outcomes, responsibilities, lab requirements, safety, timeline and cost.
- **`BGIEM_Code_the_Voice_Proposal.pdf`**: common proposal for *Code the Voice*, a 3-day (3 hours a day) AI Voice Agent Bootcamp. It has blank fields for the date, school name and class range, which are filled in by hand.
- `source/`: the editable HTML source of each PDF (the proposal is one template, filled in per school by the build script)
- `assets/`: college logo and font (Source Serif 4, SIL Open Font License)

## Rebuilding the PDFs

After editing a file in `source/`:

```bash
npm install
npm run build
```

This needs Node.js and Playwright (Chromium).
