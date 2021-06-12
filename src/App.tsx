import React from 'react';
import { AiOutlineEye } from 'react-icons/ai'

import mockImg from "@/images/mock/1.png"
import { FillImage } from '@/components';
import clsx from 'clsx';


export const App: React.FC = () => {
  return (
    <div>
      <div className='relative h-[30rem] min-w-[15rem] w-[20rem] border border-secondary-200 overflow-hidden shadow-lg'>
        <div className='relative h-full'>
          <FillImage src={mockImg} alt="Mock Iamge" className='object-cover' />
        </div>
        <div className='absolute inset-0 w-full h-full bg-secondary-400 bg-opacity-30 opacity-0 transition hover:opacity-100'>
          <button >
            <AiOutlineEye />
          </button>
        </div>
      </div>
      <button
        className={
          clsx(
            'outline-none active:outline-none focus:outline-none bg-primary-600 px-3 py-1 rounded-md text-white transition',
            'hover:bg-primary-500',
            'focus:bg-primary-600 focus:ring focus:ring-primary-500 focus:ring-offset-2',
            'active:bg-primary-700',
          )
        }
      >
        primary
        </button>
    </div>
  );
}
