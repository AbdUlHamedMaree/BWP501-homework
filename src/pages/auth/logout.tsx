import { LoadingPage } from 'components/dumb';
import { request } from 'lib/request';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';


interface Props {

}

const page: React.FC<Props> = () => {
    const { replace } = useRouter()
    useEffect(() => {
        request.post('/api/auth/logout').then(e => replace('/'));
    }, [])
    return (
        <LoadingPage />
    )
}

export default page;