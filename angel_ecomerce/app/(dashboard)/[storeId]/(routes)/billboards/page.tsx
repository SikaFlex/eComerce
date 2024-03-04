import React from 'react'
import BilboardClient from './components/BilboardClient'

const page = () => {
  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 pt-6'>
      <BilboardClient/>
      </div>
    </div>
  )
}

export default page