import { fireEvent, render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar, { NAVBAR_MENUS } from './Navbar';

const mockLogout = jest.fn().mockResolvedValue(undefined);

jest.mock('../../contexts/LoaderContext', () => ({
    useLoader: jest.fn(() => ({
        show: jest.fn(),
        hide: jest.fn()
    }))
}));

jest.mock('../../contexts/AuthContext', () => ({
    useAuth: jest.fn(() => ({
        isLogged: () => true,
        getLoggedUser: () => ({ username: 'test-user' }),
        logout: mockLogout
    }))
}));

describe('Navbar Component', () => {
    it('should render the Navbar component', () => {
        const { getByAltText } = render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        );
        const logo = getByAltText('Logo');
        expect(logo).toBeInTheDocument();
    });

    it('should render navigation menus', () => {
        const { getByText } = render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        );

        NAVBAR_MENUS.forEach((menu) => {
            const menuItem = getByText(menu.label);
            expect(menuItem).toBeInTheDocument();
        });
    });

    it('should handle logout when user clicks on Logout', async () => {
        const { queryByText, getByText } = render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        );

        const logoutButton = queryByText('Logout');
        expect(logoutButton).toBeNull();

        const dropdownUserButton = getByText('test-user');
        fireEvent.click(dropdownUserButton);

        const logoutButtonAfterDropdown = queryByText('Logout');
        expect(logoutButtonAfterDropdown).toBeInTheDocument();
        fireEvent.click(logoutButtonAfterDropdown?.firstChild!);

        await waitFor(() => expect(mockLogout).toHaveBeenCalled());

        expect(mockLogout).toHaveBeenCalledTimes(1);
    });
});
