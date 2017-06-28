import React, { Component } from 'react';

import {
    AppRegistry, StyleSheet, View, AsyncStorage, BackHandler,
    Navigator, TouchableHighlight, ToastAndroid, Text
} from 'react-native';

import {
    Fab, Container, Header, Title, Content, Footer, List, ListItem,
    FooterTab, Button, Left, Right, Body, ActionSheet, Icon, Toast
} from 'native-base';

import { Col, Row, Grid } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux';

var countyData = [];

/**
 * 
 */
export default class MainMenu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            active: 'stuff'
        };

        //Setup storage for first use
        AsyncStorage.getAllKeys((err, keys) => {
            console.log(keys);
            var exists = false;
            for (var i = 0; i < keys.length; i++) {
                if (keys[i] == 'Counties')
                    exists = true;
            }
            if (!exists)
            {
                AsyncStorage.setItem('Counties', JSON.stringify(countyData), () => { });
            }
        });
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', () => {
                Actions.pop();
        });
    }

    /**
     * Note: icons are from the ion set.
     */
    body() {
        return (
            <Container>
                <Content style={{ backgroundColor: '#C0C0C0' }}>
                    <List>
                        <ListItem>
                            <Text>Simon Mignolet</Text>
                        </ListItem>
                        <ListItem>
                            <Text>Nathaniel Clyne</Text>
                        </ListItem>
                        <ListItem>
                            <Text>Dejan Lovren</Text>
                        </ListItem>
                    </List>
                </Content>
            </Container>);
    }

    /**
     * 
     */
    render() {
        return this.body();
    }
}

//AppRegistry.registerComponent('main-menu', () => MainMenu);