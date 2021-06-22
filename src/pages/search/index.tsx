import { ArtistCard, LoadingComponent, VideoCard } from '@/components';
import { Row, Col } from 'antd';
import { request } from 'lib/request';
import { IArtist } from 'models/artist';
import { IVideo } from 'models/video';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';


interface Props {

}

const page: React.FC<Props> = () => {
    const { query, push } = useRouter()
    const { key } = query;
    const [videos, setVideos] = useState<IVideo[]>()
    const [artists, setArtists] = useState<IArtist[]>()

    useEffect(() => {
        key && (async () => {
            try {
                const result = await request.get('/search', { params: { key } });
                setVideos(result.data.videos);
                setArtists(result.data.artists);
            } catch { }
        })();
    }, [key])

    if (typeof videos === 'undefined' || typeof artists === 'undefined')
        return <LoadingComponent />

    return (
        <Row gutter={[0, 32]}>
            <Col span={24}>
                <h3 className='text-center mb-6'>Videos</h3>
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
            </Col>
            <Col span={24}>
                <h3 className='text-center mb-6'>Artists</h3>
                <Row gutter={[16, 16]} justify='space-between'>
                    {artists.map((el) =>
                        <Col key={el._id}>
                            <ArtistCard
                                avatar={el.avatar}
                                fullName={el.firstName + ' ' + el.lastName}
                                overview={el.about}
                                to={`/artists/${el._id}`}
                            />
                        </Col>
                    )}
                </Row>
            </Col>
        </Row>
    )
}

export default page;