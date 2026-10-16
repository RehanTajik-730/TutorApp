# TutorBridge PK - Matchmaking & Academic Tracking Web App

A modern, responsive web application for Pakistan's private tutoring ecosystem, combining location-based matchmaking with post-hire academic accountability.

## Key Features

1. **Proximity & Skill Matchmaking (`/`)**:
   - Location-aware tutor ranking using the Haversine formula (Karachi, Lahore, Islamabad, Rawalpindi).
   - Filter by curriculum (CAIE O/A Levels, Federal/Punjab/Sindh Board Matric & FSc, MDCAT, ECAT, SAT/ACT).
   - Transparent bundle pricing (sibling discounts, group session rates).
   - Two-way mutual review system (Parents review tutors; tutors review students).

2. **Live Syllabus Tracker (`/syllabus`)**:
   - 1-click topic checkoff for tutors with completion timestamps, notes, and homework.
   - Live visual pace & progress bar for parents.

3. **AI Quiz Arena (`/ai-quiz`)**:
   - Built-in Gemini AI generator turning lecture notes into past-paper calibrated MCQs.
   - Interactive timed quiz interface with immediate grading, explanations, and score sharing.

4. **Improvement Analytics (`/analytics`)**:
   - Visual trajectory graph tracking student score improvements from baseline to current day.
   - Topical mastery heatmaps and unified assessment logs.

5. **Global Past Papers Archive (`/past-papers`)**:
   - **Pakistan**: Matric, FSc, MDCAT, GCE O/A Levels.
   - **USA**: Digital SAT, ACT, APs.
   - **UK**: GCSE, IGCSE, A Levels (Cambridge, Edexcel, AQA).
   - PDF preview modal & download actions.

## Getting Started

### 1. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Optional: Configure Gemini API Key
To connect your own Google Gemini API key for live AI quiz generation, create `.env.local`:
```bash
GEMINI_API_KEY=your_actual_gemini_api_key
```
*(The app also features an intelligent built-in generator so all quizzes and sample generation work immediately out of the box).*
