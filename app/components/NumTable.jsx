'use client';
import React, { useState, useEffect } from 'react';
import { FaEye, FaComment } from "react-icons/fa";
import '../styles/numtable.css';

const NumTable = () => {
  const [activeTab, setActiveTab] = useState('mostWanted');
  const [mostWantedData, setMostWantedData] = useState([]);
  const [recentlyAddedData, setRecentlyAddedData] = useState([]);
  const [recentlySearchedData, setRecentlySearchedData] = useState([]);

  const tabs = [
    { id: 'mostWanted', label: 'Οι πιο περιζήτητοι αριθμοί' },
    { id: 'recentlyAdded', label: 'Πρόσφατα προστέθηκαν' },
    { id: 'recentlySearched', label: 'Πρόσφατα αναζητήθηκαν' }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resMostWanted = await fetch('/api/mostviewed');
        const dataMostWanted = await resMostWanted.json();
        setMostWantedData(dataMostWanted.numbers);

        const resRecentlyAdded = await fetch('/api/latestcreated');
        const dataRecentlyAdded = await resRecentlyAdded.json();
        setRecentlyAddedData(dataRecentlyAdded.numbers);

        const resRecentlySearched = await fetch('/api/lastviewed');
        const dataRecentlySearched = await resRecentlySearched.json();
        setRecentlySearchedData(dataRecentlySearched.numbers);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  const numberLists = {
    mostWanted: mostWantedData,
    recentlyAdded: recentlyAddedData,
    recentlySearched: recentlySearchedData
  };

  return (
    <div className="table-wrapper">
      <h1 className='table-title'>Αριθμοί τηλεφώνου</h1>

      {/* Tabs Navigation */}
      <ul className="table-tabs">
        {tabs.map(tab => (
          <li key={tab.id} className={activeTab === tab.id ? 'active' : ''}>
            <a onClick={() => setActiveTab(tab.id)}>{tab.label}</a>
          </li>
        ))}
      </ul>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'mostWanted' ? (
          <table className="table-container">
          <tbody>
            {mostWantedData.map((row, index) => (
              <tr key={index}>
                <td><a href={`/numbers/${row.number}`}>{row.number}</a></td>
                <td><span>{row.views} <FaEye /></span></td>
                <td><a href={`/numbers/${row.number}`}>{row.number}</a></td> 
                <td><span>{row.comments} <FaComment /></span></td>
              </tr>
            ))}
          </tbody>
        </table>
        ) : (
          <div className="number-list">
            {numberLists[activeTab].map((num) => (
              <a href={`/numbers/${num.number}`} key={num.number} className="pill">{num.number}</a>  
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NumTable;
