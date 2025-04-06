'use client';
import React, { useEffect, useState } from 'react';
import '../styles/recentreviews.css';

const RecentReviews = () => {
  const [reviews, setReviews] = useState([]);

  const rankColors = {
    useful: 'rgba(35, 181, 79, 0.7)',    // Light green
    safe: 'rgba(77, 153, 129, 0.7)',     // Lighter teal
    neutral: 'rgba(22, 157, 196, 0.5)',  // Light blue
    annoying: 'rgba(230, 82, 62, 0.7)',  // Light red
    dangerous: 'rgba(175, 28, 107, 0.8)' // Light dark pink
  };

  const rankLabels = {
    useful: 'Χρήσιμο',
    safe: 'Ασφαλές',
    neutral: 'Ουδέτερο',
    annoying: 'Ενοχλητικό',
    dangerous: 'Επικίνδυνο'
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch('/api/numbers'); // Adjust the URL as needed
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
      {reviews.slice(0, 10).map((review, index) => (
        <a 
          key={review.id || index}  // Use review.id, fallback to index
          href={`/numbers/${review.number}`} 
          className='review-item'
        >
          <strong>{review.number}</strong>
          <span
            className='recent-rank'
            style={{ backgroundColor: rankColors[review.rank] || 'grey' }}  // Ensure there's a fallback for missing rank
          >
            {rankLabels[review.rank] || 'Άγνωστο'}  {/* Show the label or fallback */}
          </span>
          <p>{review.comment}</p>
        </a>
      ))}
    </div>
  );
};

export default RecentReviews;
