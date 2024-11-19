import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import styles from './signin.module.css';
// import Image from 'next/image';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result && result.error === "CredentialsSignin") {
        setError("User does not exist (Please sign up)");
      } else {
        router.push('/blogs/blog');
      }
    } catch (err) {
      if (err instanceof Error) {
        setError('An unexpected error occurred: ' + err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Sign In to your acccount</h1>
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
          <button type="submit" className={styles.button}>Sign In</button>
          <p className={styles.signinPrompt}>
            Don’t have an account yet? <Link href="/auth/signup">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;