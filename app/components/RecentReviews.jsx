'use client';
import React, { useEffect, useState } from 'react';
import '../styles/recentreviews.css';

const RecentReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/numbers'); // Adjust the URL as needed
        const data = await res.json();
        setReviews(data.numbers);
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div>
      <h2 className='body-title'>Πρόσφατες Αξιολογήσεις των αριθμών</h2>
      {reviews.map((review) => (
        <a key={review.id} href={`/numbers/${review.number}`} className='review-item'>
          <strong>{review.number}</strong>
          <span>{review.category}</span>
          <p>{review.comment}</p>
        </a>
      ))}
    </div>
  );
};

export default RecentReviews;
