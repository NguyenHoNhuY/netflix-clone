import { ApiMoviesResponse } from '@/models';
import axiosClient from './axiosClient';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export const moviesApi = {
    getMoviesTrending(): Promise<ApiMoviesResponse> {
        return axiosClient.get(`/trending/all/week?api_key=${API_KEY}&language=en-US`);
    },
    getNetflixOriginals(): Promise<ApiMoviesResponse> {
        return axiosClient.get(`/discover/movie?api_key=${API_KEY}&with_networks=213`);
    },
    getTopRated(): Promise<ApiMoviesResponse> {
        return axiosClient.get(`/movie/top_rated?api_key=${API_KEY}&language=en-US`);
    },
    getActionMovies(): Promise<ApiMoviesResponse> {
        return axiosClient.get(
            `/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=28`
        );
    },
    getComedyMovies(): Promise<ApiMoviesResponse> {
        return axiosClient.get(
            `/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=35`
        );
    },
    getHorrorMovies(): Promise<ApiMoviesResponse> {
        return axiosClient.get(
            `/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=27`
        );
    },
    getRomanceMovies(): Promise<ApiMoviesResponse> {
        return axiosClient.get(
            `/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=10749`
        );
    },
    getDocumentaries(): Promise<ApiMoviesResponse> {
        return axiosClient.get(
            `/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=99`
        );
    },
};
