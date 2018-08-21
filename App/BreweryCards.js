import React, { Component } from 'react';
import {
    StyleSheet,
    Image
} from 'react-native';

import SideMenu  from 'react-native-side-menu';

import  {
    Card, CardItem, Thumbnail, Text, Button, Left, Body, Right, Footer, FooterTab,
    Icon, View, Spinner, Container, Content, List, ListItem, Header, Title 
} from 'native-base';

import { Actions } from 'react-native-router-flux';
import SideBar from './side-bar.js'

export default class BreweryCards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            sideOpen: false,
            allowMap: false//so we have data before going to the map
        };

    }


    componentDidMount() {
        fetch('https://api.brewerydb.com/v2/locations?locality=fargo&key=ef09f9959191ba23af7d87deb78f443e&format=json')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    data: responseJson.data ? responseJson.data : []
                }, () => { this.getMoorhead() });
            })
            .catch((error) => {
                console.error(error);
            });

    }

    getMoorhead() {
        fetch('https://api.brewerydb.com/v2/locations?locality=moorhead&key=ef09f9959191ba23af7d87deb78f443e&format=json')
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.data) {
                    for (var i = 0; i < responseJson.data.length; i++) {
                        this.setState({
                            data: this.state.data.concat(responseJson.data[i]),
                            allowMap: true
                        });
                    }
                }
            })
            .catch((error) => {
                console.error(error);
            });

    }

    cardPress = (breweryId) =>
    {
        Actions.topList({breweryId: breweryId});
    }

    render() {
        const menu = <SideBar navigator={navigator}/>;
        const noImage = require ('./img/beer-tile.png');
        return (
            <SideMenu menu={menu}
                isOpen={this.state.sideOpen}
                onChange={isOpen => {this.setState({sideOpen:isOpen})}}
                >


            <Container>
                <Header>

                    <Left>
                        <Button transparent onPress={() => { this.setState({sideOpen: this.state.sideOpen ? false : true }); }}>
                            <Icon name='ios-menu' />
                        </Button>
                    </Left>
                    <Body style={{marginLeft: -40}}> 
                        <Title>Breweries</Title> 
                    </Body> 
                </Header>

                <Content>

                    <View>
                        {this.state.data.length == 0 &&
                            <Spinner color='blue' />
                        }
                        {this.state.data.length != 0 &&
                            <List
                                dataArray={this.state.data}
                                renderRow={(item) => 
                                    <ListItem name={item.id} button onPress={() => {this.cardPress(item.breweryId);}}> 
                                        <Body>
                                            <Card>
                                                <CardItem>
                                                    <Left>
                                                        <Thumbnail source={{ uri: item.brewery.images ? item.brewery.images.icon : '' }} />
                                                        <Body>
                                                            <Text>{item.brewery.name}</Text>
                                                            <Text note>{item.streetAddress} , {item.locality}</Text>
                                                        </Body>
                                                    </Left>
                                                </CardItem>
                                                <CardItem cardBody>
                                                    <Image source={item.brewery.images ? { uri: item.brewery.images.large} : noImage} style={{ height: 200, width: null, flex: 1 }} />
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
                                        </Body>
                                    </ListItem>
                                }>
                            </List>
                        }
                    </View>
                </Content>
                <Footer>
                    <FooterTab>
                        <Button vertical active>
                            <Icon name="list" />
                            <Text>Breweries</Text>
                        </Button>
                        <Button disabled={!this.state.allowMap} vertical onPress={()=>{Actions.map({breweries: this.state.data});}}>
                            <Icon name="map" />
                            <Text>Map</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
            </SideMenu>

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

