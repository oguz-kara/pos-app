import {
  useMutation,
  useQuery,
  useInfiniteQuery,
  UseMutationOptions,
  UseQueryOptions,
  UseInfiniteQueryOptions,
  InfiniteData,
} from "@tanstack/react-query";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };

function fetcher<TData, TVariables>(query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch("http://localhost:3000/api/graphql", {
      method: "POST",
      ...{
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      },
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  };
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: any; output: any };
  JSON: { input: any; output: any };
};

export type AdminOrganization = {
  __typename?: "AdminOrganization";
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  creditBalance?: Maybe<Scalars["Int"]["output"]>;
  id?: Maybe<Scalars["ID"]["output"]>;
  memberCount?: Maybe<Scalars["Int"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  planId?: Maybe<Scalars["String"]["output"]>;
  slug?: Maybe<Scalars["String"]["output"]>;
  subscriptionStatus?: Maybe<Scalars["String"]["output"]>;
};

export type AdminUser = {
  __typename?: "AdminUser";
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  email?: Maybe<Scalars["String"]["output"]>;
  emailVerified?: Maybe<Scalars["Boolean"]["output"]>;
  id?: Maybe<Scalars["ID"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  /** Number of organizations this user belongs to */
  organizationCount?: Maybe<Scalars["Int"]["output"]>;
};

export type BaseError = {
  __typename?: "BaseError";
  code?: Maybe<Scalars["String"]["output"]>;
  message?: Maybe<Scalars["String"]["output"]>;
};

export type BillingPlan = {
  __typename?: "BillingPlan";
  /** Monthly credit grant for hybrid billing */
  creditsPerMonth?: Maybe<Scalars["Int"]["output"]>;
  description?: Maybe<Scalars["String"]["output"]>;
  features?: Maybe<Array<Scalars["String"]["output"]>>;
  id?: Maybe<Scalars["ID"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  /** Monthly price in dollars */
  priceMonthly?: Maybe<Scalars["Int"]["output"]>;
  /** Yearly price in dollars */
  priceYearly?: Maybe<Scalars["Int"]["output"]>;
};

export type CheckoutResult = {
  __typename?: "CheckoutResult";
  /** Stripe checkout session ID */
  sessionId?: Maybe<Scalars["String"]["output"]>;
  /** Stripe checkout URL to redirect user to */
  url?: Maybe<Scalars["String"]["output"]>;
};

export type CreateProjectInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  name: Scalars["String"]["input"];
};

export type CreateTaskInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  name: Scalars["String"]["input"];
};

export type CreditAdjustmentResult = {
  __typename?: "CreditAdjustmentResult";
  adjustmentAmount?: Maybe<Scalars["Int"]["output"]>;
  newBalance?: Maybe<Scalars["Int"]["output"]>;
  organizationId?: Maybe<Scalars["ID"]["output"]>;
  previousBalance?: Maybe<Scalars["Int"]["output"]>;
  reason?: Maybe<Scalars["String"]["output"]>;
};

export type CreditBalance = {
  __typename?: "CreditBalance";
  /** Current credit balance */
  balance?: Maybe<Scalars["Int"]["output"]>;
  /** Whether subscription is scheduled to cancel at period end */
  cancelAtPeriodEnd?: Maybe<Scalars["Boolean"]["output"]>;
  /** End date of current billing period */
  currentPeriodEnd?: Maybe<Scalars["DateTime"]["output"]>;
  /** Current subscription plan ID */
  planId?: Maybe<Scalars["String"]["output"]>;
  /** Date when canceled subscription will actually end */
  subscriptionEndDate?: Maybe<Scalars["DateTime"]["output"]>;
  /** Subscription status (active, canceled, etc.) */
  subscriptionStatus?: Maybe<Scalars["String"]["output"]>;
};

export type CreditPack = {
  __typename?: "CreditPack";
  credits?: Maybe<Scalars["Int"]["output"]>;
  id?: Maybe<Scalars["ID"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  /** Price in dollars */
  price?: Maybe<Scalars["Int"]["output"]>;
};

export type CreditTransaction = {
  __typename?: "CreditTransaction";
  /** Credit amount (positive for additions, negative for usage) */
  amount?: Maybe<Scalars["Int"]["output"]>;
  /** Credit balance after this transaction */
  balanceAfter?: Maybe<Scalars["Int"]["output"]>;
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  description?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["ID"]["output"]>;
  metadata?: Maybe<Scalars["JSON"]["output"]>;
  /** Transaction type: purchase, usage, refund, adjustment, subscription_grant */
  type?: Maybe<Scalars["String"]["output"]>;
};

export type CustomerPortalResult = {
  __typename?: "CustomerPortalResult";
  /** Stripe customer portal URL */
  url?: Maybe<Scalars["String"]["output"]>;
};

export type DashboardStats = {
  __typename?: "DashboardStats";
  /** New user signups in the last 7 days */
  recentSignups?: Maybe<Scalars["Int"]["output"]>;
  totalOrganizations?: Maybe<Scalars["Int"]["output"]>;
  totalUsers?: Maybe<Scalars["Int"]["output"]>;
};

export type DeleteFileInput = {
  fileId: Scalars["String"]["input"];
};

/** Uploaded file metadata */
export type File = {
  __typename?: "File";
  contentType?: Maybe<Scalars["String"]["output"]>;
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  filename?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["ID"]["output"]>;
  key?: Maybe<Scalars["String"]["output"]>;
  metadata?: Maybe<Scalars["JSON"]["output"]>;
  organizationId?: Maybe<Scalars["String"]["output"]>;
  size?: Maybe<Scalars["Int"]["output"]>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
  url?: Maybe<Scalars["String"]["output"]>;
  userId?: Maybe<Scalars["String"]["output"]>;
};

export type GetSignedUrlInput = {
  expiresIn?: InputMaybe<Scalars["Int"]["input"]>;
  fileId: Scalars["String"]["input"];
};

export type HealthStatus = {
  __typename?: "HealthStatus";
  database?: Maybe<ServiceHealth>;
  email?: Maybe<ServiceHealth>;
  resend?: Maybe<ServiceHealth>;
  stripe?: Maybe<ServiceHealth>;
};

export type League = {
  __typename?: "League";
  country?: Maybe<Scalars["String"]["output"]>;
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  fbrefId?: Maybe<Scalars["String"]["output"]>;
  fbrefPath?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["ID"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  tier?: Maybe<Scalars["Int"]["output"]>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type Match = {
  __typename?: "Match";
  awayAerialsWon?: Maybe<Scalars["Int"]["output"]>;
  awayClearances?: Maybe<Scalars["Int"]["output"]>;
  awayCorners?: Maybe<Scalars["Int"]["output"]>;
  awayCrosses?: Maybe<Scalars["Int"]["output"]>;
  awayFouls?: Maybe<Scalars["Int"]["output"]>;
  awayGoals?: Maybe<Scalars["Int"]["output"]>;
  awayHalfTimeGoals?: Maybe<Scalars["Int"]["output"]>;
  awayInterceptions?: Maybe<Scalars["Int"]["output"]>;
  awayOffsides?: Maybe<Scalars["Int"]["output"]>;
  awayPassesAttempted?: Maybe<Scalars["Int"]["output"]>;
  awayPassesCompleted?: Maybe<Scalars["Int"]["output"]>;
  awayPossession?: Maybe<Scalars["Int"]["output"]>;
  awayRedCards?: Maybe<Scalars["Int"]["output"]>;
  awayShots?: Maybe<Scalars["Int"]["output"]>;
  awayShotsOnTarget?: Maybe<Scalars["Int"]["output"]>;
  awayTackles?: Maybe<Scalars["Int"]["output"]>;
  awayTeam?: Maybe<Team>;
  awayTeamId?: Maybe<Scalars["String"]["output"]>;
  awayXg?: Maybe<Scalars["Float"]["output"]>;
  awayYellowCards?: Maybe<Scalars["Int"]["output"]>;
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  dataSource?: Maybe<Scalars["String"]["output"]>;
  date?: Maybe<Scalars["DateTime"]["output"]>;
  fbrefMatchId?: Maybe<Scalars["String"]["output"]>;
  homeAerialsWon?: Maybe<Scalars["Int"]["output"]>;
  homeClearances?: Maybe<Scalars["Int"]["output"]>;
  homeCorners?: Maybe<Scalars["Int"]["output"]>;
  homeCrosses?: Maybe<Scalars["Int"]["output"]>;
  homeFouls?: Maybe<Scalars["Int"]["output"]>;
  homeGoals?: Maybe<Scalars["Int"]["output"]>;
  homeHalfTimeGoals?: Maybe<Scalars["Int"]["output"]>;
  homeInterceptions?: Maybe<Scalars["Int"]["output"]>;
  homeOffsides?: Maybe<Scalars["Int"]["output"]>;
  homePassesAttempted?: Maybe<Scalars["Int"]["output"]>;
  homePassesCompleted?: Maybe<Scalars["Int"]["output"]>;
  homePossession?: Maybe<Scalars["Int"]["output"]>;
  homeRedCards?: Maybe<Scalars["Int"]["output"]>;
  homeShots?: Maybe<Scalars["Int"]["output"]>;
  homeShotsOnTarget?: Maybe<Scalars["Int"]["output"]>;
  homeTackles?: Maybe<Scalars["Int"]["output"]>;
  homeTeam?: Maybe<Team>;
  homeTeamId?: Maybe<Scalars["String"]["output"]>;
  homeXg?: Maybe<Scalars["Float"]["output"]>;
  homeYellowCards?: Maybe<Scalars["Int"]["output"]>;
  id?: Maybe<Scalars["ID"]["output"]>;
  round?: Maybe<Scalars["Int"]["output"]>;
  season?: Maybe<Season>;
  seasonId?: Maybe<Scalars["String"]["output"]>;
  status?: Maybe<Scalars["String"]["output"]>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
  venue?: Maybe<Scalars["String"]["output"]>;
};

export enum MemberRole {
  Admin = "admin",
  Member = "member",
  Owner = "owner",
}

export type Mutation = {
  __typename?: "Mutation";
  adminAdjustCredits?: Maybe<CreditAdjustmentResult>;
  createCheckout?: Maybe<CheckoutResult>;
  createCreditCheckout?: Maybe<CheckoutResult>;
  createCustomerPortal?: Maybe<CustomerPortalResult>;
  createProject?: Maybe<Project>;
  createTask?: Maybe<Task>;
  deleteFile?: Maybe<Scalars["Boolean"]["output"]>;
  deleteProject?: Maybe<Scalars["Boolean"]["output"]>;
  deleteTask?: Maybe<Task>;
  getSignedUrl?: Maybe<SignedUrl>;
  markAllNotificationsRead?: Maybe<Scalars["Boolean"]["output"]>;
  markNotificationRead?: Maybe<Notification>;
  updateProject?: Maybe<Project>;
  updateTask?: Maybe<Task>;
  uploadFile?: Maybe<File>;
};

export type MutationAdminAdjustCreditsArgs = {
  amount: Scalars["Int"]["input"];
  organizationId: Scalars["String"]["input"];
  reason: Scalars["String"]["input"];
};

export type MutationCreateCheckoutArgs = {
  interval?: InputMaybe<Scalars["String"]["input"]>;
  planId: Scalars["String"]["input"];
};

export type MutationCreateCreditCheckoutArgs = {
  packId: Scalars["String"]["input"];
};

export type MutationCreateProjectArgs = {
  input?: InputMaybe<CreateProjectInput>;
};

export type MutationCreateTaskArgs = {
  input: CreateTaskInput;
};

export type MutationDeleteFileArgs = {
  input: DeleteFileInput;
};

export type MutationDeleteProjectArgs = {
  id: Scalars["String"]["input"];
};

export type MutationDeleteTaskArgs = {
  id: Scalars["String"]["input"];
};

export type MutationGetSignedUrlArgs = {
  input: GetSignedUrlInput;
};

export type MutationMarkNotificationReadArgs = {
  notificationId: Scalars["String"]["input"];
};

export type MutationUpdateProjectArgs = {
  id: Scalars["String"]["input"];
  input?: InputMaybe<UpdateProjectInput>;
};

export type MutationUpdateTaskArgs = {
  id: Scalars["String"]["input"];
  input: UpdateTaskInput;
};

export type MutationUploadFileArgs = {
  input: UploadFileInput;
};

export type Notification = {
  __typename?: "Notification";
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  id?: Maybe<Scalars["ID"]["output"]>;
  link?: Maybe<Scalars["String"]["output"]>;
  message?: Maybe<Scalars["String"]["output"]>;
  organizationId?: Maybe<Scalars["String"]["output"]>;
  read?: Maybe<Scalars["Boolean"]["output"]>;
  readAt?: Maybe<Scalars["DateTime"]["output"]>;
  title?: Maybe<Scalars["String"]["output"]>;
  type?: Maybe<Scalars["String"]["output"]>;
  userId?: Maybe<Scalars["String"]["output"]>;
};

export type Organization = {
  __typename?: "Organization";
  id?: Maybe<Scalars["ID"]["output"]>;
  logo?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  role?: Maybe<Scalars["String"]["output"]>;
  slug?: Maybe<Scalars["String"]["output"]>;
};

export type PaginatedOrganizations = {
  __typename?: "PaginatedOrganizations";
  hasMore?: Maybe<Scalars["Boolean"]["output"]>;
  organizations?: Maybe<Array<AdminOrganization>>;
  page?: Maybe<Scalars["Int"]["output"]>;
  pageSize?: Maybe<Scalars["Int"]["output"]>;
  total?: Maybe<Scalars["Int"]["output"]>;
};

export type PaginatedUsers = {
  __typename?: "PaginatedUsers";
  hasMore?: Maybe<Scalars["Boolean"]["output"]>;
  page?: Maybe<Scalars["Int"]["output"]>;
  pageSize?: Maybe<Scalars["Int"]["output"]>;
  total?: Maybe<Scalars["Int"]["output"]>;
  users?: Maybe<Array<AdminUser>>;
};

export type Project = {
  __typename?: "Project";
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  description?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["ID"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  organizationId?: Maybe<Scalars["String"]["output"]>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type Query = {
  __typename?: "Query";
  adminDashboardStats?: Maybe<DashboardStats>;
  adminOrganizations?: Maybe<PaginatedOrganizations>;
  adminSystemHealth?: Maybe<HealthStatus>;
  adminUsers?: Maybe<PaginatedUsers>;
  billingPlans?: Maybe<Array<BillingPlan>>;
  creditBalance?: Maybe<CreditBalance>;
  creditHistory?: Maybe<Array<CreditTransaction>>;
  creditPacks?: Maybe<Array<CreditPack>>;
  /** Get the current season for a league */
  currentSeason?: Maybe<Season>;
  file?: Maybe<File>;
  files?: Maybe<Array<File>>;
  health?: Maybe<Scalars["String"]["output"]>;
  /** Get a single league by ID */
  league?: Maybe<League>;
  leagues?: Maybe<Array<League>>;
  match?: Maybe<Match>;
  /** Get matches with optional filters */
  matches?: Maybe<Array<Match>>;
  notifications?: Maybe<Array<Notification>>;
  project?: Maybe<Project>;
  projects?: Maybe<Array<Project>>;
  /** Get recent form for a team (last N matches) */
  recentForm?: Maybe<RecentForm>;
  /** Get a single season by ID */
  season?: Maybe<Season>;
  /** Get seasons, optionally filtered by league */
  seasons?: Maybe<Array<Season>>;
  task?: Maybe<Task>;
  tasks?: Maybe<Array<Task>>;
  /** Get a single team by ID */
  team?: Maybe<Team>;
  /** Get team statistics for a season */
  teamStats?: Maybe<TeamStats>;
  teams?: Maybe<Array<Team>>;
  unreadNotificationCount?: Maybe<UnreadCount>;
  userOrganizations?: Maybe<Array<Organization>>;
};

export type QueryAdminOrganizationsArgs = {
  page?: InputMaybe<Scalars["Int"]["input"]>;
  pageSize?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryAdminUsersArgs = {
  page?: InputMaybe<Scalars["Int"]["input"]>;
  pageSize?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryCreditHistoryArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryCurrentSeasonArgs = {
  leagueId: Scalars["String"]["input"];
};

export type QueryFileArgs = {
  id: Scalars["String"]["input"];
};

export type QueryLeagueArgs = {
  id: Scalars["String"]["input"];
};

export type QueryMatchArgs = {
  id: Scalars["String"]["input"];
};

export type QueryMatchesArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  seasonId?: InputMaybe<Scalars["String"]["input"]>;
  status?: InputMaybe<Scalars["String"]["input"]>;
  teamId?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryNotificationsArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryProjectArgs = {
  id: Scalars["String"]["input"];
};

export type QueryRecentFormArgs = {
  numMatches?: InputMaybe<Scalars["Int"]["input"]>;
  teamId: Scalars["String"]["input"];
};

export type QuerySeasonArgs = {
  id: Scalars["String"]["input"];
};

export type QuerySeasonsArgs = {
  leagueId?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryTaskArgs = {
  id: Scalars["String"]["input"];
};

export type QueryTeamArgs = {
  id: Scalars["String"]["input"];
};

export type QueryTeamStatsArgs = {
  seasonId?: InputMaybe<Scalars["String"]["input"]>;
  teamId: Scalars["String"]["input"];
};

export type RecentForm = {
  __typename?: "RecentForm";
  bttsRate?: Maybe<Scalars["Float"]["output"]>;
  cleanSheets?: Maybe<Scalars["Int"]["output"]>;
  failedToScore?: Maybe<Scalars["Int"]["output"]>;
  form?: Maybe<Scalars["String"]["output"]>;
  goalsConceded?: Maybe<Scalars["Int"]["output"]>;
  goalsScored?: Maybe<Scalars["Int"]["output"]>;
  matches?: Maybe<Scalars["Int"]["output"]>;
  over15Rate?: Maybe<Scalars["Float"]["output"]>;
  over25Rate?: Maybe<Scalars["Float"]["output"]>;
  over35Rate?: Maybe<Scalars["Float"]["output"]>;
  points?: Maybe<Scalars["Int"]["output"]>;
  teamId?: Maybe<Scalars["String"]["output"]>;
  xgAgainst?: Maybe<Scalars["Float"]["output"]>;
  xgFor?: Maybe<Scalars["Float"]["output"]>;
};

export type Season = {
  __typename?: "Season";
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  endDate?: Maybe<Scalars["DateTime"]["output"]>;
  fbrefPath?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["ID"]["output"]>;
  isCurrent?: Maybe<Scalars["Boolean"]["output"]>;
  league?: Maybe<League>;
  leagueId?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  startDate?: Maybe<Scalars["DateTime"]["output"]>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type ServiceHealth = {
  __typename?: "ServiceHealth";
  /** Response time in milliseconds */
  latency?: Maybe<Scalars["Int"]["output"]>;
  message?: Maybe<Scalars["String"]["output"]>;
  status?: Maybe<ServiceHealthStatus>;
};

export enum ServiceHealthStatus {
  Degraded = "degraded",
  Healthy = "healthy",
  Unhealthy = "unhealthy",
}

/** Temporary signed URL for file access */
export type SignedUrl = {
  __typename?: "SignedUrl";
  expiresIn?: Maybe<Scalars["Int"]["output"]>;
  url?: Maybe<Scalars["String"]["output"]>;
};

export enum SubscriptionStatus {
  Active = "active",
  Canceled = "canceled",
  Incomplete = "incomplete",
  PastDue = "past_due",
  Trialing = "trialing",
}

export type Task = {
  __typename?: "Task";
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  description?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["ID"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  organizationId?: Maybe<Scalars["String"]["output"]>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type Team = {
  __typename?: "Team";
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  fbrefId?: Maybe<Scalars["String"]["output"]>;
  fbrefPath?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["ID"]["output"]>;
  logo?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  shortName?: Maybe<Scalars["String"]["output"]>;
  stadium?: Maybe<Scalars["String"]["output"]>;
  understatId?: Maybe<Scalars["String"]["output"]>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type TeamStats = {
  __typename?: "TeamStats";
  avgGoalsAgainst?: Maybe<Scalars["Float"]["output"]>;
  avgGoalsFor?: Maybe<Scalars["Float"]["output"]>;
  avgXgAgainst?: Maybe<Scalars["Float"]["output"]>;
  avgXgFor?: Maybe<Scalars["Float"]["output"]>;
  bttsMatches?: Maybe<Scalars["Int"]["output"]>;
  cleanSheets?: Maybe<Scalars["Int"]["output"]>;
  draws?: Maybe<Scalars["Int"]["output"]>;
  failedToScore?: Maybe<Scalars["Int"]["output"]>;
  goalsAgainst?: Maybe<Scalars["Int"]["output"]>;
  goalsFor?: Maybe<Scalars["Int"]["output"]>;
  losses?: Maybe<Scalars["Int"]["output"]>;
  played?: Maybe<Scalars["Int"]["output"]>;
  seasonId?: Maybe<Scalars["String"]["output"]>;
  teamId?: Maybe<Scalars["String"]["output"]>;
  wins?: Maybe<Scalars["Int"]["output"]>;
  xgAgainst?: Maybe<Scalars["Float"]["output"]>;
  xgFor?: Maybe<Scalars["Float"]["output"]>;
};

export type UnreadCount = {
  __typename?: "UnreadCount";
  count?: Maybe<Scalars["Int"]["output"]>;
};

export type UpdateProjectInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateTaskInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
};

export type UploadFileInput = {
  base64Data: Scalars["String"]["input"];
  contentType: Scalars["String"]["input"];
  filename: Scalars["String"]["input"];
  size: Scalars["Int"]["input"];
};

export enum UserRole {
  Admin = "admin",
  User = "user",
}

export type AdminAdjustCreditsMutationVariables = Exact<{
  organizationId: Scalars["String"]["input"];
  amount: Scalars["Int"]["input"];
  reason: Scalars["String"]["input"];
}>;

export type AdminAdjustCreditsMutation = {
  __typename?: "Mutation";
  adminAdjustCredits?: {
    __typename?: "CreditAdjustmentResult";
    organizationId?: string | null;
    previousBalance?: number | null;
    newBalance?: number | null;
    adjustmentAmount?: number | null;
    reason?: string | null;
  } | null;
};

export type GetAdminUsersQueryVariables = Exact<{
  page?: InputMaybe<Scalars["Int"]["input"]>;
  pageSize?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type GetAdminUsersQuery = {
  __typename?: "Query";
  adminUsers?: {
    __typename?: "PaginatedUsers";
    total?: number | null;
    page?: number | null;
    pageSize?: number | null;
    hasMore?: boolean | null;
    users?: Array<{
      __typename?: "AdminUser";
      id?: string | null;
      name?: string | null;
      email?: string | null;
      emailVerified?: boolean | null;
      createdAt?: any | null;
      organizationCount?: number | null;
    }> | null;
  } | null;
};

export type GetAdminOrganizationsQueryVariables = Exact<{
  page?: InputMaybe<Scalars["Int"]["input"]>;
  pageSize?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type GetAdminOrganizationsQuery = {
  __typename?: "Query";
  adminOrganizations?: {
    __typename?: "PaginatedOrganizations";
    total?: number | null;
    page?: number | null;
    pageSize?: number | null;
    hasMore?: boolean | null;
    organizations?: Array<{
      __typename?: "AdminOrganization";
      id?: string | null;
      name?: string | null;
      slug?: string | null;
      createdAt?: any | null;
      memberCount?: number | null;
      planId?: string | null;
      creditBalance?: number | null;
      subscriptionStatus?: string | null;
    }> | null;
  } | null;
};

export type GetAdminDashboardStatsQueryVariables = Exact<{
  [key: string]: never;
}>;

export type GetAdminDashboardStatsQuery = {
  __typename?: "Query";
  adminDashboardStats?: {
    __typename?: "DashboardStats";
    totalUsers?: number | null;
    totalOrganizations?: number | null;
    recentSignups?: number | null;
  } | null;
};

export type GetAdminSystemHealthQueryVariables = Exact<{
  [key: string]: never;
}>;

export type GetAdminSystemHealthQuery = {
  __typename?: "Query";
  adminSystemHealth?: {
    __typename?: "HealthStatus";
    database?: {
      __typename?: "ServiceHealth";
      status?: ServiceHealthStatus | null;
      message?: string | null;
      latency?: number | null;
    } | null;
    stripe?: {
      __typename?: "ServiceHealth";
      status?: ServiceHealthStatus | null;
      message?: string | null;
      latency?: number | null;
    } | null;
    resend?: {
      __typename?: "ServiceHealth";
      status?: ServiceHealthStatus | null;
      message?: string | null;
      latency?: number | null;
    } | null;
    email?: {
      __typename?: "ServiceHealth";
      status?: ServiceHealthStatus | null;
      message?: string | null;
      latency?: number | null;
    } | null;
  } | null;
};

export type CreateCheckoutMutationVariables = Exact<{
  planId: Scalars["String"]["input"];
  interval?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type CreateCheckoutMutation = {
  __typename?: "Mutation";
  createCheckout?: {
    __typename?: "CheckoutResult";
    url?: string | null;
    sessionId?: string | null;
  } | null;
};

export type CreateCreditCheckoutMutationVariables = Exact<{
  packId: Scalars["String"]["input"];
}>;

export type CreateCreditCheckoutMutation = {
  __typename?: "Mutation";
  createCreditCheckout?: {
    __typename?: "CheckoutResult";
    url?: string | null;
    sessionId?: string | null;
  } | null;
};

export type CreateCustomerPortalMutationVariables = Exact<{
  [key: string]: never;
}>;

export type CreateCustomerPortalMutation = {
  __typename?: "Mutation";
  createCustomerPortal?: {
    __typename?: "CustomerPortalResult";
    url?: string | null;
  } | null;
};

export type GetCreditBalanceQueryVariables = Exact<{ [key: string]: never }>;

export type GetCreditBalanceQuery = {
  __typename?: "Query";
  creditBalance?: {
    __typename?: "CreditBalance";
    balance?: number | null;
    planId?: string | null;
    subscriptionStatus?: string | null;
    cancelAtPeriodEnd?: boolean | null;
    subscriptionEndDate?: any | null;
    currentPeriodEnd?: any | null;
  } | null;
};

export type GetCreditHistoryQueryVariables = Exact<{
  limit?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type GetCreditHistoryQuery = {
  __typename?: "Query";
  creditHistory?: Array<{
    __typename?: "CreditTransaction";
    id?: string | null;
    amount?: number | null;
    type?: string | null;
    description?: string | null;
    balanceAfter?: number | null;
    createdAt?: any | null;
    metadata?: any | null;
  }> | null;
};

export type GetBillingPlansQueryVariables = Exact<{ [key: string]: never }>;

export type GetBillingPlansQuery = {
  __typename?: "Query";
  billingPlans?: Array<{
    __typename?: "BillingPlan";
    id?: string | null;
    name?: string | null;
    description?: string | null;
    priceMonthly?: number | null;
    priceYearly?: number | null;
    creditsPerMonth?: number | null;
    features?: Array<string> | null;
  }> | null;
};

export type GetCreditPacksQueryVariables = Exact<{ [key: string]: never }>;

export type GetCreditPacksQuery = {
  __typename?: "Query";
  creditPacks?: Array<{
    __typename?: "CreditPack";
    id?: string | null;
    name?: string | null;
    credits?: number | null;
    price?: number | null;
  }> | null;
};

export type GetLeaguesQueryVariables = Exact<{ [key: string]: never }>;

export type GetLeaguesQuery = {
  __typename?: "Query";
  leagues?: Array<{
    __typename?: "League";
    id?: string | null;
    name?: string | null;
    country?: string | null;
    tier?: number | null;
    fbrefId?: string | null;
    fbrefPath?: string | null;
    createdAt?: any | null;
    updatedAt?: any | null;
  }> | null;
};

export type GetLeagueQueryVariables = Exact<{
  id: Scalars["String"]["input"];
}>;

export type GetLeagueQuery = {
  __typename?: "Query";
  league?: {
    __typename?: "League";
    id?: string | null;
    name?: string | null;
    country?: string | null;
    tier?: number | null;
    fbrefId?: string | null;
    fbrefPath?: string | null;
    createdAt?: any | null;
    updatedAt?: any | null;
  } | null;
};

export type GetSeasonsQueryVariables = Exact<{
  leagueId?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type GetSeasonsQuery = {
  __typename?: "Query";
  seasons?: Array<{
    __typename?: "Season";
    id?: string | null;
    leagueId?: string | null;
    name?: string | null;
    startDate?: any | null;
    endDate?: any | null;
    isCurrent?: boolean | null;
    fbrefPath?: string | null;
    createdAt?: any | null;
    updatedAt?: any | null;
    league?: {
      __typename?: "League";
      id?: string | null;
      name?: string | null;
      country?: string | null;
      tier?: number | null;
    } | null;
  }> | null;
};

export type GetCurrentSeasonQueryVariables = Exact<{
  leagueId: Scalars["String"]["input"];
}>;

export type GetCurrentSeasonQuery = {
  __typename?: "Query";
  currentSeason?: {
    __typename?: "Season";
    id?: string | null;
    leagueId?: string | null;
    name?: string | null;
    startDate?: any | null;
    endDate?: any | null;
    isCurrent?: boolean | null;
    fbrefPath?: string | null;
    createdAt?: any | null;
    updatedAt?: any | null;
    league?: {
      __typename?: "League";
      id?: string | null;
      name?: string | null;
      country?: string | null;
      tier?: number | null;
    } | null;
  } | null;
};

export type GetSeasonQueryVariables = Exact<{
  id: Scalars["String"]["input"];
}>;

export type GetSeasonQuery = {
  __typename?: "Query";
  season?: {
    __typename?: "Season";
    id?: string | null;
    leagueId?: string | null;
    name?: string | null;
    startDate?: any | null;
    endDate?: any | null;
    isCurrent?: boolean | null;
    fbrefPath?: string | null;
    createdAt?: any | null;
    updatedAt?: any | null;
    league?: {
      __typename?: "League";
      id?: string | null;
      name?: string | null;
      country?: string | null;
      tier?: number | null;
    } | null;
  } | null;
};

export type GetTeamsQueryVariables = Exact<{ [key: string]: never }>;

export type GetTeamsQuery = {
  __typename?: "Query";
  teams?: Array<{
    __typename?: "Team";
    id?: string | null;
    name?: string | null;
    shortName?: string | null;
    logo?: string | null;
    stadium?: string | null;
    fbrefId?: string | null;
    fbrefPath?: string | null;
    understatId?: string | null;
    createdAt?: any | null;
    updatedAt?: any | null;
  }> | null;
};

export type GetTeamQueryVariables = Exact<{
  id: Scalars["String"]["input"];
}>;

export type GetTeamQuery = {
  __typename?: "Query";
  team?: {
    __typename?: "Team";
    id?: string | null;
    name?: string | null;
    shortName?: string | null;
    logo?: string | null;
    stadium?: string | null;
    fbrefId?: string | null;
    fbrefPath?: string | null;
    understatId?: string | null;
    createdAt?: any | null;
    updatedAt?: any | null;
  } | null;
};

export type GetMatchesQueryVariables = Exact<{
  seasonId?: InputMaybe<Scalars["String"]["input"]>;
  teamId?: InputMaybe<Scalars["String"]["input"]>;
  status?: InputMaybe<Scalars["String"]["input"]>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type GetMatchesQuery = {
  __typename?: "Query";
  matches?: Array<{
    __typename?: "Match";
    id?: string | null;
    date?: any | null;
    status?: string | null;
    round?: number | null;
    venue?: string | null;
    homeGoals?: number | null;
    awayGoals?: number | null;
    homeHalfTimeGoals?: number | null;
    awayHalfTimeGoals?: number | null;
    homeXg?: number | null;
    awayXg?: number | null;
    homeShots?: number | null;
    awayShots?: number | null;
    homeShotsOnTarget?: number | null;
    awayShotsOnTarget?: number | null;
    homePossession?: number | null;
    awayPossession?: number | null;
    dataSource?: string | null;
    fbrefMatchId?: string | null;
    createdAt?: any | null;
    updatedAt?: any | null;
    homeTeam?: {
      __typename?: "Team";
      id?: string | null;
      name?: string | null;
      shortName?: string | null;
      logo?: string | null;
    } | null;
    awayTeam?: {
      __typename?: "Team";
      id?: string | null;
      name?: string | null;
      shortName?: string | null;
      logo?: string | null;
    } | null;
    season?: {
      __typename?: "Season";
      id?: string | null;
      name?: string | null;
      league?: {
        __typename?: "League";
        id?: string | null;
        name?: string | null;
        country?: string | null;
      } | null;
    } | null;
  }> | null;
};

export type GetMatchQueryVariables = Exact<{
  id: Scalars["String"]["input"];
}>;

export type GetMatchQuery = {
  __typename?: "Query";
  match?: {
    __typename?: "Match";
    id?: string | null;
    date?: any | null;
    status?: string | null;
    round?: number | null;
    venue?: string | null;
    homeGoals?: number | null;
    awayGoals?: number | null;
    homeHalfTimeGoals?: number | null;
    awayHalfTimeGoals?: number | null;
    homeXg?: number | null;
    awayXg?: number | null;
    homeShots?: number | null;
    awayShots?: number | null;
    homeShotsOnTarget?: number | null;
    awayShotsOnTarget?: number | null;
    homePossession?: number | null;
    awayPossession?: number | null;
    homePassesCompleted?: number | null;
    awayPassesCompleted?: number | null;
    homePassesAttempted?: number | null;
    awayPassesAttempted?: number | null;
    homeTackles?: number | null;
    awayTackles?: number | null;
    homeInterceptions?: number | null;
    awayInterceptions?: number | null;
    homeClearances?: number | null;
    awayClearances?: number | null;
    homeCorners?: number | null;
    awayCorners?: number | null;
    homeCrosses?: number | null;
    awayCrosses?: number | null;
    homeFouls?: number | null;
    awayFouls?: number | null;
    homeYellowCards?: number | null;
    awayYellowCards?: number | null;
    homeRedCards?: number | null;
    awayRedCards?: number | null;
    homeOffsides?: number | null;
    awayOffsides?: number | null;
    homeAerialsWon?: number | null;
    awayAerialsWon?: number | null;
    dataSource?: string | null;
    fbrefMatchId?: string | null;
    createdAt?: any | null;
    updatedAt?: any | null;
    homeTeam?: {
      __typename?: "Team";
      id?: string | null;
      name?: string | null;
      shortName?: string | null;
      logo?: string | null;
      stadium?: string | null;
    } | null;
    awayTeam?: {
      __typename?: "Team";
      id?: string | null;
      name?: string | null;
      shortName?: string | null;
      logo?: string | null;
      stadium?: string | null;
    } | null;
    season?: {
      __typename?: "Season";
      id?: string | null;
      name?: string | null;
      league?: {
        __typename?: "League";
        id?: string | null;
        name?: string | null;
        country?: string | null;
      } | null;
    } | null;
  } | null;
};

export type GetTeamStatsQueryVariables = Exact<{
  teamId: Scalars["String"]["input"];
  seasonId?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type GetTeamStatsQuery = {
  __typename?: "Query";
  teamStats?: {
    __typename?: "TeamStats";
    teamId?: string | null;
    seasonId?: string | null;
    played?: number | null;
    wins?: number | null;
    draws?: number | null;
    losses?: number | null;
    goalsFor?: number | null;
    goalsAgainst?: number | null;
    xgFor?: number | null;
    xgAgainst?: number | null;
    cleanSheets?: number | null;
    failedToScore?: number | null;
    bttsMatches?: number | null;
    avgGoalsFor?: number | null;
    avgGoalsAgainst?: number | null;
    avgXgFor?: number | null;
    avgXgAgainst?: number | null;
  } | null;
};

export type GetRecentFormQueryVariables = Exact<{
  teamId: Scalars["String"]["input"];
  numMatches?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type GetRecentFormQuery = {
  __typename?: "Query";
  recentForm?: {
    __typename?: "RecentForm";
    teamId?: string | null;
    matches?: number | null;
    form?: string | null;
    points?: number | null;
    goalsScored?: number | null;
    goalsConceded?: number | null;
    xgFor?: number | null;
    xgAgainst?: number | null;
    cleanSheets?: number | null;
    failedToScore?: number | null;
    bttsRate?: number | null;
    over15Rate?: number | null;
    over25Rate?: number | null;
    over35Rate?: number | null;
  } | null;
};

export type MarkNotificationReadMutationVariables = Exact<{
  notificationId: Scalars["String"]["input"];
}>;

export type MarkNotificationReadMutation = {
  __typename?: "Mutation";
  markNotificationRead?: {
    __typename?: "Notification";
    id?: string | null;
    read?: boolean | null;
    readAt?: any | null;
  } | null;
};

export type MarkAllNotificationsReadMutationVariables = Exact<{
  [key: string]: never;
}>;

export type MarkAllNotificationsReadMutation = {
  __typename?: "Mutation";
  markAllNotificationsRead?: boolean | null;
};

export type GetNotificationsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type GetNotificationsQuery = {
  __typename?: "Query";
  notifications?: Array<{
    __typename?: "Notification";
    id?: string | null;
    title?: string | null;
    message?: string | null;
    type?: string | null;
    link?: string | null;
    read?: boolean | null;
    createdAt?: any | null;
    readAt?: any | null;
  }> | null;
};

export type GetUnreadNotificationCountQueryVariables = Exact<{
  [key: string]: never;
}>;

export type GetUnreadNotificationCountQuery = {
  __typename?: "Query";
  unreadNotificationCount?: {
    __typename?: "UnreadCount";
    count?: number | null;
  } | null;
};

export type GetUserOrganizationsQueryVariables = Exact<{
  [key: string]: never;
}>;

export type GetUserOrganizationsQuery = {
  __typename?: "Query";
  userOrganizations?: Array<{
    __typename?: "Organization";
    id?: string | null;
    name?: string | null;
    slug?: string | null;
    role?: string | null;
    logo?: string | null;
  }> | null;
};

export type CreateProjectMutationVariables = Exact<{
  input: CreateProjectInput;
}>;

export type CreateProjectMutation = {
  __typename?: "Mutation";
  createProject?: {
    __typename?: "Project";
    id?: string | null;
    name?: string | null;
    description?: string | null;
    organizationId?: string | null;
    createdAt?: any | null;
    updatedAt?: any | null;
  } | null;
};

export type UpdateProjectMutationVariables = Exact<{
  id: Scalars["String"]["input"];
  input: UpdateProjectInput;
}>;

export type UpdateProjectMutation = {
  __typename?: "Mutation";
  updateProject?: {
    __typename?: "Project";
    id?: string | null;
    name?: string | null;
    description?: string | null;
    organizationId?: string | null;
    createdAt?: any | null;
    updatedAt?: any | null;
  } | null;
};

export type DeleteProjectMutationVariables = Exact<{
  id: Scalars["String"]["input"];
}>;

export type DeleteProjectMutation = {
  __typename?: "Mutation";
  deleteProject?: boolean | null;
};

export type GetProjectsQueryVariables = Exact<{ [key: string]: never }>;

export type GetProjectsQuery = {
  __typename?: "Query";
  projects?: Array<{
    __typename?: "Project";
    id?: string | null;
    name?: string | null;
    description?: string | null;
    organizationId?: string | null;
    createdAt?: any | null;
    updatedAt?: any | null;
  }> | null;
};

export type GetProjectQueryVariables = Exact<{
  id: Scalars["String"]["input"];
}>;

export type GetProjectQuery = {
  __typename?: "Query";
  project?: {
    __typename?: "Project";
    id?: string | null;
    name?: string | null;
    description?: string | null;
    organizationId?: string | null;
    createdAt?: any | null;
    updatedAt?: any | null;
  } | null;
};

export type CreateTaskMutationVariables = Exact<{
  input: CreateTaskInput;
}>;

export type CreateTaskMutation = {
  __typename?: "Mutation";
  createTask?: {
    __typename?: "Task";
    id?: string | null;
    name?: string | null;
    description?: string | null;
    createdAt?: any | null;
    updatedAt?: any | null;
  } | null;
};

export type UpdateTaskMutationVariables = Exact<{
  id: Scalars["String"]["input"];
  input: UpdateTaskInput;
}>;

export type UpdateTaskMutation = {
  __typename?: "Mutation";
  updateTask?: {
    __typename?: "Task";
    id?: string | null;
    name?: string | null;
    description?: string | null;
    createdAt?: any | null;
    updatedAt?: any | null;
  } | null;
};

export type DeleteTaskMutationVariables = Exact<{
  id: Scalars["String"]["input"];
}>;

export type DeleteTaskMutation = {
  __typename?: "Mutation";
  deleteTask?: {
    __typename?: "Task";
    id?: string | null;
    name?: string | null;
  } | null;
};

export type GetTasksQueryVariables = Exact<{ [key: string]: never }>;

export type GetTasksQuery = {
  __typename?: "Query";
  tasks?: Array<{
    __typename?: "Task";
    id?: string | null;
    name?: string | null;
    description?: string | null;
    createdAt?: any | null;
    updatedAt?: any | null;
  }> | null;
};

export type GetTaskQueryVariables = Exact<{
  id: Scalars["String"]["input"];
}>;

export type GetTaskQuery = {
  __typename?: "Query";
  task?: {
    __typename?: "Task";
    id?: string | null;
    name?: string | null;
    description?: string | null;
    createdAt?: any | null;
    updatedAt?: any | null;
  } | null;
};

export const AdminAdjustCreditsDocument = `
    mutation AdminAdjustCredits($organizationId: String!, $amount: Int!, $reason: String!) {
  adminAdjustCredits(
    organizationId: $organizationId
    amount: $amount
    reason: $reason
  ) {
    organizationId
    previousBalance
    newBalance
    adjustmentAmount
    reason
  }
}
    `;

export const useAdminAdjustCreditsMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    AdminAdjustCreditsMutation,
    TError,
    AdminAdjustCreditsMutationVariables,
    TContext
  >
) => {
  return useMutation<
    AdminAdjustCreditsMutation,
    TError,
    AdminAdjustCreditsMutationVariables,
    TContext
  >({
    mutationKey: ["AdminAdjustCredits"],
    mutationFn: (variables?: AdminAdjustCreditsMutationVariables) =>
      fetcher<AdminAdjustCreditsMutation, AdminAdjustCreditsMutationVariables>(
        AdminAdjustCreditsDocument,
        variables
      )(),
    ...options,
  });
};

useAdminAdjustCreditsMutation.fetcher = (
  variables: AdminAdjustCreditsMutationVariables
) =>
  fetcher<AdminAdjustCreditsMutation, AdminAdjustCreditsMutationVariables>(
    AdminAdjustCreditsDocument,
    variables
  );

export const GetAdminUsersDocument = `
    query GetAdminUsers($page: Int, $pageSize: Int, $search: String) {
  adminUsers(page: $page, pageSize: $pageSize, search: $search) {
    users {
      id
      name
      email
      emailVerified
      createdAt
      organizationCount
    }
    total
    page
    pageSize
    hasMore
  }
}
    `;

export const useGetAdminUsersQuery = <
  TData = GetAdminUsersQuery,
  TError = unknown,
>(
  variables?: GetAdminUsersQueryVariables,
  options?: Omit<
    UseQueryOptions<GetAdminUsersQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseQueryOptions<GetAdminUsersQuery, TError, TData>["queryKey"];
  }
) => {
  return useQuery<GetAdminUsersQuery, TError, TData>({
    queryKey:
      variables === undefined
        ? ["GetAdminUsers"]
        : ["GetAdminUsers", variables],
    queryFn: fetcher<GetAdminUsersQuery, GetAdminUsersQueryVariables>(
      GetAdminUsersDocument,
      variables
    ),
    ...options,
  });
};

useGetAdminUsersQuery.getKey = (variables?: GetAdminUsersQueryVariables) =>
  variables === undefined ? ["GetAdminUsers"] : ["GetAdminUsers", variables];

export const useInfiniteGetAdminUsersQuery = <
  TData = InfiniteData<GetAdminUsersQuery>,
  TError = unknown,
>(
  variables: GetAdminUsersQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<GetAdminUsersQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseInfiniteQueryOptions<
      GetAdminUsersQuery,
      TError,
      TData
    >["queryKey"];
  }
) => {
  return useInfiniteQuery<GetAdminUsersQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options;
      return {
        queryKey:
          (optionsQueryKey ?? variables === undefined)
            ? ["GetAdminUsers.infinite"]
            : ["GetAdminUsers.infinite", variables],
        queryFn: (metaData) =>
          fetcher<GetAdminUsersQuery, GetAdminUsersQueryVariables>(
            GetAdminUsersDocument,
            { ...variables, ...(metaData.pageParam ?? {}) }
          )(),
        ...restOptions,
      };
    })()
  );
};

useInfiniteGetAdminUsersQuery.getKey = (
  variables?: GetAdminUsersQueryVariables
) =>
  variables === undefined
    ? ["GetAdminUsers.infinite"]
    : ["GetAdminUsers.infinite", variables];

useGetAdminUsersQuery.fetcher = (variables?: GetAdminUsersQueryVariables) =>
  fetcher<GetAdminUsersQuery, GetAdminUsersQueryVariables>(
    GetAdminUsersDocument,
    variables
  );

export const GetAdminOrganizationsDocument = `
    query GetAdminOrganizations($page: Int, $pageSize: Int, $search: String) {
  adminOrganizations(page: $page, pageSize: $pageSize, search: $search) {
    organizations {
      id
      name
      slug
      createdAt
      memberCount
      planId
      creditBalance
      subscriptionStatus
    }
    total
    page
    pageSize
    hasMore
  }
}
    `;

export const useGetAdminOrganizationsQuery = <
  TData = GetAdminOrganizationsQuery,
  TError = unknown,
>(
  variables?: GetAdminOrganizationsQueryVariables,
  options?: Omit<
    UseQueryOptions<GetAdminOrganizationsQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseQueryOptions<
      GetAdminOrganizationsQuery,
      TError,
      TData
    >["queryKey"];
  }
) => {
  return useQuery<GetAdminOrganizationsQuery, TError, TData>({
    queryKey:
      variables === undefined
        ? ["GetAdminOrganizations"]
        : ["GetAdminOrganizations", variables],
    queryFn: fetcher<
      GetAdminOrganizationsQuery,
      GetAdminOrganizationsQueryVariables
    >(GetAdminOrganizationsDocument, variables),
    ...options,
  });
};

useGetAdminOrganizationsQuery.getKey = (
  variables?: GetAdminOrganizationsQueryVariables
) =>
  variables === undefined
    ? ["GetAdminOrganizations"]
    : ["GetAdminOrganizations", variables];

export const useInfiniteGetAdminOrganizationsQuery = <
  TData = InfiniteData<GetAdminOrganizationsQuery>,
  TError = unknown,
>(
  variables: GetAdminOrganizationsQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<GetAdminOrganizationsQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseInfiniteQueryOptions<
      GetAdminOrganizationsQuery,
      TError,
      TData
    >["queryKey"];
  }
) => {
  return useInfiniteQuery<GetAdminOrganizationsQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options;
      return {
        queryKey:
          (optionsQueryKey ?? variables === undefined)
            ? ["GetAdminOrganizations.infinite"]
            : ["GetAdminOrganizations.infinite", variables],
        queryFn: (metaData) =>
          fetcher<
            GetAdminOrganizationsQuery,
            GetAdminOrganizationsQueryVariables
          >(GetAdminOrganizationsDocument, {
            ...variables,
            ...(metaData.pageParam ?? {}),
          })(),
        ...restOptions,
      };
    })()
  );
};

useInfiniteGetAdminOrganizationsQuery.getKey = (
  variables?: GetAdminOrganizationsQueryVariables
) =>
  variables === undefined
    ? ["GetAdminOrganizations.infinite"]
    : ["GetAdminOrganizations.infinite", variables];

useGetAdminOrganizationsQuery.fetcher = (
  variables?: GetAdminOrganizationsQueryVariables
) =>
  fetcher<GetAdminOrganizationsQuery, GetAdminOrganizationsQueryVariables>(
    GetAdminOrganizationsDocument,
    variables
  );

export const GetAdminDashboardStatsDocument = `
    query GetAdminDashboardStats {
  adminDashboardStats {
    totalUsers
    totalOrganizations
    recentSignups
  }
}
    `;

export const useGetAdminDashboardStatsQuery = <
  TData = GetAdminDashboardStatsQuery,
  TError = unknown,
>(
  variables?: GetAdminDashboardStatsQueryVariables,
  options?: Omit<
    UseQueryOptions<GetAdminDashboardStatsQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseQueryOptions<
      GetAdminDashboardStatsQuery,
      TError,
      TData
    >["queryKey"];
  }
) => {
  return useQuery<GetAdminDashboardStatsQuery, TError, TData>({
    queryKey:
      variables === undefined
        ? ["GetAdminDashboardStats"]
        : ["GetAdminDashboardStats", variables],
    queryFn: fetcher<
      GetAdminDashboardStatsQuery,
      GetAdminDashboardStatsQueryVariables
    >(GetAdminDashboardStatsDocument, variables),
    ...options,
  });
};

useGetAdminDashboardStatsQuery.getKey = (
  variables?: GetAdminDashboardStatsQueryVariables
) =>
  variables === undefined
    ? ["GetAdminDashboardStats"]
    : ["GetAdminDashboardStats", variables];

export const useInfiniteGetAdminDashboardStatsQuery = <
  TData = InfiniteData<GetAdminDashboardStatsQuery>,
  TError = unknown,
>(
  variables: GetAdminDashboardStatsQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<GetAdminDashboardStatsQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseInfiniteQueryOptions<
      GetAdminDashboardStatsQuery,
      TError,
      TData
    >["queryKey"];
  }
) => {
  return useInfiniteQuery<GetAdminDashboardStatsQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options;
      return {
        queryKey:
          (optionsQueryKey ?? variables === undefined)
            ? ["GetAdminDashboardStats.infinite"]
            : ["GetAdminDashboardStats.infinite", variables],
        queryFn: (metaData) =>
          fetcher<
            GetAdminDashboardStatsQuery,
            GetAdminDashboardStatsQueryVariables
          >(GetAdminDashboardStatsDocument, {
            ...variables,
            ...(metaData.pageParam ?? {}),
          })(),
        ...restOptions,
      };
    })()
  );
};

useInfiniteGetAdminDashboardStatsQuery.getKey = (
  variables?: GetAdminDashboardStatsQueryVariables
) =>
  variables === undefined
    ? ["GetAdminDashboardStats.infinite"]
    : ["GetAdminDashboardStats.infinite", variables];

useGetAdminDashboardStatsQuery.fetcher = (
  variables?: GetAdminDashboardStatsQueryVariables
) =>
  fetcher<GetAdminDashboardStatsQuery, GetAdminDashboardStatsQueryVariables>(
    GetAdminDashboardStatsDocument,
    variables
  );

export const GetAdminSystemHealthDocument = `
    query GetAdminSystemHealth {
  adminSystemHealth {
    database {
      status
      message
      latency
    }
    stripe {
      status
      message
      latency
    }
    resend {
      status
      message
      latency
    }
    email {
      status
      message
      latency
    }
  }
}
    `;

export const useGetAdminSystemHealthQuery = <
  TData = GetAdminSystemHealthQuery,
  TError = unknown,
>(
  variables?: GetAdminSystemHealthQueryVariables,
  options?: Omit<
    UseQueryOptions<GetAdminSystemHealthQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseQueryOptions<
      GetAdminSystemHealthQuery,
      TError,
      TData
    >["queryKey"];
  }
) => {
  return useQuery<GetAdminSystemHealthQuery, TError, TData>({
    queryKey:
      variables === undefined
        ? ["GetAdminSystemHealth"]
        : ["GetAdminSystemHealth", variables],
    queryFn: fetcher<
      GetAdminSystemHealthQuery,
      GetAdminSystemHealthQueryVariables
    >(GetAdminSystemHealthDocument, variables),
    ...options,
  });
};

useGetAdminSystemHealthQuery.getKey = (
  variables?: GetAdminSystemHealthQueryVariables
) =>
  variables === undefined
    ? ["GetAdminSystemHealth"]
    : ["GetAdminSystemHealth", variables];

export const useInfiniteGetAdminSystemHealthQuery = <
  TData = InfiniteData<GetAdminSystemHealthQuery>,
  TError = unknown,
>(
  variables: GetAdminSystemHealthQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<GetAdminSystemHealthQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseInfiniteQueryOptions<
      GetAdminSystemHealthQuery,
      TError,
      TData
    >["queryKey"];
  }
) => {
  return useInfiniteQuery<GetAdminSystemHealthQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options;
      return {
        queryKey:
          (optionsQueryKey ?? variables === undefined)
            ? ["GetAdminSystemHealth.infinite"]
            : ["GetAdminSystemHealth.infinite", variables],
        queryFn: (metaData) =>
          fetcher<
            GetAdminSystemHealthQuery,
            GetAdminSystemHealthQueryVariables
          >(GetAdminSystemHealthDocument, {
            ...variables,
            ...(metaData.pageParam ?? {}),
          })(),
        ...restOptions,
      };
    })()
  );
};

