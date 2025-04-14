import '../styles/globals.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { ThemeProvider } from '../context/ThemeContext';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  
  // Add page transition effect
  useEffect(() => {
    const handleRouteChange = () => {
      // Add any page transition logic here
      window.scrollTo(0, 0);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  return (
    <ThemeProvider>
      <Head>
        <link rel="icon" href="/favicon-new/favicon.svg" type="image/svg+xml" />
        <meta name="msapplication-TileColor" content="#4f46e5" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <main className="animate-fade-in">
          <Component {...pageProps} />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default MyApp; 