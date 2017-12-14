const resolvers = {
  Correspondence: {
    id(correspondence) {
      return correspondence._id;
    },

    set(correspondence, { lastCreatedAt, limit }, { Correspondence }) {
      return Correspondence.set(correspondence, { lastCreatedAt, limit });
    },

    numeral(correspondence, args, { Correspondence }) {
      return Correspondence.numeral(correspondence);
    },

    letter(correspondence, args, { Correspondence }) {
      return Correspondence.letter(correspondence);
    },

    notes(correspondence, { lastCreatedAt, limit }, { Correspondence }) {
      return Correspondence.notes(correspondence, { lastCreatedAt, limit });
    },
  },
  Query: {
    correspondences(root, { lastCreatedAt, limit }, { Correspondence }) {
      return Correspondence.all({ lastCreatedAt, limit });
    },

    correspondence(root, { id }, { Correspondence }) {
      return Correspondence.findOneById(id);
    },
  },
  Mutation: {
    async createCorrespondence(root, { input }, { Correspondence }) {
      const id = await Correspondence.insert(input);
      return Correspondence.findOneById(id);
    },

    async updateCorrespondence(root, { id, input }, { Correspondence }) {
      await Correspondence.updateById(id, input);
      return Correspondence.findOneById(id);
    },

    removeCorrespondence(root, { id }, { Correspondence }) {
      return Correspondence.removeById(id);
    },
  },
  Subscription: {
    correspondenceCreated: correspondence => correspondence,
    correspondenceUpdated: correspondence => correspondence,
    correspondenceRemoved: id => id,
  },
};

export default resolvers;