useInfiniteGetAdminSystemHealthQuery.getKey = (
  variables?: GetAdminSystemHealthQueryVariables
) =>
  variables === undefined
    ? ["GetAdminSystemHealth.infinite"]
    : ["GetAdminSystemHealth.infinite", variables];

useGetAdminSystemHealthQuery.fetcher = (
  variables?: GetAdminSystemHealthQueryVariables
) =>
  fetcher<GetAdminSystemHealthQuery, GetAdminSystemHealthQueryVariables>(
    GetAdminSystemHealthDocument,
    variables
  );

export const CreateCheckoutDocument = `
    mutation CreateCheckout($planId: String!, $interval: String) {
  createCheckout(planId: $planId, interval: $interval) {
    url
    sessionId
  }
}
    `;

export const useCreateCheckoutMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    CreateCheckoutMutation,
    TError,
    CreateCheckoutMutationVariables,
    TContext
  >
) => {
  return useMutation<
    CreateCheckoutMutation,
    TError,
    CreateCheckoutMutationVariables,
    TContext
  >({
    mutationKey: ["CreateCheckout"],
    mutationFn: (variables?: CreateCheckoutMutationVariables) =>
      fetcher<CreateCheckoutMutation, CreateCheckoutMutationVariables>(
        CreateCheckoutDocument,
        variables
      )(),
    ...options,
  });
};

