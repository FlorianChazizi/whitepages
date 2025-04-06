'use client'
import React, {useState, useEffect } from 'react'

const TotalReviews = ({ number, onReviewData }) => {
    const [total, setTotal] = useState(null);
    console.log(`number from total reviews ${number}`);
    useEffect(() => {
        if (!number) return;

        const fetchTotalReviews = async () => {
            try {
                const res = await fetch(`/api/reviews/${number}`);
                if (!res.ok) {
                    throw new Error(`API responded with status ${res.status}`);
                }
                const data = await res.json();
                console.log(`data from total reviews: ${JSON.stringify(data)}`);

                setTotal(data.totalReviews);

                if (onReviewData) {
                    onReviewData({
                        totalReviews: data.totalReviews,
                        lastReviewedAt: data.lastReviewedAt,
                    });
                }
            } catch (error) {
                console.error('Error fetching total reviews:', error);
            }
        }

        fetchTotalReviews();
    }, [number]);  


  return (
    <div>
        {total !== null ? total : 'Δεν υπάρχουν αξιολογήσεις'}  
   </div>
  )
}

export default TotalReviews