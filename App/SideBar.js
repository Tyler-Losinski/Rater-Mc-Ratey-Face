import React, { Component } from 'react';

import {
   Text
} from 'react-native';

import {
     Container,   Content,  List, ListItem,
} from 'native-base';


/**
 * 
 */
export default class SideBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            active: 'stuff'
        };
    }

    componentWillMount() {
    }

    /**
     * Note: icons are from the ion set.
     */
    body() {
    }

    /**
     * 
     */
    render() {
        return (
            <Container>
                <Content style={{ backgroundColor: '#fafafa' }}>
                    <List>
                        <ListItem>
                            <Text>Coming soon!</Text>
                        </ListItem>
                    </List>
                </Content>
            </Container>);

    }
}

//AppRegistry.registerComponent('main-menu', () => MainMenu);