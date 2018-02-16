import React from 'react'
import { Route } from 'react-router-native'

export const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route {...rest} render={props => (
    <Layout {...rest}>
      <Component {...props} />
    </Layout>
  )} />
)
