import { Button, Form, Input, Select } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { request } from '@/lib';
import { IArtist } from '@/models';


export const SingleVedioPage: React.FC = () => {
    const { push } = useRouter()
    const [loading, setLoading] = useState(false)
    const [artists, setArtists] = useState<IArtist[]>()


    const onFinish = async (values: any) => {
        setLoading(true)

        try {
            await request.post(`/videos`, values);
            push('/admin/videos');
        }
        catch (e) {
            console.error(e)
        }

        setLoading(false)
    };

    const fetchArtists = useCallback(async () => {
        setLoading(true)
        try {
            const result = await request.get('/artists');
            setArtists(result.data);
        } catch { }
        setLoading(false)
    }, []);

    useEffect(() => {
        fetchArtists();
    }, [])

    return (
        <div className=''>
            <Form
                onFinish={onFinish}
                layout='vertical'
            >
                <Form.Item
                    label="title"
                    name="title"
                    rules={[{ required: true }]}
                >
                    <Input placeholder="title" />
                </Form.Item>

                <Form.Item
                    label="overview"
                    name="overview"
                    rules={[{ required: true }]}
                >
                    <Input placeholder="overview" />
                </Form.Item>

                <Form.Item
                    label="description"
                    name="description"
                    rules={[{ required: true }]}
                >
                    <Input placeholder="description" />
                </Form.Item>

                <Form.Item
                    label="publishDate"
                    name="publishDate"
                    rules={[{ required: true }]}
                >
                    <Input placeholder="publishDate" />
                </Form.Item>

                <Form.Item
                    label="lang"
                    name="lang"
                    rules={[{ required: true }]}
                >
                    <Input placeholder="lang" />
                </Form.Item>

                <Form.Item
                    label="country"
                    name="country"
                    rules={[{ required: true }]}
                >
                    <Input placeholder="country" />
                </Form.Item>

                <Form.Item
                    label="type"
                    name="type"
                    rules={[{ required: true }]}
                >
                    <Input placeholder="type" />
                </Form.Item>

                <Form.Item
                    label="category"
                    name="category"
                    rules={[{ required: true }]}
                >
                    <Input placeholder="category" />
                </Form.Item>

                <Form.Item
                    label="quality"
                    name="quality"
                    rules={[{ required: true }]}
                >
                    <Input placeholder="quality" />
                </Form.Item>

                <Form.Item
                    label="duration"
                    name="duration"
                    rules={[{ required: true }]}
                >
                    <Input placeholder="duration" />
                </Form.Item>

                <Form.Item
                    label="artists"
                    name="artists"
                >
                    {
                        artists ?
                            <Select
                                mode="multiple"
                                allowClear
                                style={{ width: '100%' }}
                                placeholder="artists"
                                options={artists.map(el => ({ label: el.firstName, value: el._id }))}
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
