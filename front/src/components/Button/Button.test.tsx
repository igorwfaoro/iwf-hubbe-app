import { render, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button Component', () => {
    it('should render the component with the provided text', () => {
        const { getByText } = render(<Button>My Button</Button>);
        expect(getByText('My Button')).toBeInTheDocument();
    });

    it('should call the "onClick" function when the button is clicked', () => {
        const onClickMock = jest.fn();

        const { getByText } = render(<Button onClick={onClickMock}>My Button</Button>);

        fireEvent.click(getByText('My Button'));
        
        expect(onClickMock).toHaveBeenCalledTimes(1);
    });

    it('should apply the custom CSS class provided through the "className" prop', () => {
        const { container } = render(<Button className="custom-class">My Button</Button>);
        expect(container.querySelector('.custom-class')).toBeInTheDocument();
    });

    it('should disable the button when the "disabled" prop is true', () => {
        const { container } = render(<Button disabled>My Button</Button>);
        expect(container.firstChild).toBeDisabled();
    });
});
