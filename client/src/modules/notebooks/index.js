import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-native'
import { View, Text } from 'react-native'
import { List, ListItem } from 'react-native-elements'

import { CoreLayout, AppRoute, MediaQuery, breakpoints, Link } from './../core'

const notes = [
  {
    title: 'test',
    id: 1234567890,
    numerals: [
      { value: 1 },
      { value: 2 },
      { value: 3 },
      { value: 4 }
    ]
  },
  {
    title: 'test2',
    id: 1234567891,
    numerals: [
      { value: 12 },
      { value: 22 },
      { value: 33 },
      { value: 44 },
      { value: 55 },
    ]
  },
  {
    title: 'test3',
    id: 1234567892,
    numerals: [
      { value: 4 },
      { value: 9 },
      { value: 123 },
      { value: 111 },
      { value: 53 },
    ]
  },
  {
    title: 'test4',
    id: 1234567893,
    numerals: [
      { value: 4},
      { value: 5 },
      { value: 89 },
      { value: 47 },
      { value: 30 },
    ]
  },
  {
    title: 'test5',
    id: 1234567894,
    numerals: [
      { value: 49},
      { value: 53 },
      { value: 93 },
      { value: 475 },
      { value: 300 },
    ]
  },
  {
    title: 'test6',
    id: 1234567895,
    numerals: [
      { value: 45},
      { value: 765 },
      { value: 890 },
      { value: 471 },
      { value: 306 },
    ]
  }
]

const ListNotebooks = () => (
  <List containerStyle={{marginBottom: 20}}>
    { notes.map((n, i) => (
        <Link to={`/notebooks/${n.id}`} key={i}>
          <View>
            <ListItem
              title={n.title}
            />
          </View>
        </Link>
    ))}
  </List>
)

const NotebookContent = ({match}) => {
  const notebook = notes.filter(note => note.id === +match.params.id)
  console.log(notebook)

  return (
    <List containerStyle={{marginBottom: 20}}>
      { notebook[0].numerals.map((n, i) => (
        <ListItem key={i} title={n.value} hideChevron={true}/>
      ))}
    </List>
  )
}

const NotebookNav = () => (
  <View style={{height: '100%', flex: 1, backgroundColor: '#4e4e4e'}}>
    <Switch>
      <Route exact path="/notebooks" component={ListNotebooks}/>
      <Route exact path="/notebooks/dashboard" component={ListNotebooks}/>
      <Route exact path="/notebooks/:id" component={NotebookContent}/>
    </Switch>
  </View>
)

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
