import { GraphQLClient } from 'graphql-request';

const client = new GraphQLClient('http://0.0.0.0:3000/graphql', { headers: {}, mode: 'cors' });

export default client;

