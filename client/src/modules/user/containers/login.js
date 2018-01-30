import React, { Component } from 'react'
import { KeyboardAvoidingView } from 'react-native'

import {
  Content,
  Form,
  Item,
  Input,
  Button,
  Text,
  H1
} from 'native-base'

import { LoginLayout } from '../components'
import { loginStyles as styles } from './../styles'
import { LoginMutation } from './../graphql'

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
      <Content style={styles.content}>
        <LoginLayout>
          <LoginMutation email={this.state.email} password={this.state.password}>
            { triggerMutation => (
              <KeyboardAvoidingView style={styles.formContainer}>
                  <H1 style={styles.header}>Identity Verification</H1>
                  { this.state.error && <Text style={styles.error}>Username or password invalid</Text>}
                  <Form style={styles.form}>
                    <Item>
                      <Input
                        placeholder="email"
                        value={this.state.email}
                        onChangeText={text => this.setState({email: text })}/>
                    </Item>
                    <Item>
                      <Input
                        placeholder="password"
                        value={this.state.password}
                        secureTextEntry
                        onChangeText={text => this.setState({password: text })}/>
                    </Item>
                  </Form>
                  <Button primary onPress={this.submitLogin(triggerMutation)}><Text> Login </Text></Button>
              </KeyboardAvoidingView>
            )}
          </LoginMutation>
        </LoginLayout>
     </Content>
    )
  }
}
