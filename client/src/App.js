import React from 'react';
import { StyleSheet } from 'react-native';

import Main from './main'

class App extends React.Component {
  render() {
    return (
      <Main/>
    );
  }
}

const styles = StyleSheet.create({
  box: { padding: 10 },
  text: { fontWeight: 'bold' }
});

export default App;
