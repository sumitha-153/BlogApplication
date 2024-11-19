// import '../styles/global.css';
<<<<<<< HEAD
=======
// import type { AppProps } from "next/app";
// import  '../pages/blogs/blog.module.css';

// function MyApp({ Component, pageProps }: AppProps) {
//   return (
//     <SessionProvider session={pageProps.session}>
//       <Component {...pageProps} />
//     </SessionProvider>
//   );
// }

// export default MyApp;

import '../styles/global.css';
import React from 'react';
>>>>>>> 6787ee5820f8428e6444f47051e8496dc379c522
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
