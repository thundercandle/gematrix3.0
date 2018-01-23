import React, { Component } from 'react'
import { Switch } from 'react-router-native'
import { H1, Container, Text, Header, Content } from 'native-base'

import { Link, Setup, CoreLayout } from './core'

const User = ({ match }) => (
  <Content>
    <H1>Hello {match.params.username}!</H1>
  </Content>
)

const Home = (username) => {
  return () => (
    <Content>
      <Link to={`/user/${username}`}><Text>{username}</Text></Link>
    </Content>
  )
}

class App extends Component {
  render() {
    return (
      // Setup initializes all the core functionality, apollo, styling and router
      <Setup>
        <Switch>
          <CoreLayout exact path="/" component={Home("Heru")}/>
          <CoreLayout exact path="/user/:username" component ={User}/>
        </Switch>
      </Setup>
    )
  }
}

export default App
