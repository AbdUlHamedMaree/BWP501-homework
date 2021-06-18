import { request } from '@/middleware';
import { Button } from 'antd';
import React, { useState } from 'react';


interface Props {

}

export const MockVideoButton: React.FC<Props> = () => {
    const [loading, setLoading] = useState(false);

    return (
        <Button
            onClick={async () => {
                setLoading(true)
                await request.post('/api/videos')
                setLoading(false)
            }}
            loading={loading}
            type='primary'
        >
            MOCK VIDEO
        </Button>
    )
}