useCreateCheckoutMutation.fetcher = (
  variables: CreateCheckoutMutationVariables
) =>
  fetcher<CreateCheckoutMutation, CreateCheckoutMutationVariables>(
    CreateCheckoutDocument,
    variables
  );

export const CreateCreditCheckoutDocument = `
    mutation CreateCreditCheckout($packId: String!) {
  createCreditCheckout(packId: $packId) {
    url
    sessionId
  }
}
    `;

export const useCreateCreditCheckoutMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    CreateCreditCheckoutMutation,
    TError,
    CreateCreditCheckoutMutationVariables,
    TContext
  >
) => {
  return useMutation<
    CreateCreditCheckoutMutation,
    TError,
    CreateCreditCheckoutMutationVariables,
    TContext
  >({
    mutationKey: ["CreateCreditCheckout"],
    mutationFn: (variables?: CreateCreditCheckoutMutationVariables) =>
      fetcher<
        CreateCreditCheckoutMutation,
        CreateCreditCheckoutMutationVariables
      >(CreateCreditCheckoutDocument, variables)(),
    ...options,
  });
};

useCreateCreditCheckoutMutation.fetcher = (
  variables: CreateCreditCheckoutMutationVariables
) =>
  fetcher<CreateCreditCheckoutMutation, CreateCreditCheckoutMutationVariables>(
    CreateCreditCheckoutDocument,
    variables
  );

