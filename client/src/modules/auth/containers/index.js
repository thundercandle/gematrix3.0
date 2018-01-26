import React, { Component } from 'react'
import { KeyboardAvoidingView, View, TextInput } from 'react-native'

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

import { MediaQuery, breakpoints } from './../../core'
import { DesktopContainer } from '../components'
import { styles } from './../styles'
import { LoginMutation } from './../graphql'

export class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: ""
    }
  }

  render() {
    return (
      <Content style={styles.content}>
        <MediaQuery query={breakpoints.largeMobile}>

          { isSmaller => isSmaller
            ?  <View style={styles.formContainer}>
                <H1 style={{marginBottom: 65, textAlign: 'center'}}>Identity Verification</H1>
                <Form style={styles.form}>
                  <Item stackedLabel>
                    <Label>Email</Label>
                    <Input value={this.state.email} onChangeText={text => this.setState({email: text })}/>
                  </Item>
                  <Item stackedLabel last>
                    <Label>Password</Label>
                    <Input value={this.state.password} onChangeText={text => this.setState({password: text })}/>
                  </Item>
                </Form>
                <LoginMutation email={this.state.email} password={this.state.password}>
                  { triggerMutation => (
                    <Button primary onPress={triggerMutation}><Text> Login </Text></Button>
                  )}
                </LoginMutation>
              </View>
            : <DesktopContainer>
                <View style={styles.formContainer}>
                  <H1 style={{marginBottom: 65, textAlign: 'center'}}>Identity Verification</H1>
                  <Form style={styles.form}>
                    <Item stackedLabel>
                      <Label>Email</Label>
                      <Input value={this.state.email} onChangeText={text => this.setState({email: text })}/>
                    </Item>
                    <Item stackedLabel last>
                      <Label>Password</Label>
                      <Input value={this.state.password} onChangeText={text => this.setState({password: text })}/>
                    </Item>
                  </Form>
                  <LoginMutation email={this.state.email} password={this.state.password}>
                    { triggerMutation => (
                      <Button primary onPress={triggerMutation}><Text> Login </Text></Button>
                    )}
                  </LoginMutation>
                </View>
            </DesktopContainer>
          }

        </MediaQuery>
     </Content>
    )
  }
}
