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
    Container, Icon, ListItem, List,
    Thumbnail, Text, Left, Body, Grid, Content
} from 'native-base';
import SideBar from './main-menu';

import RapQuotes from './RapQuotes.json'

export default class TopLists extends Component {

    render() {
        return (
            <Container>
                <Content>
                    <List dataArray={RapQuotes}
                        renderRow={(item) =>
                            <ListItem>
                                <Body>
                                    <Text>{item.quote}</Text>
                                    <Text note>{item.quotee}</Text>
                                </Body>
                            </ListItem>
                        }>
                    </List>
                </Content>
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

