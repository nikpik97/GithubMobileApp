import React from 'react' 
import { View, Image, ScrollView, TouchableHighlight, Dimensions } from 'react-native'
import ContentBlock from '../help/ContentBlock'

const githubapi = require('../../api/github_api')



export default class Profile extends React.Component {
    /**
     * This class is a component to display Profile information
     */
    constructor(props) {
        super(props);
        this.state = {
            'search':'nikpik97',
            'profileInfo': {
                'name': '',
                'username': '',
                'bio': '',
                'email': '',
                'website': '',
                'repositories': '',
                'followers': '',
                'following': '',
                'avatar': '',
                'profile_creation_date': ''
            }, 
            'screen': {
                'height': 10,
                'width': 0
            }
        };
        this.loadUserProfile();
    }

    loadUserProfile () {
        return githubapi.getProfileInfo(this.state.search)
                        .then(profileInfo => {
                            this.setState({'profileInfo': profileInfo});
        });
    }

    onPressRepositories() {
        this.props.navigation.navigate('Repositories', {search:JSON.stringify(this.state.search)});
    }

    onPressFollowers() {
        this.props.navigation.navigate('Followers', {search:JSON.stringify(this.state.search)});
    }
    
    onPressFollowing() {
        this.props.navigation.navigate('Following', {search:JSON.stringify(this.state.search)});
    }

    orientation = (orientation) => {
        this.setState({'screen': Dimensions.get('window')});
    }

    render() {
        return (
            <ScrollView onLayout={ this.orientation }>
                <View>
                    <Image
                        style={{width: Dimensions.get('window').width, height: Dimensions.get('window').width}}
                        source={ this.state.profileInfo.avatar }
                    />
                </View>
                <ContentBlock iconType='person' title='Name' content={this.state.profileInfo.name}/>
                <ContentBlock iconType='github' title='Username' content={this.state.profileInfo.username}/>
                <ContentBlock iconType='bio' title='Bio' content={this.state.profileInfo.bio}/>
                <ContentBlock iconType='email' title='Email' content={this.state.profileInfo.email}/>
                <ContentBlock iconType='website' title='Website' content={this.state.profileInfo.website}/>
                <TouchableHighlight onPress={() => this.onPressRepositories()} underlayColor='#FFAAEE'>
                    <ContentBlock iconType='repo' title='Repositories' content={this.state.profileInfo.repositories}/>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => this.onPressFollowers()} underlayColor='#FFAAEE'>
                    <ContentBlock iconType='group' title='Followers' content={this.state.profileInfo.followers}/>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => this.onPressFollowing()} underlayColor='#FFAAEE'>
                    <ContentBlock iconType='group' title='Following' content={this.state.profileInfo.following}/>
                </TouchableHighlight>
                <ContentBlock iconType='profile_creation_date' title='Profile creation date' content={this.state.profileInfo.profile_creation_date}/>
            </ScrollView>
        );
    }
}
