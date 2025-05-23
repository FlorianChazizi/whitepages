"use client"
import React, { useEffect, useState } from 'react';
import '../styles/sidebar.css'
const DangerousNumber = () => {
    const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    const fetchDisturbing = async () => {
      try {
        const res = await fetch('/api/dangerous');
        const data = await res.json();
        setNumbers(data.numbers);
      } catch (error) {
        console.error('Failed to fetch disturbing numbers:', error);
      }
    };

    fetchDisturbing();
  }, []);



    return (

        <div className=''>

            <h2 className='side-header'>Επικίνδυνοι  Αριθμοί</h2>

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

    )
}

export default DangerousNumber