const resolvers = {
  Sephiroth: {
    id(sephiroth) {
      return sephiroth._id;
    },

    numeral(sephiroth, args, { Sephiroth }) {
      return Sephiroth.numeral(sephiroth);
    },

    hebrew(sephiroth, args, { Sephiroth }) {
      return Sephiroth.hebrew(sephiroth);
    },

    notes(sephiroth, { lastCreatedAt, limit }, { Sephiroth }) {
      return Sephiroth.notes(sephiroth, { lastCreatedAt, limit });
    },

    correspondences(sephiroth, { lastCreatedAt, limit }, { Sephiroth }) {
      return Sephiroth.correspondences(sephiroth, { lastCreatedAt, limit });
    },

    sets(sephiroth, { lastCreatedAt, limit }, { Sephiroth }) {
      return Sephiroth.sets(sephiroth, { lastCreatedAt, limit });
    },

    user(sephiroth, args, { Sephiroth }) {
      return Sephiroth.user(sephiroth);
    },
  },
  Query: {
    sephiroths(root, { lastCreatedAt, limit }, { Sephiroth }) {
      return Sephiroth.all({ lastCreatedAt, limit });
    },

    sephiroth(root, { id }, { Sephiroth }) {
      return Sephiroth.findOneById(id);
    },
  },
  Mutation: {
    async createSephiroth(root, { input }, { Sephiroth }) {
      const id = await Sephiroth.insert(input);
      return Sephiroth.findOneById(id);
    },

    async updateSephiroth(root, { id, input }, { Sephiroth }) {
      await Sephiroth.updateById(id, input);
      return Sephiroth.findOneById(id);
    },

    removeSephiroth(root, { id }, { Sephiroth }) {
      return Sephiroth.removeById(id);
    },
  },
  Subscription: {
    sephirothCreated: sephiroth => sephiroth,
    sephirothUpdated: sephiroth => sephiroth,
    sephirothRemoved: id => id,
  },
};

export default resolvers;
