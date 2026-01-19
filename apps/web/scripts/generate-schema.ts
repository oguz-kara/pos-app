import { writeFileSync } from 'fs';
import { printSchema } from 'graphql';
import { schema } from '../lib/graphql/schema';

// Generate schema.graphql file
const schemaAsString = printSchema(schema);
writeFileSync('./lib/graphql/schema.graphql', schemaAsString);

console.log('✅ GraphQL schema generated at lib/graphql/schema.graphql');
