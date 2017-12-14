# GEMATRIX

The gematrix is a platform for the recording, exploration, and sharing of qabalistic and magical knowledge and experiences.  It utilizes the numerical basis of letters, as well as the symbolic correpondences attributed to those letters, to intersect various ideas to find inherent and latent meaning.

It allows a user to create collections of numbers, words or letters, to add comments and notes on their findings, and to share those findings with others of like mind.

Entries and words can be pulled from public collections, bot created and curated by admins as well as other users who share their notebooks publicly.

A user friending/following could be utilized, as well as shared collections/notebooks that multiple contributors can add to.

Another primary feature will be the generation of audio/visual experiences based on sequences of letters.  Slideshows can be set up that are sequences of pure sound/color based on letter/color/note atributions, as well as meditative tarot sequences.

# Installing

MongoDB will need to be installed locally.  Easiest to do through homebrew.  

Yarn is suggested for installing dependencies.  Once cloned, `cd` into the root of the project and run `yarn`.

After dependencies are installed, you can see the database with `npm run seed:pfc`.

Finally, with your MongoDB server running, run `npm start`.  You can access the interactive graphql at localhost:2368/graphiql.

# Developmet Style

This app will utilize component driven development, focusing on the creation of core components that can be shared across the full react ecosystem of web, mobile and desktop and act as atomic elements of the design of the various areas.

To accomplish this approach, we will design components utilizing react-sketch app for integration into Sketch, rendering each component utilizing the program, and access live data to do so.

React Storybook will be used to develope the functionality of each component, focusing on state changes and user interactions.

Jest will be utilized as a testing framework with components to ensure proper state change of components.

# Technologies

A list of the technologies that this project leverages.

## Backend

- Node: This is a given.  Our backend is javasceipt based.  We utilize node 9.2.1, the latest Node release.  It does have support for ES6 Modules, however it was not working with some NPM libraries.
- Node-babel: Node-babel allows us to transform our JS code before it is run by Node.  We can benefit from babel plugins as well as utilizing ES6 and even ES7.
- Graphql: GraphQL is an amazing new communication protocol for structuring queries and data mutations for declaritive data calling from the client.
- Graphql-tools:  Provided by the Apollo project, graphql-tools provide an extensive set of tools for structuring and running a graphql server.
- MongoDB/Mongoose: Our primary database of choice is the noSQL database MongoDB.  It structures our database as json documents and integrates very cleanly with the rest of the JS ecosystem.
- Passport: User authentication.  Still under consideration.

## Frontend

- React: React will be our primary front-end view systeml, and to allow for easy compn.  We will extend this with either react-primite or react-native-web to allow us to utilize the same primitive types across react and react-native.
- React-sketch-app: Render react components in sketch.  Build prototypes with code as the single source of truth for design. 
- React-native: Write iOS and Android apps with JS.  Alongside a project like react-primitives, it allows us to re-use many core components across all platforms.
- React-primitives: Standardize primitive types across web and native.
- Expo: Expo will be integrated as a means of building, testing and serving our app. It provides many API's to react-native, helps to submit apps to the app store, and provides many features out of the box.  There is also an optional IDE that can be utilized in place of Atom/Sublime/VSCdode
- Apollo-link: Local state will be managed alongside remote state utilizing apollo-link.  Apollo-link gices us interfaces ot various resources, including HTTP, Websockets and local storage.  We can remove the need for redux completely by utilizing apollo-link.  Since Link is built on top of redux, we will still get access to the amazing resource library available
- Apollo-client: This is our GraphQL client of choice.  It integrates cleanly with components, and replaces many of the uses that redux has had.
- React-navigation:  Navigation of choice.  Good state management.  Works across web and native.

#### In consideration
- Ignite: Ignite gives us CLI options for creating an app based on a boilerplate. It has some basic functions that will be


