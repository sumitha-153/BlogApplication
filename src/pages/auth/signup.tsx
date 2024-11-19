import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './signin.module.css';
import Link from 'next/link';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
  
      if (!email || !password) {
          setError('Email and password are required');
          return;
      }
  
      setError('');
   
      try {
          const response = await fetch('/api/auth/signup', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email, password }),
          });
  
          if (!response.ok) {
              const data = await response.json();
              setError(data.error || 'Something went wrong');
              return;
          }
  
          // Navigate to signin page
          router.push('/auth/signin');
      } catch (error) {
          setError('An unexpected error occurred' + error);
      }
  };
  

    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <h1>Create Your account</h1>
          <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="name@company.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.inputField}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.inputField}
            />
          </div>
          {error && <div className={styles.error}>{error}</div>}
          <button type="submit" className={styles.button}>Sign Up</button>
            <p className={styles.signinPrompt}>
              Already have an account? <Link href="/auth/signin">Sign in</Link>
            </p>
          </form>
        </div>
      </div>
    );
};

export default SignUp;