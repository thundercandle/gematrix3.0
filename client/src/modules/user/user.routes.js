import React from 'react'
import { Switch } from 'react-router-native'

import { Login } from './containers'
import { CoreLayout, AppRoute } from './../core'

export const UserRoutes = () => {
  return (
    <Switch>
      <AppRoute exact path="/login" component={Login} showNav={false} layout={CoreLayout}/>
    </Switch>
  )
}
