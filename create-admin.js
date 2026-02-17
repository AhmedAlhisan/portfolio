// Simple script to create admin user
// Run with: node create-admin.js

const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

// Check if database exists
let dbPath = path.join(__dirname, 'dev.db');
if (!fs.existsSync(dbPath)) {
  dbPath = path.join(__dirname, 'prisma', 'dev.db');
  if (!fs.existsSync(dbPath)) {
    console.error('❌ Database not found. Please run: pnpm prisma migrate dev');
    process.exit(1);
  }
}

// Install better-sqlite3 if not already installed
let Database;
try {
  Database = require('better-sqlite3');
} catch (e) {
  console.log('📦 Installing better-sqlite3...');
  require('child_process').execSync('pnpm add -D better-sqlite3', { stdio: 'inherit' });
  Database = require('better-sqlite3');
}

const db = new Database(dbPath);

try {
  console.log('🌱 Creating admin user...\n');

  // Check if admin exists
  const existing = db.prepare('SELECT * FROM User WHERE email = ?').get('admin@example.com');

  if (existing) {
    console.log('⚠️  Admin user already exists!');
    console.log('📧 Email: admin@example.com\n');
    db.close();
    process.exit(0);
  }

  // Create admin user
  const hashedPassword = bcrypt.hashSync('admin123', 10);
  const now = new Date().toISOString();

  db.prepare(`
    INSERT INTO User (id, email, password, name, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(['admin-' + Date.now(), 'admin@example.com', hashedPassword, 'Admin User', now, now]);

  console.log('✅ Admin user created successfully!\n');
  console.log('📧 Email: admin@example.com');
  console.log('🔑 Password: admin123');
  console.log('\n⚠️  IMPORTANT: Change this password after your first login!\n');
  console.log('Next steps:');
  console.log('1. Visit http://localhost:3000 to see your portfolio');
  console.log('2. Visit http://localhost:3000/admin/login to access admin dashboard\n');

} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
} finally {
  db.close();
}
