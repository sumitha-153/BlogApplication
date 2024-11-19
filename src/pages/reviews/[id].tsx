import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';

const ViewReviews = () => {
  const router = useRouter();
  const { id } = router.query;
  interface Review {
    review: string;
  }

  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    if (id) {
      const fetchReviews = async () => {
        const res = await fetch(`/api/reviews/${id}`);
        const data = await res.json();
        setReviews(data);
      };
      fetchReviews();
    }
  }, [id]);

  return (
    <div>
      <Navbar>
      <h2>Reviews</h2>
      <ul>
        {reviews.map((review, index) => (
          <li key={index}>{review.review}</li>
        ))}
      </ul>
      </Navbar>
      <Footer />
    </div>
  );
};

export default ViewReviews; 