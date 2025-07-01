Smartdesk Frontend
Overview
Smartdesk Frontend is a modern, responsive single-page application (SPA) built with React, TypeScript, and Vite, styled with Tailwind CSS. It provides an intuitive user interface for the Smartdesk application, enabling users to manage smart desk settings, upload documents, authenticate via Google OAuth, and interact with AI-powered features. The app uses React Router for navigation, Redux Toolkit for state management, and Radix UI for accessible components. It is deployed on Vercel for fast, scalable hosting.
Features

Responsive UI: Mobile-friendly design with Tailwind CSS and Radix UI components (avatars, tabs, progress bars, etc.).
Client-Side Routing: Seamless navigation using react-router-dom for pages like Home, Dashboard, and Login.
Authentication: Supports Google OAuth login and JWT-based authentication, integrated with the Smartdesk backend.
Form Handling: Robust forms with react-hook-form and zod for validation (e.g., signup, file uploads).
State Management: Global state managed with Redux Toolkit for user data, desk settings, and API responses.
Theming: Light/dark mode toggle via next-themes.
Notifications: User feedback via toast notifications (sonner).
File Uploads: Upload images or documents to the backend, displayed via Cloudinary URLs.
AI Integration: Displays AI-generated insights (e.g., document summaries) from the backend.

Tech Stack

Framework: React 19, TypeScript
Build Tool: Vite 6.3.5
Styling: Tailwind CSS 4.1.7, Radix UI
State Management: Redux Toolkit 2.8.2
Routing: React Router 7.6.0
Form Handling: React Hook Form 7.56.4, Zod 3.25.28
Authentication: React OAuth Google 0.12.2
Icons: Lucide React 0.511.0
Deployment: Vercel

Project Structure
smartdesk-frontend/
├── public/                 # Static assets (images, favicon)
├── src/                    # Source code
│   ├── assets/             # Images, fonts, etc.
│   ├── components/         # Reusable components (e.g., NavBar, FeatureCard)
│   ├── pages/              # Route-based components (e.g., Home.tsx, Login.tsx)
│   ├── store/              # Redux Toolkit slices and store configuration
│   ├── styles/             # Tailwind CSS and custom styles
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # Entry point
│   └── ...                 # Utilities, hooks, constants
├── .eslintrc              # ESLint configuration
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
├── .env                   # Environment variables (e.g., VITE_API_URL)
└── README.md               # This file

Prerequisites

Node.js: v18 or higher
pnpm: v9.12.2 (package manager specified in package.json)
Vercel Account: For deployment
Backend API: Running instance of the Smartdesk Backend (see smartdesk-backend)

Setup Instructions

Clone the Repository:
git clone https://github.com/Neeraj110/smartdesk-frontend.git
cd smartdesk-frontend


Install Dependencies:
pnpm install


Configure Environment Variables:Create a .env file in the root directory and add:
VITE_API_URL=<backend-api-url> # e.g., https://smartdesk-backend.herokuapp.com
VITE_GOOGLE_CLIENT_ID=<google-oauth-client-id>

Replace <backend-api-url> with the deployed backend URL and <google-oauth-client-id> with your Google OAuth client ID.

Run Development Server:
pnpm dev

The app will be available at http://localhost:5173.

Build for Production:
pnpm build

Outputs to the dist/ folder.

Preview Production Build:
pnpm preview


Lint Code:
pnpm lint



Deployment

Vercel Deployment:
Push the repository to GitHub.
Connect to Vercel via the Vercel CLI or dashboard.
Run:vercel

Configure environment variables in Vercel’s dashboard (VITE_API_URL, VITE_GOOGLE_CLIENT_ID).
Deploy to a custom domain or Vercel’s default URL (e.g., smartdesk-frontend-howv.vercel.app).


Contributing
Fork the repository.

