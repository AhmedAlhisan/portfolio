import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { SignOutButton } from "@/components/sign-out-button";
import { DeleteProjectButton } from "@/components/delete-project-button";

export const runtime = 'nodejs';

export default async function AdminDashboard() {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  const projects = await prisma.project.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600">{session.user?.email}</span>
            <SignOutButton />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Projects</CardTitle>
                  <CardDescription>
                    Manage your portfolio projects
                  </CardDescription>
                </div>
                <Link href="/admin/projects/new">
                  <Button>Add New Project</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {projects.length === 0 ? (
                <div className="text-center py-12 text-slate-500">
                  <p>No projects yet. Create your first project to get started.</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Technologies</TableHead>
                      <TableHead>Featured</TableHead>
                      <TableHead>Order</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projects.map((project) => (
                      <TableRow key={project.id}>
                        <TableCell className="font-medium">{project.title}</TableCell>
                        <TableCell>
                          <div className="flex gap-1 flex-wrap">
                            {project.technologies.split(",").map((tech, idx) => (
                              <Badge key={idx} variant="secondary">
                                {tech.trim()}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          {project.featured && (
                            <Badge variant="default">Featured</Badge>
                          )}
                        </TableCell>
                        <TableCell>{project.order}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Link href={`/admin/projects/${project.id}`}>
                              <Button variant="outline" size="sm">
                                Edit
                              </Button>
                            </Link>
                            <DeleteProjectButton projectId={project.id} />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
