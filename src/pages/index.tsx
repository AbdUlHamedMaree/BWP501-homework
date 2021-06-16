import React from 'react';
import { Col, Row } from 'antd';

import { VideoCard } from '@/components';
import { mockVideo } from '@/models';
import { useRouter } from 'next/router';


const videoData = Array.from({ length: 20 }, mockVideo);
const HomePage: React.FC = () => {
    const { push } = useRouter();

    return (
        <Row gutter={[16, 16]} justify='space-between'>
            {videoData.map((el, i) =>
                <Col key={i}>
                    <VideoCard
                        title={el.title}
                        overview={el.overview}
                        img={{ src: el.cover, alt: el.title }}
                        onShow={() => { push('/videos/1') }}
                    />
                </Col>
            )}
        </Row>
    )
}
export default HomePage;