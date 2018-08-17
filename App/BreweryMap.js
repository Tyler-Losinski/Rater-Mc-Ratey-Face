import MapView, { Marker } from 'react-native-maps';
import React from 'react';
import { Dimensions, StyleSheet } from 'react-native'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

import {
    Text, Button, Left, Body, Footer, FooterTab,
    Icon, Container, Content, Header, Title
} from 'native-base';

import { Actions } from 'react-native-router-flux';

export default class BreweryMapContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            markers: [{
                latlng: {
                    latitude: 46.87719,
                    longitude: -96.7898,
                },
                title: 'Fargo',
                description: 'This is a test marker'
            }
            ]
        };

    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => { }}>
                            <Icon name='ios-menu' />
                        </Button>
                    </Left>
                    <Body style={{ marginLeft: -40 }}>
                        <Title>Brewery Locations</Title>
                    </Body>
                </Header>

                <Content>
                    <MapView
                        style={styles.map}
                        region={{
                            latitude: 46.87719,
                            longitude: -96.7898,
                            latitudeDelta: 0.015,
                            longitudeDelta: 0.0121,
                        }}
                    >
                        {this.props.breweries.map(brewery => (
                            <Marker
                                coordinate={brewery}
                                title={brewery.brewery.name}
                                description={brewery.streetAddress}
                            />
                        ))}
                    </MapView>
                </Content>
                <Footer>
                    <FooterTab>
                        <Button vertical onPress={() => { Actions.pop(); }}>
                            <Icon name="list" />
                            <Text>Breweries</Text>
                        </Button>
                        <Button active vertical >
                            <Icon name="map" />
                            <Text>Map</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>

        );
    }
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
        width,
        height
    }
});
