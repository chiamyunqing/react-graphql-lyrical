import gql from 'graphql-tag';

//backquote as graphql query is not valid js code
export default gql`
    {
        songs {
            id
            title
        }
    }
`;
