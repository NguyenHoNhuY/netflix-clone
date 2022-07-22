import { moviesApi } from '@/api-client';
import { modalState, movieState } from '@/atoms/modalAtom';
import { Element, Genre, Movie } from '@/models';
import { XIcon } from '@heroicons/react/outline';
import { Modal } from '@mui/material';
import { useEffect, useState } from 'react';
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
                console.log('Fariled to fectch movie api :', error);
            }
        }

        fetchMovie();
    }, [currentMovie]);

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <Modal open={showModal} onClose={handleCloseModal}>
            <div>
                <button
                    className='modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818]'
                    onClick={handleCloseModal}
                >
                    <XIcon className='h-6 w-6' />
                </button>
                <div>
                    <ReactPlayer
                        url={`https://www.youtube.com/watch?v=${trailer}`}
                        width='100%'
                        height='100%'
                        style={{ position: 'absolute', top: '0', left: '0' }}
                        playing
                        muted={muted}
                    />
                </div>
            </div>
        </Modal>
    );
}
