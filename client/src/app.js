import React, { Component } from 'react'
import { Switch } from 'react-router-native'

import { Setup, CoreLayout } from './modules/core'
import { Login } from './modules/auth'

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
