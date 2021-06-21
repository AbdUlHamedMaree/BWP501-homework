import { FillImage, LoadingComponent, VideoCard } from '@/components';
import { request } from '@/lib';
import { IArtist } from '@/models';
import { Col, Row } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const SingleArtistPage: React.FC = () => {
    const { query, push } = useRouter()
    const { id } = query;
    const [artist, setArtist] = useState<IArtist>()


    useEffect(() => {
        if (id)
            (async () => {
                try {
                    const result = await request.get(`/artists/${id}`);
                    setArtist(result.data);
                } catch { }
            })()
    }, [id])

    if (typeof artist === 'undefined')
        return <LoadingComponent />

    return (
        <div className='flex flex-col space-y-6'>
            <div className='bg-gray-200 bg-opacity-30 flex flex-col space-y-4'>
                <div className='relative h-96'>
                    <FillImage className='object-contain' src={artist.avatar} alt={artist.firstName} />
                </div>
                <h2 className='font-medium'>
                    {artist.firstName + ' ' + artist.lastName}
                </h2>
                <h6>
                    {artist.about}
                </h6>
                <h6 className='flex'>
                    Age: {artist.age}
                </h6>
            </div>
            <div className='space-y-4'>
                <h4>Films that filmed in</h4>
                <Row gutter={[16, 16]}>
                    {artist.videos.map(el => typeof el === 'object' && <Col key={el._id}>
                        <VideoCard
                            title={el.title}
                            overview={el.overview}
                            img={{ src: el.cover, alt: el.title }}
                            onShow={() => { push(`/videos/${el._id}`) }}
                        />
                    </Col>
                    )}
                </Row>
            </div>
        </div>
    )
}
export default SingleArtistPage