# Cloudflare R2 Public Access Setup Guide

## Problem
Uploaded images return "Error 404 - Object not found" when accessed via the public URL because R2 objects are private by default.

## Solution: Enable Public Access on R2 Bucket

Cloudflare R2 does NOT support S3-style ACLs (like `public-read`). Instead, you must configure public access at the bucket level.

### Steps to Enable Public Access:

1. **Go to Cloudflare Dashboard**
   - Navigate to R2 Object Storage
   - Select your bucket: `kara-ticaret-bucket`

2. **Enable Public Access**
   - Click on "Settings" tab
   - Find "Public Access" section
   - Click "Allow Access" or "Connect Domain"

3. **Option A: Use R2.dev Subdomain (Easiest)**
   - Click "Allow Access"
   - Cloudflare will provide a public URL like: `https://pub-xxxxx.r2.dev`
   - Update your `R2_PUBLIC_URL` environment variable with this URL
   - This is already configured: `https://pub-419b82550d704158ba19c494db96f194.r2.dev`

4. **Option B: Use Custom Domain (Recommended for Production)**
   - Add a custom domain (e.g., `cdn.yourdomain.com`)
   - Configure DNS settings as instructed
   - Update `R2_PUBLIC_URL` to your custom domain
   - Benefits: Better branding, can use Cloudflare CDN features

### Verify Public Access

After enabling public access, test by visiting:
```
https://pub-419b82550d704158ba19c494db96f194.r2.dev/[org-id]/[filename]
```

Replace `[org-id]` and `[filename]` with actual values from your database.

### Current Configuration

Based on your `.env`:
```env
R2_ACCOUNT_ID=758c04392dcd5275d8254d5d783426cf
R2_BUCKET_NAME=kara-ticaret-bucket
R2_PUBLIC_URL=https://pub-419b82550d704158ba19c494db96f194.r2.dev
```

### Troubleshooting

1. **Still getting 404 errors?**
   - Check if public access is enabled on the bucket
   - Verify the public URL matches your environment variable
   - Try uploading a new file after enabling public access

2. **Want to use a custom domain?**
   - Go to R2 bucket settings → Public Access → Add Custom Domain
   - Follow Cloudflare's instructions to set up DNS
   - Update `R2_PUBLIC_URL` in your environment variables

3. **Security Considerations**
   - All objects in the bucket will be publicly accessible
   - Consider using signed URLs for sensitive content
   - Implement proper file naming to avoid collisions
   - Consider setting up Cloudflare Access rules if needed

### Code Changes (Already Applied)

The code has been updated to include `ACL: 'public-read'` in upload commands, but note that **R2 ignores this parameter**. The parameter is included for:
1. Future compatibility if R2 adds ACL support
2. Easier migration to S3 if needed
3. Code documentation purposes

The actual public access is controlled at the bucket level in Cloudflare dashboard.

### Production Deployment

Make sure to set the same environment variables in your Vercel deployment:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add/verify:
   - `R2_ACCOUNT_ID`
   - `R2_ACCESS_KEY_ID`
   - `R2_SECRET_ACCESS_KEY`
   - `R2_BUCKET_NAME`
   - `R2_PUBLIC_URL` (must match your R2 public access URL)
3. Redeploy your application

### Alternative: Use Signed URLs

If you prefer to keep the bucket private and generate signed URLs on-demand:

1. Keep public access disabled
2. Modify `storage/service.ts` to use `getSignedUrl()` instead of direct public URLs
3. Note: This requires server-side URL generation and URLs expire
