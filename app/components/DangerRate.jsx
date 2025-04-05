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
        <div className="w-1/2 bg-gray-200 rounded-full h-4 overflow-hidden relative">
          <div
            className="h-full transition-all duration-300"
            style={{
              width: `${dangerRate}%`,
              backgroundColor:
                dangerRate < 20
                  ? '#4d9981'
                  : dangerRate < 40
                  ? '#169dc4'
                  : dangerRate < 60
                  ? '#f0ad4e'
                  : dangerRate < 80
                  ? '#e6523e'
                  : '#af1c6b',
            }}
          />
        </div>
        <p className="mt-1 text-sm font-semibold">{dangerRate}% </p>
      </div>
      
    )
}

export default DangerRate