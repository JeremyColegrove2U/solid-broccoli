const { async } = require('seed/lib/seed');
const { User, Auth, Book } = require('../models');
const { signToken } = require('../utils/auth');

const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (!context.user) {
                throw new AuthenticationError('Not logged in');
            }

            const foundUser = await User.findOne({_id: context.user._id})
            .select('-__v -password')
        
            return foundUser;
        }
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            
            if (!user) {
                return null;
            }

            const token = signToken(user);

            return { token, user };
        },

        saveBook: async(parent, book, context) => {
            if (!context.user) {
                throw new AuthenticationError("You are not logged in");
            }

            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { savedBooks: book } },
                { new: true, runValidators: true }
              );
            if (!updatedUser) {
                return null;
            }

            return updatedUser;
        },

        removeBook: async(parent, {bookId}, context) => {
            if (!context.user) {
                throw new AuthenticationError("You are not logged in");
            }

            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: { bookId} } },
                { new: true }
              );
            if (!updatedUser) {
                return null;
            }
            return updatedUser;
        },

        login: async (parent, {email, password})=> {
            const user = await User.findOne({ email });

            if (!user) {
              throw new AuthenticationError('Incorrect credentials');
            }
          
            const correctPw = await user.isCorrectPassword(password);
          
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
          
            return {token, user};
        }

    }
  }
  
  module.exports = resolvers;