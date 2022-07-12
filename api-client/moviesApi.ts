import axiosClient from './axiosClient';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export const moviesApi = {
    getMoviesTrending() {
        return axiosClient.get(`/trending/all/week?api_key=${API_KEY}&language=en-US`);
    },
    getNetflixOriginals() {
        return axiosClient.get(`/discover/movie?api_key=${API_KEY}&with_networks=213`);
    },
    getTopRated() {
        return axiosClient.get(`/movie/top_rated?api_key=${API_KEY}&language=en-US`);
    },
    getActionMovies() {
        return axiosClient.get(
            `/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=28`
        );
    },
    getComedyMovies() {
        return axiosClient.get(
            `/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=35`
        );
    },
    getHorrorMovies() {
        return axiosClient.get(
            `/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=27`
        );
    },
    getRomanceMovies() {
        return axiosClient.get(
            `/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=10749`
        );
    },
    getDocumentaries() {
        return axiosClient.get(
            `/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=99`
        );
    },
};
