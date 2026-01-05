"use client";

import { useSession } from "@/lib/auth/client";
import { useQuery } from "@tanstack/react-query";
import { graphqlClient } from "@/lib/graphql/client";
import { GET_USER_ORGANIZATIONS } from "@/modules/organizations/graphql/documents/queries";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Organization = {
  id: string;
  name: string;
  slug: string;
  role: string;
  logo: string | null;
};

/**
 * Dashboard Page
 *
 * Main authenticated landing page showing:
 * - Personalized welcome message
 * - Current user information
 * - Active organization details
 */
export default function DashboardPage() {
  const { data: session } = useSession();

  const { data: orgsData, isLoading: orgsLoading } = useQuery({
    queryKey: ["userOrganizations"],
    queryFn: async () => {
      const result = await graphqlClient.request<{ userOrganizations: Organization[] }>(
        GET_USER_ORGANIZATIONS
      );
      return result.userOrganizations;
    },
    enabled: !!session?.user,
  });

  const user = session?.user;
  const organizations = orgsData || [];
  const activeOrg = organizations[0]; // TODO: Get actual active org from session

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back{user?.name ? `, ${user.name.split(" ")[0]}` : ""}!
        </h1>
        <p className="text-muted-foreground">
          Here's what's happening with your projects today.
        </p>
      </div>

      {/* User Info Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* User Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Your Account</CardTitle>
            <CardDescription>Current user information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <p className="text-sm font-medium">Name</p>
                <p className="text-sm text-muted-foreground">
                  {user?.name || "Not set"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-muted-foreground">
                  {user?.email}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Organization Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Active Organization</CardTitle>
            <CardDescription>Your current workspace</CardDescription>
          </CardHeader>
          <CardContent>
            {orgsLoading ? (
              <p className="text-sm text-muted-foreground">Loading...</p>
            ) : activeOrg ? (
              <div className="space-y-2">
                <div>
                  <p className="text-sm font-medium">Organization</p>
                  <p className="text-sm text-muted-foreground">
                    {activeOrg.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Your Role</p>
                  <p className="text-sm text-muted-foreground capitalize">
                    {activeOrg.role}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No organization found
              </p>
            )}
          </CardContent>
        </Card>

        {/* Organizations Count Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Your Organizations</CardTitle>
            <CardDescription>Total workspaces</CardDescription>
          </CardHeader>
          <CardContent>
            {orgsLoading ? (
              <p className="text-sm text-muted-foreground">Loading...</p>
            ) : (
              <div className="space-y-2">
                <div>
                  <p className="text-3xl font-bold">{organizations.length}</p>
                  <p className="text-sm text-muted-foreground">
                    {organizations.length === 1
                      ? "organization"
                      : "organizations"}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Coming Soon Section */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Stats</CardTitle>
          <CardDescription>
            Overview of your projects and activity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Project metrics and activity feed coming soon...
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
