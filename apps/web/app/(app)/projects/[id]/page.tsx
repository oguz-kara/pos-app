"use client";

import { use, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DeleteProjectDialog } from "@/modules/projects/components/DeleteProjectDialog";
import {
  useGetProjectQuery,
  useDeleteProjectMutation,
} from "@/lib/graphql/generated";

export default function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const queryClient = useQueryClient();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Fetch project
  const { data, isLoading, error } = useGetProjectQuery(
    { id },
    { enabled: !!id }
  );

  // Delete mutation
  const deleteMutation = useDeleteProjectMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GetProjects"] });
      router.push("/projects");
    },
  });

  const handleDelete = async () => {
    await deleteMutation.mutateAsync({ id });
  };

  if (isLoading) {
    return (
      <div className="container max-w-4xl mx-auto py-8 px-4">
        <p className="text-muted-foreground">Loading project...</p>
      </div>
    );
  }

  if (error || !data?.project) {
    return (
      <div className="container max-w-4xl mx-auto py-8 px-4">
        <Card>
          <CardContent className="py-12">
            <div className="text-center space-y-4">
              <p className="text-destructive">Project not found</p>
              <Button asChild>
                <Link href="/projects">Back to Projects</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const project = data.project;
  const createdDate = new Date(project.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const updatedDate = new Date(project.updatedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <Button variant="outline" asChild>
          <Link href="/projects">← Back to Projects</Link>
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/projects/${project.id}/edit`}>Edit</Link>
          </Button>
          <Button
            variant="destructive"
            onClick={() => setShowDeleteDialog(true)}
          >
            Delete
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-3xl">{project.name}</CardTitle>
              <CardDescription className="mt-2">
                Created on {createdDate}
              </CardDescription>
            </div>
            <Badge variant="outline">Active</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {project.description && (
            <>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  Description
                </h3>
                <p className="text-foreground">{project.description}</p>
              </div>
              <Separator />
            </>
          )}

          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Created
              </h3>
              <p className="text-foreground">{createdDate}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Last Updated
              </h3>
              <p className="text-foreground">{updatedDate}</p>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Project ID
            </h3>
            <code className="text-sm bg-muted px-2 py-1 rounded">
              {project.id}
            </code>
          </div>
        </CardContent>
      </Card>

      <DeleteProjectDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleDelete}
        projectName={project.name ?? ""}
        isDeleting={deleteMutation.isPending}
      />
    </div>
  );
}
