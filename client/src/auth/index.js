import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

import {
  Content,
  Form,
  Item,
  Label,
  Input,
  Button,
  Text,
  Grid,
  Col,
  H1
} from 'native-base'

import { MediaQuery, breakpoints } from './../core'

const LoginForm = () => (
  <View style={styles.formContainer}>
    <H1 style={{marginBottom: 30, textAlign: 'center'}}>Identity Verification</H1>
    <Form style={styles.form}>
      <Item floatingLabel>
        <Label>Username</Label>
        <Input />
      </Item>
      <Item floatingLabel last>
        <Label>Password</Label>
        <Input />
      </Item>
    </Form>
    <Button primary><Text> Login </Text></Button>
  </View>
)

const DesktopContainer = ({children}) => (
  <Grid>
    <Col></Col>
    <Col>
      {children}
    </Col>
    <Col></Col>
  </Grid>
)

export class Login extends Component {
  render() {
    return (
      <Content style={styles.content}>
        <MediaQuery query={breakpoints.tablet}>
          { isSmaller => isSmaller
            ? <LoginForm />
            : <DesktopContainer><LoginForm/></DesktopContainer>
          }
        </MediaQuery>
     </Content>
    )
  }
}

const styles = StyleSheet.create({
  content: {
    top: 40,
    bottom: 40,
    padding: 40
  },
  formContainer: {
    height: 300,
    width: 300,
    top: 100
  },
  form: {
    bottom: 20,
  }
})
