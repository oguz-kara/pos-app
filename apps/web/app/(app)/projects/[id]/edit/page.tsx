"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ProjectForm,
  ProjectFormValues,
} from "@/modules/projects/components/ProjectForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  useGetProjectQuery,
  useUpdateProjectMutation,
} from "@/lib/graphql/generated";

export default function EditProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Fetch project
  const { data, isLoading, error } = useGetProjectQuery({ id: params.id });

  // Update mutation
  const updateMutation = useUpdateProjectMutation({
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["GetProject", { id: params.id }],
      });
      queryClient.invalidateQueries({ queryKey: ["GetProjects"] });
      if (data.updateProject?.id) {
        router.push(`/projects/${data.updateProject.id}`);
      }
    },
  });

  const handleSubmit = async (values: ProjectFormValues) => {
    await updateMutation.mutateAsync({
      id: params.id,
      input: values,
    });
  };

  const handleCancel = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <div className="container max-w-2xl mx-auto py-8 px-4">
        <p className="text-muted-foreground">Loading project...</p>
      </div>
    );
  }

  if (error || !data?.project) {
    return (
      <div className="container max-w-2xl mx-auto py-8 px-4">
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

  return (
    <div className="container max-w-2xl mx-auto py-8 px-4">
      <div className="mb-6">
        <Button variant="outline" asChild>
          <Link href={`/projects/${project.id}`}>← Back to Project</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Edit Project</CardTitle>
          <CardDescription>Update your project details</CardDescription>
        </CardHeader>
        <CardContent>
          <ProjectForm
            defaultValues={{
              name: project.name as string,
              description: project.description || "",
            }}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isSubmitting={updateMutation.isPending}
            submitLabel="Save Changes"
          />
        </CardContent>
      </Card>
    </div>
  );
}
