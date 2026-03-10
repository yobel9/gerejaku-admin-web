# Deployment Guide - GerejaKu Admin

## Table of Contents
1. [Prerequisites](#1-prerequisites)
2. [Frontend Deployment](#2-frontend-deployment)
3. [Environment Configuration](#3-environment-configuration)
4. [Database Connection](#4-database-connection)
5. [Post-Deployment Setup](#5-post-deployment-setup)
6. [Monitoring & Maintenance](#6-monitoring--maintenance)

---

## 1. Prerequisites

### Required Services
- ✅ Supabase account (free tier)
- ✅ Git account (GitHub/GitLab/Bitbucket)
- ✅ Code editor (VS Code recommended)

### Required Tools
- ✅ Node.js 16+ installed
- ✅ npm or yarn package manager
- ✅ Git installed
- ✅ Vercel CLI or Netlify CLI (optional)

---

## 2. Frontend Deployment

### Option A: Deploy with Vercel (Recommended)

#### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

#### Step 2: Login to Vercel
```bash
vercel login
```

#### Step 3: Deploy
```bash
# From your project root directory
vercel
```

Follow the prompts:
1. **Set up and deploy?** → Yes
2. **Which scope?** → Select your account
3. **Link to existing project?** → No (new project)
4. **What's your project's name?** → gerejaku-admin
5. **In which directory is your code located?** → . (current directory)
6. **Want to modify these settings?** → No

#### Step 4: Environment Variables
After deployment, add these variables in Vercel dashboard:
- `VITE_SUPABASE_URL` = Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` = Your Supabase anon key

### Option B: Deploy with Netlify

#### Step 1: Install Netlify CLI
```bash
npm install -g netlify-cli
```

#### Step 2: Login to Netlify
```bash
netlify login
```

#### Step 3: Deploy
```bash
netlify deploy --prod
```

#### Step 4: Environment Variables
Add these in Netlify dashboard:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### Option C: Manual Deployment (Static Hosting)

1. Build the project:
```bash
npm run build
```

2. Upload the `dist` folder to:
   - Vercel (drag and drop)
   - Netlify (drag and drop)
   - GitHub Pages
   - Any static hosting service

---

## 3. Environment Configuration

### Create `.env.local` File

Create a file named `.env.local` in your project root:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### Environment Variables Explained

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | `https://xyz.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Public API key | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |

**Important:**
- Never commit `.env.local` to version control
- Always use environment variables in production
- The `VITE_` prefix makes variables available in browser

---

## 4. Database Connection

### Verify Database Connection

After deployment, test the connection:

1. Open your deployed app in browser
2. Open Developer Tools (F12)
3. Go to Console tab
4. Run:
```javascript
// Check if Supabase is configured
console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
console.log('Supabase Key:', import.meta.env.VITE_SUPABASE_ANON_KEY);
```

### Troubleshooting Connection Issues

#### Connection Failed
1. Check environment variables are set correctly
2. Verify Supabase project is active
3. Check RLS policies allow your operations
4. Verify API keys haven't been revoked

#### Permission Denied
1. Enable RLS policies for all tables
2. Check user authentication status
3. Verify database connection is established

#### Data Not Syncing
1. Check auto-sync is enabled in app settings
2. Verify database connection is stable
3. Check browser console for errors

---

## 5. Post-Deployment Setup

### Step 1: Create Production User

1. Go to your Supabase dashboard
2. Navigate to **Table Editor** → **church_users**
3. Insert a new admin user:

```sql
INSERT INTO church_users (username, password, name, role, status)
VALUES ('admin', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyY7h8W5qG5O', 'Administrator', 'admin', 'active');
```

**Note:** The password above is `admin123` (bcrypt hash). In production, generate a stronger password hash.

### Step 2: Set Up Automated Backups

1. Go to **Database** → **Backups** in Supabase
2. Enable daily backups
3. Set retention period (7-30 days)
4. Configure backup notifications (email)

### Step 3: Configure SSL/TLS

1. Supabase automatically handles SSL for database connections
2. Verify SSL is enabled in your database settings
3. Test connection from multiple devices

### Step 4: Set Up Custom Domain (Optional)

1. Go to your hosting platform (Vercel/Netlify)
2. Add custom domain in project settings
3. Update DNS records:
   - A record: `@ → [your hosting IP]`
   - CNAME record: `www → [your domain]`
4. Enable SSL certificate (automatic)

---

## 6. Monitoring & Maintenance

### Enable Error Tracking

#### Sentry Setup (Recommended)

1. Create account at [sentry.io](https://sentry.io)
2. Create new project (JavaScript)
3. Install Sentry SDK:
```bash
npm install @sentry/browser
```

4. Create `sentry.config.js`:
```javascript
import * as Sentry from "@sentry/browser";

Sentry.init({
  dsn: "your-sentry-dsn-here",
  environment: "production",
  tracesSampleRate: 0.1,
});
```

5. Add to `index.html` before closing `<body>`:
```html
<script src="/sentry.config.js"></script>
```

### Monitor Application Health

1. **Uptime Monitoring**: Use UptimeRobot or Pingdom
2. **Analytics**: Add Google Analytics or Plausible
3. **Error Logs**: Check Vercel/Netlify logs
4. **Database Metrics**: Monitor in Supabase dashboard

### Regular Maintenance Tasks

| Task | Frequency | Description |
|------|-----------|-------------|
| Backup Database | Daily | Automatic via Supabase |
| Update Dependencies | Weekly | `npm update` |
| Review Logs | Weekly | Check for errors |
| Security Audit | Monthly | Review RLS policies |
| Performance Test | Monthly | Test load times |

### Update Application

```bash
# Pull latest changes
git pull origin main

# Install dependencies
npm install

# Build for production
npm run build

# Deploy to Vercel
vercel --prod

# Or deploy to Netlify
netlify deploy --prod
```

---

## Security Checklist

- [ ] Environment variables are set correctly
- [ ] RLS policies are configured
- [ ] SSL/TLS is enabled
- [ ] Database backups are enabled
- [ ] Error tracking is configured
- [ ] User passwords are hashed (not plain text)
- [ ] API keys are not exposed in frontend
- [ ] Regular security updates are applied

---

## Cost Estimates (Free Tier)

| Service | Monthly Cost |
|---------|--------------|
| Supabase (Free) | $0 |
| Vercel (Free) | $0 |
| Netlify (Free) | $0 |
| Sentry (Free) | $0 |
| **Total** | **$0** |

---

## Support

If you encounter issues:
1. Check Supabase documentation: [docs.supabase.com](https://docs.supabase.com)
2. Review error logs in browser console
3. Check hosting platform logs
4. Contact support for your hosting service

---

## Next Steps

1. ✅ Deploy frontend to hosting platform
2. ✅ Configure environment variables
3. ✅ Test database connection
4. ✅ Create production admin user
5. ✅ Set up monitoring
6. ✅ Share access with team members
