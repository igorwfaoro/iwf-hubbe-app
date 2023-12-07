import { render } from '@testing-library/react';
import Loader from './Loader';

describe('Loader Component', () => {
    it('should render the Loader component', () => {
        const { container } = render(<Loader />);
        expect(container).toBeInTheDocument();
    });
});
