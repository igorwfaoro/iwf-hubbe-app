import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLoader } from '../../contexts/LoaderContext';
import { useToast } from '../../contexts/ToastContext';
import { mapHttpError } from '../../core/http';
import Card from '../../components/Card/Card';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

export default function Login() {
    const auth = useAuth();
    const loader = useLoader();
    const toast = useToast();
    const navigate = useNavigate();

    const [loginForm, setLoginForm] = useState({
        username: ''
    });

    const canLogin = !!loginForm.username;

    const handleLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        loader.show();
        auth.login({
            username: loginForm.username
        })
            .then(() => {
                navigate('/home');
            })
            .catch((error) => {
                toast.show(mapHttpError(error), 'error');
            })
            .finally(() => loader.hide());
    };

    const setFieldValue = (field: string, value: string) => {
        setLoginForm((f) => ({
            ...f,
            [field]: value
        }));
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <Card className="p-8 space-y-4">
                <h1 className="text-2xl font-bold">Login</h1>

                <form className="space-y-4" onSubmit={handleLogin}>
                    <Input
                        label="Username"
                        value={loginForm.username}
                        onChange={(e) => setFieldValue('username', e.target.value)}
                    />

                    <Button className="w-full" disabled={!canLogin}>
                        Login
                    </Button>
                </form>
            </Card>
        </div>
    );
}
