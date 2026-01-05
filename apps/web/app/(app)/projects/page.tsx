"use client";

import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { ProjectList } from "@/modules/projects/components/ProjectList";
import { Button } from "@/components/ui/button";
import {
  useGetProjectsQuery,
  useDeleteProjectMutation,
} from "@/lib/graphql/generated";

export default function ProjectsPage() {
  const queryClient = useQueryClient();

  // Fetch projects
  const { data, isLoading, error } = useGetProjectsQuery();

  // Delete mutation
  const deleteMutation = useDeleteProjectMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GetProjects"] });
    },
  });

  const handleDelete = async (id: string) => {
    await deleteMutation.mutateAsync({ id });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground">Loading projects...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-4">
        <p className="text-destructive">Failed to load projects</p>
        <Button
          onClick={() =>
            queryClient.invalidateQueries({ queryKey: ["GetProjects"] })
          }
        >
          Retry
        </Button>
      </div>
    );
  }

  const projects =
    data?.projects
      ?.filter(
        (
          project
        ): project is {
          __typename?: "Project";
          id: string;
          name: string;
          description: string | null;
          organizationId: string;
          createdAt: string | Date;
          updatedAt: string | Date;
        } =>
          Boolean(
            project?.id &&
            project?.name &&
            project?.organizationId &&
            project?.createdAt &&
            project?.updatedAt
          )
      )
      .map(
        ({ id, name, description, organizationId, createdAt, updatedAt }) => ({
          id,
          name,
          description: description ?? null,
          organizationId,
          createdAt,
          updatedAt,
        })
      ) || [];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Projects</h1>
          <p className="text-muted-foreground mt-2">
            Manage your projects and collaborate with your team
          </p>
        </div>
        {projects.length > 0 && (
          <Button asChild>
            <Link href="/projects/new">New Project</Link>
          </Button>
        )}
      </div>

      <ProjectList projects={projects} onDelete={handleDelete} />
    </div>
  );
}
