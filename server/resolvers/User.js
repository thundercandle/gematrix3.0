const resolvers = {
  User: {
    id(user) {
      return user._id;
    },

    notebooks(user, { lastCreatedAt, limit }, { User }) {
      return User.notebooks(user, { lastCreatedAt, limit });
    },

    numerals(user, { lastCreatedAt, limit }, { User }) {
      return User.numerals(user, { lastCreatedAt, limit });
    },

    letters(user, { lastCreatedAt, limit }, { User }) {
      return User.letters(user, { lastCreatedAt, limit });
    },

    sephiroth(user, { lastCreatedAt, limit }, { User }) {
      return User.sephiroth(user, { lastCreatedAt, limit });
    },

    sets(user, { lastCreatedAt, limit }, { User }) {
      return User.sets(user, { lastCreatedAt, limit });
    },
  },
  Query: {
    users(root, { lastCreatedAt, limit }, { User }) {
      return User.all({ lastCreatedAt, limit });
    },

    user(root, { id }, { User }) {
      return User.findOneById(id);
    },
  },
  Mutation: {
    async createUser(root, { input }, { User }) {
      const id = await User.insert(input);
      return User.findOneById(id);
    },

    async updateUser(root, { id, input }, { User }) {
      await User.updateById(id, input);
      return User.findOneById(id);
    },

    removeUser(root, { id }, { User }) {
      return User.removeById(id);
    },
  },
  Subscription: {
    userCreated: user => user,
    userUpdated: user => user,
    userRemoved: id => id,
  },
};

export default resolvers;
