import React from 'react'
import { StyleProvider, Container, Text, Content, Header, Button} from 'native-base'

import getTheme from './native-base-theme/components'
import variables from './native-base-theme/variables/platform'

class Main extends React.Component {
  render() {
    return (
      <StyleProvider style={getTheme(variables)}>
        <Container>
          <Header/>
          <Content>
            <Button>
              <Text>Hello world</Text>
            </Button>
          </Content>
        </Container>
      </StyleProvider>
    );
  }
}

export default Main
