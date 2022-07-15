import { baseUrl } from '@/constants/movies';
import { Movie } from '@/models';
import { InformationCircleIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FaPlay } from 'react-icons/fa';

export interface BannerProps {
    netflixOriginals: Movie[];
}

export default function Banner({ netflixOriginals }: BannerProps) {
    const [movie, setMovie] = useState<Movie | null>(null);

    //todo set random movie to banner
    useEffect(() => {
        setMovie(netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]);
    }, [netflixOriginals]);

    return (
        <div className='relative h-[40vh] lg:h-[75vh] '>
            {/* component image of nextjs */}
            <div className='absolute top-0 left-0 -z-10 h-[95vh] w-full'>
                <Image
                    src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
                    layout='fill'
                    objectFit='cover'
                />
            </div>

            {/* decreption */}
            <div className='flex flex-col absolute top-1/4 md:top-40 left-4 md:left-16 space-y-2 md:space-y-4'>
                <h1 className='text-2xl font-bold md:text-4xl lg:text-7xl '>
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>
                <p className='max-w-xs  text-xs text-shadow-md md:max-w-lg md:text-lg lg:max-w-4xl lg:text-2xl'>
                    {movie?.overview}
                </p>

                <div className='flex space-x-4'>
                    <button className='bannerButton bg-white text-black'>
                        <FaPlay className='h-4 w-4 text-black md:h-7 md:w-7 ' /> Play
                    </button>
                    <button className='bannerButton bg-[gray]/70 '>
                        More Infor
                        <InformationCircleIcon className='h-5 w-5 md:h-8 md:w-8' />
                    </button>
                </div>
            </div>
        </div>
    );
}
