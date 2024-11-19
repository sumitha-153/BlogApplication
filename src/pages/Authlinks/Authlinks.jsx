"use client";
import Link from "next/link";
import styles from "./authlinks.module.css";
import { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/router';

const AuthLinks = () => {
    const [open, setOpen] = useState(false);
    const { data: session, status } = useSession();
    const router = useRouter();

    const handleWriteClick = () => {
        router.push('/write/write');
    };

    useEffect(() => {
        console.log(session);
        console.log(status);
    }, [session, status]);

    return (
        <>
            {status === "unauthenticated" ? (
                <Link href="/auth/signin">Login</Link>
            ) : (
                <>
                    <span className={styles.link} onClick={handleWriteClick}>
                        Write
                    </span>
                    <span className={styles.link} onClick={() => signOut()}>
                        Logout
                    </span>
                </>
            )}
            <div className={styles.burger} onClick={() => setOpen(!open)}>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
            </div>
        </>
    );
};

export default AuthLinks;
