import mongoose from 'mongoose'
import fs from 'fs'
import path from 'path'
import bcrypt from 'bcrypt'
import CsvReader from 'promised-csv'

import User from './models/user'
import Notebook from './models/notebook'
import Note from './models/note'
import Word from './models/word'
import Numeral from './models/numeral'
import Letter from './models/letter'
import Set from './models/set'
import Correspondence from './models/correspondence'

const MONGO_URL = `mongodb://localhost:27017/test`
const SALT_ROUNDS = 10;

// Basic seed data
const pfcNotebook = {
  title: "PFC Gematria Notebook",
  description: "Gematria Notebooks of Paul Foster Case scrapped from the public PDF"
}

const paulCaseUser = {
  username: "Paulcase",
  email: "pfc@project89.org",
  password: "paulcase",
  notebooks: [pfcNotebook]
}

// TODO Transform hebrew words into Hebrew characters
// TODO Add field to words for transliteration and original
// TODO Add letters to hebrew words
// TODO Create letter json with base hebrew letters

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);

const updateModel = async (model, updates) => {
  const updatedModel = Object.assign(model, {
    ...updates
  })

  await updatedModel.save()

  return updatedModel
}

const createNote = async (note, type, typeId, userId, notebookId) => {
  return updateModel(new Note(), {
    ...note,
    [`${type}`]: typeId,
    user: userId,
    notebook: notebookId
  })
}

const createWord = async (word, notebookId, userId) => {
  const newWord = new Word()
  let notes = []

  if(word.entries && word.entries.length !== 0) {
    notes = await Promise.all(word.entries.map(note => createNote(note, "word", newWord.id, userId)))
  }

  return updateModel(newWord, {
    ...word,
    notes,
    user: userId,
    language: word.language === '' ? 'hebrew' : word.language
  })
}

const createNumeral = async (numeral, userId, notebookId) => {
  const newNumeral = new Numeral()
  // In the json dump, comments = notes and entries = words
  const notes = await Promise.all(numeral.comments.map(note => createNote(note, "numeral", newNumeral.id, userId, notebookId)))
  const words = await Promise.all(numeral.entries.map(word => createWord(word, notebookId, userId)))

  return updateModel(newNumeral, {
    ...numeral,
    user: userId,
    notes,
    words
  })
}

const createNotebook = async (notebook, userId) => {
  return updateModel(new Notebook(), {
    user: userId,
    ...notebook
  })
}

const createUser = async ({password, notebooks, ...rest}) => {
  const newUser = new User()
  const hash = await bcrypt.hash(password, SALT_ROUNDS)
  let newNotebooks = []

  if(notebooks && notebooks.length !== 0) {
    newNotebooks = await Promise.all(notebooks.map(notebook => createNotebook(notebook, newUser.id)))
  }

  return updateModel(newUser, {
    hash,
    notebooks: newNotebooks,
    ...rest
  })
}

// WORKING ON
const loadLetters = async (reader, filePath) => {
  reader.on('row', data => {
    console.log(data)
    return data
  })

  return reader
    .read(filePath)
    .then(value => value)
}

export const main = async () => {
  const reader = new CsvReader();

  const pfcNotes = fs.readFileSync(path.join(__dirname, "json/pfc-notebook.json"), 'utf8')
  const letters = await loadLetters(reader, "/Users/heru/workspace/gematrix3.0/seeds/tables/letters.csv")
  console.log(letters)

  const jsonData = JSON.parse(pfcNotes)

  const user = await createUser(paulCaseUser)

  // We are only starting with one notebook...
  const notebookId = user.notebooks[0].id
  const userId = user.id

  let allNumerals = []
  try {
    // allNumerals = await Promise.all(jsonData.map((rawNumeral) => createNumeral(rawNumeral, userId, notebookId)))
  }
  catch(e) {
    console.log(e);
    process.exit(1);
  }

  setTimeout(() => {
      console.log('*************************');
      console.log(`${allNumerals.length} created.`);
      console.log('*************************');
      console.log('Seed completed.');
      process.exit(0);
    }, 3000);
}

main()
