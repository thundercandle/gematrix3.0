import React, { Component } from 'react'

// Apollo dependencies
import { AsyncStorage } from 'react-native'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { ApolloLink } from 'apollo-link'
import { withClientState } from 'apollo-link-state'
import { InMemoryCache } from 'apollo-cache-inmemory'
import fetch from 'cross-fetch'
// import merge from 'lodash.merge';

// Custom router to work with web and mobile
import { Router } from './../modules'

// I can do this with barelling, but might be better to separate these concerns
import { authResolvers, GRAPHQLAPI } from './../modules'
import { authLink } from './../modules'

// Routes
import { UserRoutes } from './../modules'

// Fix for self.fetch undefined in react-native
global.self = global;

// Apollo setup
const cache = new InMemoryCache()
const httpLink = createHttpLink({ uri: GRAPHQLAPI, fetch })
const stateLink = withClientState({
  ...authResolvers,
  cache
})

const client = new ApolloClient({
  link: ApolloLink.from([
    stateLink,
    authLink,
    httpLink]),
  cache,
  storage: AsyncStorage
})

export class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <UserRoutes/>
        </Router>
      </ApolloProvider>
    )
  }
}
