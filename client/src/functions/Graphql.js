import {
    ApolloClient,
    InMemoryCache,
    gql
} from "@apollo/client";

const client = new ApolloClient({
    uri: `/graphql`,
    cache: new InMemoryCache(),
});

export default client;

export const GET_POSTS = gql`
query posts(
    $start: Int!,
    $limit: Int!
  ){
    posts(
      start: $start,
      limit: $limit
    ){
      id,
                   body,
                   main_image{url},
                   promoted,
                   likes,
                   created_at,
                   author{
                   id,
                   avater{url},
                   username
                  }
    }
  }
`;

export const GET_USERS = gql `
query users(
    $start: Int!,
    $limit: Int!
  ){
    users(
      start: $start,
      limit: $limit,
          where: {not: {username: [1, 2, 3]}}
    ){
      id,
        username,
      display_name,
      avater{ url }
    }
  }
`;
