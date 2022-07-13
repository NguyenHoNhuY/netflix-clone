import Banner from '@/components/Banner';
import Header from '@/components/Header';
import { Movie } from '@/models/movies';
import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import { moviesApi } from '../api-client';

export interface HomeProps {
    trendingNow: Movie[];
    netflixOriginals: Movie[];
    topRated: Movie[];
    actionMovies: Movie[];
    comedyMovies: Movie[];
    horrorMovies: Movie[];
    romanceMovies: Movie[];
    documentaries: Movie[];
}

const Home = (props: HomeProps) => {
    const {
        trendingNow,
        netflixOriginals,
        topRated,
        actionMovies,
        comedyMovies,
        horrorMovies,
        romanceMovies,
        documentaries,
    } = props;

    return (
        <div className='relative h-[140vh] bg-gradient-to-t from-gray-900/10  to-[#010511] lg:h-[140vh] '>
            <Head>
                <title>Home - Netflix</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Header />

            <main className='relative pl-4 pb-24 lg:space-y-24 lg:pl-16'>
                <Banner netflixOriginals={netflixOriginals} />
                <section></section>
            </main>
        </div>
    );
};

export default Home;

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
    const [
        trendingNow,
        netflixOriginals,
        topRated,
        actionMovies,
        comedyMovies,
        horrorMovies,
        romanceMovies,
        documentaries,
    ] = await Promise.all([
        moviesApi.getMoviesTrending(),
        moviesApi.getNetflixOriginals(),
        moviesApi.getTopRated(),
        moviesApi.getActionMovies(),
        moviesApi.getComedyMovies(),
        moviesApi.getHorrorMovies(),
        moviesApi.getRomanceMovies(),
        moviesApi.getDocumentaries(),
    ]);

    return {
        props: {
            trendingNow: trendingNow.results,
            netflixOriginals: netflixOriginals.results,
            topRated: topRated.results,
            actionMovies: actionMovies.results,
            comedyMovies: comedyMovies.results,
            horrorMovies: horrorMovies.results,
            romanceMovies: romanceMovies.results,
            documentaries: documentaries.results,
        },
    };
};
