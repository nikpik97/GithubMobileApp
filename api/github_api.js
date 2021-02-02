/**
 * This class handles all api related calls
 */
const fetch = require('node-fetch');
const githubUrl = 'https://api.github.com/graphql';
import { TOKEN } from 'react-native-dotenv'



// Collect and parse user's profile information
exports.getProfileInfo = 
function(username) {
    const userInfoQuerry =  `
    query { 
        user(login: "`+username+`") {
            name
            login
            bio
            email
            websiteUrl
            repositories (first:100){
                totalCount
            }
            followers {
                totalCount
            }
            following {
                totalCount
            }
            avatarUrl
            createdAt
        }
    }`;
    return fetch(githubUrl, {method: 'POST', body: JSON.stringify({query: userInfoQuerry}), headers: {'Authorization': `Bearer ${TOKEN}`}})
    .then(res => res.text())
    .then(
        function(res){
            if (JSON.parse(res) == null || Object.keys(JSON.parse(res)).length === 0) {
                throw new Error('Empty Response');
            }
            return parseProfileInfo(JSON.parse(res).data.user);
        }
    )
    .catch(
        function(err) {
            console.log(err); 
        }
    );
}

function parseProfileInfo(info) {
    let parsedProfile = {
        'name': JSON.stringify(info.name).replace(/\"/g, ""),
        'username': JSON.stringify(info.login).replace(/\"/g, ""),
        'bio': JSON.stringify(info.bio).replace(/\"/g, ""),
        'email': JSON.stringify(info.email).replace(/\"/g, ""),
        'website': JSON.stringify(info.websiteUrl).replace(/\"/g, ""),
        'repositories':  JSON.stringify(info.repositories.totalCount).replace(/\"/g, ""),
        'followers': JSON.stringify(info.followers.totalCount).replace(/\"/g, ""),
        'following': JSON.stringify(info.following.totalCount).replace(/\"/g, ""),
        'avatar': JSON.stringify(info.avatarUrl).replace(/\"/g, ""),
        'profile_creation_date': JSON.stringify(info.createdAt).replace(/\"/g, ""),
    }
    return parsedProfile;
}

// Collect and parse user's repository information
exports.getRepoInfo = 
function(username) {
    const userRepoQuerry = 
    `query { 
        user(login: "`+username+`") {
            repositories (first:100){
            nodes{
                name
                owner{
                    login
                }
                description
                url
            }
        }
        }
    }`;
    return fetch(githubUrl, {method: 'POST', body: JSON.stringify({query: userRepoQuerry}), headers: {'Authorization': `Bearer ${TOKEN}`}})
    .then(res => res.text())
    .then(
        function(res){
            if (JSON.parse(res) == null || Object.keys(JSON.parse(res)).length === 0) {
                throw new Error('Empty Response');
            }
            return parseRepoInfo(JSON.parse(res).data.user.repositories.nodes);
        }
    )
    .catch(
        function(err) {
            console.log(err);
        }
    );
}

function parseRepoInfo(info) {
    let parsedRepositories = [];
    for (r of info) {
        parsedRepositories.push({
            'name': JSON.stringify(r.name).replace(/\"/g, ""),
            'owner': JSON.stringify(r.owner.login).replace(/\"/g, ""),
            'description': JSON.stringify(r.description).replace(/\"/g, ""),
            'url': JSON.stringify(r.url).replace(/\"/g, "")
        });
    }
    return parsedRepositories;
}