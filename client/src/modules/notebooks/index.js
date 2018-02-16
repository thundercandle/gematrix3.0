import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-native'
import { View, Text } from 'react-native'
import { List, ListItem } from 'react-native-elements'

import { CoreLayout, AppRoute, MediaQuery, breakpoints, Link } from './../core'

const DetailLayout = ({ children }) => (
  <View style={{flex: 2, backgroundColor: '#4e4e4e', height: '100%'}}>
    { children }
  </View>
)

const Dashboard = () => (
  <DetailLayout><Text>Dashboard!</Text></DetailLayout>
)


const Notebook = ({ match }) => (
  <DetailLayout><Text>Notebook: {match.params.id}</Text></DetailLayout>
)

const notes = [
  {
    title: 'test',
    id: 1234567890
  },
  {
    title: 'test2',
    id: 1234567891
  },
  {
    title: 'test3',
    id: 1234567892
  },
  {
    title: 'test4',
    id: 1234567893
  },
  {
    title: 'test5',
    id: 1234567894
  },
  {
    title: 'test6',
    id: 1234567895
  }
]

const NotebookNav = ({}) => (
  <View style={{height: '100%', flex: 1, backgroundColor: '#4e4e4e'}}>
    <List containerStyle={{marginBottom: 20}}>
      {
        notes.map((n, i) => (
          <Link to={`/notebooks/${n.id}`} key={i}>
            <View>
              <ListItem
                title={n.title}
              />
            </View>
          </Link>
        ))
      }
    </List>
  </View>
)

const MobileRoutes = () => (
  <Switch>
    <Route exact path="/notebooks" component={NotebookNav}/>
    <Route exact path="/notebooks/dashboard" component={Dashboard}/>
    <Route path="/notebooks/:id" component={Notebook}/>
  </Switch>
)

const DesktopRoutes = () => (
  <View style={{flexDirection: 'row', height: '100%'}}>
    <NotebookNav/>
    <Switch>
      <Route path="/notebooks/dashboard" component={Dashboard}/>
      <Route path="/notebooks/:id" component={Notebook}/>
      <Redirect from="/notebooks" to="/notebooks/dashboard"/>
    </Switch>
  </View>
)

class Notebooks extends Component {
  render() {
    return (
      <MediaQuery isSmaller={breakpoints.tablet}>
        { isSmaller =>
            isSmaller
            ? <MobileRoutes/>
            : <DesktopRoutes/>
        }
      </MediaQuery>
    )
  }
}

export const NotebookRoutes = () => {
  return (
    <Switch>
      <AppRoute path="/notebooks" component={Notebooks} layout={CoreLayout}/>
    </Switch>
  )
}
