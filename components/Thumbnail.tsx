import { modalState, movieState } from '@/atoms/modalAtom';
import { baseUrl } from '@/constants/movies';
import { Movie } from '@/models';
import Image from 'next/image';
import * as React from 'react';
import { useRecoilState } from 'recoil';

export interface ThumbnailProps {
    movie: Movie;
}

export default function Thumbnail({ movie }: ThumbnailProps) {
    const [showModal, setShowModal] = useRecoilState(modalState);
    const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
    return (
        <div
            className='relative h-28 min-w-[180px] cursor-pointer transition 
        duration-200 ease-out md:h-36 md:min-w-[240px] md:hover:scale-105'
            onClick={() => {
                setShowModal(true);
                setCurrentMovie(movie);
            }}
        >
            <Image
                src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
                className='rounded-sm object-cover md:rounded'
                layout='fill'
            />
        </div>
    );
}
