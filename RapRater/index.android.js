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
    Container, Header,
    Thumbnail, Text, Left, Body, Grid, Tabs, Tab
} from 'native-base';
import SideBar from './main-menu';
import TopList from './top-list';
import QuoteCards from './quote-cards';

import RapQuotes from './RapQuotes.json'

export default class AwesomeNativeBase extends Component {

    render() {
      return (
        <Container>
              <Header hasTabs />
              <Tabs locked={true}>
                  <Tab heading="Rating">
                      <QuoteCards />
                  </Tab>
                  <Tab heading="Top List">
                      <TopList />
                  </Tab>
              </Tabs>
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
