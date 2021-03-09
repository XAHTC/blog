import type { AppProps } from 'next/app';
import NextNprogress from 'nextjs-progressbar';
import { NotificationContainer } from 'react-notifications';

import Head from 'next/head';

import '../styles/style.css';
import 'react-notifications/lib/notifications.css';

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Blog App Test</title>
            </Head>
            <NextNprogress color={'#29D'} startPosition={0.3} stopDelayMs={200} height={3} />

            <Component {...pageProps} />
            <NotificationContainer />
        </>
    );
}
