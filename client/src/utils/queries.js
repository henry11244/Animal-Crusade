import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!, $password: String!) {
    user(username: $username, password: $password) {
      _id
      username
      password
    }
  }
`;