export const CreateCustomerPortalDocument = `
    mutation CreateCustomerPortal {
  createCustomerPortal {
    url
  }
}
    `;

export const useCreateCustomerPortalMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    CreateCustomerPortalMutation,
    TError,
    CreateCustomerPortalMutationVariables,
    TContext
  >
) => {
  return useMutation<
    CreateCustomerPortalMutation,
    TError,
    CreateCustomerPortalMutationVariables,
    TContext
  >({
    mutationKey: ["CreateCustomerPortal"],
    mutationFn: (variables?: CreateCustomerPortalMutationVariables) =>
      fetcher<
        CreateCustomerPortalMutation,
        CreateCustomerPortalMutationVariables
      >(CreateCustomerPortalDocument, variables)(),
    ...options,
  });
};

useCreateCustomerPortalMutation.fetcher = (
  variables?: CreateCustomerPortalMutationVariables
) =>
  fetcher<CreateCustomerPortalMutation, CreateCustomerPortalMutationVariables>(
    CreateCustomerPortalDocument,
    variables
  );

export const GetCreditBalanceDocument = `
    query GetCreditBalance {
  creditBalance {
    balance
    planId
    subscriptionStatus
    cancelAtPeriodEnd
    subscriptionEndDate
    currentPeriodEnd
  }
}
    `;

export const useGetCreditBalanceQuery = <
  TData = GetCreditBalanceQuery,
  TError = unknown,
>(
  variables?: GetCreditBalanceQueryVariables,
  options?: Omit<
    UseQueryOptions<GetCreditBalanceQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseQueryOptions<
      GetCreditBalanceQuery,
      TError,
      TData
    >["queryKey"];
  }
) => {
  return useQuery<GetCreditBalanceQuery, TError, TData>({
    queryKey:
      variables === undefined
        ? ["GetCreditBalance"]
        : ["GetCreditBalance", variables],
    queryFn: fetcher<GetCreditBalanceQuery, GetCreditBalanceQueryVariables>(
      GetCreditBalanceDocument,
      variables
    ),
    ...options,
  });
};

useGetCreditBalanceQuery.getKey = (
  variables?: GetCreditBalanceQueryVariables
) =>
  variables === undefined
    ? ["GetCreditBalance"]
    : ["GetCreditBalance", variables];