# Design Notes
The gematrix and its sister project the imaginatrix require an intricate set of data relationships and structural design to make it function as a cohesive and holographic system.  Every element is, in some sense, contained in every other.  English words can be translated into hebrew, hebrew words are associated with a numerical value based on what they add up to. Every symbol can be a word, every word a number, and every number associated with other numbers.

To acheive this requires a conscientous and careful planning.  Creating a language for these different types is important.  GraphQL allows us to create these types with ease, to create relationships between them, and even allowing them to contains themselves.  This allows for powerful querying that a normal rest based API would have a hard time dealing with.

This should be, ultimately adaptable to any set of symbols or language.  Not all symbols will be able to be easily broken down into a numerical basis.

## File structure

Current file structure is based upon separation by feature.  The connector folder contains the connector code as well as models utilized by the database, in this case Mongoose models.  These should not be confused with the graphql models that utilize the connector to access data in various ways.

The connector folder might be a little too deep for my liking and could probably be flattened a little.  Since there is only one connector currently, the top level folder could be a little excessive.

The schema should be coded to autoload based on file type endings in the various files.  That is an optimization however.

```
➜  Gematrix
└── Graphql
    ├── connectors
    |   ├── mongoose
    |   │   ├── models
    |   |   │   ├── comment.js
    |   |   │   ├── entry.js
    |   |   │   ├── numeral.js
    |   |   │   ├── user.js
    |   │   ├── mongo.connector.js
    |── schema
        ├── user
        │   ├── user.model.js
        │   ├── user.connector.js
        │   ├── user.mutations.mutation
        │   ├── user.query.mutation
        │   └── user.type.mutation
        ├── numeral
        │   ├── numeral.model.js
        │   ├── numeral.connector.mutation
        │   ├── numeral.mutations.mutation
        │   ├── numeral.query.mutation
        │   └── numeral.type.mutation
        ├── common
        │   ├── directives.mutation
        │   ├── enum.mutation
        │   └── pagination.mutation
        └── schema.js
```


## Core types:

Each core type needs to be defined, as well as their properties, purposes and relationships to eachother clearly laid out.

#### User

User type is relatively simple.  It contains all of the aspects of a user.  Personal information as well as collections owned and maintained by a user.

```
type User {
    id: ID!
    email: String!
    password: String!
    username: String!
    collections: [Collection!]!
}
```

#### Collection

Collections allow for the aggregation of Numerals, which form the core form of organization of all data.  Everything can be broken down into numerals, added, and associated.

A collection can be all numbers (a sepher sephiroth), as well as a table of various correspondences, such as the Paths of Wisdom (777), and the different tables of 777.  

```
type Collection {
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

Numerals have words that add up to them, and which are assocated with them.  Numerals can have individual comments about themselves as well to help explain the properties of the number.

```
type Numeral {
    id: ID!
    value: Int!
    user: User
    equations: [String!]
    collections: [Collection]! 
    words: [Word]
    comments: [Comment]
    letters: [Letter]

}
```
#### Word

A word is assosciated with a language.  It also adds up to a particular number. It can also be part of a particular dictionary, which allows words to be associated together in various ways.

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
    comments: [Comment]
    see: [Numeral]
    dictionary: [Dictionary]
    translations: [Word]
}
```

#### Comment

A comment is a single note about a particularly numeral (might be expanded to include other types as well).

```
type Comment {
    id: ID!
    type: String
    typeId: ID!
    content: String!
    see: [Numeral]
}
```

#### Dictionary

A dictionary gives us a semantic way to divide and organize words.  We can organize them by language, by symbol system, or by some other abstract idea related to the words.

```
{
    id: ID!
    title: String
    description: String
    language: String
    words: [Word]
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
    comments: [Comment]
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
    comments: [Comment]
}
```




Notes

- Resolvers for authentication/authorization
    - (Article on Medium)[https://medium.com/@justin_mandzik/graphql-server-after-hello-world-a190d88c14eb]
    - (apollo-resolvers)[https://github.com/thebigredgeek/apollo-resolvers]

### Ideas

- VR: Vibrate and create colored ripples based on the tonal vibration shoot out from you 
- 