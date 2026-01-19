/**
 * Dynamic GraphQL fetcher that uses environment variables
 * This ensures the correct API endpoint is used in all environments
 */

const getGraphQLEndpoint = () => {
  // In browser, use NEXT_PUBLIC_APP_URL if available
  if (typeof window !== 'undefined') {
    return process.env.NEXT_PUBLIC_APP_URL
      ? `${process.env.NEXT_PUBLIC_APP_URL}/api/graphql`
      : '/api/graphql'; // Use relative URL as fallback for client-side
  }

  // Server-side: use full URL or localhost
  return process.env.NEXT_PUBLIC_APP_URL
    ? `${process.env.NEXT_PUBLIC_APP_URL}/api/graphql`
    : 'http://localhost:3000/api/graphql';
};

export async function fetcher<TData, TVariables>(
  query: string,
  variables?: TVariables
): Promise<TData> {
  const endpoint = getGraphQLEndpoint();

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();

  if (json.errors) {
    const { message } = json.errors[0];
    throw new Error(message);
  }

  return json.data;
}
