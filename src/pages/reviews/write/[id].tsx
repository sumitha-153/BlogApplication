import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../navbar/Navbar';
import Footer from '../../footer/footer';
import styles from '../review.module.css';

const WriteReview = () => {
  const router = useRouter();
  const { id } = router.query;
  const [review, setReview] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Submit the review to your API
    await fetch(`/api/reviews/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ review }),
    });
    router.push(`/reviews/${id}`); // Redirect to view reviews
  };

  return (
    <div className={styles.container}>
      <Navbar>
      <h2>Write a Review</h2>
      <form onSubmit={handleSubmit} className={styles.reviewForm}>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your review here..."
          required
          className={styles.textarea}
        />
        <button type="submit" className={styles.submitButton}>Submit Review</button>
      </form>
      </Navbar>
      <Footer />
    </div>
  );
};

export default WriteReview; 