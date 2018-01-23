import React, { Component, Fragment } from 'react'
import { Platform, StyleSheet } from 'react-native'
import { Header, Title, Button, Left, Right, Body, Icon } from 'native-base'

// basic implementation of back functionality
const LeftButton = (platform, isFirst, goBack) =>
    platform === "web" || isFirst
    ? <Button transparent={true}>
        <Icon name='menu'/>
      </Button>
    : <Button transparent={true}>
        <Icon name='arrow-back' onPress={goBack}/>
      </Button>

export const TopNav = ({ location, history }) => (
  <Header>
    <Left>
      { LeftButton(Platform.OS, history.length === 1, history.goBack) }
    </Left>
    <Body>
      <Title>Gematrix</Title>
    </Body>
    <Right>

    </Right>
  </Header>
)
