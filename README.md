# StudyLove Frontend (Next.js)

Beautiful frontend for StudyLove. Connects to your backend API.

## Getting Started (Local)
```bash
npm i
cp .env.example .env.local  # edit API url if needed
npm run dev
```
## Deploy on Vercel
- Push this folder to GitHub
- Import on Vercel
- Add env var if your backend URL is different:
  - `NEXT_PUBLIC_API_BASE` = https://your-backend.vercel.app
