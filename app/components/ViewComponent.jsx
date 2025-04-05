import React from 'react'
import { useParams } from 'next/navigation';

const ViewComponent = ({ views}) => {
    const { number } = useParams(); // Get dynamic route param

  return (
    <div>{views}</div>
  )
}

export default ViewComponent