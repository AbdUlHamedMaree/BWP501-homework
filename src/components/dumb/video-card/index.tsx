
import React from 'react';
import { Card, Typography } from 'antd';
import { EyeOutlined } from '@ant-design/icons';

const { Meta } = Card;

interface Props {
    title: string,
    overview: string,
    img: {
        src: string,
        alt: string
    },
    onShow?: () => void,
    children?: never;
}

export const VideoCard: React.FC<Props> = ({ overview, img, onShow, title }) => {
    return (
        <Card
            style={{ width: 300 }}
            cover={
                <img
                    alt={img.src}
                    src={img.src}
                    width='100%'
                    style={{
                        objectFit: 'cover',
                        height: 400
                    }}
                />
            }
            actions={[
                <EyeOutlined onClick={onShow} key='show' />,
            ]}
            hoverable
        >
            <Meta
                title={title}
                description={
                    <Typography.Paragraph type='secondary' ellipsis={{ rows: 2, tooltip: overview }}>

                        {overview}
                    </Typography.Paragraph>
                }
            />
        </Card>
    )
}