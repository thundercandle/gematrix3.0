# GEMATRIX

The gematrix is a platform for the recording, exploration, and sharing of philosophical, qabalistic and spiritual knowledge and experiences.  It utilizes the numerical basis of letters, as well as the symbolic correspondences attributed to those letters, to intersect various ideas to find inherent and latent meaning.

It allows a user to create notebooks of numbers, words or letters, to add notes and notes on their findings, and to share those findings with others of like mind.

Entries and words can be pulled from public notebooks, both created and curated by admins as well as other users who share their notebooks publicly.

A user friending/following could be utilized, as well as shared notebooks/notebooks that multiple contributors can add to.

Another primary feature will be the generation of audio/visual experiences based on sequences of letters, working with sound and color, brainwave entrainment technologies, and eventually neuro-feedback.  Slideshows can be set up that are sequences of pure sound/color based on letter/color/note attributions, as well as meditative symbolic sequences.

# Installing

MongoDB will need to be installed locally.  Easiest to do through homebrew.  

Yarn is suggested for installing dependencies.  Once cloned, `cd` into the root of the project and run `yarn`.

After dependencies are installed, you can see the database with `npm run seed:pfc`.

Finally, with your MongoDB server running, run `npm start`.  You can access the interactive graphql at localhost:2368/graphiql.

# Development Style

This app will utilize component driven development, focusing on the creation of core components that can be shared across the full react ecosystem of web, mobile and desktop and act as atomic elements of the design of the various areas.

React Storybook will be used to develop the functionality of each component, focusing on state changes and user interactions.

Jest and enzyme will be utilized as a testing framework with components to ensure proper state change of components.

# Technologies

A list of the technologies that this project leverages.

## Backend

- Node: This is a given.  Our backend is javasceipt based.  We utilize node 9.2.1, the latest Node release.  It does have support for ES6 Modules, however it was not working with some NPM libraries.
- Node-babel: Node-babel allows us to transform our JS code before it is run by Node.  We can benefit from babel plugins as well as utilizing ES6 and even ES7.
- Graphql: GraphQL is an amazing new communication protocol for structuring queries and data mutations for declarative data calling from the client.
- Graphql-tools:  Provided by the Apollo project, graphql-tools provide an extensive set of tools for structuring and running a graphql server.
- MongoDB/Mongoose: Our primary database of choice is the noSQL database MongoDB.  It structures our database as json documents and integrates very cleanly with the rest of the JS ecosystem.
- Passport: User authentication.  Still under consideration.

## Frontend

- React: React will be our primary front-end view systeml, and to allow for easy compn.  We will extend this with either react-primite or react-native-web to allow us to utilize the same primitive types across react and react-native.
- React-native: Write iOS and Android apps with JS.  Alongside a project like react-primitives, it allows us to re-use many core components across all platforms.
- Expo: Expo will be integrated as a means of building, testing and serving our app. It provides many API's to react-native, helps to submit apps to the app store, and provides many features out of the box.  There is also an optional IDE that can be utilized in place of Atom/Sublime/VSCdode
- Apollo-link: Local state will be managed alongside remote state utilizing apollo-link.  Apollo-link gives us interfaces to various resources, including HTTP, Websockets and local storage.  We can remove the need for redux completely by utilizing apollo-link.  Since Link is built on top of redux, we will still get access to the amazing resource library available
- Apollo-client: This is our GraphQL client of choice.  It integrates cleanly with components, and replaces many of the uses that redux has had.
- React-navigation:  Navigation of choice.  Good state management.  Works across web and native.

# Design Notes

The gematrix and its sister project the imaginatrix require an intricate set of data relationships and structural design to make it function as a cohesive and holographic system.  Every element is, in some sense, contained in every other.  English words can be translated into hebrew, hebrew words are associated with a numerical value based on what they add up to. Every symbol can be a word, every word a number, and every number associated with other numbers.

To achieve this requires conscientious and careful planning.  Creating a language for these different types is important.  GraphQL allows us to create these types with ease, along with the relationships between them, and even allowing them to contains themselves.  This allows for powerful querying that a normal rest based API would have a hard time dealing with.

This should be, ultimately, adaptable to any set of symbols or languages.  Not all symbols will be able to be easily broken down into a numerical basis.

## Core types:

Each core type needs to be defined, as well as their properties, purposes and relationships to eachother clearly laid out.

#### User

User type is relatively simple.  It contains all of the aspects of a user.  Personal information as well as notebooks owned and maintained by a user.

```
type User {
    id: ID!
    email: String!
    password: String!
    username: String!
    notebooks: [Notebook!]!
}
```

#### Notebook

Notebooks allow for the aggregation of Numerals, which form the core form of organization of all data.  Everything can be broken down into numerals, added, and associated.

A notebook can be all numbers (a sepher sephiroth), as well as a table of various correspondences, such as the Paths of Wisdom (777), and the different tables of 777.  

```
type Notebook {
    id: ID!
    title: String!
    description: String!
    user: User!
    numerals: [Numeral!]!
}
```

#### Numeral

A numeral is a prinary unit of our system of organization.  It acts as a primary vector for the transformation of different types into other types. It forms the basis of the mathematics of letters, as every letter will be associated with a numeral.  

In practice, there should only be one numeral for every number.  This makes is a vector of multiple meanings across a users data.

Numerals have words that add up to them, and which are assocated with them.  Numerals can have individual notes about themselves as well to help explain the properties of the number.

```
type Numeral {
    id: ID!
    value: Int!
    user: User
    equations: [String!]
    notebooks: [Notebook]!
    words: [Word]
    notes: [Note]
    letters: [Letter]

}
```
#### Word

A word is associated with a language.  It also adds up to a particular number. It can also be part of a particular dictionary, which allows words to be associated together in various ways.

A word is also composed of letters of a language, and each letter can be expanded out to be a full set of correspondences, as well as addition, the displaying of related symbols, etc.

Words can be translated into other languages, and should be able to be easily called in a request.  It will provide an easy means to request different kinds of information that is interrlated.


```
type Word {
    id: ID!
    word: String!
    letters: [Letter]
    numeral: Numeral!
    language: Language!
    pronunciation: String!
    definition: String!
    notes: [Note]
    see: [Numeral]
    dictionary: [Dictionary]
    translations: [Word]
}
```

#### Note

A note is a single note about a particularly numeral (might be expanded to include other types as well).

```
type Note {
    id: ID!
    type: String
    typeId: ID!
    content: String!
    see: [Numeral]
}
```

#### Letter

A letter is the unit of a word.  It can have a numerical value associated, as well as correspondences which related to it.  It is part of a particular language. It has a unicode character which displays it.  It also has a transliteration into english, and perhaps a phonetic value.

```
{
    id: ID!
    pronunciation: String
    character: String
    transliteration: String
    value: Int
    language: String
    numeral: Numeral
    correspondences: [Correspondence]
}
```

#### Set
This is a set of correspondences. It joins together groups of correspondences.

```
{
    id: ID!
    title: String
    notes: [Note]
    correspondences: [Correspondence]
}
```

#### Correspondence
A correspondence is a single unit, a "cell" in 777.  It can have a type, which allows it to be associated with a numeral, or a word.

```
{
    id: ID!
    set: Set
    content: String!
    type: String
    typeId: ID!
    notes: [Note]
}
```

####Notes

- Resolvers for authentication/authorization
    - (Article on Medium)[https://medium.com/@justin_mandzik/graphql-server-after-hello-world-a190d88c14eb]
    - (apollo-resolvers)[https://github.com/thebigredgeek/apollo-resolvers]
