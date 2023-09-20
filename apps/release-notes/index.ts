import { ApolloClient, InMemoryCache, gql } from '@apollo/client/core';

// Get the API key from environment variables
const apiKey = process.env.ZENHUB_APIKEY;
console.log(apiKey)
if (!apiKey) {
  console.error("API key is missing in the environment variables.");
  process.exit(1); // Optionally, exit the application if the API key is missing
}

const client = new ApolloClient({
  uri: 'https://api.zenhub.com/public/graphql',
  cache: new InMemoryCache(),
  headers: {
    authorization: `Bearer ${apiKey}`
  }
});

client
  .query({
    query: gql`
      query getRepositoryReleaseReports($repositoryGhId: [Int!]!) {
        repositoriesByGhId(ghIds: $repositoryGhId) {
          id
          releases(first: 50) {
            nodes {
              id
              title
              description
              startOn
              endOn
              issues(first: 50) {
                nodes {
                  id
                  title
                  number
                }
              }
            }
          }
        }
      }
    `,
  })
  .then((result) => console.log(result));

// import { ApolloServer } from '@apollo/server';
// import { startStandaloneServer } from '@apollo/server/standalone';

// // A schema is a collection of type definitions (hence "typeDefs")
// // that together define the "shape" of queries that are executed against
// // your data.
// const books = [
//   {
//     title: 'The Awakening',
//     author: 'Kate Chopin',
//   },
//   {
//     title: 'City of Glass',
//     author: 'Paul Auster',
//   },
// ];

// const resolvers = {
//   Query: {
//     books: () => books,
//   },
// };

// const typeDefs = `#graphql
//   # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

//   # This "Book" type defines the queryable fields for every book in our data source.
//   type Book {
//     title: String
//     author: String
//   }

//   # The "Query" type is special: it lists all of the available queries that
//   # clients can execute, along with the return type for each. In this
//   # case, the "books" query returns an array of zero or more Books (defined above).
//   type Query {
//     books: [Book]
//   }
// `;

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
// });

// // Passing an ApolloServer instance to the `startStandaloneServer` function:
// //  1. creates an Express app
// //  2. installs your ApolloServer instance as middleware
// //  3. prepares your app to handle incoming requests
// const { url } = await startStandaloneServer(server, {
//   listen: { port: 4000 },
// });

// console.log(`🚀  Server ready at: ${url}`);
