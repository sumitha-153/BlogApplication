import React, { useEffect, useState } from 'react';
import styles from './blog.module.css';
import { useRouter } from 'next/router';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/footer';
import Image from 'next/image';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface Blog {
  id: number;
  title: string;
  author: string;
  date: string;
  content: string;
  tags: string[];
  profileImage: string;
  blogImage: string;
  imageDescription: string;
}

// interface BlogDetailsProps{
//   blog: Blog;
// }

interface Review {
  _id: string;
  blogId: string;
  review: string;
  createdAt: Date;
}

const BlogDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [blog, setBlog] = useState<Blog | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState<string>(''); // State for new review text
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  useEffect(() => {
    if (id) {
      console.log(id);
      
      const fetchBlog = async () => {
        const res = await fetch(`http://localhost:3000/api/blogs/${id}`);
        const data = await res.json();
        setBlog(data);
        setLoading(false); // Set loading to false after fetching blog
      };

      const fetchReviews = async () => {
        const res = await fetch(`/api/reviews/${id}`);
        const data = await res.json();
        setReviews(data);
      };

      fetchBlog();
      fetchReviews();
    }
  }, [id]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newReview.trim() === '') return; // Prevent empty reviews

    await fetch(`/api/reviews/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ review: newReview }),
    });

    setReviews((prevReviews) => [
      ...prevReviews,
      { _id: Date.now().toString(), blogId: Array.isArray(id) ? id[0] : id || '', review: newReview, createdAt: new Date() },
    ]);
    setNewReview(''); // Clear the text area
  };

  if (loading) {
    return (
      <div>
        <Navbar>
        <Skeleton height={40} count={3} />
        <Skeleton height={400} />
        <Skeleton height={50} count={2} />
        <Skeleton height={30} count={1} />
        </Navbar>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar>
      <div className={styles.blogdetails}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
          {blog && <Image className={styles.image} src={blog.profileImage} alt={`${blog.author}'s profile`} width={40} height={40} />}
          {blog && <p> By {blog.author} on {blog.date}</p>}
        </div>
        {blog && <Image src={blog.blogImage} alt={blog.imageDescription} width={600} height={400} />}
        {blog && (
          <>
            <h2>{blog.title}</h2>
            <p>{blog.content}</p>
            <p>{blog.imageDescription}</p> {/* Display image description */}
            
            {/* Display Tags */}
            <p>Tags: {blog.tags.join(', ')}</p>
          </>
        )}

        {/* Review Submission Section */}
        <h3>Write a Review:</h3>
        <form onSubmit={handleReviewSubmit}>
          <textarea
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="Write your review here..."
            required
            className={styles.textarea}
          />
          <button type="submit" className={styles.submitButton}>Submit Review</button>
        </form>

        {/* Display Reviews */}
        <h3>Reviews:</h3>
        <div className={styles.reviewContainer}>
          {reviews.map((review) => (
            <div key={review._id} className={styles.reviewCard}>
              <p className={styles.reviewText}>{review.review}</p>
              <p className={styles.reviewDate}>
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
      </Navbar>
      <Footer />
    </div>
  );
};

export default BlogDetail;