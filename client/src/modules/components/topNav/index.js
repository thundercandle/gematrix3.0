import React from 'react'
import { Text, StyleSheet, Platform } from 'react-native'
import { Header } from 'react-native-elements'

export const TopNav = ({ location, history }) => (
  <Header outerContainerStyles={styles.topnav}>
    <Text style={styles.link}>Gematrix</Text>
  </Header>
)

const styles = StyleSheet.create({
  topnav: {
    ...Platform.select({
      web: {
        height: 50
      }
    })
  },
  link: {
    color: 'white',
    ...Platform.select({
      web: {
        cursor: 'pointer'
      }
    })
  }
})
