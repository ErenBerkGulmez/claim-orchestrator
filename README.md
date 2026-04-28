ClaimOrchestrator
A modern insurance claim orchestration dashboard built with React, TypeScript, and Tailwind CSS. The application focuses on visualizing and managing the lifecycle of an insurance claim through a clear, interactive timeline interface.
 Overview
ClaimOrchestrator is designed to simplify complex claim processes by turning them into an easy-to-follow visual flow. The goal was to create something that feels fresh, intuitive, and quick to understand at first glance.
 Features


Interactive Timeline
Track the full claim lifecycle from initial steps to final resolution through a structured visual flow.


Node-Based System
Each step in the claim process is represented as a modular, extensible node.


Annotations
Add and manage notes directly on specific steps in the process.


State Persistence
User data such as notes is preserved using local storage.


Responsive Design
Optimized for both desktop and mobile usage.


Tech Stack


React 18


TypeScript


Vite


Tailwind CSS


Zustand (state management with persistence)


TanStack Query


Lucide React


📂 Project Structure
```text
src/
├── components/
│   ├── timeline/
│   └── ui/
├── hooks/
├── store/
├── data/
└── App.tsx
```
Getting Started
Prerequisites


Node.js (v18+)


npm or yarn


Installation
```text
git clone https://github.com/ErenBerkGulmez/claim-orchestrator
cd claim-orchestrator
npm install
npm run dev
```

Limitations & Notes
This project was developed under time constraints and is not fully complete.


The document/attachment upload functionality was planned but not implemented.


Some parts of the UI and additional pages are not as polished as intended.


The current implementation focuses mainly on the core timeline experience.

The **delete note (trash) functionality is not implemented properly**.  
  However, notes can still be removed manually by editing the note content and deleting the text, then saving it.

Design Approach
The design was intentionally kept clean and minimal to make the flow easy to understand without overwhelming the user. The goal was to create a system that feels natural to navigate rather than overly complex.
If more time were available:


Additional themes and visual variations would be implemented


The UI system would be expanded for better scalability


More advanced interactions and refinements would be added


Development Constraints
This project was built under non-ideal conditions:


I did not have access to my main development computer


The implementation was done using Gemini for coding assistance


A standard version of ChatGPT was used only for improving this README


Given more time and proper setup, the project could be significantly improved both technically and visually.
Future Improvements


Document / file attachment system


Multiple UI themes


Expanded dashboard pages


Better state handling for complex workflows


Backend integration



This project represents a focused effort on building a clear and usable claim visualization system, with room for further growth and refinement.