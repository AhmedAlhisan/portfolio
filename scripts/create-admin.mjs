import { execSync } from 'child_process';
import bcrypt from 'bcryptjs';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function createAdmin() {
  console.log('🌱 Creating admin user...\n');

  const hashedPassword = await bcrypt.hash('admin123', 10);

  const db = await open({
    filename: './prisma/dev.db',
    driver: sqlite3.Database
  });

  try {
    // Check if admin already exists
    const existing = await db.get('SELECT * FROM User WHERE email = ?', 'admin@example.com');

    if (existing) {
      console.log('⚠️  Admin user already exists!');
      console.log('📧 Email: admin@example.com\n');
    } else {
      // Create admin user
      await db.run(
        'INSERT INTO User (id, email, password, name, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)',
        ['admin-' + Date.now(), 'admin@example.com', hashedPassword, 'Admin User', new Date().toISOString(), new Date().toISOString()]
      );

      console.log('✅ Admin user created successfully!');
      console.log('📧 Email: admin@example.com');
      console.log('🔑 Password: admin123');
      console.log('\n⚠️  Please change this password after your first login!\n');
    }

    // Create sample projects
    const project1Exists = await db.get('SELECT * FROM Project WHERE id = ?', 'sample-project-1');
    if (!project1Exists) {
      await db.run(
        'INSERT INTO Project (id, title, description, longDescription, technologies, imageUrl, projectUrl, githubUrl, featured, "order", createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          'sample-project-1',
          'Portfolio Website',
          'A modern portfolio website built with Next.js and TypeScript',
          'This portfolio website showcases my projects and skills. Built with Next.js 14, TypeScript, Tailwind CSS, and Prisma ORM. Features include admin dashboard, project management, and contact form.',
          'Next.js, TypeScript, Tailwind CSS, Prisma, SQLite',
          null,
          null,
          null,
          1,
          1,
          new Date().toISOString(),
          new Date().toISOString()
        ]
      );

      await db.run(
        'INSERT INTO Project (id, title, description, longDescription, technologies, imageUrl, projectUrl, githubUrl, featured, "order", createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          'sample-project-2',
          'E-commerce Platform',
          'Full-stack e-commerce solution with payment integration',
          'A complete e-commerce platform with product management, shopping cart, checkout process, and payment integration using Stripe.',
          'React, Node.js, Express, MongoDB, Stripe',
          null,
          null,
          null,
          1,
          2,
          new Date().toISOString(),
          new Date().toISOString()
        ]
      );

      console.log('✅ Created sample projects\n');
    }

    console.log('🎉 Setup completed successfully!\n');
    console.log('Next steps:');
    console.log('1. Run `pnpm dev` to start the development server');
    console.log('2. Visit http://localhost:3000 to see your portfolio');
    console.log('3. Visit http://localhost:3000/admin/login to access the admin dashboard\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    await db.close();
  }
}

createAdmin();
