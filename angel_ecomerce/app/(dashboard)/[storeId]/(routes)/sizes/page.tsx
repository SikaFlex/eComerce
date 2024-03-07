import { format } from "date-fns"
import React, { useEffect } from 'react'
import BilboardClient from './components/BilboardClient'
import prismadb from '@/lib/prismadb'
import { SizeColumns } from './components/columns'
import SizeClient from "./components/BilboardClient"

const page = async ({
  params
}:{
  params: {storeId: string}
}) => {
    const billboard = await prismadb.size.findMany({
      where: {
        storeId: params.storeId
      },
      orderBy:{
        createdAt: 'desc'
      }
      
    });
    
    if(!billboard) return;
    const formattedSizes: SizeColumns[] = billboard.map( (item) => ({
      id: item.id,
      name: item.name,
      value: item.value,
      createAt: format(item.createdAt, "MMMM do, yyyy")
    }));
  


  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 pt-6'>
      <SizeClient data={formattedSizes}/>
      </div>
    </div>
  )
}

export default page