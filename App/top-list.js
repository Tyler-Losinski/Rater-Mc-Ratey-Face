import React, { Component } from 'react';
import {
    StyleSheet,
    Image
} from 'react-native';

import {
    Card, CardItem, Thumbnail, Text, Button, Left, Body, Right,
    Icon, View, Spinner, Container, Content, List, ListItem, Header, Title
} from 'native-base';

import { Actions } from 'react-native-router-flux';

export default class TopLists extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        fetch('https://api.brewerydb.com/v2/brewery/' + this.props.breweryId + '/beers?key=ef09f9959191ba23af7d87deb78f443e&format=json')
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.data) {
                this.setState({
                    data: responseJson.data
                });
            }
        })
        .catch((error) => {
            console.error(error);
        });
    }

    componentWillReceiveProps(nextProps) {
        fetch('https://api.brewerydb.com/v2/brewery/' + nextProps.breweryId + '/beers?key=ef09f9959191ba23af7d87deb78f443e&format=json')
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.data) {
                this.setState({
                    data: responseJson.data
                });
            }
        })
        .catch((error) => {
            console.error(error);
        });
    }

    goBack(){
        Actions.pop();
        this.setState({
            data: []
        });
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => { this.goBack(); }}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body style={{ paddingLeft: 40 }}>
                        <Title>Beers</Title>
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
                                    <ListItem >
                                        <Body>
                                            <Card>
                                                <CardItem>
                                                    <Left>sf
                                                        <Icon active name="beer" />
                                                        <Body>
                                                            <Text>{item.name}</Text>
                                                            <Text note>Style: {item.style ? item.style.shortName : ''}</Text>
                                                            <Text note>abv: {item.abv}  ibu: {item.ibu}</Text>
                                                        </Body>
                                                    </Left>
                                                </CardItem>
                                                <CardItem cardBody>
                                                    <Image source={{ uri: item.labels ? item.labels.medium : require('./img/beer-tile.png') }} style={{ height: 200, width: null, flex: 1 }} />
                                                </CardItem>
                                                <CardItem>
                                                    <Body>
                                                        <Text>{item.description ? item.description : ''}</Text>
                                                    </Body>
                                                </CardItem>
                                            </Card>
                                        </Body>
                                    </ListItem>
                                }>
                            </List>
                        }
                    </View>

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

