import React, { Component } from 'react'

import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import fetch from 'cross-fetch'

import { StyleProvider, Container, Text, Content, Header, Button} from 'native-base'
import getTheme from './native-base-theme/components'
import variables from './native-base-theme/variables/platform'

import Numerals from './scenes/numerals'
//
// if (typeof process !== 'undefined') {
//     require('cross-fetch/polyfill');
// }
//
global.self = global;
//
const isDev = process.env.NODE_ENV === "development"

// Graphql provider setup
const graphqlApi = isDev ? "http://localhost:3000/graphql?" : process.env.GRAPHQLAPI

const client = new ApolloClient({
  link: new HttpLink({ uri: graphqlApi, fetch }),
  cache: new InMemoryCache()
})

class Main extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <StyleProvider style={getTheme(variables)}>
          <Numerals/>
        </StyleProvider>
      </ApolloProvider>

    );
  }
}

// class Main extends Component {
//   render() {
//     return <Text>Hello world</Text>
//   }
// }

export default Main
