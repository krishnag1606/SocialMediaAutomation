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
│   └── .env.example     # Environment variables template
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
    └── .env.example
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

### API Keys Status
- ✅ Zernio API Key: Working
- ❌ Gemini API Key: Currently invalid (needs correction)
  - Get from: https://aistudio.google.com/apikey
  - Valid format: `AIzaSy...`
- ⚠️ Leonardo API Key: Should be verified
- ✅ Cloudinary: Configured

### Security Checklist
- [ ] Change JWT_SECRET to a strong random string
- [ ] Use environment-specific configurations
- [ ] Enable HTTPS in production
- [ ] Set proper CORS origins
- [ ] Keep .env out of version control
- [ ] Use strong database passwords
- [ ] Validate and sanitize all inputs
- [ ] Keep dependencies updated

## Troubleshooting

### "API Key not found" error
- Verify GEMINI_API_KEY is set correctly
- Format should be `AIzaSy...`, not `AQ.Ab8...`

### Database connection issues
- Check MONGODB_URI is correct
- Ensure IP is whitelisted in MongoDB Atlas
- Verify credentials

### CORS errors
- Check FRONTEND_URL matches your deployment domain
- Update server CORS configuration if needed

### Authentication failures
- Ensure JWT_SECRET matches between server instances
- Check token expiration (currently 30 days)
- Verify auth middleware is applied to protected routes

## Build Artifacts
- Server: TypeScript → compiled to `dist/` folder
- Client: React → compiled to `dist/` folder
- Both `dist/` folders are gitignored and generated during build

## Continuous Deployment
For CI/CD pipelines, use:
```bash
# Server
npm install
npm run build
npm start

# Client  
npm install
npm run build
# Deploy dist/ folder
```
