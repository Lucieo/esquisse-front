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

export const GET_USER_ID = gql`
{
  userId @client
}
`;

export const GET_GAME_INFO= gql`
query GetGameInfo($gameId:ID!){
    getGameInfo(gameId:$gameId){
      id
      status
      turn
      players{
        id
        name
        icon
        iconColor
      }
      creator
      sketchbooks{
        id
      }
    }
  }
`

export const GET_ALL_SKETCHBOOKS = gql`
query GetAllSketchbooks($gameId: ID!){
    getAllSketchbooks(gameId:$gameId){
        pages{
            content
            pageType
            creator{
                name
            }
        }
    }
}
`;