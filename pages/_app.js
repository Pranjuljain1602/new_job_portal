import '../styles/globals.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

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
    <div className="min-h-screen bg-gray-50">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp; 