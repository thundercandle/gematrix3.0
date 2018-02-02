import React, { Component } from 'react'
import { KeyboardAvoidingView } from 'react-native'

import { Button } from 'react-native-elements';

import { LoginLayout } from '../components'
// import { loginStyles as styles } from './../styles'
// import { LoginMutation } from './../graphql'

export class Login extends Component {
  state = {
    email: "",
    password: "",
    error: null
  }

  submitLogin(triggerMutation) {
    // return a function that will make the mutation trigger accessible
    // This allows us to get the result of the mutation
    return async () => {
      const result = await triggerMutation()

      // Show basic error
      if(result.error) {
        this.setState({
          ...this.state,
          error: result.error
        })
      } else {
        // Else login was a success, so remove error and redirect
        this.setState({
          ...this.state,
          error: null
        })
      }
    }
  }

  render() {
    return (
      <LoginLayout>
        <Button
        title='BUTTON'
        backgroundColor='red'
        loadingRight={true}
        raised={true}
        onPress={() => console.log("pressed")}
        />

        <Button
        raised
        icon={{name: 'cached'}}
        title='BUTTON WITH ICON' />

        <Button
        large
        iconRight={{name: 'code'}}
        title='LARGE WITH RIGHT ICON' />

      </LoginLayout>
    )
  }
}
