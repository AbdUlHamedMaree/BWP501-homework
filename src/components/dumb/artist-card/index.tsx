import { Card, Typography } from 'antd';
import React from 'react';
import Link from 'next/link';


const { Meta } = Card

interface Props {
    fullName: string,
    overview: string,
    avatar: string;
    onClick?: () => void;
    to: string
    children?: never
}

export const ArtistCard: React.FC<Props> = ({ overview, avatar, fullName, to, onClick }) => {
    return (
        <Link href={to}>
            <Card
                className='min-w-[200px] w-full max-w-[350px]'
                hoverable
                onClick={onClick}
            >
                <Meta
                    avatar={
                        <img src={avatar} alt={fullName} className='w-20 h-20 rounded-full object-cover' />
                    }
                    title={fullName}
                    description={
                        <Typography.Paragraph type='secondary' ellipsis={{ rows: 1 }}>
                            {overview}
                        </Typography.Paragraph>
                    }
                />
            </Card>
        </Link>
    )
}