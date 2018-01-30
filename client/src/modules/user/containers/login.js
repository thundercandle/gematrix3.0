import React, { Component } from 'react'
import { KeyboardAvoidingView } from 'react-native'

import {
  Content,
  Form,
  Item,
  Label,
  Input,
  Button,
  Text,
  H1
} from 'native-base'

import { LoginLayout } from '../components'
import { styles } from './../styles'
import { LoginMutation } from './../graphql'

export class Login extends Component {
  state = {
    email: "",
    password: "",
  }

  submitLogin(triggerMutation) {
    return async () => {
      console.log("submitting")
      const result = await triggerMutation()
      console.log("inside login container", result)
    }
  }

  render() {
    return (
      <Content style={styles.content}>
        <LoginLayout>
          <LoginMutation email={this.state.email} password={this.state.password}>
            { triggerMutation => (
              <KeyboardAvoidingView style={styles.formContainer}>
                  <H1 style={{marginBottom: 65, textAlign: 'center'}}>Identity Verification</H1>
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
