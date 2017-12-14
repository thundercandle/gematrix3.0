import fs from 'fs';

function requireGraphQL(name) {
  const filename = require.resolve(name);
  return fs.readFileSync(filename, 'utf8');
}

const typeDefs = [`
  scalar ObjID
  type Query {
    # A placeholder, please ignore
    __placeholder: Int
  }
  type Mutation {
    # A placeholder, please ignore
    __placeholder: Int
  }
  type Subscription {
    # A placeholder, please ignore
    __placeholder: Int
  }
`];

export default typeDefs;

typeDefs.push(requireGraphQL('./Correspondence.graphql'));

typeDefs.push(requireGraphQL('./Letter.graphql'));

typeDefs.push(requireGraphQL('./Note.graphql'));

typeDefs.push(requireGraphQL('./Notebook.graphql'));

typeDefs.push(requireGraphQL('./Numeral.graphql'));

typeDefs.push(requireGraphQL('./Set.graphql'));

typeDefs.push(requireGraphQL('./User.graphql'));

typeDefs.push(requireGraphQL('./Word.graphql'));
