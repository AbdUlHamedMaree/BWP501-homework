import { Layout, Menu, Breadcrumb, Button } from 'antd';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MockVideoButton } from 'components/smart';
import { PieChartOutlined, DesktopOutlined, UserOutlined, TeamOutlined, FileOutlined } from '@ant-design/icons';
import SubMenu from 'antd/lib/menu/SubMenu';

const { Header, Footer, Content, Sider } = Layout;


export const AdminLayout: React.FC = ({ children }) => {
    const { pathname } = useRouter()
    const [collapsed, setCollapsed] = useState(false)
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

    return <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={() => setCollapsed(c => !c)}>
            <div className="w-16 h-16 bg-gray-300 " />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="1" icon={<PieChartOutlined />}>
                    Option 1
                </Menu.Item>
                <Menu.Item key="2" icon={<DesktopOutlined />}>
                    Option 2
                </Menu.Item>
                <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                    <Menu.Item key="3">Tom</Menu.Item>
                    <Menu.Item key="4">Bill</Menu.Item>
                    <Menu.Item key="5">Alex</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                    <Menu.Item key="6">Team 1</Menu.Item>
                    <Menu.Item key="8">Team 2</Menu.Item>
                </SubMenu>
                <Menu.Item key="9" icon={<FileOutlined />}>
                    Files
                </Menu.Item>
            </Menu>
        </Sider>
        <Layout className="site-layout">
            <Content style={{ margin: '0 16px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                    <Breadcrumb.Item>Bill</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                    Bill is a cat.
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
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