import gql from "graphql-tag";

export const IS_LOGGED_IN = gql`
{
    isLoggedIn @client
  }
`;

export const USER_ID = gql`
{
    userId @client
  }
`;

export const localType =gql`
extend type Query {
  isLoggedIn: Boolean!
  userId: ID!
}
`

export const resolvers={};