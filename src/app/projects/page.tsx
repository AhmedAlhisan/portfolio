import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GitBranch, Globe, ArrowLeft } from "lucide-react";

export const runtime = 'nodejs';

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Portfolio
            </h1>
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Home
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Projects Grid */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900">All Projects</h2>
            <p className="text-lg text-slate-600">
              A collection of my work and experiments
            </p>
          </div>

          {projects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-500">No projects available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project: typeof projects[0]) => (
                <Card key={project.id} className="flex flex-col hover:shadow-lg transition">
                  {project.featured && (
                    <div className="absolute top-4 right-4">
                      <Badge>Featured</Badge>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    {project.longDescription && (
                      <p className="text-sm text-slate-600 mb-4">
                        {project.longDescription}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.split(",").map((tech: string, idx: number) => (
                        <Badge key={idx} variant="secondary">
                          {tech.trim()}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    {project.projectUrl && (
                      <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                        <Button variant="outline" size="sm" className="w-full">
                          <Globe className="w-4 h-4 mr-2" />
                          Live Demo
                        </Button>
                      </a>
                    )}
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                        <Button variant="outline" size="sm" className="w-full">
                          <GitBranch className="w-4 h-4 mr-2" />
                          Code
                        </Button>
                      </a>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
