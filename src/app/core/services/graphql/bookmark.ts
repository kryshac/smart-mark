import gql from 'graphql-tag';

export const queryAllBookmarks = gql`
  query allBookmarks {
    allBookmarks {
      id
      title
      url
      icon
      tags {
        id
      }
    }
  }
`;

export const getBookmark = gql`
  query GetBookmark($idBoolmark: ID!) {
    Bookmark(id: $idBoolmark) {
      id
      title
      url
      icon
    }
  }
`;

export const mutationCreateBookmark = gql`
  mutation createBookmark($newBookmarkInput: newBookmarkInput) {
    createBookmark(input: $newBookmarkInput) {
      id
      title
      url
      icon
      tags {
        id
        title
        type
      }
    }
  }
`;

export const mutationDeleteBookmark = gql`
  mutation deleteBookmark($id: ID!) {
    deleteBookmark(id: $id) {
      id
      title
      url
      icon
      tags {
        id
      }
    }
  }
`;

export const updateBookmark = gql`
  mutation updateBookmark($id: ID!, $body: updateBookmakrInput!) {
    updateBookmark(id: $id, input: $body) {
      id
      title
      url
      icon
    }
  }
`;

export const bookmarkCreated = gql`
  subscription {
    bookmarkCreated {
      id
      title
      url
      icon
    }
  }
`;

export const subscriptionBookmarkCreated = gql`
  subscription bookmarkCreated {
    bookmarkCreated {
      id
      title
      url
      icon
      tags {
        id
        title
        type
      }
    }
  }
`;
