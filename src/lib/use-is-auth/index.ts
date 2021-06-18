import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { request } from '@/lib';

export const useIsAuth = (redirect = false) => {
  const { push } = useRouter();
  const [auth, setAuth] = useState<boolean>();
  useEffect(() => {
    request
      .get('/api/auth/user')
      .catch(e => {
        redirect && push('/auth/login');
      })
      .then(e => {
        setAuth(true);
      });
  }, []);
  return { loading: typeof auth === 'undefined', auth };
};
