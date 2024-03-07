"use client";

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent} from "@/components/ui/dropdown-menu";
import { SizeColumns } from "./columns";
import { Button } from "@/components/ui/button";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { DropdownMenuItem, DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { redirect } from "next/dist/server/api-utils";
import { useState } from "react";
import axios from "axios";
import { AlertModal } from "@/components/modals/alert-modal";


interface CellActionProps {
    data: SizeColumns;
};

export const CellAction: React.FC<CellActionProps> = ({
    data
}) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false)
    const router = useRouter();
    const params = useParams();
    const onCopy = () => {
        navigator.clipboard.writeText(data.id);
        toast.success("ID dashboard copiado!")
    }
    const onUpdate = () =>{
       router.push(`/${params.storeId}/sizes/${data.id}`)
    }
    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/${params.storeId}/sizes/${data.id}`)
            router.refresh();
            router.push(`/${params.storeId}/sizes`);
            toast.success("Billboard borrada.")


        } catch (error) {
            toast.error("Asegurate de que has borrado todas las categorias que usa este billboard primero.")
        } finally {
            setLoading(false);
            setOpen(false);
        }
    }
    return (
    <>
    <AlertModal 
    isOpen={open}
    onClose={()=> setOpen(false)}
    onConfirm={onDelete}
    loading={loading}
    />
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4"/>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuLabel>
                Acciones
            </DropdownMenuLabel>
            <DropdownMenuItem onClick={() => onCopy()}>
                <Copy className="mr-2 h-4 w-4"/>
                 Copiar Identificador
            </DropdownMenuItem>
            <DropdownMenuItem onClick={()=>onUpdate()}>
                <Edit className="mr-2 h-4 w-4"/>
                 Actualizar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete()}>
                <Trash className="mr-2 h-4 w-4"/>
                 Borrar
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  
    </>
    )
}