// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`
type Book {
    authors: [String]
    description: String
    bookId: String!
    image: String
    link: String
    title: String!
}

type User {
    _id: ID
    username: String!
    email: String!
    password: String
    bookCount: Int
    savedBooks: [Book]
}

type Auth {
    token: String,
    user: User
}

type Query {
    me: User
}

type Mutation {
    login (email: String!, password: String!): Auth
    addUser (username: String, email: String, password: String): Auth
    saveBook (authors: [String], title: String, bookId: String, description:String, image: String, link: String): User
    removeBook (bookId: String!): User
}
`;

// export the typeDefs
module.exports = typeDefs;