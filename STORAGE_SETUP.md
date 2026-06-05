# Supabase Storage Setup for File Uploads & Multi-Currency Support

Your updated site now supports file uploads and multi-currency amounts with USD conversion. Follow these steps to enable it:

## Step 1: Run Both Migration SQLs

1. Go to your Supabase project dashboard
2. Click **SQL Editor** (left sidebar)
3. Click **New Query**

**First, run `supabase-migration.sql`:**
This adds:
- `uber_order_number` - for Uber order references
- `file_urls` - array of URLs to uploaded evidence files

**Then, run `supabase-migration-multi-currency.sql`:**
This adds:
- `order_currency` - the currency used (USD, EUR, GBP, etc.)
- `order_amount_usd` - automatic USD conversion for comparison

## Step 2: Create the Storage Bucket

1. In Supabase, go to **Storage** (left sidebar)
2. Click **Create a new bucket**
3. Name it: `complaints` (exactly)
4. Toggle **Public bucket** ON (so users can view uploaded files)
5. Click **Create bucket**

## Step 3: Set Bucket Policy (if needed)

If files aren't uploading, set the bucket policy:

1. Click the `complaints` bucket
2. Click **Settings** (top right)
3. Go to **Policy**
4. Click **Add policy**
5. Select: **For full customization, use custom policies**
6. Paste this policy:

```json
[
  {
    "role": "anon",
    "definition": {
      "buckets": ["complaints"],
      "operators": [
        {
          "operator": "ilike",
          "column": "name",
          "value": "complaints/%"
        }
      ]
    },
    "action": "INSERT",
    "definition": { }
  }
]
```

Or simpler: just toggle **Public** on the bucket.

## Step 4: Install Dependencies

Run this locally before deploying:

```bash
npm install
```

This installs `formidable` which handles file uploads.

## Step 5: Deploy to Vercel

Push your changes to GitHub:

```bash
git add .
git commit -m "Add file uploads and Uber order number support"
git push
```

Vercel will auto-deploy. No new environment variables needed.

## Done!

Users can now:
- Upload screenshots, receipts, or evidence files (JPG, PNG, PDF)
- Include their Uber order number in complaints
- Share their evidence publicly with other users

**File limits:** 5MB per file, multiple files supported.

**Note:** Files are stored in Supabase Storage (like AWS S3) and are publicly accessible via direct links to encourage transparency and evidence sharing.
