// Currently wrapper for react native elements

import React, { Component } from 'react'
import { StyleSheet, Platform } from 'react-native'
import { FormLabel as Label } from 'react-native-elements'

export class FormLabel extends Component {
  render(){
    return (
      <Label containerStyle={ styles.container } labelStyle={styles.label} {...this.props}/>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
  label: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
    left: 10,
    ...Platform.select({
      web: {
        left: 0
      }
    })
  }
})
