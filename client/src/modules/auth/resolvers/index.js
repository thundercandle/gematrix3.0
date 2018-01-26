import fetch from 'cross-fetch'

import { LOGINAPI } from './../../core'

export const authResolvers = {
  defaults: {
    login: {
      __typename: 'Login',
      currentUser: null,
      token: null,
      isAuthenticated: false
    }
  },
  resolvers: {
    Mutation: {
      login: (_, { email, password }, { cache }) => {

        const data = {
          email,
          password
        }

        return fetch(LOGINAPI, {
          method: 'post',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          },
        })
          .then(data => {
            console.log("returned")
            console.log(data)
          })
      }
    }
  }
}
