import React, { Component } from 'react';
import {
    StyleSheet,
    Image
} from 'react-native';

import {
    Card, CardItem, Thumbnail, Text, Button, Left, Body, Right,
    Icon, View, Spinner, Container, Content, List, ListItem, Header, Title
} from 'native-base';
import _ from 'lodash';

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
                responseJson.data.map((obj) => {
                    obj.showDescription = false;
                    return obj;
                });

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

                responseJson.data.map((obj) => {
                    obj.showDescription = false;
                    return obj;
                });

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

    showDescription(id){
       var tempdata = this.state.data.slice();
       for(var i = 0; i< tempdata.length; i++){
           if(tempdata[i].id == id){
               tempdata[i].showDescription = !tempdata[i].showDescription;
               this.setState({
                   data: _.cloneDeep(tempdata)
               });
               return;
           }
       } 
    }

    render() {
        const noImage = require ('./img/beer-tile.png');
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => { this.goBack(); }}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body style={{marginLeft: -40}}> 
                        <Title>Tap List</Title>
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
                                                    <Left>
                                                        <Icon active name="beer" />
                                                        <Body>
                                                            <Text>{item.name}</Text>
                                                            <Text note>Style: {item.style ? item.style.shortName : ''}</Text>
                                                            <Text note>abv: {item.abv}  ibu: {item.ibu}</Text>
                                                        </Body>
                                                    </Left>
                                                </CardItem>
                                                <CardItem cardBody>
                                                    <Image source={item.labels ? { uri: item.labels.medium } : noImage} style={{ height: 200, width: null, flex: 1 }} />
                                                </CardItem>
                                                { item.showDescription && <CardItem>
                                                    <Body>
                                                        <Text>{item.description ? item.description : ''}</Text>
                                                    </Body>
                                                </CardItem>}
                                                <CardItem footer>
                                                    <Body>
                                                        <Button transparent onPress={()=>{this.showDescription(item.id);}} style={{flex:1,justifyContent: "center",alignItems: "center"}}>
                                                            <Text>{ !item.showDescription && 'Show description' } { item.showDescription && 'Hide description' }</Text>
                                                        </Button>
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

