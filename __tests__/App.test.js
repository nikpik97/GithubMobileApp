import React from 'react';
import renderer from 'react-test-renderer';

import App from '../App';
import Profile from '../components/view_page/Profile';
import Repositories from '../components/view_page/Repositories';
import Following from '../components/view_page/Following';
import Followers from '../components/view_page/Followers';

test('Profile renders correctly', () => {
  const tree = renderer.create(<Profile />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Repositories renders correctly', () => {
  const tree = renderer.create(<Repositories />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Following renders correctly', () => {
  const tree = renderer.create(<Following />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Followers renders correctly', () => {
  const tree = renderer.create(<Followers />).toJSON();
  expect(tree).toMatchSnapshot();
});