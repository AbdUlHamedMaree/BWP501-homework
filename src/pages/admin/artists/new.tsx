import { Button, Form, Input, InputNumber, Select } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { request } from '@/lib';
import { IArtist } from 'models/artist';
import { IVideo } from 'models/video';


export const SingleVedioPage: React.FC = () => {
    const { push } = useRouter()
    const [loading, setLoading] = useState(false)
    const [videos, setVideos] = useState<IVideo[]>()


    const onFinish = async (values: any) => {
        setLoading(true)

        try {
            await request.post(`/artists`, values);
            push('/admin/artists');
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

    return (
        <div className=''>
            <Form
                onFinish={onFinish}
                layout='vertical'
            >

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
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Add
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default SingleVedioPage
