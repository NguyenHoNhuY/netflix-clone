import Header from '@/components/Header';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import { moviesApi } from '../api-client';

const Home: NextPage = () => {
    useEffect(() => {
        (async () => {
            try {
                const response = await moviesApi.getMoviesTrending();
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);
    return (
        <div className="relative h-[140vh] bg-gradient-to-t from-gray-900/10  to-[#010511] lg:h-[140vh] ">
            <Head>
                <title>Home - Netflix</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />

            <main></main>
        </div>
    );
};

export default Home;
