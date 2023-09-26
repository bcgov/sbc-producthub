import { ApolloClient, InMemoryCache } from '@apollo/client/core'

export default async function getClient() {
  // Get the API key from environment variables
  const config = useRuntimeConfig();
  const apiKey = config.public.zenhubAPI;
  if (!apiKey) {
    console.error('API key is missing in the environment variables.');
    process.exit(1); // Exit the application if the API key is missing
  }

  const client = new ApolloClient({
    uri: 'https://api.zenhub.com/public/graphql',
    cache: new InMemoryCache(),
    headers: {
      authorization: `Bearer ${apiKey}`,
    },
  });
  return client
}
