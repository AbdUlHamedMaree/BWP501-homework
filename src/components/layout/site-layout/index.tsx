import { Layout, Menu, Breadcrumb, Button } from 'antd';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useIsAuth } from '@/lib';

const { Header, Footer, Content } = Layout;


export const SiteLayout: React.FC = ({ children }) => {
    const { pathname, asPath } = useRouter()
    const { loading, auth } = useIsAuth()

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
                <Breadcrumb.Item className='capitalize'><Link href='/'>{'Home'}</Link></Breadcrumb.Item>
                {res.map(el => <Breadcrumb.Item key={el.name + '' + el.href} className='capitalize'><Link href={el.href}>{el.name}</Link></Breadcrumb.Item>)}
            </Breadcrumb>
        );
    }, [asPath]);
    console.log({ loading, auth })
    return (
        <Layout className="min-h-screen">
            <Header className='flex space-x-4 items-center r-p' style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                <div className="float-left w-32 h-8 bg-gray-400" />
                <Menu theme="dark" mode="horizontal" selectedKeys={[pathname]}>
                    <Menu.Item key='/'>
                        <Link href='/'>
                            {'Home'}
                        </Link>
                    </Menu.Item>
                    <Menu.Item key='/videos'>
                        <Link href='/videos'>
                            {'Videos'}
                        </Link>
                    </Menu.Item>
                    <Menu.Item key='/artists'>
                        <Link href='/videos'>
                            {'Artists'}
                        </Link>
                    </Menu.Item>
                    {
                        !loading ?
                            (auth ?
                                <Menu.Item key='/admin'>
                                    <Link href='/admin'>
                                        {'Admin'}
                                    </Link>
                                </Menu.Item>
                                : <Menu.Item key='/login'>
                                    <Link href='/login'>
                                        {'Login'}
                                    </Link>
                                </Menu.Item>
                            )
                            : null
                    }
                </Menu>
                {/* <MockVideoButton /> */}
            </Header>
            <Content className='r-p' style={{ marginTop: 64 }}>
                {breadcrumb}
                <div className="min-h-[300px] h-full p-4 bg-white relative">
                    {children}
                </div>
            </Content>
            <Footer className='text-center'>BWP501 Homework - ITE F20 - Created By abdulhamed_109379</Footer>
        </Layout>
    )
}