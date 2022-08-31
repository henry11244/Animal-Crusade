const { User } = require('../models');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },

    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId });
    },
  },

  Mutation: {
    addUser: async (parent, { username, password}) => {
      return User.create({ username, password });
    },
    addScore: async (parent, { userId, scores }) => {
      return User.findOneAndUpdate(
        { _id: userId },
        {
          $addToSet: { scores: scores },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    removeScore: async (parent, { userId, scores }) => {
      return User.findOneAndUpdate(
        { _id: userId },
        { $pull: { scores: scores } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
