// import React from "react";
// import styles from "./navbar.module.css";
// import Image from "next/image";
// import Link from "next/link";
// import AuthLinks from "../authlinks/AuthLinks";


// const Navbar = ( {children}) => {
//   return (
//     <>
   
//     <div className={styles.container}>
//       <div className={styles.social}>
//         <Image src="/facebook.png" alt="facebook" width={24} height={24} />
//         <Image src="/instagram.webp" alt="instagram" width={24} height={24} />
//         <Image src="/youtube.jpeg" alt="youtube" width={24} height={24} />
//       </div>
      
//       <div className={styles.logo}>
//           <Image className={styles.image} src="/logo.jpg" alt="logo" width={25} height={25} />
//            <b className={styles.title}>BLOGIEE</b></div>
//       <div className={styles.links}>
//         {/* <Theme /> */}
//         {/* <div className={styles.links} onClick={HandleHome}>Home </div> */}
//         <Link href="/blogs/blog" className={styles.link}> Home </Link>
//         <Link href="/contact" className={styles.link}>Contact</Link>
//         <AuthLinks />
//       </div>
    
//     </div>
//     <div>{children}</div>
//     </>
//   );
// };

// export default Navbar;



import React from "react";
import Image from "next/image";
import Link from "next/link";
import AuthLinks from "../Authlinks/Authlinks";

export default function Navbar({ children }) {
  return (
    <>
<<<<<<< HEAD
   
    <div className={styles.container}>
      <div className={styles.social}>
        <Image src="/facebook.png" alt="facebook" width={24} height={24} />
        <Image src="/instagram.webp" alt="instagram" width={24} height={24} />
        <Image src="/youtube.jpeg" alt="youtube" width={24} height={24} />
      </div>
      
      <div className={styles.logo}>
          <Image className={styles.image} src="/logo.jpg" alt="logo" width={25} height={25} />
           <b className={styles.title}>BLOGIEE</b></div>
      <div className={styles.links}>
        <Link href="/blogs/blog" className={styles.link}> Home </Link>
        <Link href="/contact" className={styles.link}>Contact</Link>
        <AuthLinks />
      </div>
    
    </div>
    <div>{children}</div>
=======
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                
                <span className="text-xl font-bold text-gray-800">BLOGIEE</span>
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Link href="/blogs/blog" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">Home</Link>
              <Link href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">Contact</Link>
              <AuthLinks />
            </div>

            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                <Image src="/facebook.png" alt="facebook" width={24} height={24} />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                <Image src="/instagram.webp" alt="instagram" width={24} height={24} />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                <Image src="/youtube.jpeg" alt="youtube" width={24} height={24} />
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className="text-gray-600 hover:text-blue-600 focus:outline-none">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div>{children}</div>
>>>>>>> 6787ee5820f8428e6444f47051e8496dc379c522
    </>
  );
};
