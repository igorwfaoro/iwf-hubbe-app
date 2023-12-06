import { render } from '@testing-library/react';
import Card from './Card';

describe('Card Component', () => {
    it('should render the Card component', () => {
        const { container } = render(<Card />);
        expect(container).toBeInTheDocument();
    });

    it('should render children elements', () => {
        const { getByText } = render(
            <Card>
                <div>Child Element</div>
            </Card>
        );
        
        const childElement = getByText('Child Element');
        expect(childElement).toBeInTheDocument();
    });

    it('should apply custom className', () => {
        const { container } = render(<Card className="custom-class" />);

        const cardElement = container.querySelector('.custom-class');
        expect(cardElement).toBeInTheDocument();
    });

    it('should set background image from bgImageUrl prop', () => {
        const { container } = render(
            <Card className="card" bgImageUrl="https://example.com/image.jpg" />
        );
        
        const cardElement = container.querySelector('.card');
        expect(cardElement).toHaveStyle('background-image: url(https://example.com/image.jpg)');
    });
});
