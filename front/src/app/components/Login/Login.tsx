'use client';

import { useState } from 'react';
import Button from '../../../components/Button/Button';
import Card from '../../../components/Card/Card';
import Input from '../../../components/Input/Input';
import { useToast } from '../../../contexts/ToastContext';
import { createAuthService } from '../../../services/auth.service';
import { useRouter } from 'next/navigation';
import { mapHttpError } from '../../../http/request';

interface LoginProps {}

export default function Login({}: LoginProps) {
  const authService = createAuthService();
  const toast = useToast();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState<string>('');

  const handleLogin = () => {
    setLoading(true);
    authService
      .login({ username })
      .then(() => {
        router.push('/dashboard');
      })
      .catch((error) => toast.open(mapHttpError(error), 'error'))
      .finally(() => setLoading(false));
  };

  return (
    <Card className="p-8 flex flex-col gap-4 items-center">
      <h1 className="text-2xl font-bold">IWF Hubbe App</h1>

      <form className="flex flex-col gap-2">
        <Input
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Button className="w-full" loading={loading} onClick={handleLogin}>
          Login
        </Button>
      </form>
    </Card>
  );
}
