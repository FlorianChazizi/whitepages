'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import '../styles/numberpage.css';

const NumberCalled = ({ setNumberData }) => {
    const { number } = useParams(); // Get dynamic route param
    
    const [loading, setLoading] = useState(true); // Add a loading state

    useEffect(() => {
  
      const fetchNumberData = async () => {
        try {
          const res = await fetch(`/api/numbers/${number}`);
          if (!res.ok) {
            throw new Error(`API responded with status ${res.status}`);
          }
  
          const data = await res.json();
          setNumberData(data);
          setLoading(false);
        } catch (error) {
          setLoading(false);
        }
      };
  
      fetchNumberData();
    }, [number, setNumberData]);

    
  return (
    <div className='title-container'>
     <h2 className='title-h2'>Αριθμός τηλεφώνου: <span className='title-span'>{number}</span> </h2>
    
    </div> 
     )
}

export default NumberCalled