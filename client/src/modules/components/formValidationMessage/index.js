import React from 'react'
import { FormValidationMessage as Message } from 'react-native-elements'

export const FormValidationMessage = ({children, ...props}) => (
  <Message {...props}>
    { children }
  </Message>
)
