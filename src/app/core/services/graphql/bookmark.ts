import gql from 'graphql-tag';

export const getAllBookmarks = gql`
  query allBookmarks {
    allBookmarks {
      id
      title
      url
      icon
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

export const createBookmark = gql`
  mutation createBookmark($icon: String, $title: String!, $url: String) {
    createBookmark(icon: $icon, title: $title, url: $url) {
      id
      title
      url
      icon
    }
  }
`;

export const deleteBookmark = gql`
  mutation deleteBookmark($id: ID!) {
    deleteBookmark(id: $id)
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

export const bookmarkMutation = gql`
  subscription BookmarkMutations {
    Bookmark {
      node {
        id
        icon
        title
        url
      }
      previousValues {
        id
      }
    }
  }
`;
