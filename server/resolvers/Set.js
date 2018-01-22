const resolvers = {
  Set: {
    id(set) {
      return set._id;
    },

    notebooks(set, { lastCreatedAt, limit }, { Set }) {
      return Set.notebooks(set, { lastCreatedAt, limit });
    },

    notes(set, { lastCreatedAt, limit }, { Set }) {
      return Set.notes(set, { lastCreatedAt, limit });
    },

    correspondences(set, { lastCreatedAt, limit }, { Set }) {
      return Set.correspondences(set, { lastCreatedAt, limit });
    },

    user(set, args, { Set }) {
      return Set.user(set);
    },
  },
  Query: {
    sets(root, { lastCreatedAt, limit }, { Set }) {
      return Set.all({ lastCreatedAt, limit });
    },

    set(root, { id }, { Set }) {
      return Set.findOneById(id);
    },
  },
  Mutation: {
    async createSet(root, { input }, { Set }) {
      const id = await Set.insert(input);
      return Set.findOneById(id);
    },

    async updateSet(root, { id, input }, { Set }) {
      await Set.updateById(id, input);
      return Set.findOneById(id);
    },

    removeSet(root, { id }, { Set }) {
      return Set.removeById(id);
    },
  },
  Subscription: {
    setCreated: set => set,
    setUpdated: set => set,
    setRemoved: id => id,
  },
};

export default resolvers;
