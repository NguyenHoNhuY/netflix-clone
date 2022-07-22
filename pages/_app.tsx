import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AuhtProvider } from '@/hooks/useAuth';
import { RecoilRoot } from 'recoil';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <RecoilRoot>
            <AuhtProvider>
                <Component {...pageProps} />
            </AuhtProvider>
        </RecoilRoot>
    );
}

export default MyApp;
