import React, { Component } from 'react'

import { Router } from './../../modules'
import ApolloProvider from './apollo'
import StyleProvider from './styleProvider'

// Fix for self.fetch undefined in react-native
global.self = global;

export class Setup extends Component {
  render() {
    return (
      <ApolloProvider>
        <StyleProvider>
          <Router>
            {this.props.children}
          </Router>
        </StyleProvider>
      </ApolloProvider>
    );
  }
}
