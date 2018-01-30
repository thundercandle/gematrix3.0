import React from 'react'
import { Switch, Redirect } from 'react-router-native'

import { CoreLayout } from './../core'
import { Login } from './containers'

export const UserRoutes = () => (
  <Switch>
    <Redirect exact from='/' to='/login'/>
    <CoreLayout exact path="/login" component={Login}/>
  </Switch>
)
