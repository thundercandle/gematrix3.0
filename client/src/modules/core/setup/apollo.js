import React from 'react'
import { AsyncStorage } from 'react-native'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { ApolloLink } from 'apollo-link'
import { withClientState } from 'apollo-link-state'
import { InMemoryCache } from 'apollo-cache-inmemory'
import fetch from 'cross-fetch'
import merge from 'lodash.merge';

import { authResolvers } from './../../auth'
import { GRAPHQLAPI } from './../config'

const cache = new InMemoryCache()
const httpLink = new HttpLink({ uri: GRAPHQLAPI, fetch })
const stateLink = withClientState({
  ...authResolvers,
  cache
})

const client = new ApolloClient({
  link: ApolloLink.from([stateLink, httpLink]),
  cache,
  storage: AsyncStorage
})

export default ({ children }) => (
  <ApolloProvider client={client}>
    {children}
  </ApolloProvider>
)
