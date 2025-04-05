import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Preload fonts, add any meta tags, etc. */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
          
          {/* Favicon */}
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
          {/* Script to check dark mode preference before page loads to prevent flash */}
          <script dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Check if theme is stored in localStorage
                const savedTheme = localStorage.getItem('theme');
                if (savedTheme === 'dark' || 
                    (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              })();
            `,
          }} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument; 