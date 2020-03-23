import gql from "graphql-tag";

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

export const USER_INFO = gql`
  query UserInfo {
    userName @client
    userEmail @client
  }
`;