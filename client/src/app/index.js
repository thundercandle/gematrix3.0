import React, { Component } from 'react'
import { Switch, Redirect } from 'react-router-native'

// Apollo dependencies
import { AsyncStorage, View } from 'react-native'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { ApolloLink } from 'apollo-link'
import { withClientState } from 'apollo-link-state'
import { InMemoryCache } from 'apollo-cache-inmemory'
import fetch from 'cross-fetch'
// import merge from 'lodash.merge';

// Custom router to work with web and mobile
import { Router } from './../modules'

// I can do this with barelling, but might be better to separate these concerns
import {
  GRAPHQLAPI,

  authResolvers,
  authLink,

  AppRoute,
  HomeRoutes,
  UserRoutes,
} from './../modules'

// Routes
import {

 } from './../modules'

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

// Set up routes from export route objects in modules
const routes = [
  ...UserRoutes,
  ...HomeRoutes
]

const generateRoutes = routesArr =>
  routesArr.map((props, key) => (
    <AppRoute {...props} key={key}/>
  ))

export class App extends Component {
  render() {
    // Map routes and add them to a

    return (
      <ApolloProvider client={client}>
        <Router>
          <Switch>
            { generateRoutes(routes) }
            <Redirect from='*' to='/login'/>
          </Switch>
        </Router>
      </ApolloProvider>
    )
  }
}
