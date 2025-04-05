'use client';
import React from 'react'

const LastReview = ({ lastReviewedAt }) => {
    return (
        <div>
            {lastReviewedAt ? lastReviewedAt.slice(0, 10) : 'Δεν υπάρχουν αξιολογήσεις'}
        </div>)
}

export default LastReview
