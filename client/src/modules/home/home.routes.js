import React from 'react'
import { Switch } from 'react-router-native'
import { Home } from './home'
import { CoreLayout, AppRoute } from './../core'

export const HomeRoutes = () => {
return (
    <Switch>
      <AppRoute exact path="/home" component={Home} layout={CoreLayout} authenticate/>
    </Switch>
  )
}
