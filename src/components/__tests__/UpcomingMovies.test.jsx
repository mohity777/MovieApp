import 'react-native';
import  render from 'react-test-renderer';
import UpcomingMovies from "../UpcomingMovies";

describe('UpcomingMovies test cases', () => {

    it('renders correctly', () => {
        let component = create(<UpcomingMovies />)
        const textInst = component.root.findByType(Text);
        expect(
            textInst.props.children.join()
          ).toBe(`Upcoming Movies`)
    });
});
