import React from 'react';
import { View, Text } from 'react-native';

export default class ContentBlock extends React.Component {
    /**
     * This class handles the component which displays information for Profile and Repositories.
     */
    
    setNativeProps (nativeProps) {
        this._root.setNativeProps(nativeProps);
    }    
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View>
                <View ref={component => this._root = component} 
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }
                }>
                <Text style={{padding: 10, fontSize: 30}}>
                    { this.props.title }
                </Text>
                </View>
                <Text style={{padding: 10, fontSize: 20}}>
                    { this.props.content }
                </Text>
        </View>
        );
    }
}
