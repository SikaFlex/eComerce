import { format } from 'date-fns'
import prismadb from '@/lib/prismadb'
import React from 'react'
import { BillboardForm } from './components/billboard-form'
import { BillboardColumn } from '../components/columns'

const billboardPage =async ({
  params
}:{params: {billboardId: string} }) => {
  
  const billboard = await prismadb.billboard.findUnique({
    where:{
      id: params.billboardId
    }
  })



  return (
    <div className='flex-col'>
    <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm
        initalData={billboard}
        />
      </div>
    </div>
    )
}

export default billboardPage