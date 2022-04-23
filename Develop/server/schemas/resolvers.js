const { async } = require('seed/lib/seed');
const { User, Auth, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        me: async (parent, args)=> {
            return await User.findOne(args)
        }
    }
  }
  
  module.exports = resolvers;