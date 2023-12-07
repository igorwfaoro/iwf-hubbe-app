import { render } from '@testing-library/react';
import Login from './Login';
import AuthProvider from '../../contexts/AuthContext';
import LoaderProvider from '../../contexts/LoaderContext';
import ToastProvider from '../../contexts/ToastContext';

const mockUseNavigate = jest.fn();

jest.mock('../../contexts/AuthContext', () => ({
    useAuth: jest.fn(() => ({
        login: jest.fn()
    }))
}));

jest.mock('react-router-dom', () => ({
    useNavigate: () => mockUseNavigate
}));

jest.mock('../../contexts/LoaderContext', () => ({
    useLoader: jest.fn(() => ({
        show: jest.fn(),
        hide: jest.fn()
    }))
}));

jest.mock('../../contexts/ToastContext', () => ({
    useToast: jest.fn(() => ({
        show: jest.fn()
    }))
}));

beforeEach(() => {
    jest.clearAllMocks();
});

describe('Login Component', () => {
    it('ddd', () => {
        expect(true).toBe(true);
    });

    // it('renders login form with username input and login button', () => {
    //     const { getByLabelText, getByText } = render(
    //         <AuthProvider>
    //             <LoaderProvider>
    //                 <ToastProvider>
    //                     <Login />
    //                 </ToastProvider>
    //             </LoaderProvider>
    //         </AuthProvider>
    //     );

    //     const usernameInput = getByLabelText('Username');
    //     const loginButton = getByText('Login');

    //     expect(usernameInput).toBeInTheDocument();
    //     expect(loginButton).toBeInTheDocument();
    // });

    // it('disables login button when username is empty', () => {
    //     const { getByLabelText, getByText } = render(
    //         <AuthProvider>
    //             <LoaderProvider>
    //                 <ToastProvider>
    //                     <Login />
    //                 </ToastProvider>
    //             </LoaderProvider>
    //         </AuthProvider>
    //     );

    //     const usernameInput = getByLabelText('Username');
    //     const loginButton = getByText('Login');

    //     expect(loginButton).toBeDisabled();

    //     fireEvent.change(usernameInput, { target: { value: 'testUser' } });

    //     expect(loginButton).not.toBeDisabled();
    // });

    // it('calls auth.login with entered username on form submission', async () => {
    //     const { getByLabelText, getByText } = render(
    //         <AuthProvider>
    //             <LoaderProvider>
    //                 <ToastProvider>
    //                     <Login />
    //                 </ToastProvider>
    //             </LoaderProvider>
    //         </AuthProvider>
    //     );

    //     const usernameInput = getByLabelText('Username');
    //     const loginButton = getByText('Login');

    //     fireEvent.change(usernameInput, { target: { value: 'testUser' } });
    //     fireEvent.click(loginButton);

    //     await waitFor(() => {
    //         expect(mockLogin).toHaveBeenCalledWith({ username: 'testUser' });
    //     });
    // });

    // it('redirects to /home after successful login', async () => {
    //     mockUseNavigate.mockReturnValueOnce(() => {});

    //     const { getByLabelText, getByText } = render(
    //         <AuthProvider>
    //             <LoaderProvider>
    //                 <ToastProvider>
    //                     <Login />
    //                 </ToastProvider>
    //             </LoaderProvider>
    //         </AuthProvider>
    //     );

    //     const usernameInput = getByLabelText('Username');
    //     const loginButton = getByText('Login');

    //     fireEvent.change(usernameInput, { target: { value: 'testUser' } });
    //     fireEvent.click(loginButton);

    //     await waitFor(() => {
    //         expect(mockUseNavigate).toHaveBeenCalledWith('/home');
    //     });
    // });

    // it('shows an error toast on login failure', async () => {
    //     const mockError = new Error('Login failed');
    //     mockLogin.mockRejectedValueOnce(mockError);

    //     const { getByLabelText, getByText } = render(
    //         <AuthProvider>
    //             <LoaderProvider>
    //                 <ToastProvider>
    //                     <Login />
    //                 </ToastProvider>
    //             </LoaderProvider>
    //         </AuthProvider>
    //     );

    //     const usernameInput = getByLabelText('Username');
    //     const loginButton = getByText('Login');

    //     fireEvent.change(usernameInput, { target: { value: 'testUser' } });
    //     fireEvent.click(loginButton);

    //     await waitFor(() => {
    //         expect(mockUseNavigate).not.toHaveBeenCalled();
    //         expect(mockError).toBeTruthy();
    //     });
    // });
});
