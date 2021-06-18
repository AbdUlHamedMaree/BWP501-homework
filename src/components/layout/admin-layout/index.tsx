import { Layout, Menu, Breadcrumb, Button } from 'antd';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MockVideoButton } from 'components/smart';
import { PieChartOutlined, DesktopOutlined, UserOutlined, TeamOutlined, FileOutlined, VideoCameraOutlined, HomeOutlined, LogoutOutlined } from '@ant-design/icons';
import SubMenu from 'antd/lib/menu/SubMenu';

const { Header, Footer, Content, Sider } = Layout;


export const AdminLayout: React.FC = ({ children }) => {
    const { pathname, asPath } = useRouter()
    const [collapsed, setCollapsed] = useState(false)
    const breadcrumb = React.useMemo(() => {
        const res = asPath.split('/').filter(p => p).map((el, ind, arr) => {
            const name = el.replace(/-/g, ' ');
            const href =
                '/' +
                arr
                    .slice(0, ind + 1)
                    .join('/');
            return { name, href };
        });

        return (
            <Breadcrumb className='m-4'>
                {res.map(el => <Breadcrumb.Item key={el.name + '' + el.href} className='capitalize'><Link href={el.href}>{el.name}</Link></Breadcrumb.Item>)}
            </Breadcrumb>
        );
    }, [asPath]);

    return <Layout className="min-h-screen">
        <Sider collapsible collapsed={collapsed} onCollapse={() => setCollapsed(c => !c)}>
            <div className="w-16 h-16 bg-gray-300 " />
            <Menu theme="dark" mode='inline' selectedKeys={[pathname]}>
                <Menu.Item key='/admin' icon={<HomeOutlined />}>
                    <Link href='/admin'>
                        {'Home'}
                    </Link>
                </Menu.Item>

                <SubMenu key="/videos" icon={<VideoCameraOutlined />} title="Videos">
                    <Menu.Item key="/videos">
                        <Link href='/videos'>
                            {'View'}
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/videos/add">
                        <Link href='/videos/add'>
                            {'Add'}
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/videos/[id]">
                        <Link href='#'>
                            {'Edit'}
                        </Link>
                    </Menu.Item>
                </SubMenu>

                <Menu.Item key="/auth/logout" icon={<LogoutOutlined />}>
                    <Link href='/auth/logout'>
                        {'Logout'}
                    </Link>
                </Menu.Item>

            </Menu>
        </Sider>
        <Layout className="site-layout">
            <Content className='m-4'>
                {breadcrumb}
                <div className="min-h-[300px] h-full p-4 bg-white relative">
                    {children}
                </div>
            </Content>
            <Footer className='text-center'>BWP501 Homework - ITE F20 - Created By abdulhamed_109379</Footer>
        </Layout>
    </Layout>

    return (
        <Layout className="min-h-screen">
            <Header className='flex space-x-4 items-center r-p'>
                <div className="float-left w-32 h-8 bg-gray-400" />
                <Menu theme="dark" mode="horizontal" selectedKeys={[pathname]}>
                    <Menu.Item key='/videos'>
                        {'Videos'}
                    </Menu.Item>
                    <Menu.Item key='/artists'>
                        {'Artists'}
                    </Menu.Item>
                </Menu>
                {/* <MockVideoButton /> */}
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