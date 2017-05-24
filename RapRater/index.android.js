/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image
} from 'react-native';

import {
    Container, Icon, View, DeckSwiper, Card, CardItem,
    Thumbnail, Text, Left, Body, Grid
} from 'native-base';
import SideBar from './main-menu';

import RapQuotes from './RapQuotes.json'

export default class AwesomeNativeBase extends Component {

    render() {
      return (
        <Container>
            <View>
                <DeckSwiper
                      dataSource={RapQuotes}
                    renderItem={item =>
                        <Card style={{ elevation: 3 }}>
                            <CardItem>
                                <Left>
                                    <Body>
                                        <Text>Rap Quote </Text>
                                        <Text note>The Best</Text>
                                    </Body>
                                </Left>
                            </CardItem>
                            <CardItem >
                                  <Body >
                                      <Text>{'"'+item.quote + '"'}</Text>
                                  </Body>
                            </CardItem>
                            <CardItem>
                                  <Icon name='home' android="md-done-all" style={{ color: '#ED4A6A' }} />
                                <Text>{item.quotee}</Text>
                            </CardItem>
                        </Card>
                    }
                />
            </View>
        </Container>  
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('AwesomeNativeBase', () => AwesomeNativeBase);
