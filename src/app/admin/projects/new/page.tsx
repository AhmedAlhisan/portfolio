import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ProjectForm } from "@/components/project-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const runtime = 'nodejs';

export default async function NewProjectPage() {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/admin">
            <Button variant="ghost">← Back to Dashboard</Button>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProjectForm />
      </main>
    </div>
  );
}
