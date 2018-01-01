const resolvers = {
  Note: {
    id(note) {
      return note._id;
    },

    word(note, args, { Note }) {
      return Note.word(note);
    },

    numeral(note, args, { Note }) {
      return Note.numeral(note);
    },

    notebook(note, args, { Note }) {
      return Note.notebook(note);
    },

    correspondence(note, args, { Note }) {
      return Note.correspondence(note);
    },

    user(note, args, { Note }) {
      return Note.user(note);
    },

    set(note, args, { Note }) {
      return Note.set(note);
    },
  },
  Query: {
    notes(root, { lastCreatedAt, limit }, { Note }) {
      return Note.all({ lastCreatedAt, limit });
    },

    note(root, { id }, { Note }) {
      return Note.findOneById(id);
    },
  },
  Mutation: {
    async createNote(root, { input }, { Note }) {
      const id = await Note.insert(input);
      return Note.findOneById(id);
    },

    async updateNote(root, { id, input }, { Note }) {
      await Note.updateById(id, input);
      return Note.findOneById(id);
    },

    removeNote(root, { id }, { Note }) {
      return Note.removeById(id);
    },
  },
  Subscription: {
    noteCreated: note => note,
    noteUpdated: note => note,
    noteRemoved: id => id,
  },
};

export default resolvers;
