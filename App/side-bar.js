import React, { Component } from 'react';

import {
 Text
} from 'react-native';

import {
    Container,  Content, List, ListItem
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
        return (
            <Container>
                <Content style={{ backgroundColor: '#C0C0C0' }}>
                    <List>
                        <ListItem>
                            <Text>Simon Mignolet</Text>
                        </ListItem>
                        <ListItem>
                            <Text>Nathaniel Clyne</Text>
                        </ListItem>
                        <ListItem>
                            <Text>Dejan Lovren</Text>
                        </ListItem>
                    </List>
                </Content>
            </Container>);
    }

    /**
     * 
     */
    render() {
        return this.body();
    }
}

//AppRegistry.registerComponent('main-menu', () => MainMenu);