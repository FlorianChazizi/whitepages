"use client"
import React from 'react'

import RecentReviews from './RecentReviews'
import Sidebar from './Sidebar'
import '../styles/body.css'

const Body = () => {


    return (
        <div className='main-wrapper'>

            <div className='content'>
                <RecentReviews />
            </div>

            <div className='sidebar'>
                <Sidebar />
            </div>
        </div>
    )
}

export default Body