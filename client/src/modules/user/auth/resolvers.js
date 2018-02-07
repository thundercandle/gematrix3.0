// import fetch from 'cross-fetch'

import { LOGINAPI } from './../../core'

export const authResolvers = {
  defaults: {
    auth: {
      __typename: 'auth',
      token: null,
      status: null,
      error: null,
      isAuthenticated: false,
    }
  },
  resolvers: {
    Mutation: {
      auth: async (_, { email, password }, { cache }) => {
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
            const data = {
              __typename: 'auth',
              token: null,
              error: true,
              isAuthenticated: false,
            }

            cache.writeData({ data })

            return data
          } else {
            const body = await result.json()

            const data = {
              __typename: 'auth',
              token: body.token,
              error: null,
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
    },
    logout: (_, args, { cache }) => {
      const data = {
        __typename: 'auth',
        token: null,
        error: null,
        isAuthenticated: false,
      }

      cache.writeData(data)

      return data
    }
  }
}
