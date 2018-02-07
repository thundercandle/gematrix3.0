import React, { Component } from 'react'
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { Text } from 'react-native-elements'

import { AuthMutation } from './../graphql'

import {
  FormInput,
  FormLabel,
  FormValidationMessage,
  Button
 } from './../../components'

import { LoginBox, Logo } from '../components'

import {
  LinearGradient,
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  BRAND_COLOR
 } from './../../core'

export class Login extends Component {
  state = {
    email: "",
    password: "",
    error: null
  }

  login(triggerMutation) {
    const { history } = this.props
    // return a function that will make the mutation trigger accessible
    // This allows us to get the result of the mutation
    return async () => {
      const result = await triggerMutation()

      if(result.error) {
        this.setState({
          ...this.state,
          error: true
        })
      } else {
        this.setState({
          ...this.state,
          email: "",
          password: "",
          error: null
        })

        history.push('/home')
      }
    }
  }

  render() {
    return (
      <LinearGradient style={{flex: 1}}colors={[SECONDARY_COLOR, PRIMARY_COLOR]}>
        <KeyboardAvoidingView
          keyboardVerticalOffset={100}
          behavior='padding'
          style={styles.loginContainer}
        >
          <LoginBox>
            <Text h1 style={styles.header}>GEMATRIX</Text>
            <Logo/>
            <Text style={styles.mainText}> Identity Verification </Text>
            <AuthMutation email={this.state.email} password={this.state.password}>
            { triggerMutation => (
              <View>
                <View style={{height: 40}}>
                  { this.state.error &&
                    <FormValidationMessage containerStyle={{alignSelf: 'center', backgroundColor: 'transparent'}}>
                    Username or Password incorrect.
                    </FormValidationMessage>
                  }
                </View>
                <FormLabel>Email</FormLabel>
                <FormInput
                  onChangeText={text => this.setState({...this.state, email: text})}
                />
                <FormLabel>Password</FormLabel>
                <FormInput
                  containerStyle={{marginBottom: 40}}
                  onChangeText={text => this.setState({...this.state, password: text})}
                />
                <Button
                  buttonStyle={{width: 300, alignSelf: 'center', marginRight: 20}}
                  title="Login"
                  onPress={this.login(triggerMutation)}
                  outline
                  rounded
                  />
              </View>
            )}
            </AuthMutation>
          </LoginBox>
        </KeyboardAvoidingView>
      </LinearGradient>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    color: BRAND_COLOR,
  },
  loginContainer: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center'
  },
  mainText: {
    fontSize: 32,
    alignSelf: 'center',
    color: BRAND_COLOR,
    backgroundColor: 'transparent',
    marginBottom: 10
  }
})
