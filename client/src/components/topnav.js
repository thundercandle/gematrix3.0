import React, { Component } from 'react';
import { Header, Title, Button, Left, Right, Body, Icon } from 'native-base';

export class TopNav extends Component {
  render() {
    return (
        <Header>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Gematrix</Title>
          </Body>
          <Right />
        </Header>
    );
  }
}
