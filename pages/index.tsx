import { modalState } from '@/atoms/modalAtom';
import Banner from '@/components/Banner';
import Header from '@/components/Header';
import TrailerModal from '@/components/Modal';
import Plans from '@/components/Plans';
import Row from '@/components/Row';
import useAuth from '@/hooks/useAuth';
import { Movie } from '@/models/movies';
import type { GetStaticProps } from 'next';
import Head from 'next/head';
import { useRecoilValue } from 'recoil';
import { moviesApi } from '../api-client';

export interface HomeProps {
    netflixOriginals: Movie[];
    trendingNow: Movie[];
    topRated: Movie[];
    actionMovies: Movie[];
    comedyMovies: Movie[];
    horrorMovies: Movie[];
    romanceMovies: Movie[];
    documentaries: Movie[];
}

const Home = (props: HomeProps) => {
    const {
        netflixOriginals,
        trendingNow,
        topRated,
        actionMovies,
        comedyMovies,
        horrorMovies,
        romanceMovies,
        documentaries,
    } = props;
    const showModal = useRecoilValue(modalState);
    const { loading } = useAuth();
    const subscription = false;

    if (loading || subscription === null) return null;

    if (!subscription) return <Plans />;

    return (
        <div className='relative h-[140vh] bg-gradient-to-b from-gray-900/10  to-[#010511] lg:h-[140vh] '>
            <Head>
                <title>Home - Netflix</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Header />

            {/* slide movies */}
            <main className='relative '>
                <Banner netflixOriginals={netflixOriginals} />
                <section className='pl-4 md:space-y-24 lg:pl-16 '>
                    <Row title='Trending Now' movies={trendingNow} />
                    <Row title='Top Rated' movies={topRated} />
                    <Row title='Action Thriller' movies={actionMovies} />
                    <Row title='Comedies' movies={comedyMovies} />
                    <Row title='Scary Movies' movies={horrorMovies} />
                    <Row title='Romance Movies' movies={romanceMovies} />
                    <Row title='Documentaries' movies={documentaries} />
                </section>
            </main>

            {/* modal */}
            {showModal && <TrailerModal />}
        </div>
    );
};

export default Home;

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
    const [
        netflixOriginals,
        trendingNow,
        topRated,
        actionMovies,
        comedyMovies,
        horrorMovies,
        romanceMovies,
        documentaries,
    ] = await Promise.all([
        moviesApi.getNetflixOriginals(),
        moviesApi.getMoviesTrending(),
        moviesApi.getTopRated(),
        moviesApi.getActionMovies(),
        moviesApi.getComedyMovies(),
        moviesApi.getHorrorMovies(),
        moviesApi.getRomanceMovies(),
        moviesApi.getDocumentaries(),
    ]);

    return {
        props: {
            netflixOriginals: netflixOriginals.results,
            trendingNow: trendingNow.results,
            topRated: topRated.results,
            actionMovies: actionMovies.results,
            comedyMovies: comedyMovies.results,
            horrorMovies: horrorMovies.results,
            romanceMovies: romanceMovies.results,
            documentaries: documentaries.results,
        },
    };
};
