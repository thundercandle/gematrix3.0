import React, { Component } from 'react'
import { Switch } from 'react-router-native'

import { Setup } from './setup'
import { Login, CoreLayout } from './../modules'

export class App extends Component {
  render() {
    console.log("Setup", Setup)
    console.log("Layout", CoreLayout)
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
