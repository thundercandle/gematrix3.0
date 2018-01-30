import fetch from 'cross-fetch'

import { LOGINAPI } from './../../core'

export const authResolvers = {
  defaults: {
    login: {
      __typename: 'login',
      token: null,
      status: null,
      errors: null,
      isAuthenticated: false,
    }
  },
  resolvers: {
    Mutation: {
      login: async (_, { email, password }, { cache }) => {

        const data = {
          email,
          password
        }

        try {
          const result = await fetch(LOGINAPI, {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json'
            },
          })

          if(result.status !== 200) {
            return {
              __typename: 'login',
              token: null,
              status: result.status,
              errors: result.statusText,
              isAuthenticated: false,
            }
          } else {
            const body = await result.json()

            const data = {
              __typename: 'login',
              token: body,
              status: result.status,
              errors: null,
              isAuthenticated: true,
            }

            cache.writeData({ data })
            return data
          }
        } catch(e) {
          console.log(e)
          return null
        }
      }
    }
  }
}
