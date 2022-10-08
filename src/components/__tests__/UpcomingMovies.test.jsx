import 'react-native';
import { render } from '../../../testUtils/testUtils';
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
