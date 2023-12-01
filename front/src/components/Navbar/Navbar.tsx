interface NavbarProps {}

export default function Navbar({}: NavbarProps) {
    const title = 'IWF Hubbe App';

    return (
        <nav className="fixed w-full h-14 bg-primary flex items-center justify-center">
            <div className="text-white font-bold text-lg">{title}</div>
        </nav>
    );
}
