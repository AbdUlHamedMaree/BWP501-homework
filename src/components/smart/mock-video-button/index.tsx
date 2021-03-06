import { request } from '@/lib';
import { Button, ButtonProps } from 'antd';
import React, { useState } from 'react';


type Props = {
    afterFinish?: () => void
} & ButtonProps;

export const MockVideoButton: React.FC<Props> = ({ afterFinish, children, ...rest }) => {
    const [loading, setLoading] = useState(false);

    return (
        <Button
            type='primary'
            {...rest}
            onClick={async () => {
                setLoading(true)
                await request.post('/videos/mock')
                setLoading(false)
                afterFinish && afterFinish()
            }}
            loading={loading}
        >
            MOCK VIDEO
        </Button>
    )
}