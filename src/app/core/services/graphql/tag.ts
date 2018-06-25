import gql from 'graphql-tag';

export const queryMyBookmarks = gql`
  query myTags {
    myTags {
      tag {
        id
        title
        type
      }
    }
  }
`;
