import gql from 'graphql-tag';

//backquote as graphql query is not valid js code
export default gql`
    query SongQuery($id: ID!) {
    song(id: $id) {
      id
      title
      lyrics {
        id
        content
        likes
      }
    }
  }
`;

