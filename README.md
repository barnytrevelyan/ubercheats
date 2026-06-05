# UberCheats - Complaint Documentation Platform

A public platform for documenting Uber refund and charging issues, allowing users to report problems and view cases filed by others.

## Stack

- **Frontend**: Next.js + React + TailwindCSS
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Hosting**: Vercel or Netlify

## Quick Start

### 1. Setup Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to be ready
3. Go to the SQL Editor and paste the contents of `supabase-setup.sql`
4. Execute the SQL to create the table and policies

### 2. Get Supabase Credentials

1. In your Supabase project, go to **Settings → API**
2. Copy the **Project URL** and **Anon Key (public)**
3. Rename `.env.example` to `.env.local`
4. Add your credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

### 3. Install and Run Locally

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Vercel

### Option 1: Quick Deploy (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project" and import your GitHub repo
4. Vercel will auto-detect Next.js
5. Add your environment variables in **Settings → Environment Variables**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Click "Deploy"

### Option 2: CLI Deploy

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables when prompted
```

## Deployment to Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Select your GitHub repo
5. Set build command: `npm run build`
6. Set publish directory: `.next`
7. Add environment variables in **Site settings → Build & deploy → Environment**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
8. Deploy

**Note**: Netlify requires configuring serverless functions separately for Next.js API routes. Vercel is simpler.

## Domain Setup

After deployment:

1. Get your Vercel/Netlify domain URL
2. In your domain registrar, update DNS to point to Vercel/Netlify
3. Add custom domain in your Vercel/Netlify project settings

## Features

### Report an Issue
- Form with fields for name, email, category, title, description
- Optional order amount and date
- Real-time validation
- Success confirmation

### View Cases
- Browse all complaints
- Filter by category (Refund Not Issued, Charged Twice, etc.)
- View complaint details with dates and amounts
- Newest cases shown first

### Data Security
- Row-level security enabled on Supabase
- Public read/insert access (no authentication required)
- Complaints cannot be edited or deleted
- Email addresses visible (users provide consent by posting)

## Database Schema

```sql
complaints
├── id (BIGINT, PRIMARY KEY)
├── name (VARCHAR)
├── email (VARCHAR)
├── category (VARCHAR)
├── title (VARCHAR)
├── description (TEXT)
├── order_amount (DECIMAL)
├── order_date (DATE)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```

## API Endpoints

### GET /api/complaints
Fetch complaints, optionally filtered by category.

**Query Parameters:**
- `category` (optional): Filter by category name

**Response:**
```json
{
  "complaints": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "category": "Refund Not Issued",
      "title": "Charged $45 but order cancelled",
      "description": "...",
      "order_amount": 45.00,
      "order_date": "2026-06-01",
      "created_at": "2026-06-02T10:30:00Z"
    }
  ]
}
```

### POST /api/complaints
Submit a new complaint.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "category": "Refund Not Issued",
  "title": "Charged but order cancelled",
  "description": "I was charged $45.50 for an order that was immediately cancelled...",
  "orderAmount": "45.50",
  "orderDate": "2026-06-01"
}
```

## Development

### Environment Variables
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL (public)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key (public)

These are safe to expose as they start with `NEXT_PUBLIC_` and have RLS protection on Supabase.

### Running Tests

```bash
npm run test
```

### Building for Production

```bash
npm run build
npm start
```

## Customization

### Categories
Edit the `CATEGORIES` array in:
- `components/ComplaintForm.js`
- `components/ComplaintList.js`

### Styling
Modify Tailwind colors and classes in:
- `tailwind.config.js` (theme)
- React components

### Form Fields
Add/remove fields in:
- `components/ComplaintForm.js` (form inputs)
- `pages/api/complaints.js` (API validation)
- `supabase-setup.sql` (database schema)

## Troubleshooting

### Complaints not saving
- Check Supabase credentials in `.env.local`
- Verify the `complaints` table exists in Supabase
- Check RLS policies allow INSERT

### Can't fetch complaints
- Verify Supabase URL and key are correct
- Check browser console for API errors
- Ensure RLS policies allow SELECT

### Vercel deployment fails
- Check that all environment variables are set
- Verify build command succeeds locally with `npm run build`
- Check Vercel logs for specific errors

## Legal Notice

This is an independent platform not affiliated with Uber. Users assume responsibility for the accuracy of information posted. Always provide truthful information when filing complaints.

## License

MIT

## Support

For issues or feature requests, please create a GitHub issue or contact the maintainer.
