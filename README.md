# Social Media Automation - Deployment Guide

## Project Structure
```
SocialMediaAutomation/
├── server/              # Express.js backend (TypeScript)
│   ├── controllers/     # API controllers
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── middlewares/     # Auth & other middlewares
│   ├── services/        # Business logic
│   ├── config/          # Configuration files
│   ├── server.ts        # Entry point
│   ├── package.json     # Dependencies
│   └── .env    # Environment variables template
│
└── Client/              # React frontend (Vite)
    ├── src/
    │   ├── pages/       # Page components
    │   ├── components/  # Reusable components
    │   ├── context/     # React context (Auth)
    │   ├── api/         # Axios configuration
    │   └── main.tsx     # Entry point
    ├── package.json
    ├── vite.config.ts
    └── .env
```

## Prerequisites
- Node.js 18+ 
- npm or yarn
- MongoDB Atlas account (or local MongoDB)
- Environment variables configured

## Environment Variables

### Server (.env)
Copy `.env.example` to `.env` and configure:
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `ZERNIO_API_KEY` - Social media integration API
- `GEMINI_API_KEY` - Google Gemini for AI content
- `LEONARDO_API_KEY` - Leonardo.ai for image generation
- `CLOUDINARY_*` - Media hosting credentials

### Client (.env)
- `VITE_API_BASE_URL` - Backend API URL (default: http://localhost:3000)

## Local Development Setup

### Backend
```bash
cd server
npm install
npm run dev          # Development with hot reload
npm run build       # Production build
npm start           # Run production build
```

### Frontend
```bash
cd Client
npm install
npm run dev         # Development at http://localhost:5173
npm run build       # Production build
npm run preview     # Preview production build
```

## Production Deployment

### Backend Deployment (e.g., Heroku, Railway, Render)
1. **Build:**
   ```bash
   npm run build
   ```

2. **Start:**
   ```bash
   npm start
   # OR
   npm run prod
   ```

3. **Environment Setup:**
   - Set all `.env` variables in deployment platform
   - Ensure MongoDB URI is production database
   - Use strong JWT_SECRET

### Frontend Deployment (e.g., Vercel, Netlify, Cloudflare Pages)
1. **Build:**
   ```bash
   npm run build
   # Outputs to dist/ folder
   ```

2. **Deploy:** Upload `dist/` folder to your hosting

3. **Environment:** Set `VITE_API_BASE_URL` to production backend URL

## Important Notes

### Database
- MongoDB Atlas is recommended for cloud hosting
- Connection string format: `mongodb+srv://username:password@cluster.mongodb.net/database`

### Security Checklist
- [ ] Change JWT_SECRET to a strong random string
- [ ] Use environment-specific configurations
- [ ] Enable HTTPS in production
- [ ] Set proper CORS origins
- [ ] Keep .env out of version control
- [ ] Use strong database passwords
- [ ] Validate and sanitize all inputs
- [ ] Keep dependencies updated
