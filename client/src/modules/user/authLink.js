import { setContext } from 'apollo-link-context'
import gql from 'graphql-tag'

export const authLink = setContext((_, { headers, cache }) => {
  const query = gql `
    query auth @client {
      token
    }
  `

  const result = cache.readQuery({query})

  console.log(result)
  // get the authentication token from local storage if it exists
  // co
  // nst token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      // authorization: token ? `Bearer ${token}` : "",
    }
  }
});
