'use client'
import React, { useState } from 'react';
import { FaEye, FaComment } from "react-icons/fa";
import '../styles/numtable.css';

const NumTable = () => {
  const [activeTab, setActiveTab] = useState('mostWanted');

  const tabs = [
    { id: 'mostWanted', label: 'Οι πιο περιζήτητοι αριθμοί' },
    { id: 'recentlyAdded', label: 'Πρόσφατα προστέθηκαν' },
    { id: 'recentlySearched', label: 'Πρόσφατα αναζητήθηκαν' }
  ];

  const data = [
    { popular: "2106292595", recent: "23 690", searched: "2106292595", comments: 85 },
    { popular: "2130396766", recent: "16 669", searched: "6976902097", comments: 66 },
    { popular: "6909144762", recent: "14 364", searched: "6933847577", comments: 61 },
    { popular: "6933847577", recent: "12 405", searched: "6931575919", comments: 50 },
    { popular: "6931575919", recent: "12 138", searched: "2130396766", comments: 48 },
    { popular: "2106292512", recent: "10 655", searched: "6955964857", comments: 44 },
    { popular: "6943651204", recent: "10 366", searched: "6955964854", comments: 43 },
  ];

  const numberLists = {
    mostWanted: data.map(row => row.popular),
    recentlyAdded: data.map(row => row.recent),
    recentlySearched: data.map(row => row.searched),
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
              {data.map((row, index) => (
                <tr key={index}>
                  <td><a href="#">{row.popular}</a></td>
                  <td><span>{row.recent} <FaEye /></span></td>
                  <td><a href="#">{row.searched}</a></td>
                  <td><span>{row.comments} <FaComment /></span></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="number-list">
            {numberLists[activeTab].map((num, index) => (
              <a href='#' key={index} className="pill">{num}</a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default NumTable;
