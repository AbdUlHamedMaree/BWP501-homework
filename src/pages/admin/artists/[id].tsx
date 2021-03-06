import { LoadingComponent } from '@/components';
import { Button, Form, Input, InputNumber, Select } from 'antd';
import { IArtist, IVideo } from '@/models';
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { request } from '@/lib';


export const SingleVedioPage: React.FC = () => {
    const { query, push, replace } = useRouter()
    const { id } = query;
    const [video, setVideo] = useState<IVideo>()
    const [loading, setLoading] = useState(false)
    const [videos, setVideos] = useState<IVideo[]>()


    useEffect(() => {
        id && (async () => {
            setLoading(true);

            try {
                const result = await request.get(`/artists/${id}`);
                setVideo(result.data);
            } catch { }

            setLoading(false);
        })()
    }, [id])

    const onFinish = async (values: any) => {
        setLoading(true)

        try {
            await request.put(`/artists/${id}`, values);
            push('/admin/artists');
        }
        catch (e) {
            console.error(e)
        }

        setLoading(false)
    };

    const onDelete = async () => {
        setLoading(true)

        try {
            await request.delete(`/artists/${id}`);
            replace('/admin/artists');
        }
        catch (e) {
            console.error(e)
        }

        setLoading(false)
    };

    const fetchVideos = useCallback(async () => {
        setLoading(true)
        try {
            const result = await request.get('/videos');
            setVideos(result.data);
        } catch { }
        setLoading(false)
    }, []);

    useEffect(() => {
        fetchVideos();
    }, [])

    if (typeof video === 'undefined')
        return <LoadingComponent />

    return (
        <div className=''>
            <Form
                initialValues={video}
                onFinish={onFinish}
                layout='vertical'
            >
                <Form.Item
                    name="_id"
                    hidden
                >
                </Form.Item>

                <Form.Item
                    label="firstName"
                    name="firstName"
                    rules={[{ required: true }]}
                >
                    <Input placeholder="firstName" />
                </Form.Item>

                <Form.Item
                    label="lastName"
                    name="lastName"
                    rules={[{ required: true }]}
                >
                    <Input placeholder="lastName" />
                </Form.Item>

                <Form.Item
                    label="age"
                    name="age"
                    rules={[{ required: true }]}
                >
                    <InputNumber placeholder="age" style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    label="avatar"
                    name="avatar"
                    rules={[{ required: true }]}
                >
                    <Input placeholder="avatar" />
                </Form.Item>

                <Form.Item
                    label="about"
                    name="about"
                    rules={[{ required: true }]}
                >
                    <Input placeholder="about" />
                </Form.Item>

                <Form.Item
                    label="videos"
                    name="videos"
                >
                    {
                        videos ?
                            <Select
                                mode="multiple"
                                allowClear
                                style={{ width: '100%' }}
                                placeholder="videos"
                                options={videos.map(el => ({ label: el.title, value: el._id }))}
                            />
                            : null
                    }
                </Form.Item>

                <Form.Item>
                    <div className='flex space-x-2'>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Edit
                        </Button>
                        <Button type="dashed" danger loading={loading} onClick={onDelete}>
                            Delete
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </div>
    )
}

export default SingleVedioPage
