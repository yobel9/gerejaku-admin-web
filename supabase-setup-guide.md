# Supabase Setup Guide - GerejaKu Admin

## Table of Contents
1. [Create Supabase Project](#1-create-supabase-project)
2. [Enable Required Services](#2-enable-required-services)
3. [Create Database Tables](#3-create-database-tables)
4. [Configure Row Level Security](#4-configure-row-level-security)
5. [Get Connection Details](#5-get-connection-details)
6. [Test Connection](#6-test-connection)

---

## 1. Create Supabase Project

### Step 1: Sign Up
1. Go to [supabase.com](https://supabase.com)
2. Sign up with your email or continue with Google/GitHub

### Step 2: Create New Project
1. Click **"New Project"** button
2. Fill in the details:
   - **Name**: `gerejaku-admin` (or your preferred name)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose nearest to your location (e.g., `Southeast Asia (Jakarta)`)
   - **Pricing Plan**: Free tier is sufficient for this app
3. Click **"Create new project"**
4. Wait for project to be created (approx. 2-3 minutes)

### Step 3: Get Project URL & API Key
After project creation:
1. Go to **Project Settings** (gear icon)
2. Click **API** on the left sidebar
3. Copy:
   - **Project URL**
   - **anon/public** key (starts with `eyJ`)

---

## 2. Enable Required Services

### Enable Authentication
1. Go to **Authentication** in the left sidebar
2. Click **Providers**
3. Enable:
   - **Email** (default)
   - **Password** (default)
4. Click **Save**

### Enable Storage (Optional)
1. Go to **Storage** in the left sidebar
2. Create a bucket named `uploads` for member photos
3. Set privacy to **Public** (optional)
4. Click **Save**

---

## 3. Create Database Tables

### Method 1: Using SQL Editor (Recommended)

1. Go to **SQL Editor** in the left sidebar
2. Click **New Query**
3. Copy and paste the SQL from `supabase-schema.sql`
4. Click **Run**

### Method 2: Using Table Editor

1. Go to **Table Editor** in the left sidebar
2. Click **Create Table**
3. Create each table manually following the schema

---

## 4. Configure Row Level Security

### Enable RLS for All Tables
1. Go to **Table Editor**
2. For each table, click the **🔒** icon
3. Click **Enable RLS**
4. Click **Add Policy** for each table

### Recommended Policies

#### `app_storage` Table
```sql
-- Allow all operations for admin users
CREATE POLICY "Enable all operations for authenticated users"
ON app_storage
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Allow all operations for service_role (internal)
CREATE POLICY "Enable all operations for service_role"
ON app_storage
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);
```

#### `church_members` Table
```sql
-- Allow authenticated users to view all members
CREATE POLICY "Authenticated users can view members"
ON church_members
FOR SELECT
TO authenticated
USING (true);

-- Allow authenticated users to insert their own members
CREATE POLICY "Authenticated users can insert members"
ON church_members
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Allow authenticated users to update their own members
CREATE POLICY "Authenticated users can update members"
ON church_members
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Allow authenticated users to delete members
CREATE POLICY "Authenticated users can delete members"
ON church_members
FOR DELETE
TO authenticated
USING (true);
```

**Repeat similar policies for other tables** with appropriate restrictions.

---

## 5. Get Connection Details

### For Frontend Integration

1. Go to **Project Settings** → **API**
2. Copy:
   - **Project URL**
   - **anon/public** key

3. Add these to your frontend:
   - Create `.env.local` file in your project root:
     ```env
     VITE_SUPABASE_URL=https://your-project.supabase.co
     VITE_SUPABASE_ANON_KEY=your-anon-key-here
     ```

4. Install Supabase client:
   ```bash
   npm install @supabase/supabase-js
   ```

5. Update `js/storage.js`:
   ```javascript
   // Remove the commented Supabase import
   // Add this at the top:
   import { createClient } from '@supabase/supabase-js';

   // Initialize in DatabaseAdapter:
   constructor(config = {}) {
       this.config = config;
       this.supabase = createClient(config.url, config.anonKey);
   }
   ```

---

## 6. Test Connection

### Test via Browser Console

1. Open your app in browser
2. Open Developer Tools (F12)
3. Go to **Console** tab
4. Run:
   ```javascript
   // Test database connection
   const { data, error } = await supabase
       .from('church_members')
       .select('count')
       .limit(1);

   if (error) {
       console.error('Connection failed:', error);
   } else {
       console.log('Connection successful!');
   }
   ```

### Test via Supabase Dashboard

1. Go to **Table Editor**
2. Click on `church_members` table
3. Check if you can see the sample data (if any)
4. Try to insert a new record

---

## Troubleshooting

### Connection Failed
- Check if API keys are correct
- Verify project URL format
- Ensure RLS policies allow your operations

### Permission Denied
- Enable RLS for the table
- Check policy configurations
- Verify user authentication status

### Slow Performance
- Add indexes to frequently queried columns
- Check query performance in Supabase dashboard
- Consider using `select('*')` only when needed

---

## Next Steps

1. ✅ Complete database setup
2. ⏳ Run the SQL migration script
3. ⏳ Configure environment variables
4. ⏳ Test the application with database
5. ⏳ Deploy to production

---

## Support

If you encounter issues:
1. Check Supabase documentation: [docs.supabase.com](https://docs.supabase.com)
2. Review error messages in browser console
3. Check Supabase dashboard logs