export const useInfiniteGetCreditBalanceQuery = <
  TData = InfiniteData<GetCreditBalanceQuery>,
  TError = unknown,
>(
  variables: GetCreditBalanceQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<GetCreditBalanceQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseInfiniteQueryOptions<
      GetCreditBalanceQuery,
      TError,
      TData
    >["queryKey"];
  }
) => {
  return useInfiniteQuery<GetCreditBalanceQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options;
      return {
        queryKey:
          (optionsQueryKey ?? variables === undefined)
            ? ["GetCreditBalance.infinite"]
            : ["GetCreditBalance.infinite", variables],
        queryFn: (metaData) =>
          fetcher<GetCreditBalanceQuery, GetCreditBalanceQueryVariables>(
            GetCreditBalanceDocument,
            { ...variables, ...(metaData.pageParam ?? {}) }
          )(),
        ...restOptions,
      };
    })()
  );
};

useInfiniteGetCreditBalanceQuery.getKey = (
  variables?: GetCreditBalanceQueryVariables
) =>
  variables === undefined
    ? ["GetCreditBalance.infinite"]
    : ["GetCreditBalance.infinite", variables];

useGetCreditBalanceQuery.fetcher = (
  variables?: GetCreditBalanceQueryVariables
) =>
  fetcher<GetCreditBalanceQuery, GetCreditBalanceQueryVariables>(
    GetCreditBalanceDocument,
    variables
  );

export const GetCreditHistoryDocument = `
    query GetCreditHistory($limit: Int) {
  creditHistory(limit: $limit) {
    id
    amount
    type
    description
    balanceAfter
    createdAt
    metadata
  }
}
    `;

export const useGetCreditHistoryQuery = <
  TData = GetCreditHistoryQuery,
  TError = unknown,
>(
  variables?: GetCreditHistoryQueryVariables,
  options?: Omit<
    UseQueryOptions<GetCreditHistoryQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseQueryOptions<
      GetCreditHistoryQuery,
      TError,
      TData
    >["queryKey"];
  }
) => {
  return useQuery<GetCreditHistoryQuery, TError, TData>({
    queryKey:
      variables === undefined
        ? ["GetCreditHistory"]
        : ["GetCreditHistory", variables],
    queryFn: fetcher<GetCreditHistoryQuery, GetCreditHistoryQueryVariables>(
      GetCreditHistoryDocument,
      variables
    ),
    ...options,
  });
};

useGetCreditHistoryQuery.getKey = (
  variables?: GetCreditHistoryQueryVariables
) =>
  variables === undefined
    ? ["GetCreditHistory"]
    : ["GetCreditHistory", variables];

export const useInfiniteGetCreditHistoryQuery = <
  TData = InfiniteData<GetCreditHistoryQuery>,
  TError = unknown,
>(
  variables: GetCreditHistoryQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<GetCreditHistoryQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseInfiniteQueryOptions<
      GetCreditHistoryQuery,
      TError,
      TData
    >["queryKey"];
  }
) => {
  return useInfiniteQuery<GetCreditHistoryQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options;
      return {
        queryKey:
          (optionsQueryKey ?? variables === undefined)
            ? ["GetCreditHistory.infinite"]
            : ["GetCreditHistory.infinite", variables],
        queryFn: (metaData) =>
          fetcher<GetCreditHistoryQuery, GetCreditHistoryQueryVariables>(
            GetCreditHistoryDocument,
            { ...variables, ...(metaData.pageParam ?? {}) }
          )(),
        ...restOptions,
      };
    })()
  );
};

useInfiniteGetCreditHistoryQuery.getKey = (
  variables?: GetCreditHistoryQueryVariables
) =>
  variables === undefined
    ? ["GetCreditHistory.infinite"]
    : ["GetCreditHistory.infinite", variables];

useGetCreditHistoryQuery.fetcher = (
  variables?: GetCreditHistoryQueryVariables
) =>
  fetcher<GetCreditHistoryQuery, GetCreditHistoryQueryVariables>(
    GetCreditHistoryDocument,
    variables
  );

export const GetBillingPlansDocument = `
    query GetBillingPlans {
  billingPlans {
    id
    name
    description
    priceMonthly
    priceYearly
    creditsPerMonth
    features
  }
}
    `;

export const useGetBillingPlansQuery = <
  TData = GetBillingPlansQuery,
  TError = unknown,
>(
  variables?: GetBillingPlansQueryVariables,
  options?: Omit<
    UseQueryOptions<GetBillingPlansQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseQueryOptions<GetBillingPlansQuery, TError, TData>["queryKey"];
  }
) => {
  return useQuery<GetBillingPlansQuery, TError, TData>({
    queryKey:
      variables === undefined
        ? ["GetBillingPlans"]
        : ["GetBillingPlans", variables],
    queryFn: fetcher<GetBillingPlansQuery, GetBillingPlansQueryVariables>(
      GetBillingPlansDocument,
      variables
    ),
    ...options,
  });
};

useGetBillingPlansQuery.getKey = (variables?: GetBillingPlansQueryVariables) =>
  variables === undefined
    ? ["GetBillingPlans"]
    : ["GetBillingPlans", variables];

export const useInfiniteGetBillingPlansQuery = <
  TData = InfiniteData<GetBillingPlansQuery>,
  TError = unknown,
>(
  variables: GetBillingPlansQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<GetBillingPlansQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseInfiniteQueryOptions<
      GetBillingPlansQuery,
      TError,
      TData
    >["queryKey"];
  }
) => {
  return useInfiniteQuery<GetBillingPlansQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options;
      return {
        queryKey:
          (optionsQueryKey ?? variables === undefined)
            ? ["GetBillingPlans.infinite"]
            : ["GetBillingPlans.infinite", variables],
        queryFn: (metaData) =>
          fetcher<GetBillingPlansQuery, GetBillingPlansQueryVariables>(
            GetBillingPlansDocument,
            { ...variables, ...(metaData.pageParam ?? {}) }
          )(),
        ...restOptions,
      };
    })()
  );
};

useInfiniteGetBillingPlansQuery.getKey = (
  variables?: GetBillingPlansQueryVariables
) =>
  variables === undefined
    ? ["GetBillingPlans.infinite"]
    : ["GetBillingPlans.infinite", variables];

useGetBillingPlansQuery.fetcher = (variables?: GetBillingPlansQueryVariables) =>
  fetcher<GetBillingPlansQuery, GetBillingPlansQueryVariables>(
    GetBillingPlansDocument,
    variables
  );

export const GetCreditPacksDocument = `
    query GetCreditPacks {
  creditPacks {
    id
    name
    credits
    price
  }
}
    `;

export const useGetCreditPacksQuery = <
  TData = GetCreditPacksQuery,
  TError = unknown,
>(
  variables?: GetCreditPacksQueryVariables,
  options?: Omit<
    UseQueryOptions<GetCreditPacksQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseQueryOptions<GetCreditPacksQuery, TError, TData>["queryKey"];
  }
) => {
  return useQuery<GetCreditPacksQuery, TError, TData>({
    queryKey:
      variables === undefined
        ? ["GetCreditPacks"]
        : ["GetCreditPacks", variables],
    queryFn: fetcher<GetCreditPacksQuery, GetCreditPacksQueryVariables>(
      GetCreditPacksDocument,
      variables
    ),
    ...options,
  });
};

useGetCreditPacksQuery.getKey = (variables?: GetCreditPacksQueryVariables) =>
  variables === undefined ? ["GetCreditPacks"] : ["GetCreditPacks", variables];

export const useInfiniteGetCreditPacksQuery = <
  TData = InfiniteData<GetCreditPacksQuery>,
  TError = unknown,
>(
  variables: GetCreditPacksQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<GetCreditPacksQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseInfiniteQueryOptions<
      GetCreditPacksQuery,
      TError,
      TData
    >["queryKey"];
  }
) => {
  return useInfiniteQuery<GetCreditPacksQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options;
      return {
        queryKey:
          (optionsQueryKey ?? variables === undefined)
            ? ["GetCreditPacks.infinite"]
            : ["GetCreditPacks.infinite", variables],
        queryFn: (metaData) =>
          fetcher<GetCreditPacksQuery, GetCreditPacksQueryVariables>(
            GetCreditPacksDocument,
            { ...variables, ...(metaData.pageParam ?? {}) }
          )(),
        ...restOptions,
      };
    })()
  );
};

useInfiniteGetCreditPacksQuery.getKey = (
  variables?: GetCreditPacksQueryVariables
) =>
  variables === undefined
    ? ["GetCreditPacks.infinite"]
    : ["GetCreditPacks.infinite", variables];

useGetCreditPacksQuery.fetcher = (variables?: GetCreditPacksQueryVariables) =>
  fetcher<GetCreditPacksQuery, GetCreditPacksQueryVariables>(
    GetCreditPacksDocument,
    variables
  );

export const GetLeaguesDocument = `
    query GetLeagues {
  leagues {
    id
    name
    country
    tier
    fbrefId
    fbrefPath
    createdAt
    updatedAt
  }
}
    `;

export const useGetLeaguesQuery = <TData = GetLeaguesQuery, TError = unknown>(
  variables?: GetLeaguesQueryVariables,
  options?: Omit<
    UseQueryOptions<GetLeaguesQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseQueryOptions<GetLeaguesQuery, TError, TData>["queryKey"];
  }
) => {
  return useQuery<GetLeaguesQuery, TError, TData>({
    queryKey:
      variables === undefined ? ["GetLeagues"] : ["GetLeagues", variables],
    queryFn: fetcher<GetLeaguesQuery, GetLeaguesQueryVariables>(
      GetLeaguesDocument,
      variables
    ),
    ...options,
  });
};

useGetLeaguesQuery.getKey = (variables?: GetLeaguesQueryVariables) =>
  variables === undefined ? ["GetLeagues"] : ["GetLeagues", variables];

export const useInfiniteGetLeaguesQuery = <
  TData = InfiniteData<GetLeaguesQuery>,
  TError = unknown,
>(
  variables: GetLeaguesQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<GetLeaguesQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseInfiniteQueryOptions<
      GetLeaguesQuery,
      TError,
      TData
    >["queryKey"];
  }
) => {
  return useInfiniteQuery<GetLeaguesQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options;
      return {
        queryKey:
          (optionsQueryKey ?? variables === undefined)
            ? ["GetLeagues.infinite"]
            : ["GetLeagues.infinite", variables],
        queryFn: (metaData) =>
          fetcher<GetLeaguesQuery, GetLeaguesQueryVariables>(
            GetLeaguesDocument,
            { ...variables, ...(metaData.pageParam ?? {}) }
          )(),
        ...restOptions,
      };
    })()
  );
};

useInfiniteGetLeaguesQuery.getKey = (variables?: GetLeaguesQueryVariables) =>
  variables === undefined
    ? ["GetLeagues.infinite"]
    : ["GetLeagues.infinite", variables];

useGetLeaguesQuery.fetcher = (variables?: GetLeaguesQueryVariables) =>
  fetcher<GetLeaguesQuery, GetLeaguesQueryVariables>(
    GetLeaguesDocument,
    variables
  );

export const GetLeagueDocument = `
    query GetLeague($id: String!) {
  league(id: $id) {
    id
    name
    country
    tier
    fbrefId
    fbrefPath
    createdAt
    updatedAt
  }
}
    `;

export const useGetLeagueQuery = <TData = GetLeagueQuery, TError = unknown>(
  variables: GetLeagueQueryVariables,
  options?: Omit<UseQueryOptions<GetLeagueQuery, TError, TData>, "queryKey"> & {
    queryKey?: UseQueryOptions<GetLeagueQuery, TError, TData>["queryKey"];
  }
) => {
  return useQuery<GetLeagueQuery, TError, TData>({
    queryKey: ["GetLeague", variables],
    queryFn: fetcher<GetLeagueQuery, GetLeagueQueryVariables>(
      GetLeagueDocument,
      variables
    ),
    ...options,
  });
};

useGetLeagueQuery.getKey = (variables: GetLeagueQueryVariables) => [
  "GetLeague",
  variables,
];

export const useInfiniteGetLeagueQuery = <
  TData = InfiniteData<GetLeagueQuery>,
  TError = unknown,
>(
  variables: GetLeagueQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<GetLeagueQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseInfiniteQueryOptions<
      GetLeagueQuery,
      TError,
      TData
    >["queryKey"];
  }
) => {
  return useInfiniteQuery<GetLeagueQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options;
      return {
        queryKey: optionsQueryKey ?? ["GetLeague.infinite", variables],
        queryFn: (metaData) =>
          fetcher<GetLeagueQuery, GetLeagueQueryVariables>(GetLeagueDocument, {
            ...variables,
            ...(metaData.pageParam ?? {}),
          })(),
        ...restOptions,
      };
    })()
  );
};

useInfiniteGetLeagueQuery.getKey = (variables: GetLeagueQueryVariables) => [
  "GetLeague.infinite",
  variables,
];

useGetLeagueQuery.fetcher = (variables: GetLeagueQueryVariables) =>
  fetcher<GetLeagueQuery, GetLeagueQueryVariables>(
    GetLeagueDocument,
    variables
  );

export const GetSeasonsDocument = `
    query GetSeasons($leagueId: String) {
  seasons(leagueId: $leagueId) {
    id
    leagueId
    name
    startDate
    endDate
    isCurrent
    fbrefPath
    league {
      id
      name
      country
      tier
    }
    createdAt
    updatedAt
  }
}
    `;

export const useGetSeasonsQuery = <TData = GetSeasonsQuery, TError = unknown>(
  variables?: GetSeasonsQueryVariables,
  options?: Omit<
    UseQueryOptions<GetSeasonsQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseQueryOptions<GetSeasonsQuery, TError, TData>["queryKey"];
  }
) => {
  return useQuery<GetSeasonsQuery, TError, TData>({
    queryKey:
      variables === undefined ? ["GetSeasons"] : ["GetSeasons", variables],
    queryFn: fetcher<GetSeasonsQuery, GetSeasonsQueryVariables>(
      GetSeasonsDocument,
      variables
    ),
    ...options,
  });
};

useGetSeasonsQuery.getKey = (variables?: GetSeasonsQueryVariables) =>
  variables === undefined ? ["GetSeasons"] : ["GetSeasons", variables];

export const useInfiniteGetSeasonsQuery = <
  TData = InfiniteData<GetSeasonsQuery>,
  TError = unknown,
