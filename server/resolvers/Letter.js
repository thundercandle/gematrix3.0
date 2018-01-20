const resolvers = {
  Letter: {
    id(letter) {
      return letter._id;
    },

    numeral(letter, args, { Letter }) {
      return Letter.numeral(letter);
    },

    correspondences(letter, { lastCreatedAt, limit }, { Letter }) {
      return Letter.correspondences(letter, { lastCreatedAt, limit });
    },
  },
  Query: {
    letters(root, { lastCreatedAt, limit }, { Letter }) {
      return Letter.all({ lastCreatedAt, limit });
    },

    letter(root, { id }, { Letter }) {
      return Letter.findOneById(id);
    },
  },
  Mutation: {
    async createLetter(root, { input }, { Letter }) {
      const id = await Letter.insert(input);
      return Letter.findOneById(id);
    },

    async updateLetter(root, { id, input }, { Letter }) {
      await Letter.updateById(id, input);
      return Letter.findOneById(id);
    },

    removeLetter(root, { id }, { Letter }) {
      return Letter.removeById(id);
    },
  },
  Subscription: {
    letterCreated: letter => letter,
    letterUpdated: letter => letter,
    letterRemoved: id => id,
  },
};

export default resolvers;
