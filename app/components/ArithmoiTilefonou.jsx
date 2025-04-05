'use client'
import React, { useState } from "react";
import "../styles/at.css"
const categories = [
  { name: "Οι πιο περιζήτητοι αριθμοί", key: "popular" },
  { name: "Πρόσφατα προστέθηκαν", key: "recent" },
  { name: "Πρόσφατα αναζητήθηκαν", key: "searched" },
];

const data = {
  popular: [
    ["2106292595", "23,690", 85],
    ["2130396766", "16,669", 66],
    ["6909144762", "14,364", 61],
    ["6933847577", "12,405", 50],
    ["6931575919", "12,138", 48],
    ["2106292512", "10,655", 44],
    ["6943651204", "10,366", 43],
  ],
  recent: [
    ["2106292595", "23,690"],
    ["6976902097", "16,669"],
    ["6933847577", "14,364"],
    ["6931575919", "12,405"],
    ["2130396766", "12,138"],
    ["6955964857", "10,655"],
    ["6955964854", "10,366"],
  ],
  searched: [
    ["2106292595", 85],
    ["6976902097", 66],
    ["6933847577", 61],
    ["6931575919", 50],
    ["2130396766", 48],
    ["6955964857", 44],
    ["6955964854", 43],
  ],
};

const TableComponent = () => {
  const [activeTab, setActiveTab] = useState("popular");

  return (
    <div className="container">
      <div className="tabs">
        {categories.map((category) => (
          <button
            key={category.key}
            className={activeTab === category.key ? "active" : ""}
            onClick={() => setActiveTab(category.key)}
          >
            {category.name}
          </button>
        ))}
      </div>
      <table>
        <thead>
          <tr>

          </tr>
        </thead>
        <tbody>
          {data[activeTab].map((row, index) => (
            <tr key={index}>
              {row.map((cell, i) => (
                <td key={i}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
