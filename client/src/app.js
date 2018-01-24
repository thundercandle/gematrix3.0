import React, { Component } from 'react'
import { Switch } from 'react-router-native'

import { Setup, CoreLayout } from './core'
import { Login } from './auth'


// NOTES
// Need layout helpers for centering native-base components on desktop

class App extends Component {
  render() {
    return (
      // Setup initializes all the core functionality, apollo, styling and router
      <Setup>
        <Switch>
          <CoreLayout exact path="/" component={Login}/>
        </Switch>
      </Setup>
    )
  }
}

export default App
