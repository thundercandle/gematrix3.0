const models = {};

export default function addModelsToContext(context) {
  const newContext = Object.assign({}, context);
  Object.keys(models).forEach((key) => {
    newContext[key] = new models[key](newContext);
  });
  return newContext;
}

import Correspondence from './Correspondence';
models.Correspondence = Correspondence;

import Letter from './Letter';
models.Letter = Letter;

import Note from './Note';
models.Note = Note;

import Notebook from './Notebook';
models.Notebook = Notebook;

import Numeral from './Numeral';
models.Numeral = Numeral;

import Set from './Set';
models.Set = Set;

import User from './User';
models.User = User;

import Word from './Word';
models.Word = Word;
