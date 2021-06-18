import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Form, Input, Checkbox, Button } from 'antd';
import { request } from 'lib/request';
import { useRouter } from 'next/router';
import React, { useState } from 'react';


interface Props {

}

const page: React.FC<Props> = () => {

    const { replace } = useRouter();
    const [loading, setLoading] = useState(false)

    const onFinish = async (values: any) => {
        setLoading(true)
        try {
            await request.post('/api/auth/login', values);
            replace('/admin');
        }
        catch (e) {
            console.error(e)
        }
        setLoading(false)
    };

    return (
        <div>
            <Form onFinish={onFinish}>
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your Username!' }]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input
                        prefix={<LockOutlined />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default page;