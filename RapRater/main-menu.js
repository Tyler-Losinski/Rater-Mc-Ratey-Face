import React, { Component } from 'react';

import {
    AppRegistry, StyleSheet, View, AsyncStorage, BackHandler,
    Navigator, TouchableHighlight, ToastAndroid, Text
} from 'react-native';

import {Fab, Container, Header, Title, Content, Footer,
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
                <Col style={{ paddingTop: 60 }}>

                    <Button style={{ margin: 10 }} block iconLeft onPress={() => { Actions.siteEditorCounties({ data: this.state.active }) }} warning>
                        <Icon name='ios-flag' />
                        <Text> Site Editor </Text>
                    </Button>

                    <Button style={{ margin: 10 }} block iconLeft info onPress={Actions.siteSelector}> 
                        <Icon name='ios-clipboard' />
                        <Text> Counter </Text>
                    </Button>

                    <Button style={{ margin: 10 }} block iconLeft onPress={Actions.sendMenu} success>
                        <Icon name='mail' />
                        <Text> Send Data </Text>
                    </Button>

                </Col>

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