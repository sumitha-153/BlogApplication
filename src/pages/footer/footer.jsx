// import React from 'react';
// // import './footer.css';
// import styles from './footer.module.css';

// const Footer = () => {
//     return (
//         <footer className="footer">
//             <div className={styles.footercontent}>
//                 <p >&copy; {new Date().getFullYear()} Blog Application. All rights reserved.</p>
//                 {/* <nav>
//                     <ul>
//                         <li><a href="/about">About</a></li>
//                         <li><a href="/contact">Contact</a></li>
//                         <li><a href="/privacy">Privacy Policy</a></li>
//                     </ul>
//                 </nav> */}
//             </div>
//         </footer>
//     );
// };

// export default Footer;

import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Blog Application. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
