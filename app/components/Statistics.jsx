'use client'
import React, { useState } from 'react'
import ViewComponent from './ViewComponent';
import TotalReviews from './TotalReviews';
import LastReview from './LastReview';
import DangerRate from './DangerRate';
import '../styles/statistics.css';

const Statistics = ({ numberData }) => {

  const [reviewData, setReviewData] = useState({
    totalReviews: null,
    lastReviewedAt: null,
  });

  const handleReviewData = (data) => {
    setReviewData(data);
  };

  return (
    <div>
      <h2 className='body-title'>
        Στατιστικά
      </h2>
      <table className='table'>
        <thead>
          <tr>
            <th className='t-title' colSpan={2}>Αξιολόγηση</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td >Βαθμός του κινδύνου:</td>
            <td>
                <DangerRate number={numberData?.number} />
            </td>
          </tr>
          <tr>
            <td>Αριθμός αξιολογήσεων:</td>
            <td>
                <TotalReviews number={numberData?.number}  onReviewData={handleReviewData}  />
            </td>
          </tr>
          <tr>
            <td>Τελευταία αξιολόγηση:</td>
            <td className='t-td-cta'>
              <LastReview lastReviewedAt={reviewData.lastReviewedAt} />
              <a href='#comment'><span className='cursos-pointer t-cta' >Προσθέστε ένα σχόλιο</span></a>
            </td>
          </tr>
          <tr>
            <th className='t-title-2' colSpan={2}>Εμφανίσεις</th>
          </tr>
          <tr>
            <td>Αριθμός εμφανίσεων:</td>
            <td>
              <ViewComponent views={numberData?.views} />
            </td>
          </tr>
          <tr>
            <td>Τελευταία εμφάνιση:</td>
            <td>
              {numberData?.last_time_viewed?
                numberData.last_time_viewed.slice(0,10)
                : ' Δεν έχει προβληθεί  ακόμα'
              }
              </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Statistics