import React from 'react'
import { Switch, Redirect, Route } from 'react-router-native'

import { Login } from './containers'
import { CoreLayout, AppRoute } from './../core'

export const UserRoutes = () => (
  <Switch>
    <Redirect exact from='/' to='/login'/>
    <AppRoute exact path='/login' layout={CoreLayout} showNav={false} component={Login}/>
  </Switch>
)
