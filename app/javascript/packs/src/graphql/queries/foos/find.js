import gql from 'graphql-tag';

export default gql`
  query find($id : ID!) {
    foo(id : $id) {
      id
      bar
    }
  }
`;
