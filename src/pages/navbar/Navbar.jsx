import React from "react";
import styles from "./navbar.module.css";
import Image from "next/image";
import Link from "next/link";
import AuthLinks from "../authLinks/AuthLinks";


const Navbar = ( {children}) => {
  return (
    <>
   
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
    </>
  );
};

export default Navbar;