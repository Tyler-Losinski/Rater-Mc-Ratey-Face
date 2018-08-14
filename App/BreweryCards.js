import React, { Component } from 'react';
import {
    StyleSheet, 
    Image
} from 'react-native';

import {
    Card, CardItem, Thumbnail, Text, Button, Left, Body, Right,
    Icon, View
} from 'native-base';

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
      //  this.socket.emit('upvote', e.ID)
    }

    swipeLeft(e) {
    //    this.socket.emit('downvote', e.ID)
    }

    componentDidMount() {
        // this.socket.on('card_quotes', (data) => {
        //     this.setState({
        //         RapQuotes: data
        //     })
        // })
    }

    render() {

        return (
            <View>
                <Card>
                    <CardItem>
                    <Left>
                        <Thumbnail source={{uri: 'https://hypixel.net/attachments/dd8dba62-ebd4-4fcc-9308-ccf064224ee0-png.858244/'}} />
                        <Body>
                        <Text>Cookie Monster</Text>
                        <Text note>Cookies Inc.</Text>
                        </Body>
                    </Left>
                    </CardItem>
                    <CardItem cardBody>
                    <Image source={{uri: 'https://wallpaper-house.com/data/out/7/wallpaper2you_167182.jpg'}} style={{height: 200, width: null, flex: 1}}/>
                    </CardItem>
                    <CardItem>
                    <Left>
                        <Button transparent>
                        <Icon active name="thumbs-up" />
                        <Text>12 Likes</Text>
                        </Button>
                    </Left>
                    <Body>
                        <Button transparent>
                        <Icon active name="chatbubbles" />
                        <Text>4 Comments</Text>
                        </Button>
                    </Body>
                    <Right>
                        <Text>11h ago</Text>
                    </Right>
                    </CardItem>
                </Card>
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

