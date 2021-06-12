import React from 'react';
import clsx from 'clsx'

type Props = {
    children?: never
} & React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;

export const FillImage = React.memo(React.forwardRef<HTMLImageElement, Props>((props, ref) => {
    return (
        <div className='block overflow-hidden absolute inset-0 box-border m-0'>
            <img {...props} ref={ref} className={clsx('absolute inset-0 box-border p-0 border-none m-auto block w-0 h-0 min-w-full max-w-full min-h-full max-h-full', props.className)} />
        </div>
    )
}))