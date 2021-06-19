import { LoadingComponent } from '@/components';
import { Button, Form, Input } from 'antd';
import { IVideo } from '@/models';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { request } from '@/lib';


export const SingleVedioPage: React.FC = () => {
    const { query, push, replace } = useRouter()
    const { id } = query;
    const [video, setVideo] = useState<IVideo>()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        id && (async () => {
            setLoading(true);

            try {
                const result = await request.get(`/videos/${id}`);
                setVideo(result.data);
            } catch { }

            setLoading(false);
        })()
    }, [id])

    const onFinish = async (values: any) => {
        setLoading(true)

        try {
            await request.put(`/videos/${id}`, values);
            push('/admin/videos');
        }
        catch (e) {
            console.error(e)
        }

        setLoading(false)
    };

    const onDelete = async () => {
        setLoading(true)

        try {
            await request.delete(`/videos/${id}`);
            replace('/admin/videos');
        }
        catch (e) {
            console.error(e)
        }

        setLoading(false)
    };

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
                    label="cover"
                    name="cover"
                    rules={[{ required: true }]}
                >
                    <Input placeholder="cover" />
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
