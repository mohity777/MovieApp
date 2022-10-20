import React from 'react';
import {create, act} from 'react-test-renderer';
import UpcomingMovies from '../UpcomingMovies';
import * as Redux from 'react-redux';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

describe('UpcomingMovies test cases', () => {
  const state = {
    movies: {
      upComingMovies: [],
      upcomingLoading: false,
    },
  };

  beforeEach(() => {
    Redux.useSelector.mockImplementation(callback => {
      return callback(state);
    });
  });

  it('renders correctly', () => {
    let root;
    act(() => {
      root = create(<UpcomingMovies />);
    });
    expect(root.toJSON()).toMatchSnapshot();
  });
});
