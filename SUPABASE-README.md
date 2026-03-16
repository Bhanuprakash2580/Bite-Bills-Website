# Supabase Setup for Bite Bills Bakery

This guide will help you set up Supabase as the database for your Bite Bills bakery website.

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up for an account
2. Click "New Project"
3. Fill in your project details:
   - **Name**: `bite-bills-bakery` (or any name you prefer)
   - **Database Password**: Choose a strong password
   - **Region**: Select the region closest to your users
4. Click "Create new project"

## Step 2: Get Your Project Credentials

1. Once your project is created, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (something like: `https://abcdefghijklmnop.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)

## Step 3: Configure Environment Variables

1. Open the `.env` file in your project root
2. Replace the placeholder values:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## Step 4: Set Up Database Tables

1. In your Supabase dashboard, go to **SQL Editor**
2. Copy and paste the contents of `supabase-setup.sql`
3. Click **Run** to create the tables

## Step 5: Add Sample Data (Optional)

1. In the SQL Editor, copy and paste the contents of `supabase-sample-data.sql`
2. Click **Run** to populate your database with sample bakery products

## Step 6: Test the Connection

1. Start your development server:
```bash
npm run dev
```

2. Visit your website and check if products are loading from Supabase
3. Check the browser console for any connection errors

## Database Schema

Your bakery database includes three main tables:

### Products
- Bakery menu items (pastries, breads, cakes, etc.)
- Fields: name, price, image, description, ingredients, category

### Product Reviews
- Customer reviews and ratings
- Fields: review text, rating, product name, reviewer name, date

### Newsletter Subscribers
- Email subscribers for promotions
- Fields: email, name, subscription status

## Security Notes

- The current setup allows public read access to all tables
- Only authenticated users can create/update data
- For production, you may want to adjust Row Level Security (RLS) policies
- Consider implementing authentication for admin features

## Troubleshooting

**Connection Issues:**
- Double-check your environment variables
- Ensure your Supabase project is active
- Check browser network tab for failed requests

**Data Not Loading:**
- Verify tables were created successfully
- Check Supabase dashboard for any errors
- Ensure sample data was inserted

**CORS Issues:**
- Supabase handles CORS automatically, but check your domain settings if needed

## Next Steps

Once connected, you can:
- Add more bakery products through Supabase dashboard
- Implement user authentication for customer accounts
- Add order management features
- Set up real-time notifications for new orders

Need help? Check the Supabase documentation at [supabase.com/docs](https://supabase.com/docs)