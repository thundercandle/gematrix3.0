import React from 'react'
import { Text } from 'react-native'
import { Header } from 'react-native-elements'

export const TopNav = ({ location, history }) => (
  <Header outerContainerStyles={{height: 50}}>
    <Text style={{color: 'white', cursor: 'pointer'}}>Gematrix</Text>
  </Header>
)
