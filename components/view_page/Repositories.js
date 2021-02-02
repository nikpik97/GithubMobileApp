import React from 'react';
import { Linking, ScrollView, TouchableHighlight } from 'react-native';
import ContentBlock from '../help/ContentBlock';

const githubapi = require('../../api/github_api')


export default class Repositories extends React.Component {
    /**
     * This class handles rendering of the Repositories page 
     */
    constructor(props) {
        super(props);
        this.state = {
            'repositories': []
        };
        this.loadUserProfile();
        if (this.props.navigation.state.params != null)
            alert(this.props.navigation.state.params.search)
    }

    loadUserProfile() {
        /**
         * This function calls graphql api code and populates itself with the resulting data
         */
        return githubapi.getRepoInfo('nikpik97')
                        .then(repoInfo => {
                            this.setState({'repositories': repoInfo});
                        });
    }

    onPressRepository(url) {
        /** 
         * This function handles the redirect the the repo's corresponding url.
         */
        Linking.canOpenURL(url)
               .then(supported => {
                    if (supported) {
                        Linking.openURL(url);
                    } 
                    else {
                        window.alert("Cannot open following URL: " + url);
                    }
        });
    }

    render() {
        /**
         * This function handles the rendering of the resulting html block.
         */
        return (
            <ScrollView>
                {this.state.repositories.map((repo, index) => (
                    <TouchableHighlight key={index} onPress={() => this.onPressRepository(repo.url)} underlayColor='#FFAAEE'>
                        <ContentBlock iconType='repo' title={repo.name} content={repo.owner + ' --- ' + repo.description}/>
                    </TouchableHighlight>
                ))}
            </ScrollView>
        );
    }
}
