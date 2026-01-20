import { GraphQLClient } from 'graphql-request';

/**
 * Get the GraphQL API endpoint based on the environment
 * - In browser: uses window.location.origin
 * - In server: uses NEXT_PUBLIC_APP_URL or localhost
 */
export function getGraphQLEndpoint(): string {
  // Client-side: use the current origin
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/api/graphql`
  }

  // Server-side: use environment variable or localhost
  return process.env.NEXT_PUBLIC_APP_URL
    ? `${process.env.NEXT_PUBLIC_APP_URL}/api/graphql`
    : 'http://localhost:3000/api/graphql'
}

/**
 * GraphQL client for Server Components
 * Uses graphql-request for lightweight fetching
 */
export function getGraphQLClient(token?: string) {
  return new GraphQLClient(getGraphQLEndpoint(), {
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
}

/**
 * Default GraphQL client without auth
 */
export const graphqlClient = getGraphQLClient();

/**
 * Custom fetcher for react-query GraphQL hooks
 * Uses dynamic endpoint resolution
 */
export function createGraphQLFetcher<TData, TVariables>(
  query: string,
  variables?: TVariables,
  headers?: RequestInit['headers'],
) {
  return async (): Promise<TData> => {
    const endpoint = getGraphQLEndpoint()

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      credentials: 'include',
      body: JSON.stringify({ query, variables }),
    })

    const json = await res.json()

    if (json.errors) {
      const { message } = json.errors[0]
      throw new Error(message)
    }

    return json.data
  }
}
