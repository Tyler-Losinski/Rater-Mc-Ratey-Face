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

/**
 * 
 */
export default class MainMenu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            active: 'stuff'
        };
    }

    componentWillMount() {
    }

    /**
     * Note: icons are from the ion set.
     */
    body() {
        return (
            <Container>
                <Content style={{ backgroundColor: '#fafafa' }}>
                    <List>
                        <ListItem>
                            <Text>More quotes coming soon!</Text>
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