>(
  variables: GetSeasonsQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<GetSeasonsQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseInfiniteQueryOptions<
      GetSeasonsQuery,
      TError,
      TData
    >["queryKey"];
  }
) => {
  return useInfiniteQuery<GetSeasonsQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options;
      return {
        queryKey:
          (optionsQueryKey ?? variables === undefined)
            ? ["GetSeasons.infinite"]
            : ["GetSeasons.infinite", variables],
        queryFn: (metaData) =>
          fetcher<GetSeasonsQuery, GetSeasonsQueryVariables>(
            GetSeasonsDocument,
            { ...variables, ...(metaData.pageParam ?? {}) }
          )(),
        ...restOptions,
      };
    })()
  );
};

useInfiniteGetSeasonsQuery.getKey = (variables?: GetSeasonsQueryVariables) =>
  variables === undefined
    ? ["GetSeasons.infinite"]
    : ["GetSeasons.infinite", variables];

useGetSeasonsQuery.fetcher = (variables?: GetSeasonsQueryVariables) =>
  fetcher<GetSeasonsQuery, GetSeasonsQueryVariables>(
    GetSeasonsDocument,
    variables
  );

export const GetCurrentSeasonDocument = `
    query GetCurrentSeason($leagueId: String!) {
  currentSeason(leagueId: $leagueId) {
    id
    leagueId
    name
    startDate
    endDate
    isCurrent
    fbrefPath
    league {
      id
      name
      country
      tier
    }
    createdAt
    updatedAt
  }
}
    `;

export const useGetCurrentSeasonQuery = <
  TData = GetCurrentSeasonQuery,
  TError = unknown,
>(
  variables: GetCurrentSeasonQueryVariables,
  options?: Omit<
    UseQueryOptions<GetCurrentSeasonQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseQueryOptions<
      GetCurrentSeasonQuery,
      TError,
      TData
    >["queryKey"];
  }
) => {
  return useQuery<GetCurrentSeasonQuery, TError, TData>({
    queryKey: ["GetCurrentSeason", variables],
    queryFn: fetcher<GetCurrentSeasonQuery, GetCurrentSeasonQueryVariables>(
      GetCurrentSeasonDocument,
      variables
    ),
    ...options,
  });
};

useGetCurrentSeasonQuery.getKey = (
  variables: GetCurrentSeasonQueryVariables
) => ["GetCurrentSeason", variables];

export const useInfiniteGetCurrentSeasonQuery = <
  TData = InfiniteData<GetCurrentSeasonQuery>,
  TError = unknown,
>(
  variables: GetCurrentSeasonQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<GetCurrentSeasonQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseInfiniteQueryOptions<
      GetCurrentSeasonQuery,
      TError,
      TData
    >["queryKey"];
  }
) => {
  return useInfiniteQuery<GetCurrentSeasonQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options;
      return {
        queryKey: optionsQueryKey ?? ["GetCurrentSeason.infinite", variables],
        queryFn: (metaData) =>
          fetcher<GetCurrentSeasonQuery, GetCurrentSeasonQueryVariables>(
            GetCurrentSeasonDocument,
            { ...variables, ...(metaData.pageParam ?? {}) }
          )(),
        ...restOptions,
      };
    })()
  );
};

useInfiniteGetCurrentSeasonQuery.getKey = (
  variables: GetCurrentSeasonQueryVariables
) => ["GetCurrentSeason.infinite", variables];

useGetCurrentSeasonQuery.fetcher = (
  variables: GetCurrentSeasonQueryVariables
) =>
  fetcher<GetCurrentSeasonQuery, GetCurrentSeasonQueryVariables>(
    GetCurrentSeasonDocument,
    variables
  );

export const GetSeasonDocument = `
    query GetSeason($id: String!) {
  season(id: $id) {
    id
    leagueId
    name
    startDate
    endDate
    isCurrent
    fbrefPath
    league {
      id
      name
      country
      tier
    }
    createdAt
    updatedAt
  }
}
    `;

export const useGetSeasonQuery = <TData = GetSeasonQuery, TError = unknown>(
  variables: GetSeasonQueryVariables,
  options?: Omit<UseQueryOptions<GetSeasonQuery, TError, TData>, "queryKey"> & {
    queryKey?: UseQueryOptions<GetSeasonQuery, TError, TData>["queryKey"];
  }
) => {
  return useQuery<GetSeasonQuery, TError, TData>({
    queryKey: ["GetSeason", variables],
    queryFn: fetcher<GetSeasonQuery, GetSeasonQueryVariables>(
      GetSeasonDocument,
      variables
    ),
    ...options,
  });
};

useGetSeasonQuery.getKey = (variables: GetSeasonQueryVariables) => [
  "GetSeason",
  variables,
];

export const useInfiniteGetSeasonQuery = <
  TData = InfiniteData<GetSeasonQuery>,
  TError = unknown,
>(
  variables: GetSeasonQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<GetSeasonQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseInfiniteQueryOptions<
      GetSeasonQuery,
      TError,
      TData
    >["queryKey"];
  }
) => {
  return useInfiniteQuery<GetSeasonQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options;
      return {
        queryKey: optionsQueryKey ?? ["GetSeason.infinite", variables],
        queryFn: (metaData) =>
          fetcher<GetSeasonQuery, GetSeasonQueryVariables>(GetSeasonDocument, {
            ...variables,
            ...(metaData.pageParam ?? {}),
          })(),
        ...restOptions,
      };
    })()
  );
};

useInfiniteGetSeasonQuery.getKey = (variables: GetSeasonQueryVariables) => [
  "GetSeason.infinite",
  variables,
];

useGetSeasonQuery.fetcher = (variables: GetSeasonQueryVariables) =>
  fetcher<GetSeasonQuery, GetSeasonQueryVariables>(
    GetSeasonDocument,
    variables
  );

export const GetTeamsDocument = `
    query GetTeams {
  teams {
    id
    name
    shortName
    logo
    stadium
    fbrefId
    fbrefPath
    understatId
    createdAt
    updatedAt
  }
}
    `;

export const useGetTeamsQuery = <TData = GetTeamsQuery, TError = unknown>(
  variables?: GetTeamsQueryVariables,
  options?: Omit<UseQueryOptions<GetTeamsQuery, TError, TData>, "queryKey"> & {
    queryKey?: UseQueryOptions<GetTeamsQuery, TError, TData>["queryKey"];
  }
) => {
  return useQuery<GetTeamsQuery, TError, TData>({
    queryKey: variables === undefined ? ["GetTeams"] : ["GetTeams", variables],
    queryFn: fetcher<GetTeamsQuery, GetTeamsQueryVariables>(
      GetTeamsDocument,
      variables
    ),
    ...options,
  });
};

useGetTeamsQuery.getKey = (variables?: GetTeamsQueryVariables) =>
  variables === undefined ? ["GetTeams"] : ["GetTeams", variables];

export const useInfiniteGetTeamsQuery = <
  TData = InfiniteData<GetTeamsQuery>,
  TError = unknown,
>(
  variables: GetTeamsQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<GetTeamsQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseInfiniteQueryOptions<
      GetTeamsQuery,
      TError,
      TData
    >["queryKey"];
  }
) => {
  return useInfiniteQuery<GetTeamsQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options;
      return {
        queryKey:
          (optionsQueryKey ?? variables === undefined)
            ? ["GetTeams.infinite"]
            : ["GetTeams.infinite", variables],
        queryFn: (metaData) =>
          fetcher<GetTeamsQuery, GetTeamsQueryVariables>(GetTeamsDocument, {
            ...variables,
            ...(metaData.pageParam ?? {}),
          })(),
        ...restOptions,
      };
    })()
  );
};

useInfiniteGetTeamsQuery.getKey = (variables?: GetTeamsQueryVariables) =>
  variables === undefined
    ? ["GetTeams.infinite"]
    : ["GetTeams.infinite", variables];

useGetTeamsQuery.fetcher = (variables?: GetTeamsQueryVariables) =>
  fetcher<GetTeamsQuery, GetTeamsQueryVariables>(GetTeamsDocument, variables);

export const GetTeamDocument = `
    query GetTeam($id: String!) {
  team(id: $id) {
    id
    name
    shortName
    logo
    stadium
    fbrefId
    fbrefPath
    understatId
    createdAt
    updatedAt
  }
}
    `;

export const useGetTeamQuery = <TData = GetTeamQuery, TError = unknown>(
  variables: GetTeamQueryVariables,
  options?: Omit<UseQueryOptions<GetTeamQuery, TError, TData>, "queryKey"> & {
    queryKey?: UseQueryOptions<GetTeamQuery, TError, TData>["queryKey"];
  }
) => {
  return useQuery<GetTeamQuery, TError, TData>({
    queryKey: ["GetTeam", variables],
    queryFn: fetcher<GetTeamQuery, GetTeamQueryVariables>(
      GetTeamDocument,
      variables
    ),
    ...options,
  });
};

useGetTeamQuery.getKey = (variables: GetTeamQueryVariables) => [
  "GetTeam",
  variables,
];

export const useInfiniteGetTeamQuery = <
  TData = InfiniteData<GetTeamQuery>,
  TError = unknown,
>(
  variables: GetTeamQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<GetTeamQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseInfiniteQueryOptions<GetTeamQuery, TError, TData>["queryKey"];
  }
) => {
  return useInfiniteQuery<GetTeamQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options;
      return {
        queryKey: optionsQueryKey ?? ["GetTeam.infinite", variables],
        queryFn: (metaData) =>
          fetcher<GetTeamQuery, GetTeamQueryVariables>(GetTeamDocument, {
            ...variables,
            ...(metaData.pageParam ?? {}),
          })(),
        ...restOptions,
      };
    })()
  );
};

useInfiniteGetTeamQuery.getKey = (variables: GetTeamQueryVariables) => [
  "GetTeam.infinite",
  variables,
];

useGetTeamQuery.fetcher = (variables: GetTeamQueryVariables) =>
  fetcher<GetTeamQuery, GetTeamQueryVariables>(GetTeamDocument, variables);

export const GetMatchesDocument = `
    query GetMatches($seasonId: String, $teamId: String, $status: String, $limit: Int) {
  matches(seasonId: $seasonId, teamId: $teamId, status: $status, limit: $limit) {
    id
    date
    status
    round
    venue
    homeTeam {
      id
      name
      shortName
      logo
    }
    awayTeam {
      id
      name
      shortName
      logo
    }
    season {
      id
      name
      league {
        id
        name
        country
      }
    }
    homeGoals
    awayGoals
    homeHalfTimeGoals
    awayHalfTimeGoals
    homeXg
    awayXg
    homeShots
    awayShots
    homeShotsOnTarget
    awayShotsOnTarget
    homePossession
    awayPossession
    dataSource
    fbrefMatchId
    createdAt
    updatedAt
  }
}
    `;

export const useGetMatchesQuery = <TData = GetMatchesQuery, TError = unknown>(
  variables?: GetMatchesQueryVariables,
  options?: Omit<
    UseQueryOptions<GetMatchesQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseQueryOptions<GetMatchesQuery, TError, TData>["queryKey"];
  }
) => {
  return useQuery<GetMatchesQuery, TError, TData>({
    queryKey:
      variables === undefined ? ["GetMatches"] : ["GetMatches", variables],
    queryFn: fetcher<GetMatchesQuery, GetMatchesQueryVariables>(
      GetMatchesDocument,
      variables
    ),
    ...options,
  });
};

useGetMatchesQuery.getKey = (variables?: GetMatchesQueryVariables) =>
  variables === undefined ? ["GetMatches"] : ["GetMatches", variables];

export const useInfiniteGetMatchesQuery = <
  TData = InfiniteData<GetMatchesQuery>,
  TError = unknown,
>(
  variables: GetMatchesQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<GetMatchesQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseInfiniteQueryOptions<
      GetMatchesQuery,
      TError,
      TData
    >["queryKey"];
  }
) => {
  return useInfiniteQuery<GetMatchesQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options;
      return {
        queryKey:
          (optionsQueryKey ?? variables === undefined)
            ? ["GetMatches.infinite"]
            : ["GetMatches.infinite", variables],
        queryFn: (metaData) =>
          fetcher<GetMatchesQuery, GetMatchesQueryVariables>(
            GetMatchesDocument,
            { ...variables, ...(metaData.pageParam ?? {}) }
          )(),
        ...restOptions,
      };
    })()
  );
};

useInfiniteGetMatchesQuery.getKey = (variables?: GetMatchesQueryVariables) =>
  variables === undefined
    ? ["GetMatches.infinite"]
    : ["GetMatches.infinite", variables];

useGetMatchesQuery.fetcher = (variables?: GetMatchesQueryVariables) =>
  fetcher<GetMatchesQuery, GetMatchesQueryVariables>(
    GetMatchesDocument,
    variables
  );

export const GetMatchDocument = `
    query GetMatch($id: String!) {
  match(id: $id) {
    id
    date
    status
    round
    venue
    homeTeam {
      id
      name
      shortName
      logo
      stadium
    }
    awayTeam {
      id
      name
      shortName
      logo
      stadium
    }
    season {
      id
      name
      league {
        id
        name
        country
      }
    }
    homeGoals
    awayGoals
    homeHalfTimeGoals
    awayHalfTimeGoals
    homeXg
    awayXg
    homeShots
    awayShots
    homeShotsOnTarget
    awayShotsOnTarget
    homePossession
    awayPossession
    homePassesCompleted
    awayPassesCompleted
    homePassesAttempted
    awayPassesAttempted
    homeTackles
    awayTackles
    homeInterceptions
    awayInterceptions
    homeClearances
    awayClearances
    homeCorners
    awayCorners
    homeCrosses
    awayCrosses
    homeFouls
    awayFouls
    homeYellowCards
    awayYellowCards
    homeRedCards
    awayRedCards
    homeOffsides
    awayOffsides
    homeAerialsWon
    awayAerialsWon
    dataSource
    fbrefMatchId
    createdAt
    updatedAt
  }
}
    `;

export const useGetMatchQuery = <TData = GetMatchQuery, TError = unknown>(
  variables: GetMatchQueryVariables,
  options?: Omit<UseQueryOptions<GetMatchQuery, TError, TData>, "queryKey"> & {
    queryKey?: UseQueryOptions<GetMatchQuery, TError, TData>["queryKey"];
  }
) => {
  return useQuery<GetMatchQuery, TError, TData>({
    queryKey: ["GetMatch", variables],
    queryFn: fetcher<GetMatchQuery, GetMatchQueryVariables>(
      GetMatchDocument,
      variables
    ),
    ...options,
  });
};

useGetMatchQuery.getKey = (variables: GetMatchQueryVariables) => [
  "GetMatch",
  variables,
];

export const useInfiniteGetMatchQuery = <
  TData = InfiniteData<GetMatchQuery>,
  TError = unknown,
