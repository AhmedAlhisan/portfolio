# Portfolio Website Setup Guide

Welcome to your new portfolio website! This guide will help you get started.

## What's Included

- ✅ Modern Next.js 14 with App Router
- ✅ TypeScript for type safety
- ✅ Tailwind CSS for styling
- ✅ shadcn/ui component library
- ✅ Prisma ORM with SQLite database
- ✅ NextAuth.js authentication
- ✅ Admin dashboard for content management
- ✅ Project showcase
- ✅ Contact form
- ✅ Fully responsive design

## Getting Started

### 1. Create Your First Admin User

Since the database is fresh, you need to create your first admin user. Run this in your terminal:

```bash
node -e "const bcrypt = require('bcryptjs'); const hash = bcrypt.hashSync('YOUR_PASSWORD', 10); console.log('Hashed password:', hash);"
```

Then use Prisma Studio to create the user:

```bash
pnpm prisma studio
```

This will open Prisma Studio in your browser. Click on "User" and add a new record:
- **email**: your-email@example.com
- **password**: (paste the hashed password from above)
- **name**: Your Name

Or use this quick command:

```bash
node -e "const bcrypt = require('bcryptjs'); const sqlite3 = require('better-sqlite3'); const db = new sqlite3('./prisma/dev.db'); const hash = bcrypt.hashSync('admin123', 10); db.prepare('INSERT INTO User (id, email, password, name, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)').run(['admin-' + Date.now(), 'admin@example.com', hash, 'Admin User', new Date().toISOString(), new Date().toISOString()]); console.log('✅ Admin user created!\\n📧 Email: admin@example.com\\n🔑 Password: admin123'); db.close();"
```

### 2. Start the Development Server

```bash
pnpm dev
```

Your portfolio will be available at [http://localhost:3000](http://localhost:3000)

### 3. Access the Admin Dashboard

Visit [http://localhost:3000/admin/login](http://localhost:3000/admin/login) and log in with:
- **Email**: admin@example.com
- **Password**: admin123

⚠️ **Important**: Change this password immediately after your first login!

### 4. Customize Your Portfolio

#### Update Homepage Content

Edit `src/app/page.tsx` to customize:
- Your name and title
- About section text
- Skills list
- Social links

#### Add Projects

1. Log in to the admin dashboard
2. Click "Add New Project"
3. Fill in project details
4. Mark projects as "Featured" to show them on the homepage

#### Customize Styling

- Colors: Edit `src/app/globals.css`
- Components: Modify files in `src/components/ui/`
- Layout: Update page components in `src/app/`

## Available Scripts

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Open Prisma Studio (database GUI)
pnpm db:studio

# Run database migrations
pnpm prisma migrate dev
```

## Project Structure

```
portfolio/
├── src/
│   ├── app/                 # Next.js app router pages
│   │   ├── admin/          # Admin dashboard
│   │   ├── api/            # API routes
│   │   ├── contact/        # Contact page
│   │   ├── projects/       # Projects page
│   │   └── page.tsx        # Homepage
│   ├── components/         # React components
│   │   └── ui/            # shadcn/ui components
│   ├── lib/               # Utility functions
│   └── auth.ts            # NextAuth configuration
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── dev.db             # SQLite database file
└── public/                # Static assets
```

## Adding Email Service for Contact Form

The contact form currently logs messages to the console. To send actual emails:

1. Choose an email service (Resend, SendGrid, etc.)
2. Install the SDK: `pnpm add resend` (or your chosen service)
3. Add API key to `.env`:
   ```
   RESEND_API_KEY=your_api_key_here
   ```
4. Update `src/app/api/contact/route.ts` with email sending logic (examples included in comments)

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will auto-detect Next.js and configure everything
4. Add environment variables in Vercel dashboard
5. For production, migrate to PostgreSQL using Neon or Supabase

### Environment Variables for Production

```env
# Database (use PostgreSQL for production)
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="generate-a-secure-random-string"

# Email Service (optional)
RESEND_API_KEY="your_key_here"
```

## Migrating to PostgreSQL

When ready for production:

1. Create a PostgreSQL database (Neon, Supabase, etc.)
2. Update `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"  // Change from sqlite
   }
   ```
3. Update `DATABASE_URL` in `.env`
4. Run migrations: `pnpm prisma migrate dev`

## Troubleshooting

### Prisma Client Issues

If you encounter Prisma client errors:
```bash
pnpm prisma generate
```

### Database Issues

Reset the database:
```bash
pnpm prisma migrate reset
```

### Build Errors

Clear Next.js cache:
```bash
rm -rf .next
pnpm dev
```

## Next Steps

1. ✅ Create your admin user
2. ✅ Start the dev server
3. ✅ Log in to the admin dashboard
4. ✅ Add your projects
5. ✅ Customize the content and styling
6. ✅ Set up email service for contact form
7. ✅ Deploy to Vercel

## Support

For issues or questions:
- Check Next.js docs: https://nextjs.org/docs
- Check Prisma docs: https://www.prisma.io/docs
- Check shadcn/ui docs: https://ui.shadcn.com

Happy building! 🚀
