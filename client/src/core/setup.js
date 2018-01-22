import React, { Component } from 'react'
import { Route, Switch } from 'react-router-native'

import ApolloProvider from './apollo'
import StyleProvider from './styleProvider'

import { H1, Container, Text, Header } from 'native-base'
import { CoreLayout } from './layouts'
import { Router, Link } from './router'
import { MediaQuery } from './mediaQuery'

// Fix for self.fecth undefined in react-native
global.self = global;

const Layout = ({children}) => (
  <Container>
    <Header>
      <Text>Header</Text>
    </Header>
    {children}
  </Container>
)

const User = ({ match }) => (
  <Layout>
    <H1>Hello {match.params.username}!</H1>
  </Layout>
)

const Home = (username) => {
  return () => (
    <Layout>
    <Link to={`/user/${username}`}><Text>{username}</Text></Link>
    </Layout>
  )
}

export class Setup extends Component {
  render() {
    return (
      <ApolloProvider>
        <StyleProvider>
          <Router>
            <MediaQuery query={700}>
              {isSmall => isSmall
                ? <Switch>
                    <Route exact path="/" component={Home("heru")}/>
                    <Route exact path="/user/:username" component={User} />
                  </Switch>
                : <Switch>
                    <Route exact path="/" component={Home("michael")}/>
                    <Route exact path="/user/:username" component={User} />
                  </Switch>
              }
            </MediaQuery>
          </Router>
        </StyleProvider>
      </ApolloProvider>
    );
  }
}
