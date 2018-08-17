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

import { Router, Scene } from 'react-native-router-flux';

import TopList from './top-list.js';
import BreweryCards from './BreweryCards.js';
import BreweryMap from './BreweryMap.js'
import Login from './Login'

export default class AwesomeNativeBase extends Component {

    constructor(props) {
        super(props);

        this.state = {
            active: 'stuff'
        };

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
            <Router hideNavBar="true">
                <Scene key="root">
                    <Scene key="breweryCards"
                        component={BreweryCards}
                        
                    />
                    <Scene
                        key="topList"
                        component={TopList}
                    />
                    <Scene
                        key="map"
                        component={BreweryMap}
                    />
                    <Scene
                        key="login"
                        component={Login}
                        initial
                    />
                </Scene>
            </Router>

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
