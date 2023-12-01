import ProviderComposer from './components/ProviderComposer';
import AuthProvider from './contexts/AuthContext';
import LoaderProvider from './contexts/LoaderContext';
import ModalProvider from './contexts/ModalContext';
import ToastProvider from './contexts/ToastContext';
import Routes from './routes/Routes';
import { createStorage } from './core/storage';

createStorage().init();

const App = () => {
    return (
        <div id="app">
            <ProviderComposer
                components={[
                    { Component: AuthProvider },
                    { Component: ToastProvider },
                    { Component: LoaderProvider },
                    { Component: ModalProvider }
                ]}
            >
                <Routes />
            </ProviderComposer>
        </div>
    );
};

export default App;
