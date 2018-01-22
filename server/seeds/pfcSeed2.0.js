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
const SALT_ROUNDS = 10

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

mongoose.Promise = Promise
mongoose.connect(MONGO_URL)

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
    [`${type}Id`]: typeId,
    userId,
    notebookId
  })
}

const createWord = async (word, numeralId, notebookId, userId) => {
  const newWord = new Word()
  let notes = []

  if(word.entries && word.entries.length !== 0) {
    notes = await Promise.all(word.entries.map(note => createNote(note, "word", newWord.id, userId)))
  }

  newWord.notebookIds.push(notebookId)

  const updatedWord = await updateModel(newWord, {
    ...word,
    numeralId,
    entry: word.word,
    noteIds: notes,
    userId,
    language: word.language === '' ? 'hebrew' : word.language
  })

  await Notebook.findById(notebookId, async (err, notebook) => {
    console.log("New notebook", notebook)
    notebook.wordIds = [...notebook.wordIds, updatedWord]
    await notebook.save((err, prod) => console.log(err))
  })

  return updatedWord
}

const createNumeral = async (numeral, userId, notebookId) => {
  const newNumeral = new Numeral()
  // In the json dump, comments = notes and entries = words
  const notes = await Promise.all(numeral.comments.map(note => createNote(note, "numeral", newNumeral.id, userId, notebookId)))
  const words = await Promise.all(numeral.entries.map(word => createWord (word, newNumeral.id, notebookId, userId)))

  return updateModel(newNumeral, {
    ...numeral,
    userId,
    noteIds: notes,
    wordIds: words
  })
}

const createNotebook = async (notebook, userId) =>
  updateModel(new Notebook(), {
    userId: userId,
    ...notebook
  })


const createUser = async ({password, notebooks, ...rest}) => {
  const newUser = new User()
  const hash = await bcrypt.hash(password, SALT_ROUNDS)
  let newNotebooks = []

  if(notebooks && notebooks.length !== 0) {
    newNotebooks = await Promise.all(notebooks.map(notebook => createNotebook(notebook, newUser.id)))
  }

  return updateModel(newUser, {
    hash,
    notebookIds: newNotebooks,
    ...rest
  })
}

const loadLetters = (reader, filePath) =>
  reader
    .read(filePath, data => data)
    .then(dataArr =>
      dataArr.reduce((acc, row) => {
        if (acc.keys.length === 0) {
          acc.keys = row
          return acc
        }

        acc.letters.push(acc.keys.reduce((total, key, i, a) => {
          total[key] = row[i]
          return total
        }, {}))

        return acc
      }, { keys: [], letters: []}).letters
    )

const createLetter = async (letter, userId) =>
  updateModel(new Letter(), {
    ...letter,
    userId:userId
  })


export const main = async () => {
  const reader = new CsvReader()

  const pfcNotes = fs.readFileSync(path.join(__dirname, "json/pfc-notebook.json"), 'utf8')
  const jsonData = JSON.parse(pfcNotes)

  const user = await createUser(paulCaseUser)
  const letters = await loadLetters(reader, "/Users/heru/workspace/gematrix3.0/seeds/tables/letters.csv")

  // We are only starting with one notebook...
  const notebookId = user.notebookIds[0]
  const userId = user.id

  let allNumerals = []
  let allLetters = []

  try {
    allNumerals = await Promise.all(jsonData.map(rawNumeral => createNumeral(rawNumeral, userId, notebookId)))
    allLetters = await Promise.all(letters.map(letter => createLetter(letter, userId)))
  }
  catch(e) {
    console.log(e)

    mongoose.connection.db.dropDatabase(() => {
      console.log("database dropped")
      process.exit(1)
    })
  }

  setTimeout(() => {
      console.log('*************************')
      console.log(`${allNumerals.length} created.`)
      console.log(`${allLetters.length} created.`)
      console.log('*************************')
      console.log('Seed completed.')
      process.exit(0)
    }, 3000)
}

process.on('unhandledRejection', error => {
  console.log("AGHHHHHHHHHHHHHHHHHHHHHHHH")
  console.log('unhandledRejection', error)

  mongoose.connection.db.dropDatabase(() => {
    console.log("database dropped")
    process.exit(1)
  })
})

main()
