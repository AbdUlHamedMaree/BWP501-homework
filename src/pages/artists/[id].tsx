import { FillImage } from '@/components';
import { mockArtist } from '@/models';
import React from 'react';

const artist = mockArtist();
const SingleArtistPage: React.FC = () => {
    return (
        <div className='flex flex-col space-y-6'>
            <div className='bg-gray-200 bg-opacity-30 flex flex-col space-y-4'>
                <div className='relative h-96'>
                    <FillImage className='object-contain' src={artist.avatar} alt={artist.firstName} />
                </div>
                <h2 className='font-medium'>
                    {artist.firstName + ' ' + artist.lastName}
                </h2>
                <h6>
                    {artist.about}
                </h6>
                <div className='flex'>
                    Age: {artist.age}
                </div>
            </div>
        </div>
    )
}
export default SingleArtistPage