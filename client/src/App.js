import React from 'react'
import { Text } from 'react-native'
import { StyleProvider, Container } from 'native-base'

import getTheme from './native-base-theme/components'

class App extends React.Component {
  render() {
    return (
      <StyleProvider theme={getTheme()}>
        <Container>
          <Text>Hello world</Text>
        </Container>
      </StyleProvider>
    )
  }
}

export default App
