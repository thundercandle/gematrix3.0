const resolvers = {
  Numeral: {
    id(numeral) {
      return numeral._id;
    },

    user(numeral, args, { Numeral }) {
      return Numeral.user(numeral);
    },

    words(numeral, { lastCreatedAt, limit }, { Numeral }) {
      return Numeral.words(numeral, { lastCreatedAt, limit });
    },

    notes(numeral, { lastCreatedAt, limit }, { Numeral }) {
      return Numeral.notes(numeral, { lastCreatedAt, limit });
    },

    letter(numeral, args, { Numeral }) {
      return Numeral.letter(numeral);
    },

    sephiroth(numeral, args, { Numeral }) {
      return Numeral.sephiroth(numeral);
    },
  },
  Query: {
    numerals(root, { lastCreatedAt, limit }, { Numeral }) {
      return Numeral.all({ lastCreatedAt, limit });
    },

    numeral(root, { id }, { Numeral }) {
      return Numeral.findOneById(id);
    },
  },
  Mutation: {
    async createNumeral(root, { input }, { Numeral }) {
      const id = await Numeral.insert(input);
      return Numeral.findOneById(id);
    },

    async updateNumeral(root, { id, input }, { Numeral }) {
      await Numeral.updateById(id, input);
      return Numeral.findOneById(id);
    },

    removeNumeral(root, { id }, { Numeral }) {
      return Numeral.removeById(id);
    },
  },
  Subscription: {
    numeralCreated: numeral => numeral,
    numeralUpdated: numeral => numeral,
    numeralRemoved: id => id,
  },
};

export default resolvers;
