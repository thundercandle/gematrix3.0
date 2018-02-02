import React from 'react'
import { View } from 'react-native'
import { Route } from 'react-router-native'
import { TopNav } from './../components'

// Possible example of a layout component working with react-router
// Not sure yet on passing through functions that change state, such as
// showing back arrows to navigate backwards

export const CoreLayout = ({ component: Component, ...rest}) => {
  return (
    <Route {...rest} render={props => (
        <View>
          <TopNav history={props.history} location={props.location}/>
          <Component {...props} />
        </View>
    )} />
  )
}
