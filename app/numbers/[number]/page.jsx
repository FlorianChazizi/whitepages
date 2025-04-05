'use client';
import React, { useState } from 'react';
import Banner from '../../banner/Banner';
import NumberCalled from '../../components/NumberCalled';
import Statistics from '../../components/Statistics';
import Sidebar from '../../components/Sidebar';
import AddComment from '../../components/AddComment';
import CommentList from '../../components/CommentList';
import '../../styles/body.css';

const NumberPage = () => {
  const [numberData, setNumberData] = useState(null);
  return (
    <div>
      <Banner />
      <NumberCalled setNumberData={setNumberData} />
      <div className='main-wrapper'>
        <div className='content'>
          <Statistics numberData={numberData} />
          <AddComment numberData={numberData} />
          <CommentList numberData={numberData} />
        </div>
        <div className='sidebar'>
          <Sidebar />
        </div>
      </div>
    </div>
  );
};
export default NumberPage;
