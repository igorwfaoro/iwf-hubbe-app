import { render, fireEvent } from '@testing-library/react';
import Input from './Input';

describe('Input Component', () => {
    it('should render the Input component', () => {
        const { container } = render(<Input label="Name" />);
        expect(container).toBeInTheDocument();
    });

    it('should render the label', () => {
        const label = 'Name';
        const { getByText } = render(<Input label={label} />);
        expect(getByText(label)).toBeInTheDocument();
    });

    it('should render the help text', () => {
        const helpText = 'Enter your name';
        const { getByText } = render(<Input label="Name" helpText={helpText} />);
        expect(getByText(helpText)).toBeInTheDocument();
    });

    it('should render an error message when errorMessage prop is provided', () => {
        const errorMessage = 'This field is required';
        const { getByText } = render(<Input label="Name" errorMessage={errorMessage} />);
        expect(getByText(errorMessage)).toBeInTheDocument();
    });

    it('should apply custom classNames', () => {
        const { container } = render(
            <Input
                label="Name"
                className="custom-container-class"
                labelClassName="custom-label-class"
                inputClassName="custom-input-class"
                errorMessageClassName="custom-error-class"
                errorMessage="Error"
            />
        );

        const inputElement = container.querySelector('input');
        const labelElement = container.querySelector('.custom-label-class');
        const errorMessageElement = container.querySelector('.custom-error-class');

        expect(container.firstChild).toHaveClass('custom-container-class');
        expect(inputElement).toHaveClass('custom-input-class');
        expect(labelElement).toHaveClass('custom-label-class');
        expect(errorMessageElement).toHaveClass('custom-error-class');
    });

    it('should trigger onChange when input value changes', () => {
        const onChangeMock = jest.fn();

        const { container } = render(<Input label="Name" onChange={onChangeMock} />);

        const inputElement = container.querySelector('input') as HTMLInputElement;
        fireEvent.change(inputElement, { target: { value: 'John' } });

        expect(onChangeMock).toHaveBeenCalledTimes(1);
        expect(inputElement.value).toBe('John');
    });
});
