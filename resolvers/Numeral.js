const resolvers = {
  Numeral: {
    id(numeral) {
      return numeral._id;
    },
    words(numeral, { lastCreatedAt, limit }, { Numeral }) {
      return Numeral.words(numeral, { lastCreatedAt, limit });
    },

    notes(numeral, { lastCreatedAt, limit }, { Numeral }) {
      return Numeral.notes(numeral, { lastCreatedAt, limit });
    },

    notebooks(numeral, { lastCreatedAt, limit }, { Numeral }) {
      return Numeral.notebooks(numeral, { lastCreatedAt, limit });
    },

    letters(numeral, { lastCreatedAt, limit }, { Numeral }) {
      return Numeral.letters(numeral, { lastCreatedAt, limit });
    },
  },
  Query: {
    numerals(root, { lastCreatedAt, limit }, { Numeral }) {
      return Numeral.all({ lastCreatedAt, limit });
    },

    numeral(root, { id, value }, { Numeral }) {
      if (id) {
        return Numeral.findOneById(id);
      }

      if (value) {
        return Numeral.findOne({ value: value})
      }
    },

    searchByValue(root, { value }, { Numeral}) {
      return Numeral.findByValue(value)
    }
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
