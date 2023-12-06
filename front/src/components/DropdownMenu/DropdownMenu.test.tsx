import { render, fireEvent } from '@testing-library/react';
import DropdownMenu from './DropdownMenu';

describe('DropdownMenu Component', () => {
    it('should render the DropdownMenu component', () => {
        const { container } = render(<DropdownMenu />);
        expect(container).toBeInTheDocument();
    });

    it('should render the label passed as prop', () => {
        const label = 'Menu Label';
        const { getByText } = render(<DropdownMenu label={label} />);

        expect(getByText(label)).toBeInTheDocument();
    });

    it('should open the menu when the button is clicked', () => {
        const { getByText, getByRole } = render(<DropdownMenu label="Open Menu" />);

        const button = getByText('Open Menu');
        fireEvent.click(button);

        const menu = getByRole('menu');

        expect(menu).toBeInTheDocument();
    });

    it('should close the menu when an item is clicked', () => {
        const items = [
            { label: 'Item 1', onClick: jest.fn() },
            { label: 'Item 2', onClick: jest.fn() }
        ];
        const { getByText, queryByRole } = render(<DropdownMenu label="Open Menu" items={items} />);

        const button = getByText('Open Menu');
        fireEvent.click(button);

        const item = getByText('Item 1');
        fireEvent.click(item);

        const menu = queryByRole('menu');

        expect(menu).not.toBeInTheDocument();
    });

    it('should call the onClick function of an item when it is clicked', () => {
        const item1ClickMock = jest.fn();
        const item2ClickMock = jest.fn();

        const items = [
            { label: 'Item 1', onClick: item1ClickMock },
            { label: 'Item 2', onClick: item2ClickMock }
        ];

        const { getByText } = render(<DropdownMenu label="Open Menu" items={items} />);
        const button = getByText('Open Menu');
        fireEvent.click(button);

        const item1 = getByText('Item 1');
        fireEvent.click(item1);
        expect(item1ClickMock).toHaveBeenCalledTimes(1);
    });
});
