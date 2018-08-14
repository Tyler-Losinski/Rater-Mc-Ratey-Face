/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
} from 'react-native';

import {
    Container, Header, Drawer, Button, Icon,
    Thumbnail, Text, Left, Body, Title, Tabs, Tab
} from 'native-base';

import { Router, Scene } from 'react-native-router-flux';

import TopList from './top-list.js';
import BreweryCards from './BreweryCards.js';
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

                    <Router hideNavBar= "true">
                        <Scene key="root">
                            <Scene key="breweryCards"
                            component={BreweryCards}
                            initial
                            />
                            <Scene
                            key="topList"
                            component={TopList}
                            />
                        </Scene>
                    </Router>
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
