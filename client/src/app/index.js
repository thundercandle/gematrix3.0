import React, { Component } from 'react'
import { Switch, Redirect, Route } from 'react-router-native'

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

// I can do this with barelling, but might be better to separate these concerns
import {
  GRAPHQLAPI,

  authResolvers,
  authLink,

  Router,
  HomeRoutes,
  UserRoutes,
  NotebookRoutes
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

export class App extends Component {
  render() {
    // Map routes and add them to a

    return (
      <ApolloProvider client={client}>
        <Router>
          <View style={{height: '100%'}}>
            <Route component={HomeRoutes}/>
            <Route component={UserRoutes}/>
            <Route component={NotebookRoutes}/>
            <Switch>
              <Redirect exact from="/" to="/notebooks"/>
            </Switch>
          </View>
        </Router>
      </ApolloProvider>
    )
  }
}
