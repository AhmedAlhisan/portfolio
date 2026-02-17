"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProjectFormProps {
  project?: {
    id: string;
    title: string;
    description: string;
    longDescription: string | null;
    technologies: string;
    imageUrl: string | null;
    projectUrl: string | null;
    githubUrl: string | null;
    featured: boolean;
    order: number;
  };
}

export function ProjectForm({ project }: ProjectFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: project?.title || "",
    description: project?.description || "",
    longDescription: project?.longDescription || "",
    technologies: project?.technologies || "",
    imageUrl: project?.imageUrl || "",
    projectUrl: project?.projectUrl || "",
    githubUrl: project?.githubUrl || "",
    featured: project?.featured || false,
    order: project?.order || 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const url = project
        ? `/api/projects/${project.id}`
        : "/api/projects";
      const method = project ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        alert("Failed to save project");
      }
    } catch (error) {
      alert("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>{project ? "Edit Project" : "New Project"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Short Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="longDescription">Long Description</Label>
            <Textarea
              id="longDescription"
              value={formData.longDescription}
              onChange={(e) =>
                setFormData({ ...formData, longDescription: e.target.value })
              }
              rows={6}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="technologies">
              Technologies * (comma-separated)
            </Label>
            <Input
              id="technologies"
              value={formData.technologies}
              onChange={(e) =>
                setFormData({ ...formData, technologies: e.target.value })
              }
              placeholder="React, TypeScript, Tailwind CSS"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input
              id="imageUrl"
              type="url"
              value={formData.imageUrl}
              onChange={(e) =>
                setFormData({ ...formData, imageUrl: e.target.value })
              }
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="projectUrl">Project URL</Label>
              <Input
                id="projectUrl"
                type="url"
                value={formData.projectUrl}
                onChange={(e) =>
                  setFormData({ ...formData, projectUrl: e.target.value })
                }
                placeholder="https://example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="githubUrl">GitHub URL</Label>
              <Input
                id="githubUrl"
                type="url"
                value={formData.githubUrl}
                onChange={(e) =>
                  setFormData({ ...formData, githubUrl: e.target.value })
                }
                placeholder="https://github.com/username/repo"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="order">Display Order</Label>
              <Input
                id="order"
                type="number"
                value={formData.order}
                onChange={(e) =>
                  setFormData({ ...formData, order: parseInt(e.target.value) || 0 })
                }
              />
            </div>

            <div className="flex items-center space-x-2 pt-8">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) =>
                  setFormData({ ...formData, featured: e.target.checked })
                }
                className="h-4 w-4 rounded border-gray-300"
              />
              <Label htmlFor="featured" className="cursor-pointer">
                Featured Project
              </Label>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : project ? "Update Project" : "Create Project"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin")}
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
