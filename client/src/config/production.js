// Production configuration for Vercel deployment
export const config = {
  // API base URL - will be set by Vercel environment variables
  API_BASE_URL: process.env.REACT_APP_API_URL || 'https://your-vercel-app.vercel.app/api/v1',
  
  // Environment
  NODE_ENV: 'production',
  
  // Feature flags
  ENABLE_NOTIFICATIONS: true,
  ENABLE_FILE_UPLOAD: true,
  
  // Analytics and monitoring
  ENABLE_ANALYTICS: false,
  
  // Security
  ENABLE_HTTPS: true,
  
  // CORS origins
  ALLOWED_ORIGINS: [
    'https://your-vercel-app.vercel.app',
    'https://your-custom-domain.com'
  ]
};

export default config; 