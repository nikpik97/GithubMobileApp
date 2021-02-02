import React from 'react';
import { View, Text, Image } from 'react-native';

//Helper component to display Followers/Following information

export default class UserBlock extends React.Component 
{
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={{flex: 1, flexDirection: 'row', }}>
            <Image
                style={{width: 30, height: 30, margin: 20}}
                source={{uri: this.props.imageURL}}
            />
            <Text style={{padding: 10, paddingTop: 20, fontSize: 20, textAlignVertical: 'center'}}>
                { this.props.title }
            </Text>
            </View>
        );
    }
}
