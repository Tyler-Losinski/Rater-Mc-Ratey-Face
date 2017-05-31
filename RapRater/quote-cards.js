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
    Thumbnail, Text, Left, Body, Grid, Right
} from 'native-base';
import SideBar from './main-menu';
import TopList from './top-list';

import RapQuotes from './RapQuotes.json'

export default class QuoteCards extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


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
                                        <Text>{'"' + item.quote + '"'}</Text>
                                    </Body>
                                </CardItem>
                                <CardItem>
                                    <Icon name="ios-american-football" />
                                    <Text>{item.quotee}</Text>
                                </CardItem>
                                <CardItem>
                                    <Left>
                                        <Image style={{ width: 50, height: 50 }}
                                            source={require('./img/red_x.png')}
                                        />
                                    </Left>
                                    <Right>
                                        <Image style={{ width: 50, height: 50 }}
                                            source={require('./img/green_thumb.png')}
                                        />
                                    </Right>
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

