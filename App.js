import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';

import Profile from './components/view_page/Profile';
import Repositories from './components/view_page/Repositories';
import Following from './components/view_page/Following';
import Followers from './components/view_page/Followers';

const Tabs = createBottomTabNavigator(
  /**
   * This object represents the tab Navigator functionality
   */
  {
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel: 'Profile',
        tabBarIcon: ({ tintColor }) => (<Feather name="user" size={35} color={tintColor} />)
      }
    },
    Repositories: {
      screen: Repositories,
      navigationOptions: {
        tabBarLabel: 'Repositories',
        tabBarIcon: ({ tintColor }) => (<Feather name="user-check" size={35} color={tintColor} />)
      }
    },
    Following: {
      screen: Following,
      navigationOptions: {
        tabBarLabel: 'Following',
        tabBarIcon: ({ tintColor }) => (<Feather name="list" size={35} color={tintColor} />)
      }
    },
      Followers: {
        screen: Followers,
        navigationOptions: {
          tabBarLabel: 'Followers',
          tabBarIcon: ({ tintColor }) => (<Feather name="users" size={35} color={tintColor} />)
      }
    }
  }
);


const Navigation = createStackNavigator(
  /**
   * This object represents the stack Navigator functionality.
   * It basically shows the  correspoding page to the tab that was chosen
   * in the tab navigator.
   */
  {
    Github_App: { screen: Tabs },
  }, 
  {
    headerMode: 'screen'
  }
);

const AppNavigator = createAppContainer(Navigation); 

export default class App extends React.Component {
  /** 
   * This class handles the rendering of the main App 
   */
  constructor(props) {
      super(props)
      this.state = {};
  }
  render() {
    return (
      <AppNavigator />
    );
  }
}