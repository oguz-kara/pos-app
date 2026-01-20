import type { CodegenConfig } from '@graphql-codegen/cli';

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
      config: {
        skipTypename: false,
        fetcher: '@/lib/graphql/client#createGraphQLFetcher',
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
