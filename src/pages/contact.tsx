import React from 'react';
import styles from './contact.module.css';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaTwitter, FaFacebook } from 'react-icons/fa';

const Contact: React.FC = () => {
    return (
        <div className={styles.contactContainer}>
            <div className={styles.contactCard}>
                <h1 className={styles.title}>Contact Us</h1>
                <p>If you have any questions, feel free to reach out to us!</p>
                <div className={styles.contactDetails}>
                    <h2 className={styles.sectionTitle}>Contact Details</h2>
                    <p><FaEnvelope className={styles.icon} /> Email: contact@blogapplication.com</p>
                    <p><FaPhone className={styles.icon} /> Phone: +123 456 7890</p>
                    <p><FaMapMarkerAlt className={styles.icon} /> Address: 123 Blog St, Blog City, BC 12345</p>
                </div>
                <div className={styles.socialMedia}>
                    <h2 className={styles.sectionTitle}>Follow Us</h2>
                    <p><FaTwitter className={styles.icon} /> Twitter: <a className={styles.link} href="https://twitter.com/blogapplication" target="_blank" rel="noopener noreferrer">@blogapplication</a></p>
                    <p><FaFacebook className={styles.icon} /> Facebook: <a className={styles.link} href="https://facebook.com/blogapplication" target="_blank" rel="noopener noreferrer">Blog Application</a></p>
                </div>
            </div>
        </div>
    );
};

export default Contact;

