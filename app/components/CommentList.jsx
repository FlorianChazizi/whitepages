'use client'
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import '../styles/commentlist.css';

const CommentsList = ({ numberData }) => {
    const { number } = useParams();
    const [comments, setComments] = useState([]);
    const [dangerRate, setDangerRate] = useState(0);
    const [loading, setLoading] = useState(true);

    const rankColors = {
        useful: 'rgba(35, 181, 79, 0.7)',    // Light green
        safe: 'rgba(77, 153, 129, 0.7)',       // Lighter teal
        neutral: 'rgba(22, 157, 196, 0.5)',    // Light blue
        annoying: 'rgba(230, 82, 62, 0.7)',    // Light red
        dangerous: 'rgba(175, 28, 107, 0.8)'   // Light dark pink
      };

    const rankLabels = {
        useful: 'Χρήσιμο',
        safe: 'Ασφαλές',
        neutral: 'Ουδέτερο',
        annoying: 'Ενοχλητικό',
        dangerous: 'Επικίνδυνο'
    };

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await fetch(`https://whitepages.vercel.app/api/comments/${number}`);
                const data = await res.json();
                if (res.ok) {
                    setComments(data.comments);
                    setDangerRate(data.dangerRate);
                }
            } catch (err) {
                console.error('Failed to load comments:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, [number]);

    if (loading) return <p>Φόρτωση σχολίων...</p>;
    if (comments.length === 0) return <p>Δεν υπάρχουν ακόμα σχόλια.</p>;

    return (
        <div className="comments-list">
            <h3 className='list-title'>Σχόλια για τον αριθμό {numberData?.number}</h3>


            {comments.map((comment, index) => (
                <div key={index} className="comment-container">
                    <div className="rank-container">
                        <strong
                            className="comment-rank"
                            style={{ backgroundColor: rankColors[comment.rank] }}
                        >
                            {rankLabels[comment.rank] || comment.rank}
                        </strong>
                    </div>

                    <div className="comment">
                        <p className="comment-text">{comment.comment}</p>
                        <div className="comment-date">
                            <small>{comment.created_at?.split('T')[0]}</small>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CommentsList;
