// Currently wrapper for react native elements

import React, { Component } from 'react'
import { FormLabel as Label } from 'react-native-elements'

export class FormLabel extends Component {
  render(){
    return (
      <Label {...this.props}/>
    )
  }
}
