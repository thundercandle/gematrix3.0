import React, { Component } from 'react'

import ApolloProvider from './apollo'
import StyleProvider from './styleProvider'

import { Text } from 'native-base'
import { CoreLayout } from './layouts'

// Fix for self.fecth undefined in react-native
global.self = global;

export class Setup extends Component {
  render() {
    return (
      <ApolloProvider>
        <StyleProvider>
          <CoreLayout>
            <Text>Hello world</Text>
          </CoreLayout>
        </StyleProvider>
      </ApolloProvider>
    );
  }
}
