import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import fetch from 'cross-fetch'

const isDev = process.env.NODE_ENV === "development"

// Graphql provider setup
const graphqlApi = isDev ? `http://192.168.16.26}:3000/graphql?` : process.env.GRAPHQLAPI

const client = new ApolloClient({
  link: new HttpLink({ uri: graphqlApi, fetch }),
  cache: new InMemoryCache()
})


export default ({ children }) => (
  <ApolloProvider client={client}>
    {children}
  </ApolloProvider>
)
