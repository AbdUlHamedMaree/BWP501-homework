import { Row, Col, Input } from 'antd';
import { LoadingComponent, VideoCard } from '@/components';
import { mockVideo, IVideo } from '@/models';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { request } from '@/lib';
import { useDebounce } from 'utils/use-debounce';

const VideosPage: React.FC = () => {
    const { push } = useRouter();
    const [videos, setVideos] = useState<IVideo[]>()
    const [_state, setState] = useState<any>({})

    const state = useDebounce(_state);

    const onChangeInput: React.ChangeEventHandler<HTMLInputElement> = ({ target: { name, value } }) => {
        setState({ [name]: !!value.trim() ? value.trim() : undefined });
    }

    useEffect(() => {
        (async () => {
            try {
                const result = await request.get('/videos', { params: state });
                setVideos(result.data);
            } catch { }
        })()
    }, [state])

    if (typeof videos === 'undefined')
        return <LoadingComponent />

    return (
        <div className='space-y-6'>
            <div className='bg-primary bg-opacity-30 p-2 flex justify-between space-x-6'>
                <Input placeholder='Publish Date' name='publishDate' onChange={onChangeInput} />
                <Input placeholder='Language' name='lang' onChange={onChangeInput} />
                <Input placeholder='Country' name='country' onChange={onChangeInput} />
                <Input placeholder='Category' name='category' onChange={onChangeInput} />
                <Input placeholder='Quality' name='quality' onChange={onChangeInput} />
            </div>
            <div>
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
            </div>
        </div>
    )
}
export default VideosPage;