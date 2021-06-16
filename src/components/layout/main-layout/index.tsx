import { Layout, Menu, Breadcrumb } from 'antd';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const { Header, Footer, Content } = Layout;


export const MainLayout: React.FC = ({ children }) => {
    const { pathname } = useRouter()

    const breadcrumb = React.useMemo(() => {
        const res = pathname.split('/').map((el, ind, arr) => {
            const name = el.replace(/-/g, ' ');
            const href =
                '/' +
                arr
                    .slice(0, ind + 1)
                    .filter(p => p)
                    .join('/');
            return { name, href };
        });

        return (
            <Breadcrumb className='m-4'>
                {res.map(el => <Breadcrumb.Item key={el.name + '' + el.href} className='capitalize'><Link href={el.href}>{el.name}</Link></Breadcrumb.Item>)}
            </Breadcrumb>
        );
    }, [pathname]);

    return (
        <Layout className="min-h-screen">
            <Header className='flex space-x-4 items-center r-p'>
                <div className="float-left w-32 h-8 bg-gray-400" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    {new Array(15).fill(null).map((_, index) => {
                        const key = index + 1;
                        return <Menu.Item key={key}>{`nav ${key}`}</Menu.Item>;
                    })}
                </Menu>
            </Header>
            <Content className='r-p'>
                {breadcrumb}
                <div className="min-h-[300px] h-full p-4 bg-white relative">
                    {children}
                </div>
            </Content>
            <Footer className='text-center'>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
    )
}