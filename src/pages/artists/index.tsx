import { Row, Col } from 'antd';
import { ArtistCard, LoadingComponent } from '@/components';
import React, { useEffect, useState } from 'react';
import { request } from '@/lib';
import { IArtist } from '@/models';

const ArtistsPage: React.FC = () => {
    const [artists, setArtists] = useState<IArtist[]>()


    useEffect(() => {
        (async () => {
            try {
                const result = await request.get('/artists');
                setArtists(result.data);
            } catch { }
        })()
    }, [])

    if (typeof artists === 'undefined')
        return <LoadingComponent />

    return (
        <div className='space-y-4'>
            <h1 className='text-center'>Artists</h1>
            <Row gutter={[16, 16]} justify='space-between'>
                {artists.map((el) =>
                    <Col key={el._id}>
                        <ArtistCard
                            avatar={el.avatar}
                            fullName={el.firstName + ' ' + el.lastName}
                            overview={el.about}
                            to={`/artists/${el._id}`}
                        />
                    </Col>
                )}
            </Row>
        </div>
    )
}
export default ArtistsPage;