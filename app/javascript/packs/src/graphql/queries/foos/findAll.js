import gql from 'graphql-tag';

export default gql`
  query findAll {
    foos {
      id
      bar
    }
  }
`;
