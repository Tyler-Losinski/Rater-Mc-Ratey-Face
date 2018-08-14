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
    Container, Header, Drawer, Button, Icon,
    Thumbnail, Text, Left, Body, Grid, Tabs, Tab
} from 'native-base';

import TopList from './top-list.js';
import QuoteCards from './BreweryCards.js';
import SideBar from './SideBar'

export default class AwesomeNativeBase extends Component {

    constructor(props) {
        super(props);

        this.state = {
            active: 'stuff'
        };

    }

    static propTypes = {
        drawerState: React.PropTypes.string,
        popRoute: React.PropTypes.func,
        closeDrawer: React.PropTypes.func,
        navigation: React.PropTypes.shape({
            key: React.PropTypes.string,
            routes: React.PropTypes.array,
        }),
    }

    openDrawer() {
        //this._drawer._root.open();
    }

    closeDrawer() {
        if (this.props.drawerState === 'opened') {
            this.props.closeDrawer();
        }
    }

    render() {
        return (
            // <Drawer
            //     ref={(ref) => { this._drawer = ref; }}
            //     content={<SideBar navigator={this._navigator} />}
            //     side="left"
            //     panOpenMask={.10}
            // >

                <Container>
                    
                    <Header hasTabs>
                        <Left>
                            <Button transparent onPress={() => { this.openDrawer() }}>
                        <Icon name='ios-menu' />
                    </Button>
                        </Left>
                    </Header>
                    <Tabs locked={true}>
                        <Tab heading="Rating">
                            <QuoteCards />
                        </Tab>
                        <Tab heading="Top List">
                            <TopList />
                        </Tab>
                    </Tabs>
                    
                </Container>
           // </Drawer>
           
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
