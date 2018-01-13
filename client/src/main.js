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

// Fix for self.fecth undefined in react-native
global.self = global;

const isDev = process.env.NODE_ENV === "development"
//"http://127.0.0.1:3000/graphql?"
const devApi = "http://192.168.16.22:3000/graphql?"

// Graphql provider setup
const graphqlApi = isDev ? devApi : process.env.GRAPHQLAPI

const client = new ApolloClient({
  link: new HttpLink({ uri: graphqlApi, fetch }),
  cache: new InMemoryCache()
})

class Main extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <StyleProvider style={getTheme(variables)}>
          <Container>
            <Header/>
            <Content>
              <Numerals/>
            </Content>
          </Container>
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
