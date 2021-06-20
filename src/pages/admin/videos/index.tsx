import { Table, Image, Button, Tag } from 'antd';
import { MockVideoButton } from '@/components';
import { IArtist, IVideo } from '@/models';
import React, { useCallback, useEffect, useState } from 'react';
import { request } from '@/lib';
import { ColumnsType } from 'antd/lib/table';
import Paragraph from 'antd/lib/typography/Paragraph';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useSearchableField } from '@/utils';
import Link from 'next/link';


const VideosPage: React.FC = () => {
    const [videos, setVideos] = useState<IVideo[]>()
    const [loading, setLoading] = useState(false)

    const fetchVideos = useCallback(async () => {
        setLoading(true)
        try {
            const result = await request.get('/videos');
            setVideos(result.data);
        } catch { }
        setLoading(false)
    }, []);

    const onDelete = useCallback(async (id: string) => {
        setLoading(true)
        try {
            await request.delete(`/videos/${id}`)
            await fetchVideos();
        } catch { }
        setLoading(false)
    }, []);

    const columns: ColumnsType<IVideo> = [
        {
            title: 'ID',
            dataIndex: '_id',
            key: '_id',
            width: 100,
            fixed: 'left',
            ...useSearchableField('_id')
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            width: 150,
            ...useSearchableField('title')
        },
        {
            title: 'Overview',
            dataIndex: 'overview',
            key: 'overview',
            width: 150,
            ...useSearchableField('overview')
        },
        {
            dataIndex: 'description',
            key: 'description',
            title: 'Description',
            render: (val) => <Paragraph ellipsis={{ rows: 3, tooltip: val }}>{val}</Paragraph>,
            width: 400,
        },
        {
            dataIndex: 'cover',
            key: 'cover',
            title: 'Cover',
            render: (val, obj) => <Image src={val} alt={obj.title} />,
            width: 300,
        },
        {
            dataIndex: 'publishDate',
            key: 'publishDate',
            title: 'Publish Date',
            width: 100,
            ...useSearchableField('publishDate')
        },
        {
            dataIndex: 'lang',
            key: 'lang',
            title: 'Language',
            width: 100,
            ...useSearchableField('lang')
        },
        {
            dataIndex: 'country',
            key: 'country',
            title: 'Country',
            width: 150,
            ...useSearchableField('country')
        },
        {
            dataIndex: 'type',
            key: 'type',
            title: 'Type',
            width: 150,
            ...useSearchableField('type')
        },
        {
            dataIndex: 'category',
            key: 'category',
            title: 'Category',
            width: 150,
            ...useSearchableField('category')
        },
        {
            dataIndex: 'quality',
            key: 'quality',
            title: 'Quality',
            width: 150,
            ...useSearchableField('quality')
        },
        {
            dataIndex: 'duration',
            key: 'duration',
            title: 'Duration',
            width: 150,
            ...useSearchableField('duration')
        },
        {
            title: 'Artists',
            dataIndex: 'artists',
            key: 'artists',
            width: 150,
            render: (arr: IArtist[]) => <div className='flex flex-wrap'>
                {arr ? arr.map(el =>
                    <div key={el._id} className='m-1'>
                        <Tag>
                            {el.firstName}
                        </Tag>
                    </div>
                ) : null}
            </div>
        },
        {
            dataIndex: '_id',
            key: 'actions',
            title: 'Actions',
            render: (id) => <div className='flex space-x-1'>
                <Button type='text' size='small' danger onClick={() => onDelete(id)}>
                    <DeleteOutlined />
                </Button>
                <Link href={`videos/${id}`} passHref>
                    <Button type='link' size='small'>
                        <EditOutlined />
                    </Button>
                </Link>
            </div>,
            width: 100,
            fixed: 'right',
            align: 'center'
        },
    ]

    useEffect(() => {
        fetchVideos();
    }, [])

    return (
        <div className='space-y-4'>
            <div className='flex space-x-2'>
                <Link href={`videos/new`} passHref>
                    <Button type='primary'>Add</Button>
                </Link>
                <MockVideoButton afterFinish={async () => { await fetchVideos() }} />
            </div>
            <Table
                loading={loading}
                columns={columns}
                dataSource={videos}
                title={() => <h5>{'Videos'}</h5>}
                scroll={{ x: '100vw', y: 'calc(100vh - 200px)' }}
                pagination={{ position: ['bottomRight'] }}
                size='small'
                bordered
            />
        </div>
    )
}
export default VideosPage;