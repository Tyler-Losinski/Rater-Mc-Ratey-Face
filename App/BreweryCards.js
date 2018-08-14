import React, { Component } from 'react';
import {
    StyleSheet, 
    Image
} from 'react-native';

import {
    Card, CardItem, Thumbnail, Text, Button, Left, Body, Right,
    Icon, View, Spinner
} from 'native-base';

export default class BreweryCards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            brand:'',
            image: '',
            icon: ''
        };

    }


    componentDidMount() {
        fetch('https://api.brewerydb.com/v2/brewery/random?key=ef09f9959191ba23af7d87deb78f443e&format=json')
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            if(responseJson.message == "Request Successful"){
                this.setState({
                    image: responseJson.data.images ? responseJson.data.images.large : '',
                    icon: responseJson.data.images ? responseJson.data.images.icon : '',
                    name: responseJson.data.name,
                    brand: responseJson.data.brandClassification ? responseJson.data.brandClassification: ''
                });    
            }
             
        })
        .catch((error) => {
            console.error(error);
        });
    }

    render() {

        return (
            <View>
                {this.state.name == '' &&
                    <Spinner color='blue' />
                }
                {this.state.name != '' &&
                <Card>
                    <CardItem>
                    <Left>
                        <Thumbnail source={{uri: this.state.icon}} />
                        <Body>
                        <Text>{this.state.name}</Text>
                        <Text note>Brand: {this.state.brand}</Text>
                        </Body>
                    </Left>
                    </CardItem>
                    <CardItem cardBody>
                    <Image source={{uri: this.state.image}} style={{height: 200, width: null, flex: 1}}/>
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
                </Card>}
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

