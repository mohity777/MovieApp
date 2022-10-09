import React from 'react';
import 'react-native';
import renderer from 'react-test-renderer';
import UpcomingMovies from "../UpcomingMovies";
import * as Redux from "react-redux";

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn(),
}));

const user = {
    id: 1,
    name: 'User',
  }


describe('UpcomingMovies test cases', () => {
  const state = { 
  movies: {
  upComingMovies: [],
  upcomingLoading: false
  }
  }
    

 beforeEach(() => {
        Redux.useSelector.mockImplementation((callback) => {
            return callback(state);
        });
    })

    it('renders correctly', () => {
        let component = renderer.create(<UpcomingMovies />)
        const textInst = component.root.findByType(Text);
        expect(
            textInst.props.children.join()
          ).toBe(`Upcoming Movies`)
    });
});
