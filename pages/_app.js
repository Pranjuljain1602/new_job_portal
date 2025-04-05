import '../styles/globals.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { ThemeProvider } from '../context/ThemeContext';

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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <main className="animate-fade-in">
          <Component {...pageProps} />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default MyApp; 