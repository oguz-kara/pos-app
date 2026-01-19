import type { CodegenConfig } from '@graphql-codegen/cli';

// Use environment variable or fallback to localhost
const graphqlEndpoint = process.env.NEXT_PUBLIC_APP_URL
  ? `${process.env.NEXT_PUBLIC_APP_URL}/api/graphql`
  : 'http://localhost:3000/api/graphql';

const config: CodegenConfig = {
  // Use generated schema file instead of introspection
  schema: './lib/graphql/schema.graphql',
  documents: ['modules/**/graphql/documents/**/*.{ts,graphql}'],
  ignoreNoDocuments: true,
  generates: {
    './lib/graphql/generated.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-query'
      ],
      skipDocumentsValidation: true,
      config: {
        skipTypename: false,
        skipDocumentsValidation: true,
        fetcher: {
          endpoint: graphqlEndpoint,
          fetchParams: {
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          }
        },
        exposeQueryKeys: true,
        exposeFetcher: true,
        addInfiniteQuery: true,
        // React Query v5 configuration
        reactQueryVersion: 5,
      }
    }
  },
  hooks: {
    afterAllFileWrite: ['prettier --write']
  }
};

export default config;
