const resolvers = {
  Word: {
    id(word) {
      return word._id;
    },

    numeral(word, args, { Word }) {
      return Word.numeral(word);
    },

    notebooks(word, { lastCreatedAt, limit }, { Word }) {
      return Word.notebooks(word, { lastCreatedAt, limit });
    },

    user(word, args, { Word }) {
      return Word.user(word);
    },

    letters(word, { lastCreatedAt, limit }, { Word }) {
      return Word.letters(word, { lastCreatedAt, limit });
    },

    notes(word, { lastCreatedAt, limit }, { Word }) {
      return Word.notes(word, { lastCreatedAt, limit });
    },
  },
  Query: {
    words(root, { lastCreatedAt, limit }, { Word }) {
      return Word.all({ lastCreatedAt, limit });
    },

    word(root, { id }, { Word }) {
      return Word.findOneById(id);
    },
  },
  Mutation: {
    async createWord(root, { input }, { Word }) {
      const id = await Word.insert(input);
      return Word.findOneById(id);
    },

    async updateWord(root, { id, input }, { Word }) {
      await Word.updateById(id, input);
      return Word.findOneById(id);
    },

    removeWord(root, { id }, { Word }) {
      return Word.removeById(id);
    },
  },
  Subscription: {
    wordCreated: word => word,
    wordUpdated: word => word,
    wordRemoved: id => id,
  },
};

export default resolvers;
