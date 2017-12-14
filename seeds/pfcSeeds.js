import mongoose from 'mongoose'
import fs from 'fs'
import path from 'path'
import config from '../config'

import User from './models/user'
import Notebook from './models/notebook'
import Note from './models/note'
import Word from './models/word'
import Numeral from './models/numeral'
import Set from './models/set'
import Correspondence from './models/correspondence'


async function createUser({ email, username, password }) {
  const newUser = new User()

  const hash = await bcrypt.hash(password, SALT_ROUNDS);

  newUser.email = email
  newUser.username = username
  newUser.hash = hash

  return newUser.save()
}


// MONGOOSE
mongoose.Promise = Promise;
mongoose.connect(config.db.toSeed);

// Load the seed file

function createNote(note) {
  const newNote = new Note();

  ['type', 'wordId', 'numeralId', 'content', 'see', ].map(prop => {
    if (note.hasOwnProperty(prop)) {
      newNote[prop] = note[prop];
    }
  });

  return newNote.save();
}

function createWord(word) {
  return new Promise((resolve, reject) => {
    const newWord = new Word();
    const wordNotes = [];

    if (word.entries && word.entries.length !== 0) {
      word.entries.forEach(note => {
        note.wordId = newWord.id;
        note.type = "entry"
        wordNotes.push(createNote(note));
      });
    }

    ['language', 'entry', 'language', 'pronunciation', 'definition', 'see', 'numeralId'].map(prop => {
      if (word.hasOwnProperty(prop)  && prop !== 'entry') {
        newWord[prop] = word[prop];
      }
    });

    if (word.language === '') {
      newWord.language = 'hebrew';
    }

    Promise
      .all(wordNotes)
      .then(savedNotes => {
        newWord.notes = savedNotes;

        return newWord.save();
      })
      .then(savedWord => {
        resolve(savedWord);
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
}

function createNumeral({ numeral, updates }) {
  return new Promise((resolve, reject) => {
    const notePromises = [];
    const wordPromises = [];

    if (updates.entries.length !== 0) {
      updates.entries.forEach(note => {
        note.numeralId = numeral.id;
        notePromises.push(createNote(note));
      });
    }
    //
    if (updates.entries.length !== 0) {
      updates.entries.forEach(word => {
        word.numeralId = numeral.id;
        const numWord = createWord(word);
        wordPromises.push(numWord);
      });
    }

    ['value', 'math'].map(prop => {
      if (updates.hasOwnProperty(prop)) {
        numeral[prop] = updates[prop];
      }
    });

    Promise
      .all(notePromises)
      .then(notes => {
        numeral.notes = notes;
      })
      .then(() => Promise.all(wordPromises))
      .then(entries => {
        numeral.entries = entries;
      })
      .then(() => numeral.save())
      .then(savedNumeral => {
        resolve(savedNumeral);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function seed() {
  // Main reading
  const pfcNotes = fs.readFileSync(path.join(__dirname, "json/pfc-notebook.json"), 'utf8')
  const jsonData = JSON.parse(pfcNotes);
  const numeralPromises = [];

  jsonData.forEach(rawNumeral => {
    const numProm = createNumeral({
      numeral: new Numeral(),
      updates: rawNumeral
    });

    numeralPromises.push(numProm);
  });

  Promise.all(numeralPromises)
  .then(numerals => {
    console.log('*************************');
    console.log(`${numerals.length} created.`);
    console.log('*************************');
    setTimeout(() => {
      console.log('Seed completed.');
      process.exit(0);
    }, 3000);
  })
  .catch(numErr => {
    console.log(numErr);
    process.exit(1);
  });
};

seed();