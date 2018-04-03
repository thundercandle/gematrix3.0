const uuidv4 = require("uuid/v4");
const jsonfile = require("jsonfile");

import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";
import CsvReader from "promised-csv";

const SALT_ROUNDS = 10;
const OUTPUT_FILE = `${__dirname}/output.json`;

const newModel = (properties = {}) => ({
  id: uuidv4(),
  ...properties
});

// Basic seed data
const pfcNotebook = {
  title: "PFC Gematria Notebook",
  description:
    "Gematria Notebooks of Paul Foster Case scrapped from the public PDF"
};

const paulCaseUser = {
  username: "Paulcase",
  email: "pfc@project89.org",
  password: "paulcase",
  notebooks: [pfcNotebook]
};

// NDF OBJECTS!
const nodes = {
  valueType: "nodes",
  values: []
};

const lists = {
  valueType: "lists",
  values: []
};

const relations = {
  valueType: "relations",
  values: []
};

const updateModel = (model, updates) => {
  const updatedModel = Object.assign(model, {
    ...updates
  });
  return updatedModel;
};

const createNotebook = (notebook, user) =>
  updateModel(newModel(), {
    user,
    ...notebook
  });

const createNote = async (note, typeName, typeObject, user, notebook) => {
  return updateModel(newModel(), {
    ...note,
    _typename: "Note",
    [typeName]: typeObject,
    user,
    notebook
  });
};

const createWord = async (word, numeral, notebook, user) => {
  const newWord = newModel(word);
  let notes = [];

  if (word.entries && word.entries.length !== 0) {
    notes = word.entries.map(note => createNote(note, "word", newWord, user));
  }

  const updatedWord = await updateModel(newWord, {
    _typename: "Word",
    notebooks: [notebook],
    numeral,
    entry: word.word,
    noteIds: notes,
    user,
    language: word.language === "" ? "hebrew" : word.language
  });
};

const createNumeral = (numeral, user, notebook) => {
  const newNumeral = newModel(numeral);
  // In the json dump, comments = notes and entries = words

  const notes = numeral.comments.map(note =>
    createNote(note, "numeral", newNumeral, user, notebook)
  );

  const words = numeral.entries.map(word =>
    createWord(word, newNumeral, notebook, user)
  );

  return updateModel(newNumeral, {
    _typename: "Numeral",
    user,
    noteIds: notes,
    wordIds: words
  });
};

const createUser = async ({ password, notebooks, ...rest }) => {
  const newUser = newModel();
  const hash = await bcrypt.hash(password, SALT_ROUNDS);
  let newNotebooks = [];

  if (notebooks && notebooks.length !== 0) {
    newNotebooks = notebooks.map(notebook =>
      createNotebook(notebook, newUser.id)
    );
  }
  return updateModel(newUser, {
    hash,

    notebooks: newNotebooks,
    ...rest
  });
};

const loadLetters = (reader, filePath) =>
  reader.read(filePath, data => data).then(
    dataArr =>
      dataArr.reduce(
        (acc, row) => {
          if (acc.keys.length === 0) {
            acc.keys = row;
            return acc;
          }

          acc.letters.push(
            acc.keys.reduce((total, key, i, a) => {
              total[key] = row[i];
              return total;
            }, {})
          );

          return acc;
        },
        { keys: [], letters: [] }
      ).letters
  );

const createLetter = async letter =>
  updateModel(newModel(), {
    _typename: "Letter",
    ...letter
  });

const main = async () => {
  const reader = new CsvReader();

  const pfcNotes = fs.readFileSync(
    path.join(__dirname, "json/pfc-notebook.json"),
    "utf8"
  );
  const jsonData = JSON.parse(pfcNotes);

  const user = await createUser(paulCaseUser);
  const letters = await loadLetters(reader, `${__dirname}/tables/letters.csv`);

  // We are only starting with one notebook...
  const notebook = user.notebooks[0];

  let allNumerals = jsonData.map(rawNumeral =>
    createNumeral(rawNumeral, user, notebook)
  );

  let allLetters = [];

  // try {
  //   allNumerals = await Promise.all(
  //     jsonData.map(rawNumeral => createNumeral(rawNumeral, user, notebook))
  //   );
  //   allLetters = await Promise.all(
  //     letters.map(letter => createLetter(letter, user))
  //   );
  // } catch (e) {
  //   console.log(e);
  // }

  const final = {
    users: [user],
    numerals: allNumerals
  };

  // Final thing to do is to parse the output into NDF format.

  jsonfile.writeFile(OUTPUT_FILE, final, {spaces: 2});

  setTimeout(() => {
    console.log("*************************");
    console.log(`User created`);
    console.log(user);
    console.log(`${allNumerals.length} created.`);
    // console.log(`${allLetters.length} created.`);
    console.log("*************************");
    console.log("Seed completed.");
    process.exit(0);
  }, 3000);
};

process.on("unhandledRejection", error => {
  console.log("AGHHHHHHHHHHHHHHHHHHHHHHHH");
  console.log("unhandledRejection", error);
});

main();
