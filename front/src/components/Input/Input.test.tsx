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

    // it('should apply custom classNames', () => {
    //     const { container } = render(
    //         <Input
    //             label="Name"
    //             className="custom-container-class"
    //             // labelClassName="custom-label-class"
    //             // inputClassName="custom-input-class"
    //             // errorMessageClassName="custom-error-class"
    //             // errorMessage="Error"
    //         />
    //     );

    //     console.log(container.classList, container.innerHTML)

    //     // const inputElement = containerElement.querySelector('input');
    //     // const labelElement = containerElement.querySelector('.custom-label-class');
    //     // const errorMessageElement = containerElement.querySelector('.custom-error-class');

    //     // expect(container.className).toContain('custom-container-class');
    //     expect(container).toHaveClass('custom-container-class');
    //     // expect(labelElement).toHaveClass('custom-label-class');
    //     // expect(inputElement).toHaveClass('custom-input-class');
    //     // expect(errorMessageElement).toHaveClass('custom-error-class');
    // });

    it('should trigger onChange when input value changes', () => {
        const onChangeMock = jest.fn();

        const { container } = render(<Input label="Name" onChange={onChangeMock} />);

        const inputElement = container.querySelector('input') as HTMLInputElement;
        fireEvent.change(inputElement, { target: { value: 'John' } });

        expect(onChangeMock).toHaveBeenCalledTimes(1);
        expect(inputElement.value).toBe('John');
    });
});
