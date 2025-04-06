'use client'
import React, { useState } from 'react'
import '../styles/addcomment.css';

const AddComment = ({ numberData }) => {
  // Set the default selected rank to 'annoying' (the fourth option)
  const [selectedRank, setSelectedRank] = useState('annoying');
  const [commentText, setCommentText] = useState('');

  const rankOptions = [
    { label: 'Χρήσιμος', value: 'useful', color: '#23b54f' },
    { label: 'Ασφαλής', value: 'safe', color: '#4d9981' },
    { label: 'Ουδέτερος', value: 'neutral', color: '#169dc4' },
    { label: 'Ενοχλητικός', value: 'annoying', color: '#e6523e' },
    { label: 'Επικίνδυνος', value: 'dangerous', color: '#af1c6b' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://whitepages.vercel.app/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          number: numberData?.number,
          comment: commentText,
          rank: selectedRank
        }),
      });
      
      if (!response.ok) throw new Error('Failed to submit comment');
      
      setCommentText('');
      setSelectedRank('annoying'); // Reset to fourth option after submission
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to submit comment');
    }
  };

  return (
    <div id='comment'>
      <div className='form-container'>
        <h2 className='form-title'>    
          Προσθήκη ενός σχολίου           
        </h2>

        <div className='form'>
          <form className='form-content' onSubmit={handleSubmit}>
            <div className="form-columns">
              <div className='column-1'>
                <textarea 
                  className='txtarea' 
                  maxLength={200}
                  rows={8}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder={`Η εμπειρία σας με τον αριθμό ${numberData?.number}...`}
                ></textarea>
              </div>
              <div className='column-2'>
                <div className='select-wrapper'>
                  {rankOptions.map((option) => (
                    <div 
                      key={option.value} 
                      className={`rank-wrapper-1 ${selectedRank === option.value ? 'selected' : ''}`}
                      data-color={option.color}
                      onClick={() => setSelectedRank(option.value)}
                    >
                      <label className='rank-1'>{option.label}</label>
                      <input 
                        name="rank" 
                        type='radio' 
                        className='rank'
                        value={option.value}
                        checked={selectedRank === option.value}
                        onChange={() => setSelectedRank(option.value)}
                      />
                    </div>
                  ))}
                </div>
                <button 
                  type="submit" 
                  className="submit-button"
                  disabled={!commentText || !selectedRank}
                >
                  Υποβολή
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddComment