'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import '../styles/banner.css';
import logo from '../images/searchLogo.svg';
import keimeno from '../images/bannerImgText.svg';
import search from '../images/search-icon.svg';

const Banner = () => {
  const [number, setNumber] = useState('');
  const router = useRouter();

  // Define handleChange at the component level
  const handleChange = (e) => {
    const value = e.target.value;
    // Allow only numeric input
    if (/^\d*$/.test(value)) {
      setNumber(value);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!number.trim()) {
      alert('Please enter a phone number.');
      return;
    }

    try {
      const response = await fetch('/api/checknumber', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ number }),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect to the number's page using the returned ID
        router.push(`/numbers/${data.number}`);
      } else {
        alert(data.error || 'An error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to perform the search. Please try again.');
    }
  };
  const handleClick = () => {
    router.push('/'); // Redirect to the home page
  }

  return (
    <div className='body-content'>
      <div className='header-wrapper'>
        <div className='header-bg'>
          <div className='header'>
            <Image src={logo} alt='Logo' width={125} height={102} className='image cursor-pointer
' onClick={handleClick}/>
            <form className='search-wrapper' onSubmit={handleSearch}>
              <input
                type='text'
                value={number}
                className='searchBar'
                onChange={handleChange}
                placeholder='Enter phone number'
              />
              <button type='submit' className='searchButton'>
                <Image src={search} alt='search' width={28} height={28} className='searchIcon' />
              </button>
            </form>
            <Image src={keimeno} alt='Icon' width={302} height={108} className='image image2' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
