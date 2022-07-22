import { moviesApi } from '@/api-client';
import { modalState, movieState } from '@/atoms/modalAtom';
import { Element, Genre, Movie } from '@/models';
import { PlusIcon, ThumbUpIcon, XIcon } from '@heroicons/react/outline';
import { Modal, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import ReactPlayer from 'react-player';
import { useRecoilState } from 'recoil';

export interface TrailerModalProps {}

export default function TrailerModal(props: TrailerModalProps) {
    const [showModal, setShowModal] = useRecoilState(modalState);
    const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
    const [trailer, setTrailer] = useState('');
    const [muted, setMuted] = useState(true);
    const [genres, setGenres] = useState<Genre[]>([]);

    useEffect(() => {
        if (!currentMovie) return;

        async function fetchMovie() {
            try {
                // todo fetch movie api of modal
                const data = await moviesApi.getMovie(currentMovie);

                // todo find trailer of movie
                if (data?.videos) {
                    const index = data.videos.results.findIndex(
                        (element: Element) => element.type === 'Trailer',
                    );
                    setTrailer(data.videos.results[index]?.key);
                }

                if (data?.genres) {
                    setGenres(data?.genres);
                }

                console.log(data);
                console.log(trailer);
            } catch (error) {
                console.log('Failed to fetch movie api :', error);
            }
        }

        fetchMovie();
    }, [currentMovie]);

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <Modal
            className='fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide'
            open={showModal}
            onClose={handleCloseModal}
        >
            <div>
                <button
                    className='modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818]'
                    onClick={handleCloseModal}
                >
                    <XIcon className='h-6 w-6' />
                </button>
                <div className='relative pt-[55%]'>
                    <ReactPlayer
                        url={`https://www.youtube.com/watch?v=${trailer}`}
                        width='100%'
                        height='100%'
                        style={{
                            position: 'absolute',
                            top: '0',
                            left: '0',
                        }}
                        playing
                        muted={muted}
                    />
                    <div className='absolute bottom-10 flex w-full items-center justify-between px-10'>
                        <div className='flex space-x-2'>
                            <button className='flex items-center gap-x-2 rounded bg-white px-8 text-xl font-bold text-black transition hover:bg-[#e6e6e6]'>
                                <FaPlay className='h-7 w-7 text-black' />
                                Play
                            </button>

                            <button className='modalButton'>
                                <PlusIcon className='h-7 w-7' />
                            </button>

                            <button className='modalButton'>
                                <ThumbUpIcon className='h-7 w-7' />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
