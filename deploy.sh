#!/bin/bash

echo "🚀 Starting Medicare Project Deployment to Vercel..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Deploy Backend
echo "📡 Deploying Backend..."
cd server
vercel --prod --yes

# Get backend URL from vercel output
BACKEND_URL=$(vercel ls | grep medicare-backend | awk '{print $2}')
echo "✅ Backend deployed at: $BACKEND_URL"

# Deploy Frontend
echo "🌐 Deploying Frontend..."
cd ../client
vercel --prod --yes

# Get frontend URL from vercel output
FRONTEND_URL=$(vercel ls | grep medicare-frontend | awk '{print $2}')
echo "✅ Frontend deployed at: $FRONTEND_URL"

echo ""
echo "🎉 Deployment Complete!"
echo "📱 Frontend: $FRONTEND_URL"
echo "🔧 Backend: $BACKEND_URL"
echo ""
echo "⚠️  Don't forget to:"
echo "   1. Set environment variables in Vercel dashboard"
echo "   2. Update MongoDB Atlas connection string"
echo "   3. Test all functionality"
echo ""
echo "🔗 Vercel Dashboard: https://vercel.com/dashboard" 