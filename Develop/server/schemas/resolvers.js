const { async } = require('seed/lib/seed');
const { User, Auth, Book } = require('../models');
const { signToken } = require('../utils/auth');

const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        me: async (parent, { id, username }) => {
            const foundUser = await User.findOne({
              $or: [{ _id:id }, { username }],
            });
        
            if (!foundUser) {
              return null;
            }
        
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

        saveBook: async(parent, {_id, ...book} ) => {
            const updatedUser = await User.findOneAndUpdate(
                { _id },
                { $addToSet: { savedBooks: book } },
                { new: true, runValidators: true }
              );
            if (!updatedUser) {
                return null;
            }

            return updatedUser;
        },

        removeBook: async(parent, {_id, bookId}) => {
            const updatedUser = await User.findOneAndUpdate(
                { _id },
                { $pull: { savedBooks: { bookId} } },
                { new: true }
              );
            if (!updatedUser) {
                return null;
            }
            return updatedUser;
        }


    }
  }
  
  module.exports = resolvers;