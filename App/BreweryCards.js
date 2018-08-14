import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet, 
    Image
} from 'react-native';

import {
    Container, Icon, View, DeckSwiper, Card, CardItem,
    Thumbnail, Text, Left, Body, Grid, Right, Spinner
} from 'native-base';
import SideBar from './SideBar';
import TopList from './top-list';

import io from 'socket.io-client/dist/socket.io';
import config from './server-config.json';


export default class BreweryCards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            RapQuotes: [{
                Quote: '',
                Quotee:''
            }]
        };
        //this.socket = io('http://still-tundra-25462.herokuapp.com',  { transports: ['websocket'] });

        //this.socket.emit("get_quotes");

        this.swipeRight = this.swipeRight.bind(this);
        this.swipeLeft = this.swipeLeft.bind(this);
        this.refresh = this.refresh.bind(this);

    }

    refresh(e) {
        return new Promise((resolve) => {
            setTimeout(() => { resolve() }, 2000)
        });
    }

    swipeRight(e) {
        this.socket.emit('upvote', e.ID)
    }

    swipeLeft(e) {
        this.socket.emit('downvote', e.ID)
    }

    componentDidMount() {
        this.socket.on('card_quotes', (data) => {
            this.setState({
                RapQuotes: data
            })
        })
    }

    render() {

        return (
                <View>
                </View>
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

