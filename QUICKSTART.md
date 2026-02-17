# Quick Start Guide

## 🚀 Your Portfolio is Running!

**Homepage**: http://localhost:3000  
**Admin Login**: http://localhost:3000/admin/login

---

## 📝 Create Your Admin User (Choose One Method)

### Method 1: Prisma Studio (Easiest) ⭐

1. Open a new terminal and run:
```bash
pnpm prisma studio
```

2. This opens a GUI at http://localhost:5555

3. Click on **"User"** table → **"Add record"**

4. First, get a hashed password. In another terminal:
```bash
node -e "console.log(require('bcryptjs').hashSync('admin123', 10))"
```

5. Copy the output and paste it in the **password** field in Prisma Studio

6. Fill in:
   - **id**: admin-1
   - **email**: admin@example.com
   - **password**: (paste the hash from step 4)
   - **name**: Admin User
   - **createdAt**: Click "Now"
   - **updatedAt**: Click "Now"

7. Click **"Save 1 change"**

Done! Now login at http://localhost:3000/admin/login

---

### Method 2: Direct SQL Command

Run this in your terminal:

```bash
HASH=$(node -e "console.log(require('bcryptjs').hashSync('admin123', 10))") && \
echo "INSERT INTO User (id, email, password, name, createdAt, updatedAt) VALUES ('admin-$(date +%s)', 'admin@example.com', '$HASH', 'Admin User', datetime('now'), datetime('now'));" | sqlite3 dev.db && \
echo "✅ Admin created! Email: admin@example.com Password: admin123"
```

---

## ✨ What's Built

- ✅ Modern homepage with hero section
- ✅ Projects showcase (featured on homepage)
- ✅ Admin dashboard for content management
- ✅ Contact form with API
- ✅ Fully responsive design
- ✅ Authentication system
- ✅ Database with Prisma ORM

## 🎨 Next Steps

1. **Login** at http://localhost:3000/admin/login
2. **Add your projects** in the admin dashboard
3. **Customize** the homepage content in `src/app/page.tsx`
4. **Update** your skills in the skills section
5. **Set up** email service for contact form (see SETUP.md)
6. **Deploy** to Vercel when ready

## 📚 Documentation

- **Full setup guide**: See SETUP.md
- **Admin dashboard**: /admin (after login)
- **Database GUI**: `pnpm prisma studio`
- **Dev server**: `pnpm dev`
- **Build**: `pnpm build`

## 🔐 Default Credentials

**Email**: admin@example.com  
**Password**: admin123

⚠️ **IMPORTANT**: Change this password after your first login!

---

## 🎯 File Structure

```
src/
├── app/
│   ├── admin/          # Admin dashboard
│   │   ├── login/      # Login page
│   │   ├── projects/   # Project management
│   │   └── page.tsx    # Admin home
│   ├── api/            # API routes
│   │   ├── auth/       # NextAuth endpoints
│   │   ├── contact/    # Contact form API
│   │   └── projects/   # Projects CRUD API
│   ├── contact/        # Contact page
│   ├── projects/       # All projects page
│   └── page.tsx        # Homepage ← Start customizing here!
├── components/
│   └── ui/             # shadcn/ui components
└── lib/                # Utilities

prisma/
└── schema.prisma       # Database schema
```

## 💡 Tips

- The homepage shows **featured** projects only (max 3)
- Use the **order** field to control project display order
- Mark important projects as **featured**
- All projects are shown on `/projects` page
- Contact form logs to console by default (integrate email service)

Happy building! 🚀
