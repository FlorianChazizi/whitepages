'use client';
import React, { useState, useEffect } from 'react'

const DangerRate = ({ number }) => {
    const [dangerRate, setDangerRate] = useState(0);
        const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await fetch(`/api/comments/${number}`);
                const data = await res.json();
                if (res.ok) {
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

    return (
        <div className="danger-meter-container">
        <div className="w-32 bg-gray-200 rounded-full h-4 overflow-hidden relative">
          <div
            className="h-full transition-all duration-300"
            style={{
              width: `${dangerRate}%`,
              backgroundColor:
                dangerRate < 20
                  ? '#f04e4e'
                  : dangerRate < 40
                  ? '#f04e4e'
                  : dangerRate < 60
                  ? '#f0ad4e'
                  : dangerRate < 80
                  ? '#f04e4e'
                  : '#f04e4e',
            }}
          />
        </div>
        <p className="mt-1 text-sm font-semibold">{dangerRate}% </p>
      </div>
      
    )
}

export default DangerRate