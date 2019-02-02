import { GraphQLClient } from 'graphql-request';

const client = new GraphQLClient('/graphql', { headers: {}, mode: 'cors' });

export default client;

