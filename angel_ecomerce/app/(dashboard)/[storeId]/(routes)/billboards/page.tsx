import { format } from "date-fns"
import React, { useEffect } from 'react'
import BilboardClient from './components/BilboardClient'
import prismadb from '@/lib/prismadb'
import { BillboardColumn } from './components/columns'

const page = async ({
  params
}:{
  params: {storeId: string}
}) => {
    const billboard = await prismadb.billboard.findMany({
      where: {
        storeId: params.storeId
      },
      orderBy:{
        createAt: 'desc'
      }
      
    });
    
    if(!billboard) return;
    const formattedBillboards: BillboardColumn[] = billboard.map( (item) => ({
      id: item.id,
      label: item.label,
      createAt: format(item.createAt, "MMMM do, yyyy")
    }));
  


  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 pt-6'>
      <BilboardClient data={formattedBillboards}/>
      </div>
    </div>
  )
}

export default page