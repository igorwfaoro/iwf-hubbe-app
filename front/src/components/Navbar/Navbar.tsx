import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import { useAuth } from '../../contexts/AuthContext';
import { useLoader } from '../../contexts/LoaderContext';

interface NavbarProps {}

export const NAVBAR_MENUS: { label: string; path: string }[] = [
    {
        label: 'Home',
        path: '/home'
    },
    {
        label: 'About',
        path: '/about'
    }
];

export default function Navbar({}: NavbarProps) {
    const auth = useAuth();
    const loader = useLoader();
    const { pathname } = useLocation();

    const handleLogout = () => {
        loader.show();
        auth.logout({ redirect: true }).finally(() => loader.hide());
    };

    const isLogged = auth.isLogged();
    const userName = auth.getLoggedUser()?.username;

    return (
        <nav className="fixed w-full h-14 bg-primary flex items-center justify-between px-4 z-[9999]">
            <Link to="/">
                <img src="/logo-white.svg" alt="Logo" className="h-8" />
            </Link>

            {isLogged && (
                <>
                    <ul className="flex gap-3 text-white">
                        {NAVBAR_MENUS.map((menu, i) => (
                            <li
                                key={i}
                                className={classNames({
                                    'font-bold': menu.path === pathname
                                })}
                            >
                                <Link to={menu.path}>{menu.label}</Link>
                            </li>
                        ))}
                    </ul>
                    <div>
                        <DropdownMenu
                            label={userName}
                            className="bg-transparent p-0"
                            items={[{ label: 'Logout', onClick: () => handleLogout() }]}
                        />
                    </div>
                </>
            )}
        </nav>
    );
}
