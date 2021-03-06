import { ArtistCard, FillImage, LoadingComponent } from '@/components';
import { Col, Collapse, Row } from 'antd';
import { IVideo } from '@/models';
import React, { useEffect, useState } from 'react';
import { request } from 'lib/request';
import { useRouter } from 'next/router';

export const SingleVedioPage: React.FC = () => {
    const { query } = useRouter()
    const { id } = query;
    const [video, setVideo] = useState<IVideo>()

    useEffect(() => {
        if (id)
            (async () => {
                try {
                    const result = await request.get(`/videos/${id}`);
                    setVideo(result.data)
                } catch { }
            })()
    }, [id])

    if (typeof video === 'undefined') return <LoadingComponent />

    return (
        <div className='flex flex-col space-y-6'>
            <div className='w-full h-[25rem] relative'>
                <FillImage className='object-cover object-center' src={video.cover} alt={video.title} />
            </div>
            <h2 className='font-medium'>{video.title}</h2>
            <h6 className='text-gray-500 font-light' >{video.overview}</h6>
            <Collapse>
                <Collapse.Panel key='description' header={<p className='inline uppercase font-medium'>
                    description
                </p>} >
                    <p className=''>
                        {video.description}
                    </p>
                </Collapse.Panel>

                <Collapse.Panel key='artists' header={<p className='inline uppercase font-medium'>
                    artists
                </p>}>
                    <Row gutter={[16, 16]} justify='center'>
                        {video.artists.map(el =>
                            typeof el === 'object' && <Col key={el._id}>
                                <ArtistCard to={`/artists/${el._id}`} fullName={el.firstName + ' ' + el.lastName} overview={el.about} avatar={el.avatar} />
                            </Col>
                        )}
                    </Row>
                </Collapse.Panel>

                <Collapse.Panel key='details' header={<p className='inline uppercase font-medium'>
                    details
                </p>}>
                    <div className="grid grid-cols-12 w-full gap-6">
                        <TitleValue title='category' value={video.category} />
                        <TitleValue title='country' value={video.country} />
                        <TitleValue title='language' value={video.lang} />
                        <TitleValue title='publish date' value={video.publishDate} />
                        <TitleValue title='quality' value={video.quality} />
                        <TitleValue title='type' value={video.type} />
                        <TitleValue title='duration' value={(video.duration / 60).toFixed(0) + ' Minutes'} />
                    </div>
                </Collapse.Panel>
            </Collapse>
        </div>
    )
}

export default SingleVedioPage





interface Props {
    title: string;
    value: string;
    children?: never;
}

const TitleValue: React.FC<Props> = ({ title, value }) => {
    return (
        <>
            <h6 className='capitalize font-medium col-span-2'>
                {title}{':'}
            </h6>
            <p className='font-light col-span-10'>
                {value}
            </p>
        </>
    )
}