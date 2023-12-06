import { render } from '@testing-library/react';
import Footer from './Footer';

describe('Footer Component', () => {
    it('should render the Footer component', () => {
        const { container } = render(<Footer />);
        expect(container).toBeInTheDocument();
    });
});
