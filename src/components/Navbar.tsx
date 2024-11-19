import React from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css'; // Assuming you have a separate CSS file for the navbar

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.navContainer}>
                <h1 className={styles.title}>BLOGIEE</h1>
                <ul className={styles.navLinks}>
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <Link href="/blogs">Blogs</Link>
                    </li>
                    <li>
                        <Link href="/auth/signin">Sign In</Link>
                    </li>
                    <li>
                        <Link href="/auth/signup">Sign Up</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar; 