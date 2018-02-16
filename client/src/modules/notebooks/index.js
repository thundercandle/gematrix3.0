import React, { Component } from 'react'
import { Switch, Route } from 'react-router-native'
import { View, Text } from 'react-native'

import { CoreLayout, AppRoute } from './../core'

export class Notebooks extends Component {
  render() {
    return (
      <View>
        <Text>Notebooks</Text>
      </View>
    )
  }
}

export const NotebookRoutes = () => {
  return (
    <Switch>
      <AppRoute exact path="/notebooks" component={Notebooks} layout={CoreLayout}/>
    </Switch>
  )
}
