'use client';
import React, { useEffect, useState } from 'react';
import '../styles/sidebar.css';

const DisturbingNumbers = () => {
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    const fetchDisturbing = async () => {
      try {
        const res = await fetch('https://whitepages.vercel.app/api/disturbing');
        const data = await res.json();
        setNumbers(data.numbers);
      } catch (error) {
        console.error('Failed to fetch disturbing numbers:', error);
      }
    };

    fetchDisturbing();
  }, []);

  return (
    <div>
      <h2 className='side-header'>Ενοχλητικοί Αριθμοί</h2>

      <div className='instances'>
        {numbers.map((item) => (
          <React.Fragment key={item.comment_id}>
            <dt>
              <strong>
                <a
                  href={`/numbers/${item.number}`}
                  className='arithmos'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {item.number}
                </a>
              </strong>
            </dt>
            <dd className='desc'>{item.comment}</dd>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default DisturbingNumbers;
