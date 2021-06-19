import { Row, Col } from 'antd';
import { LoadingComponent, VideoCard } from '@/components';
import { mockVideo, IVideo } from '@/models';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { request } from '@/lib';

const videoData = Array.from({ length: 20 }, mockVideo);
const VideosPage: React.FC = () => {
    const { push } = useRouter();
    const [videos, setVideos] = useState<IVideo[]>()

    useEffect(() => {
        request.get('/videos').then(e => setVideos(e.data))
    }, [])

    if (typeof videos === 'undefined')
        return <LoadingComponent />

    return (
        <Row gutter={[16, 16]} justify='space-between'>
            {videos.map((el, i) =>
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
export default VideosPage;