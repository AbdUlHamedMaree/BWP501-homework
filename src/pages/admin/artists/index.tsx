import { Table, Image, Button, Tag } from 'antd';
import { MockArtistButton } from '@/components';
import { IArtist, IVideo } from '@/models';
import React, { useCallback, useEffect, useState } from 'react';
import { request } from '@/lib';
import { ColumnsType } from 'antd/lib/table';
import Paragraph from 'antd/lib/typography/Paragraph';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useSearchableField } from '@/utils';
import Link from 'next/link';


const ArtistsPage: React.FC = () => {
    const [artists, setArtists] = useState<IArtist[]>()
    const [loading, setLoading] = useState(false)

    const fetchArtists = useCallback(async () => {
        setLoading(true)
        try {
            const result = await request.get('/artists');
            setArtists(result.data);
        } catch { }
        setLoading(false)
    }, []);

    const onDelete = useCallback(async (id: string) => {
        setLoading(true)
        try {
            await request.delete(`/artists/${id}`)
            await fetchArtists();
        } catch { }
        setLoading(false)
    }, []);

    const columns: ColumnsType<IArtist> = [
        {
            title: 'ID',
            dataIndex: '_id',
            key: '_id',
            width: 100,
            fixed: 'left',
            ...useSearchableField('_id')
        },
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
            width: 150,
            ...useSearchableField('firstName')
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
            width: 150,
            ...useSearchableField('lastName')
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            width: 80,
            ...useSearchableField('age')
        },
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (val, obj) => <Image src={val} alt={obj.firstName} />,
            width: 150,
        },
        {
            title: 'About',
            dataIndex: 'about',
            key: 'about',
            width: 150,
            ...useSearchableField('about')
        },
        {
            title: 'Videos',
            dataIndex: 'videos',
            key: 'videos',
            width: 150,
            render: (arr: IVideo[]) => <div className='flex flex-wrap'>
                {arr ? arr.map(el =>
                    <div key={el._id} className='m-1'>
                        <Tag>
                            {el.title}
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
                <Link href={`artists/${id}`} passHref>
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
        fetchArtists();
    }, [])

    return (
        <div className='space-y-4'>
            <div className='flex space-x-2'>
                <Link href={`artists/new`} passHref>
                    <Button type='primary'>Add</Button>
                </Link>
                <MockArtistButton afterFinish={async () => { await fetchArtists() }} />
            </div>
            <Table
                loading={loading}
                columns={columns}
                dataSource={artists}
                title={() => <h5>{'Artists'}</h5>}
                scroll={{ x: '100vw', y: 'calc(100vh - 200px)' }}
                pagination={{ position: ['bottomRight'] }}
                size='small'
                bordered
            />
        </div>
    )
}
export default ArtistsPage;