import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';

export const LoadingComponent: React.FC = () => {
    return (
        <div className='w-full h-full min-h-[10rem] grid place-content-center text-7xl'>
            <LoadingOutlined />
        </div>
    )
}