import gql from 'graphql-tag';


export const SIGNUP_USER = gql`
mutation SignUp($email: String!, $password: String!, $name: String!){
    signup(email: $email, password: $password, name: $name){
        email
        name
    }
}
`;

export const MODIFY_USER = gql`
mutation ModifyUser($icon: String!, $name: String!, $iconColor: String!){
    modifyUser(name: $name, icon: $icon, iconColor: $iconColor){
        icon,
        iconColor,
        name
    }
}
`;

export const JOIN_GAME = gql`
mutation JoinGame($gameId: ID!){
    joinGame(gameId: $gameId){
        id
    }
  }
`;

export const LEAVE_GAME = gql`
mutation LeaveGame($gameId: ID!){
    leaveGame(gameId: $gameId){
        id
    }
  }
`;

export const SUBMIT_PAGE = gql`
mutation SubmitPage($sketchbookId: ID!, $gameId: ID!, $content: String!, $pageType: String!){
    submitPage(sketchbookId: $sketchbookId, gameId: $gameId, content: $content, pageType: $pageType){
        id
    }
}
`;

export const CHANGE_GAME_STATUS = gql`
mutation ChangeGameStatus($newStatus:String!, $gameId: ID!){
    changeGameStatus(gameId:$gameId, newStatus:$newStatus){
      status
      id
    }
  }
`;