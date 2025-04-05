import React from 'react'
import DangerousNumbers from './DangerousNumber';
import DistrurbingNumbers from './DistrurbingNumbers'
import '../styles/sidebar.css'
const Sidebar = () => {
  return (
    <div className='sidebar'>
        
        <DistrurbingNumbers />

        <DangerousNumbers />

    </div>
  )
}

export default Sidebar