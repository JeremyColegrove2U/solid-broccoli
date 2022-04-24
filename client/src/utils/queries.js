import { gql } from '@apollo/client';

const GET_ME = gql`
query Me {
    me {
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

export default GET_ME;