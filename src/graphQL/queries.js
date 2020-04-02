import gql from 'graphql-tag';

export const CURRENT_USER = gql`
{
    currentUser {
        id
        name
        email
        icon
        iconColor
    }
  }
`;

export const LAST_GAMES = gql`
{
    getLastUserGames{
        id
    }
}
`