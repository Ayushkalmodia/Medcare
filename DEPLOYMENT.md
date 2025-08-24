# 🚀 Medicare Project - Vercel Deployment Guide

## 📋 Prerequisites

- [Vercel Account](https://vercel.com/signup)
- [GitHub Repository](https://github.com/Ayushkalmodia/Medcare.git)
- [MongoDB Atlas Account](https://www.mongodb.com/atlas) (for production database)

## 🔧 Step 1: Prepare Your Project

### 1.1 Environment Variables Setup

Create a `.env.production` file in the `client` directory:

```bash
# Client .env.production
REACT_APP_API_URL=https://your-vercel-app.vercel.app/api/v1
REACT_APP_NODE_ENV=production
```

Create a `.env.production` file in the `server` directory:

```bash
# Server .env.production
NODE_ENV=production
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_production_jwt_secret
JWT_EXPIRE=30d
JWT_COOKIE_EXPIRE=30
FILE_UPLOAD_PATH=./uploads
MAX_FILE_UPLOAD=10000000
CLIENT_URL=https://your-vercel-app.vercel.app
```

### 1.2 Update MongoDB Connection

Replace your local MongoDB with MongoDB Atlas:
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string
4. Update the `MONGO_URI` in your server environment

## 🌐 Step 2: Deploy to Vercel

### 2.1 Install Vercel CLI

```bash
npm install -g vercel
```

### 2.2 Deploy Backend (Serverless Functions)

```bash
cd server
vercel --prod
```

When prompted:
- Set up and deploy: `Y`
- Which scope: Select your account
- Link to existing project: `N`
- Project name: `medicare-backend`
- Directory: `./` (current directory)
- Override settings: `N`

### 2.3 Deploy Frontend

```bash
cd ../client
vercel --prod
```

When prompted:
- Set up and deploy: `Y`
- Which scope: Select your account
- Link to existing project: `N`
- Project name: `medicare-frontend`
- Directory: `./` (current directory)
- Override settings: `N`

## ⚙️ Step 3: Configure Vercel

### 3.1 Set Environment Variables

Go to your Vercel dashboard and set these environment variables:

**For Backend:**
```
NODE_ENV=production
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_production_jwt_secret
JWT_EXPIRE=30d
JWT_COOKIE_EXPIRE=30
FILE_UPLOAD_PATH=./uploads
MAX_FILE_UPLOAD=10000000
CLIENT_URL=https://your-frontend-domain.vercel.app
```

**For Frontend:**
```
REACT_APP_API_URL=https://your-backend-domain.vercel.app/api/v1
REACT_APP_NODE_ENV=production
```

### 3.2 Update CORS Settings

In your `server/src/server.js`, update CORS origins:

```javascript
app.use(cors({
  origin: [
    'https://your-frontend-domain.vercel.app',
    'http://localhost:5173', // Keep for development
    'http://localhost:5174'
  ],
  credentials: true
}));
```

## 🔄 Step 4: Update Frontend API Calls

### 4.1 Update API Base URL

In `client/src/utils/api.js`, the API_URL will automatically use the environment variable:

```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api/v1';
```

### 4.2 Update AuthContext

In `client/src/contexts/AuthContext.jsx`, update the base URL:

```javascript
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api/v1',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});
```

## 🚀 Step 5: Deploy and Test

### 5.1 Deploy Both Services

```bash
# Deploy backend
cd server && vercel --prod

# Deploy frontend
cd ../client && vercel --prod
```

### 5.2 Test Your Deployment

1. **Frontend**: Visit your frontend Vercel URL
2. **Backend**: Test API endpoints at your backend Vercel URL
3. **Database**: Verify MongoDB Atlas connection
4. **Authentication**: Test login/registration
5. **Notifications**: Test the notification system

## 🔧 Step 6: Custom Domain (Optional)

1. Go to your Vercel project settings
2. Add your custom domain
3. Update environment variables with new domain
4. Redeploy if necessary

## 📱 Step 7: Mobile Optimization

### 7.1 PWA Setup

Add to `client/public/manifest.json`:

```json
{
  "name": "Medicare - Healthcare Management",
  "short_name": "Medicare",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#3b82f6"
}
```

### 7.2 Service Worker

Create `client/public/sw.js` for offline functionality.

## 🚨 Troubleshooting

### Common Issues:

1. **CORS Errors**: Check CORS origins in server configuration
2. **Environment Variables**: Ensure all variables are set in Vercel
3. **Database Connection**: Verify MongoDB Atlas connection string
4. **Build Errors**: Check Vercel build logs for missing dependencies

### Debug Commands:

```bash
# Check Vercel deployment status
vercel ls

# View deployment logs
vercel logs

# Redeploy specific service
vercel --prod
```

## 📊 Monitoring

- **Vercel Analytics**: Built-in performance monitoring
- **MongoDB Atlas**: Database performance and monitoring
- **Error Tracking**: Consider adding Sentry for error monitoring

## 🔒 Security Considerations

1. **Environment Variables**: Never commit secrets to Git
2. **HTTPS**: Vercel provides automatic HTTPS
3. **CORS**: Restrict origins to your domains only
4. **Rate Limiting**: Implement API rate limiting
5. **Input Validation**: Ensure all inputs are validated

## 📈 Performance Optimization

1. **Image Optimization**: Use Vercel's automatic image optimization
2. **Code Splitting**: Implement React.lazy() for route-based splitting
3. **Caching**: Set appropriate cache headers
4. **CDN**: Vercel provides global CDN automatically

---

## 🎯 Quick Deploy Commands

```bash
# Full deployment in one go
cd server && vercel --prod && cd ../client && vercel --prod

# Check status
vercel ls

# View logs
vercel logs medicare-backend
vercel logs medicare-frontend
```

Your Medicare application will be live at your Vercel URLs! 🏥✨ 