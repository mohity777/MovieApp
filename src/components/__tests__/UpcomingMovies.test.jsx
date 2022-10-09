import React from 'react';
import 'react-native';
import renderer from 'react-test-renderer';
import UpcomingMovies from "../UpcomingMovies";
import * as redux from 'react-redux'
import jest from 'jest';

const user = {
    id: 1,
    name: 'User',
  }

  const state = { 
  movies: {
  upComingMovies: [],
  upcomingLoading: false
  }
  }

  jest
    .spyOn(redux, 'useSelector')
    .mockImplementation((callback) => callback(state))
    
describe('UpcomingMovies test cases', () => {

    it('renders correctly', () => {
        let component = renderer.create(<UpcomingMovies />)
        const textInst = component.root.findByType(Text);
        expect(
            textInst.props.children.join()
          ).toBe(`Upcoming Movies`)
    });
});
