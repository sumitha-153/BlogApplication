import styles from './index.module.css';
// import Image from 'next/image';
import { useRouter } from 'next/router';

const GreetUser = () => {
    const router = useRouter();

    const handleClick = () => {
        router.push('/auth/signin');
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>BLOGIEE</h1>
                <p className={styles.description}>
                    Explore the latest tech trends, insights, and expert opinions. <br />
                    Enhance your skills and fuel your curiosity. <br />
                    Stay Updated, Stay Ahead!!
                </p>
                <button className={styles.button} onClick={handleClick}>Start Exploring</button>
            </div>
        </div>
    );
};

export default GreetUser;

