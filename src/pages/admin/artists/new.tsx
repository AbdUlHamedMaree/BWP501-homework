import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { request } from '@/lib';


export const SingleVedioPage: React.FC = () => {
    const { push } = useRouter()
    const [loading, setLoading] = useState(false)


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
                    <Input placeholder="age" />
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
