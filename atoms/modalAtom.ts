import { Movie } from './../models/movies';
import { atom } from 'recoil';
import { DocumentData } from 'firebase/firestore';

export const modalState = atom({
    key: 'modalState',
    default: false,
});

export const movieState = atom<Movie | DocumentData | null>({
    key: 'movieState',
    default: null,
});
