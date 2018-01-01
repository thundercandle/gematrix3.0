import { ObjectId } from 'mongodb';
import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import { merge } from 'lodash';

const resolvers = {};

resolvers.ObjID = new GraphQLScalarType({
  name: 'ObjID',
  description: 'Id representation, based on Mongo Object Ids',
  parseValue(value) {
    return ObjectId(value);
  },
  serialize(value) {
    return value.toString();
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return ObjectId(ast.value);
    }
    return null;
  },
});

export default resolvers;

import correspondenceResolvers from './Correspondence';
merge(resolvers, correspondenceResolvers);

import letterResolvers from './Letter';
merge(resolvers, letterResolvers);

import noteResolvers from './Note';
merge(resolvers, noteResolvers);

import notebookResolvers from './Notebook';
merge(resolvers, notebookResolvers);

import numeralResolvers from './Numeral';
merge(resolvers, numeralResolvers);

import setResolvers from './Set';
merge(resolvers, setResolvers);

import userResolvers from './User';
merge(resolvers, userResolvers);

import wordResolvers from './Word';
merge(resolvers, wordResolvers);

import sephirothResolvers from './Sephiroth';
merge(resolvers, sephirothResolvers);
