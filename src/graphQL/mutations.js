import gql from 'graphql-tag';

export const LOGIN_USER = gql`
mutation Login($email: String!, $password: String!){
    login(email: $email, password: $password){
        token
        user{
            email
            name
        }
    }
}
`;

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