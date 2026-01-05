'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { ProjectForm, ProjectFormValues } from '@/modules/projects/components/ProjectForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useCreateProjectMutation } from '@/lib/graphql/generated';

export default function NewProjectPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const createMutation = useCreateProjectMutation({
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['GetProjects'] });
      if (data.createProject?.id) {
        router.push(`/projects/${data.createProject.id}`);
      }
    },
  });

  const handleSubmit = async (values: ProjectFormValues) => {
    await createMutation.mutateAsync({ input: values });
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="container max-w-2xl mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Create New Project</CardTitle>
          <CardDescription>
            Add a new project to organize your work and collaborate with your team
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProjectForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isSubmitting={createMutation.isPending}
            submitLabel="Create Project"
          />
        </CardContent>
      </Card>
    </div>
  );
}
