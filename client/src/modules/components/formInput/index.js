// Currently wrapper for react native elements

import React, { Component } from 'react'
import { FormInput as Input } from 'react-native-elements'

import styles from './formInput.styles'

export class FormInput extends Component {
  render() {
    return (<Input inputStyle={styles.inputField} {...this.props}/>)
  }
}
