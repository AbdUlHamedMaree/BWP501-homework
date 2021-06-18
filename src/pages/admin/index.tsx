import { useIsAuth } from '@/lib';
import React from 'react';


interface Props {

}

const page: React.FC<Props> = () => {
    useIsAuth(true)
    return (
        <div>
            admin
        </div>
    )
}

export default page;