>(
  variables: GetMatchQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<GetMatchQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseInfiniteQueryOptions<
      GetMatchQuery,
      TError,
      TData
    >["queryKey"];
  }
) => {
  return useInfiniteQuery<GetMatchQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options;
      return {
        queryKey: optionsQueryKey ?? ["GetMatch.infinite", variables],
        queryFn: (metaData) =>
          fetcher<GetMatchQuery, GetMatchQueryVariables>(GetMatchDocument, {
            ...variables,
            ...(metaData.pageParam ?? {}),
          })(),
        ...restOptions,
      };
    })()
  );
};

useInfiniteGetMatchQuery.getKey = (variables: GetMatchQueryVariables) => [
  "GetMatch.infinite",
  variables,
];

useGetMatchQuery.fetcher = (variables: GetMatchQueryVariables) =>
  fetcher<GetMatchQuery, GetMatchQueryVariables>(GetMatchDocument, variables);

export const GetTeamStatsDocument = `
    query GetTeamStats($teamId: String!, $seasonId: String) {
  teamStats(teamId: $teamId, seasonId: $seasonId) {
    teamId
    seasonId
    played
    wins
    draws
    losses
    goalsFor
    goalsAgainst
    xgFor
    xgAgainst
    cleanSheets
    failedToScore
    bttsMatches
    avgGoalsFor
    avgGoalsAgainst
    avgXgFor
    avgXgAgainst
  }
}
    `;

export const useGetTeamStatsQuery = <
  TData = GetTeamStatsQuery,
  TError = unknown,
>(
  variables: GetTeamStatsQueryVariables,
  options?: Omit<
    UseQueryOptions<GetTeamStatsQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseQueryOptions<GetTeamStatsQuery, TError, TData>["queryKey"];
  }
) => {
  return useQuery<GetTeamStatsQuery, TError, TData>({
    queryKey: ["GetTeamStats", variables],
    queryFn: fetcher<GetTeamStatsQuery, GetTeamStatsQueryVariables>(
      GetTeamStatsDocument,
      variables
    ),
    ...options,
  });
};

useGetTeamStatsQuery.getKey = (variables: GetTeamStatsQueryVariables) => [
  "GetTeamStats",
  variables,
];

export const useInfiniteGetTeamStatsQuery = <
  TData = InfiniteData<GetTeamStatsQuery>,
  TError = unknown,
>(
  variables: GetTeamStatsQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<GetTeamStatsQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseInfiniteQueryOptions<
      GetTeamStatsQuery,
      TError,
      TData
    >["queryKey"];
  }
) => {
  return useInfiniteQuery<GetTeamStatsQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options;
      return {
        queryKey: optionsQueryKey ?? ["GetTeamStats.infinite", variables],
        queryFn: (metaData) =>
          fetcher<GetTeamStatsQuery, GetTeamStatsQueryVariables>(
            GetTeamStatsDocument,
            { ...variables, ...(metaData.pageParam ?? {}) }
          )(),
        ...restOptions,
      };
    })()
  );
};

useInfiniteGetTeamStatsQuery.getKey = (
  variables: GetTeamStatsQueryVariables
) => ["GetTeamStats.infinite", variables];

useGetTeamStatsQuery.fetcher = (variables: GetTeamStatsQueryVariables) =>
  fetcher<GetTeamStatsQuery, GetTeamStatsQueryVariables>(
    GetTeamStatsDocument,
    variables
  );

export const GetRecentFormDocument = `
    query GetRecentForm($teamId: String!, $numMatches: Int) {
  recentForm(teamId: $teamId, numMatches: $numMatches) {
    teamId
    matches
    form
    points
    goalsScored
    goalsConceded
    xgFor
    xgAgainst
    cleanSheets
    failedToScore
    bttsRate
    over15Rate
    over25Rate
    over35Rate
  }
}
    `;

export const useGetRecentFormQuery = <
  TData = GetRecentFormQuery,
  TError = unknown,
>(
  variables: GetRecentFormQueryVariables,
  options?: Omit<
    UseQueryOptions<GetRecentFormQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseQueryOptions<GetRecentFormQuery, TError, TData>["queryKey"];
  }
) => {
  return useQuery<GetRecentFormQuery, TError, TData>({
    queryKey: ["GetRecentForm", variables],
    queryFn: fetcher<GetRecentFormQuery, GetRecentFormQueryVariables>(
      GetRecentFormDocument,
      variables
    ),
    ...options,
  });
};

useGetRecentFormQuery.getKey = (variables: GetRecentFormQueryVariables) => [
  "GetRecentForm",
  variables,
];

export const useInfiniteGetRecentFormQuery = <
  TData = InfiniteData<GetRecentFormQuery>,
  TError = unknown,
>(
  variables: GetRecentFormQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<GetRecentFormQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseInfiniteQueryOptions<
      GetRecentFormQuery,
      TError,
      TData
    >["queryKey"];
  }
) => {
  return useInfiniteQuery<GetRecentFormQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options;
      return {
        queryKey: optionsQueryKey ?? ["GetRecentForm.infinite", variables],
        queryFn: (metaData) =>
          fetcher<GetRecentFormQuery, GetRecentFormQueryVariables>(
            GetRecentFormDocument,
            { ...variables, ...(metaData.pageParam ?? {}) }
          )(),
        ...restOptions,
      };
    })()
  );
};

useInfiniteGetRecentFormQuery.getKey = (
  variables: GetRecentFormQueryVariables
) => ["GetRecentForm.infinite", variables];

useGetRecentFormQuery.fetcher = (variables: GetRecentFormQueryVariables) =>
  fetcher<GetRecentFormQuery, GetRecentFormQueryVariables>(
    GetRecentFormDocument,
    variables
  );

export const MarkNotificationReadDocument = `
    mutation MarkNotificationRead($notificationId: String!) {
  markNotificationRead(notificationId: $notificationId) {
    id
    read
    readAt
  }
}
    `;

export const useMarkNotificationReadMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    MarkNotificationReadMutation,
    TError,
    MarkNotificationReadMutationVariables,
    TContext
  >
) => {
  return useMutation<
    MarkNotificationReadMutation,
    TError,
    MarkNotificationReadMutationVariables,
    TContext
  >({
    mutationKey: ["MarkNotificationRead"],
    mutationFn: (variables?: MarkNotificationReadMutationVariables) =>
      fetcher<
        MarkNotificationReadMutation,
        MarkNotificationReadMutationVariables
      >(MarkNotificationReadDocument, variables)(),
    ...options,
  });
};

useMarkNotificationReadMutation.fetcher = (
  variables: MarkNotificationReadMutationVariables
) =>
  fetcher<MarkNotificationReadMutation, MarkNotificationReadMutationVariables>(
    MarkNotificationReadDocument,
    variables
  );

export const MarkAllNotificationsReadDocument = `
    mutation MarkAllNotificationsRead {
  markAllNotificationsRead
}
    `;

export const useMarkAllNotificationsReadMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    MarkAllNotificationsReadMutation,
    TError,
    MarkAllNotificationsReadMutationVariables,
    TContext
  >
) => {
  return useMutation<
    MarkAllNotificationsReadMutation,
    TError,
    MarkAllNotificationsReadMutationVariables,
    TContext
  >({
    mutationKey: ["MarkAllNotificationsRead"],
    mutationFn: (variables?: MarkAllNotificationsReadMutationVariables) =>
      fetcher<
        MarkAllNotificationsReadMutation,
        MarkAllNotificationsReadMutationVariables
      >(MarkAllNotificationsReadDocument, variables)(),
    ...options,
  });
};

useMarkAllNotificationsReadMutation.fetcher = (
  variables?: MarkAllNotificationsReadMutationVariables
) =>
  fetcher<
    MarkAllNotificationsReadMutation,
    MarkAllNotificationsReadMutationVariables
  >(MarkAllNotificationsReadDocument, variables);

export const GetNotificationsDocument = `
    query GetNotifications($limit: Int) {
  notifications(limit: $limit) {
    id
    title
    message
    type
    link
    read
    createdAt
    readAt
  }
}
    `;

export const useGetNotificationsQuery = <
  TData = GetNotificationsQuery,
  TError = unknown,
>(
  variables?: GetNotificationsQueryVariables,
  options?: Omit<
    UseQueryOptions<GetNotificationsQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseQueryOptions<
      GetNotificationsQuery,
      TError,
      TData
    >["queryKey"];
  }
) => {
  return useQuery<GetNotificationsQuery, TError, TData>({
    queryKey:
      variables === undefined
        ? ["GetNotifications"]
        : ["GetNotifications", variables],
    queryFn: fetcher<GetNotificationsQuery, GetNotificationsQueryVariables>(
      GetNotificationsDocument,
      variables
    ),
    ...options,
  });
};

useGetNotificationsQuery.getKey = (
  variables?: GetNotificationsQueryVariables
) =>
  variables === undefined
    ? ["GetNotifications"]
    : ["GetNotifications", variables];

export const useInfiniteGetNotificationsQuery = <
  TData = InfiniteData<GetNotificationsQuery>,
  TError = unknown,
>(
  variables: GetNotificationsQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<GetNotificationsQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseInfiniteQueryOptions<
      GetNotificationsQuery,
      TError,
      TData
    >["queryKey"];
  }
) => {
  return useInfiniteQuery<GetNotificationsQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options;
      return {
        queryKey:
          (optionsQueryKey ?? variables === undefined)
            ? ["GetNotifications.infinite"]
            : ["GetNotifications.infinite", variables],
        queryFn: (metaData) =>
          fetcher<GetNotificationsQuery, GetNotificationsQueryVariables>(
            GetNotificationsDocument,
            { ...variables, ...(metaData.pageParam ?? {}) }
          )(),
        ...restOptions,
      };
    })()
  );
};

useInfiniteGetNotificationsQuery.getKey = (
  variables?: GetNotificationsQueryVariables
) =>
  variables === undefined
    ? ["GetNotifications.infinite"]
    : ["GetNotifications.infinite", variables];

useGetNotificationsQuery.fetcher = (
  variables?: GetNotificationsQueryVariables
) =>
  fetcher<GetNotificationsQuery, GetNotificationsQueryVariables>(
    GetNotificationsDocument,
    variables
  );

export const GetUnreadNotificationCountDocument = `
    query GetUnreadNotificationCount {
  unreadNotificationCount {
    count
  }
}
    `;

export const useGetUnreadNotificationCountQuery = <
  TData = GetUnreadNotificationCountQuery,
  TError = unknown,
>(
  variables?: GetUnreadNotificationCountQueryVariables,
  options?: Omit<
    UseQueryOptions<GetUnreadNotificationCountQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseQueryOptions<
      GetUnreadNotificationCountQuery,
      TError,
      TData
    >["queryKey"];
  }
) => {
  return useQuery<GetUnreadNotificationCountQuery, TError, TData>({
    queryKey:
      variables === undefined
        ? ["GetUnreadNotificationCount"]
        : ["GetUnreadNotificationCount", variables],
    queryFn: fetcher<
      GetUnreadNotificationCountQuery,
      GetUnreadNotificationCountQueryVariables
    >(GetUnreadNotificationCountDocument, variables),
    ...options,
  });
};

useGetUnreadNotificationCountQuery.getKey = (
  variables?: GetUnreadNotificationCountQueryVariables
) =>
  variables === undefined
    ? ["GetUnreadNotificationCount"]
    : ["GetUnreadNotificationCount", variables];

export const useInfiniteGetUnreadNotificationCountQuery = <
  TData = InfiniteData<GetUnreadNotificationCountQuery>,
  TError = unknown,
>(
  variables: GetUnreadNotificationCountQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<GetUnreadNotificationCountQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseInfiniteQueryOptions<
      GetUnreadNotificationCountQuery,
      TError,
      TData
    >["queryKey"];
  }
) => {
  return useInfiniteQuery<GetUnreadNotificationCountQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options;
      return {
        queryKey:
          (optionsQueryKey ?? variables === undefined)
            ? ["GetUnreadNotificationCount.infinite"]
            : ["GetUnreadNotificationCount.infinite", variables],
        queryFn: (metaData) =>
          fetcher<
            GetUnreadNotificationCountQuery,
            GetUnreadNotificationCountQueryVariables
          >(GetUnreadNotificationCountDocument, {
            ...variables,
            ...(metaData.pageParam ?? {}),
          })(),
        ...restOptions,
      };
    })()
  );
};

useInfiniteGetUnreadNotificationCountQuery.getKey = (
  variables?: GetUnreadNotificationCountQueryVariables
) =>
  variables === undefined
    ? ["GetUnreadNotificationCount.infinite"]
    : ["GetUnreadNotificationCount.infinite", variables];

useGetUnreadNotificationCountQuery.fetcher = (
  variables?: GetUnreadNotificationCountQueryVariables
) =>
  fetcher<
    GetUnreadNotificationCountQuery,
    GetUnreadNotificationCountQueryVariables
  >(GetUnreadNotificationCountDocument, variables);

export const GetUserOrganizationsDocument = `
    query GetUserOrganizations {
  userOrganizations {
    id
    name
    slug
    role
    logo
  }
}
    `;

export const useGetUserOrganizationsQuery = <
  TData = GetUserOrganizationsQuery,
  TError = unknown,
>(
  variables?: GetUserOrganizationsQueryVariables,
  options?: Omit<
    UseQueryOptions<GetUserOrganizationsQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseQueryOptions<
      GetUserOrganizationsQuery,
      TError,
      TData
    >["queryKey"];
  }
) => {
  return useQuery<GetUserOrganizationsQuery, TError, TData>({
    queryKey:
      variables === undefined
        ? ["GetUserOrganizations"]
        : ["GetUserOrganizations", variables],
    queryFn: fetcher<
      GetUserOrganizationsQuery,
      GetUserOrganizationsQueryVariables
    >(GetUserOrganizationsDocument, variables),
    ...options,
  });
};

useGetUserOrganizationsQuery.getKey = (
  variables?: GetUserOrganizationsQueryVariables
) =>
  variables === undefined
    ? ["GetUserOrganizations"]
    : ["GetUserOrganizations", variables];

export const useInfiniteGetUserOrganizationsQuery = <
  TData = InfiniteData<GetUserOrganizationsQuery>,
  TError = unknown,
>(
  variables: GetUserOrganizationsQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<GetUserOrganizationsQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseInfiniteQueryOptions<
      GetUserOrganizationsQuery,
      TError,
      TData
    >["queryKey"];
  }
) => {
  return useInfiniteQuery<GetUserOrganizationsQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options;
      return {
        queryKey:
          (optionsQueryKey ?? variables === undefined)
            ? ["GetUserOrganizations.infinite"]
            : ["GetUserOrganizations.infinite", variables],
        queryFn: (metaData) =>
          fetcher<
            GetUserOrganizationsQuery,
            GetUserOrganizationsQueryVariables
          >(GetUserOrganizationsDocument, {
            ...variables,
            ...(metaData.pageParam ?? {}),
          })(),
        ...restOptions,
      };
    })()
  );
};

