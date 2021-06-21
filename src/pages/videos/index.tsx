import { Row, Col } from 'antd';
import { LoadingComponent, VideoCard } from '@/components';
import { mockVideo, IVideo } from '@/models';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { request } from '@/lib';

const VideosPage: React.FC = () => {
    const { push } = useRouter();
    const [videos, setVideos] = useState<IVideo[]>()

    useEffect(() => {
        (async () => {
            try {
                const result = await request.get('/videos');
                setVideos(result.data);
            } catch { }
        })()
    }, [])

    if (typeof videos === 'undefined')
        return <LoadingComponent />

    return (
        <Row gutter={[16, 16]} justify='space-between'>
            {videos.map((el) =>
                <Col key={el._id}>
                    <VideoCard
                        title={el.title}
                        overview={el.overview}
                        img={{ src: el.cover, alt: el.title }}
                        onShow={() => { push(`/videos/${el._id}`) }}
                    />
                </Col>
            )}
        </Row>
    )
}
export default VideosPage;