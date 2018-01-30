import React, { Component } from 'react'

import { Setup } from './setup'
import { UserRoutes } from './../modules'


export class App extends Component {
  render() {
    return (
      // Setup initializes all the core functionality, apollo, styling and router
      <Setup>
        <UserRoutes/>
      </Setup>
    )
  }
}