useInfiniteGetUserOrganizationsQuery.getKey = (
  variables?: GetUserOrganizationsQueryVariables
) =>
  variables === undefined
    ? ["GetUserOrganizations.infinite"]
    : ["GetUserOrganizations.infinite", variables];

useGetUserOrganizationsQuery.fetcher = (
  variables?: GetUserOrganizationsQueryVariables
) =>
  fetcher<GetUserOrganizationsQuery, GetUserOrganizationsQueryVariables>(
    GetUserOrganizationsDocument,
    variables
  );

export const CreateProjectDocument = `
    mutation CreateProject($input: CreateProjectInput!) {
  createProject(input: $input) {
    id
    name
    description
    organizationId
    createdAt
    updatedAt
  }
}
    `;

export const useCreateProjectMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    CreateProjectMutation,
    TError,
    CreateProjectMutationVariables,
    TContext
  >
) => {
  return useMutation<
    CreateProjectMutation,
    TError,
    CreateProjectMutationVariables,
    TContext
  >({
    mutationKey: ["CreateProject"],
    mutationFn: (variables?: CreateProjectMutationVariables) =>
      fetcher<CreateProjectMutation, CreateProjectMutationVariables>(
        CreateProjectDocument,
        variables
      )(),
    ...options,
  });
};

useCreateProjectMutation.fetcher = (
  variables: CreateProjectMutationVariables
) =>
  fetcher<CreateProjectMutation, CreateProjectMutationVariables>(
    CreateProjectDocument,
    variables
  );

export const UpdateProjectDocument = `
    mutation UpdateProject($id: String!, $input: UpdateProjectInput!) {
  updateProject(id: $id, input: $input) {
    id
    name
    description
    organizationId
    createdAt
    updatedAt
  }
}
    `;

export const useUpdateProjectMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    UpdateProjectMutation,
    TError,
    UpdateProjectMutationVariables,
    TContext
  >
) => {
  return useMutation<
    UpdateProjectMutation,
    TError,
    UpdateProjectMutationVariables,
    TContext
  >({
    mutationKey: ["UpdateProject"],
    mutationFn: (variables?: UpdateProjectMutationVariables) =>
      fetcher<UpdateProjectMutation, UpdateProjectMutationVariables>(
        UpdateProjectDocument,
        variables
      )(),
    ...options,
  });
};

useUpdateProjectMutation.fetcher = (
  variables: UpdateProjectMutationVariables
) =>
  fetcher<UpdateProjectMutation, UpdateProjectMutationVariables>(
    UpdateProjectDocument,
    variables
  );

export const DeleteProjectDocument = `
    mutation DeleteProject($id: String!) {
  deleteProject(id: $id)
}
    `;

export const useDeleteProjectMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    DeleteProjectMutation,
    TError,
    DeleteProjectMutationVariables,
    TContext
  >
) => {
  return useMutation<
    DeleteProjectMutation,
    TError,
    DeleteProjectMutationVariables,
    TContext
  >({
    mutationKey: ["DeleteProject"],
    mutationFn: (variables?: DeleteProjectMutationVariables) =>
      fetcher<DeleteProjectMutation, DeleteProjectMutationVariables>(
        DeleteProjectDocument,
        variables
      )(),
    ...options,
  });
};

useDeleteProjectMutation.fetcher = (
  variables: DeleteProjectMutationVariables
) =>
  fetcher<DeleteProjectMutation, DeleteProjectMutationVariables>(
    DeleteProjectDocument,
    variables
  );

export const GetProjectsDocument = `
    query GetProjects {
  projects {
    id
    name
    description
    organizationId
    createdAt
    updatedAt
  }
}
    `;

export const useGetProjectsQuery = <TData = GetProjectsQuery, TError = unknown>(
  variables?: GetProjectsQueryVariables,
  options?: Omit<
    UseQueryOptions<GetProjectsQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseQueryOptions<GetProjectsQuery, TError, TData>["queryKey"];
  }
) => {
  return useQuery<GetProjectsQuery, TError, TData>({
    queryKey:
      variables === undefined ? ["GetProjects"] : ["GetProjects", variables],
    queryFn: fetcher<GetProjectsQuery, GetProjectsQueryVariables>(
      GetProjectsDocument,
      variables
    ),
    ...options,
  });
};

useGetProjectsQuery.getKey = (variables?: GetProjectsQueryVariables) =>
  variables === undefined ? ["GetProjects"] : ["GetProjects", variables];

export const useInfiniteGetProjectsQuery = <
  TData = InfiniteData<GetProjectsQuery>,
  TError = unknown,
>(
  variables: GetProjectsQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<GetProjectsQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseInfiniteQueryOptions<
      GetProjectsQuery,
      TError,
      TData
    >["queryKey"];
  }
) => {
  return useInfiniteQuery<GetProjectsQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options;
      return {
        queryKey:
          (optionsQueryKey ?? variables === undefined)
            ? ["GetProjects.infinite"]
            : ["GetProjects.infinite", variables],
        queryFn: (metaData) =>
          fetcher<GetProjectsQuery, GetProjectsQueryVariables>(
            GetProjectsDocument,
            { ...variables, ...(metaData.pageParam ?? {}) }
          )(),
        ...restOptions,
      };
    })()
  );
};

useInfiniteGetProjectsQuery.getKey = (variables?: GetProjectsQueryVariables) =>
  variables === undefined
    ? ["GetProjects.infinite"]
    : ["GetProjects.infinite", variables];

useGetProjectsQuery.fetcher = (variables?: GetProjectsQueryVariables) =>
  fetcher<GetProjectsQuery, GetProjectsQueryVariables>(
    GetProjectsDocument,
    variables
  );

export const GetProjectDocument = `
    query GetProject($id: String!) {
  project(id: $id) {
    id
    name
    description
    organizationId
    createdAt
    updatedAt
  }
}
    `;

export const useGetProjectQuery = <TData = GetProjectQuery, TError = unknown>(
  variables: GetProjectQueryVariables,
  options?: Omit<
    UseQueryOptions<GetProjectQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseQueryOptions<GetProjectQuery, TError, TData>["queryKey"];
  }
) => {
  return useQuery<GetProjectQuery, TError, TData>({
    queryKey: ["GetProject", variables],
    queryFn: fetcher<GetProjectQuery, GetProjectQueryVariables>(
      GetProjectDocument,
      variables
    ),
    ...options,
  });
};

useGetProjectQuery.getKey = (variables: GetProjectQueryVariables) => [
  "GetProject",
  variables,
];

export const useInfiniteGetProjectQuery = <
  TData = InfiniteData<GetProjectQuery>,
  TError = unknown,
>(
  variables: GetProjectQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<GetProjectQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseInfiniteQueryOptions<
      GetProjectQuery,
      TError,
      TData
    >["queryKey"];
  }
) => {
  return useInfiniteQuery<GetProjectQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options;
      return {
        queryKey: optionsQueryKey ?? ["GetProject.infinite", variables],
        queryFn: (metaData) =>
          fetcher<GetProjectQuery, GetProjectQueryVariables>(
            GetProjectDocument,
            { ...variables, ...(metaData.pageParam ?? {}) }
          )(),
        ...restOptions,
      };
    })()
  );
};

useInfiniteGetProjectQuery.getKey = (variables: GetProjectQueryVariables) => [
  "GetProject.infinite",
  variables,
];

useGetProjectQuery.fetcher = (variables: GetProjectQueryVariables) =>
  fetcher<GetProjectQuery, GetProjectQueryVariables>(
    GetProjectDocument,
    variables
  );

export const CreateTaskDocument = `
    mutation CreateTask($input: CreateTaskInput!) {
  createTask(input: $input) {
    id
    name
    description
    createdAt
    updatedAt
  }
}
    `;

export const useCreateTaskMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    CreateTaskMutation,
    TError,
    CreateTaskMutationVariables,
    TContext
  >
) => {
  return useMutation<
    CreateTaskMutation,
    TError,
    CreateTaskMutationVariables,
    TContext
  >({
    mutationKey: ["CreateTask"],
    mutationFn: (variables?: CreateTaskMutationVariables) =>
      fetcher<CreateTaskMutation, CreateTaskMutationVariables>(
        CreateTaskDocument,
        variables
      )(),
    ...options,
  });
};

useCreateTaskMutation.fetcher = (variables: CreateTaskMutationVariables) =>
  fetcher<CreateTaskMutation, CreateTaskMutationVariables>(
    CreateTaskDocument,
    variables
  );

export const UpdateTaskDocument = `
    mutation UpdateTask($id: String!, $input: UpdateTaskInput!) {
  updateTask(id: $id, input: $input) {
    id
    name
    description
    createdAt
    updatedAt
  }
}
    `;

export const useUpdateTaskMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    UpdateTaskMutation,
    TError,
    UpdateTaskMutationVariables,
    TContext
  >
) => {
  return useMutation<
    UpdateTaskMutation,
    TError,
    UpdateTaskMutationVariables,
    TContext
  >({
    mutationKey: ["UpdateTask"],
    mutationFn: (variables?: UpdateTaskMutationVariables) =>
      fetcher<UpdateTaskMutation, UpdateTaskMutationVariables>(
        UpdateTaskDocument,
        variables
      )(),
    ...options,
  });
};

useUpdateTaskMutation.fetcher = (variables: UpdateTaskMutationVariables) =>
  fetcher<UpdateTaskMutation, UpdateTaskMutationVariables>(
    UpdateTaskDocument,
    variables
  );

export const DeleteTaskDocument = `
    mutation DeleteTask($id: String!) {
  deleteTask(id: $id) {
    id
    name
  }
}
    `;

export const useDeleteTaskMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    DeleteTaskMutation,
    TError,
    DeleteTaskMutationVariables,
    TContext
  >
) => {
  return useMutation<
    DeleteTaskMutation,
    TError,
    DeleteTaskMutationVariables,
    TContext
  >({
    mutationKey: ["DeleteTask"],
    mutationFn: (variables?: DeleteTaskMutationVariables) =>
      fetcher<DeleteTaskMutation, DeleteTaskMutationVariables>(
        DeleteTaskDocument,
        variables
      )(),
    ...options,
  });
};

useDeleteTaskMutation.fetcher = (variables: DeleteTaskMutationVariables) =>
  fetcher<DeleteTaskMutation, DeleteTaskMutationVariables>(
    DeleteTaskDocument,
    variables
  );

export const GetTasksDocument = `
    query GetTasks {
  tasks {
    id
    name
    description
    createdAt
    updatedAt
  }
}
    `;

export const useGetTasksQuery = <TData = GetTasksQuery, TError = unknown>(
  variables?: GetTasksQueryVariables,
  options?: Omit<UseQueryOptions<GetTasksQuery, TError, TData>, "queryKey"> & {
    queryKey?: UseQueryOptions<GetTasksQuery, TError, TData>["queryKey"];
  }
) => {
  return useQuery<GetTasksQuery, TError, TData>({
    queryKey: variables === undefined ? ["GetTasks"] : ["GetTasks", variables],
    queryFn: fetcher<GetTasksQuery, GetTasksQueryVariables>(
      GetTasksDocument,
      variables
    ),
    ...options,
  });
};

useGetTasksQuery.getKey = (variables?: GetTasksQueryVariables) =>
  variables === undefined ? ["GetTasks"] : ["GetTasks", variables];

export const useInfiniteGetTasksQuery = <
  TData = InfiniteData<GetTasksQuery>,
  TError = unknown,
>(
  variables: GetTasksQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<GetTasksQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseInfiniteQueryOptions<
      GetTasksQuery,
      TError,
      TData
    >["queryKey"];
  }
) => {
  return useInfiniteQuery<GetTasksQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options;
      return {
        queryKey:
          (optionsQueryKey ?? variables === undefined)
            ? ["GetTasks.infinite"]
            : ["GetTasks.infinite", variables],
        queryFn: (metaData) =>
          fetcher<GetTasksQuery, GetTasksQueryVariables>(GetTasksDocument, {
            ...variables,
            ...(metaData.pageParam ?? {}),
          })(),
        ...restOptions,
      };
    })()
  );
};

useInfiniteGetTasksQuery.getKey = (variables?: GetTasksQueryVariables) =>
  variables === undefined
    ? ["GetTasks.infinite"]
    : ["GetTasks.infinite", variables];

useGetTasksQuery.fetcher = (variables?: GetTasksQueryVariables) =>
  fetcher<GetTasksQuery, GetTasksQueryVariables>(GetTasksDocument, variables);

export const GetTaskDocument = `
    query GetTask($id: String!) {
  task(id: $id) {
    id
    name
    description
    createdAt
    updatedAt
  }
}
    `;

export const useGetTaskQuery = <TData = GetTaskQuery, TError = unknown>(
  variables: GetTaskQueryVariables,
  options?: Omit<UseQueryOptions<GetTaskQuery, TError, TData>, "queryKey"> & {
    queryKey?: UseQueryOptions<GetTaskQuery, TError, TData>["queryKey"];
  }
) => {
  return useQuery<GetTaskQuery, TError, TData>({
    queryKey: ["GetTask", variables],
    queryFn: fetcher<GetTaskQuery, GetTaskQueryVariables>(
      GetTaskDocument,
      variables
    ),
    ...options,
  });
};

useGetTaskQuery.getKey = (variables: GetTaskQueryVariables) => [
  "GetTask",
  variables,
];

export const useInfiniteGetTaskQuery = <
  TData = InfiniteData<GetTaskQuery>,
  TError = unknown,
>(
  variables: GetTaskQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<GetTaskQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseInfiniteQueryOptions<GetTaskQuery, TError, TData>["queryKey"];
  }
) => {
  return useInfiniteQuery<GetTaskQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options;
      return {
        queryKey: optionsQueryKey ?? ["GetTask.infinite", variables],
        queryFn: (metaData) =>
          fetcher<GetTaskQuery, GetTaskQueryVariables>(GetTaskDocument, {
            ...variables,
            ...(metaData.pageParam ?? {}),
          })(),
        ...restOptions,
      };
    })()
  );
};

useInfiniteGetTaskQuery.getKey = (variables: GetTaskQueryVariables) => [
  "GetTask.infinite",
  variables,
];

useGetTaskQuery.fetcher = (variables: GetTaskQueryVariables) =>
  fetcher<GetTaskQuery, GetTaskQueryVariables>(GetTaskDocument, variables);
