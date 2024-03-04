"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@radix-ui/react-separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

const BilboardClient = () => {

    const router = useRouter();
    const params = useParams();
    



  return (
    <div className="flex items-center justify-between">
        <Heading
        title="Billboards (0)"
        description="Manage billboards for you store"/>
        <Button onClick={()=>router.push(`/${params.storeId}/billboards/new`)}>
            <Plus className="mr-2 h-4 w-4"/>
            Añadir
        </Button>
        <Separator/>
    </div>

  )
}

export default BilboardClient