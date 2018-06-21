import gql from 'graphql-tag';

export const getUser = gql`
  query GetUser($idUser: ID!) {
    User(id: $idUser) {
      id
      title
      url
      icon
    }
  }
`;
