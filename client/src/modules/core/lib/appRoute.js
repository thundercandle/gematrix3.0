import React, { Component } from 'react'
import { Route } from 'react-router-native'

export class AppRoute extends Component {
  render() {
    const { component: Component, layout: Layout, ...rest } = this.props

    return (
      <Route {...rest} render={props => (
        <Layout {...rest}>
          <Component {...props} />
        </Layout>
      )} />
    )
  }
}
