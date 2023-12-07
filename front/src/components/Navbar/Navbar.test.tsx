import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar, { NAVBAR_MENUS } from './Navbar';

jest.mock('../../contexts/AuthContext', () => ({
    useAuth: jest.fn(() => ({
        isLogged: () => true,
        getLoggedUser: () => ({ username: 'test-user' }),
        logout: jest.fn().mockImplementation(() => {
            console.log('##################################################### igor');
            return Promise.resolve();
        })
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

    // TODO: test
    // it('should handle logout when user clicks on Logout', async () => {
    //     //const { queryByText, getByText } =
    //     render(
    //         <MemoryRouter>
    //             <Navbar />
    //         </MemoryRouter>
    //     );

    //     // const logoutButton = queryByText('Logout');
    //     // expect(logoutButton).toBeNull();

    //     // const dropdownUserButton = getByText('test-user');
    //     // fireEvent.click(dropdownUserButton);

    //     await waitFor(() => {
    //         // const logoutButton = queryByText('Logout');
    //         // if (logoutButton) {
    //         //     fireEvent.click(logoutButton);
    //         // }
    //         useAuth().logout()
    //     });

    //     expect(useAuth().logout).toHaveBeenCalledTimes(1);
    // });
});
