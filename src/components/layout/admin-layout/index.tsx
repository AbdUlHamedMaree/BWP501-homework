import { Layout, Menu, Breadcrumb } from 'antd';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { VideoCameraOutlined, HomeOutlined, LogoutOutlined, StarOutlined } from '@ant-design/icons';
import SubMenu from 'antd/lib/menu/SubMenu';

const { Footer, Content, Sider } = Layout;


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
            <div className="w-[75%] mt-4 mx-auto h-8 bg-gray-300" />
            <Menu theme="dark" mode='inline' selectedKeys={[pathname]}>
                <Menu.Item key='/admin' icon={<HomeOutlined />}>
                    <Link href='/admin'>
                        {'Home'}
                    </Link>
                </Menu.Item>

                <SubMenu key="admin-videos" icon={<VideoCameraOutlined />} title="Videos">
                    <Menu.Item key="/admin/videos">
                        <Link href='/admin/videos'>
                            {'View'}
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/admin/videos/new">
                        <Link href='/admin/videos/new'>
                            {'Add'}
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/admin/videos/[id]">
                        <Link href='#'>
                            {'Edit'}
                        </Link>
                    </Menu.Item>
                </SubMenu>

                <SubMenu key="admin-artists" icon={<StarOutlined />} title="Artists">
                    <Menu.Item key="/admin/artists">
                        <Link href='/admin/artists'>
                            {'View'}
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/admin/artists/new">
                        <Link href='/admin/artists/new'>
                            {'Add'}
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/admin/artists/[id]">
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
                <div className="min-h-[300px] p-4 bg-white relative">
                    {children}
                </div>
            </Content>
            <Footer className='text-center'>BWP501 Homework - ITE F20 - Created By abdulhamed_109379</Footer>
        </Layout>
    </Layout>
}