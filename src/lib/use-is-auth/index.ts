import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { request } from '@/lib';

export const useIsAuth = (redirect = false) => {
  const { push } = useRouter();
  const [auth, setAuth] = useState<boolean>();
  useEffect(() => {
    (async () => {
      try {
        await request.get('/auth/user', {
          headers: { 'Show-Notification': false },
        });

        setAuth(true);
      } catch {
        setAuth(false);
        redirect && push('/auth/login');
      }
    })();
  }, []);
  return { loading: typeof auth === 'undefined', auth };
};
