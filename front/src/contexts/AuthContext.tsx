import { createContext, useContext } from 'react';
import { createAuthService } from '../services/auth.service';
import { createStorage } from '../core/storage';
import { User } from '../models/api/user';
import { LoginDto } from '../models/dto/login.dto';

export interface IAuthProvider {
    isLogged(): boolean;
    getLoggedUser(): User | undefined;
    login(params: LoginDto): Promise<void>;
    logout(): Promise<void>;
}

interface AuthProviderProps {
    children: any;
}

const AuthContext = createContext<IAuthProvider | undefined>(undefined);

const AuthProvider = (props: AuthProviderProps) => {
    const storage = createStorage();
    const authService = createAuthService();

    const isLogged = (): boolean => {
        const user = getLoggedUser();
        return !!user?.username;
    };

    const getLoggedUser = (): User | undefined => {
        return storage.getData()?.user;
    };

    const login = (params: LoginDto): Promise<void> => {
        return new Promise((resolve, reject) => {
            authService
                .login(params)
                .then((response) => {
                    storage.setData(response);
                    resolve();
                })
                .catch((error) => reject(error));
        });
    };

    const logout = (): Promise<void> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                storage.clearData();
                resolve();
            }, 1000);
        });
    };

    return (
        <AuthContext.Provider
            value={{
                isLogged,
                getLoggedUser,
                login,
                logout
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext)!;
