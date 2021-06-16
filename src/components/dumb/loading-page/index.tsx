import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';

export const LoadingPage: React.FC = () => {
    return (
        <div className='fixed w-screen h-screen inset-0 grid place-content-center place-items-center text-7xl bg-white'>
            <LoadingOutlined />
        </div>
    )
}