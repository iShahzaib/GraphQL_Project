import { gql } from '@apollo/client';

// GraphQL Queries & Mutations
export const GET_USERS = gql`
  query {
    getUsers {
      _id
      name
      email
    }
  }
`;

export const ADD_USER = gql`
  mutation($name: String!, $email: String!) {
    addUser(name: $name, email: $email) {
      _id
      name
      email
    }
  }
`;

export const UPDATE_USER = gql`
  mutation($id: ID!, $name: String, $email: String) {
    updateUser(id: $id, name: $name, email: $email) {
      _id
      name
      email
    }
  }
`;

export const DELETE_USER = gql`
  mutation($id: ID!) {
    deleteUser(id: $id)
  }
`;