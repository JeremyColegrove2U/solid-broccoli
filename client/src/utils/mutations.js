import { gql } from '@apollo/client';

const LOGIN_USER = gql`
mutation LOGIN_USER($email: String!, $password:String!) {
    login (email: $email, password:$password) {
      token
      user {
        _id
        username
        email
        password
        bookCount
        savedBooks {
          authors
          description
          bookId
          image
          link
          title
        }
      }
    }
  }`

  const ADD_USER = gql`
  mutation ADD_USER($username: String, $email: String, $password: String) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        password
        bookCount
        savedBooks {
          authors
          description
          bookId
          image
          link
          title
        }
      }
    }
  }
`
const SAVE_BOOK = gql`
  mutation SAVE_BOOK($authors: [String], $title: String, $bookId: String, $description: String, $image: String, $link: String) {
    saveBook (authors: $authors, title: $title, bookId: $bookId, description: $description, image: $image, link: $link) {
      _id
      username
      email
      password
      bookCount
      savedBooks {
        authors
        description
        bookId
        image
        link
        title
      }
    }
  }
`
const REMOVE_BOOK = gql`
mutation RemoveBook($bookId: String!) {
    removeBook(bookId: $bookId) {
      _id
      username
      email
      password
      bookCount
      savedBooks {
        authors
        description
        bookId
        image
        link
        title
      }
    }
  }
`;


export default {LOGIN_USER, ADD_USER, SAVE_BOOK, REMOVE_BOOK};