import { Movie } from './movies';

export interface ApiMoviesResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}
