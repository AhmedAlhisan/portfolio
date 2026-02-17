import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create admin user
  const hashedPassword = await bcrypt.hash("admin123", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      password: hashedPassword,
      name: "Admin User",
    },
  });

  console.log("✅ Created admin user:", admin.email);
  console.log("📧 Email: admin@example.com");
  console.log("🔑 Password: admin123");
  console.log("\n⚠️  Please change this password after your first login!\n");

  // Create sample projects
  await prisma.project.upsert({
    where: { id: "sample-project-1" },
    update: {},
    create: {
      id: "sample-project-1",
      title: "Portfolio Website",
      description: "A modern portfolio website built with Next.js and TypeScript",
      longDescription: "This portfolio website showcases my projects and skills. Built with Next.js 14, TypeScript, Tailwind CSS, and Prisma ORM. Features include admin dashboard, project management, and contact form.",
      technologies: "Next.js, TypeScript, Tailwind CSS, Prisma, SQLite",
      featured: true,
      order: 1,
    },
  });

  await prisma.project.upsert({
    where: { id: "sample-project-2" },
    update: {},
    create: {
      id: "sample-project-2",
      title: "E-commerce Platform",
      description: "Full-stack e-commerce solution with payment integration",
      longDescription: "A complete e-commerce platform with product management, shopping cart, checkout process, and payment integration using Stripe.",
      technologies: "React, Node.js, Express, MongoDB, Stripe",
      featured: true,
      order: 2,
    },
  });

  console.log("✅ Created sample projects");
  console.log("\n🎉 Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
