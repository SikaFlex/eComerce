import { format } from 'date-fns'
import prismadb from '@/lib/prismadb'
import React from 'react'
import {  SizeForm } from './components/size-form'
import { SizeColumns } from '../components/columns'

const sizePage =async ({
  params
}:{params: {storeId: string} }) => {
  
  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy: {
      createdAt: 'desc'
    }
  })



  return (
    <div className='flex-col'>
    <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeForm
        initalData={sizes}
        />
      </div>
    </div>
    )
}

export default sizePage