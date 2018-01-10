import React from 'react';
import { AppRegistry } from 'react-native';

import { StyleProvider, Container, Text, Content, Header, Button} from 'native-base'

import getTheme from './src/native-base-theme/components'
import variables from './src/native-base-theme/variables/platform'

class App extends React.Component {
  render() {
    return (
      <StyleProvider style={getTheme(variables)}>
        <Container>
          <Header/>
          <Button>
            <Text>Button</Text>
          </Button>
        </Container>
      </StyleProvider>
    );
  }

}


AppRegistry.registerComponent('App', () => App);
AppRegistry.runApplication('App', { rootTag: document.getElementById('root') });
