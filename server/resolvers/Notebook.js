const resolvers = {
  Notebook: {
    id(notebook) {
      return notebook._id;
    },

    user(notebook, args, { Notebook }) {
      return Notebook.user(notebook);
    },

    numerals(notebook, { lastCreatedAt, limit }, { Notebook }) {
      return Notebook.numerals(notebook, { lastCreatedAt, limit });
    },

    sets(notebook, { lastCreatedAt, limit }, { Notebook }) {
      return Notebook.sets(notebook, { lastCreatedAt, limit });
    },
  },
  Query: {
    notebooks(root, { lastCreatedAt, limit }, { Notebook }) {
      return Notebook.all({ lastCreatedAt, limit });
    },

    notebook(root, { id }, { Notebook }) {
      return Notebook.findOneById(id);
    },
  },
  Mutation: {
    async createNotebook(root, { input }, { Notebook }) {
      const id = await Notebook.insert(input);
      return Notebook.findOneById(id);
    },

    async updateNotebook(root, { id, input }, { Notebook }) {
      await Notebook.updateById(id, input);
      return Notebook.findOneById(id);
    },

    removeNotebook(root, { id }, { Notebook }) {
      return Notebook.removeById(id);
    },
  },
  Subscription: {
    notebookCreated: notebook => notebook,
    notebookUpdated: notebook => notebook,
    notebookRemoved: id => id,
  },
};

export default resolvers;