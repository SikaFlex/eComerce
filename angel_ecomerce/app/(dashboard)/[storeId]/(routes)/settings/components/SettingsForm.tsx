"use client";

import { toast } from 'react-hot-toast';
import { Store } from '@prisma/client';
import { Heading } from '@/components/ui/heading'
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { set, z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { 
    Form,
    FormControl,
    FormField, 
    FormItem, 
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { AlertModal } from '@/components/modals/alert-modal';
import { on } from 'events';
import { ApiAlert } from '@/components/ui/apiAlert';
import { useOrigin } from '@/hooks/use-origin';


interface SettingsFormProps {
    initalData: Store;
}
const formSchema = z.object({
    name: z.string().min(1),
})

type SettingFormValue = z.infer<typeof formSchema>;

export const SettingsForm: React.FC<SettingsFormProps> = ({
    initalData
}) => {
    const params = useParams();
    const router = useRouter();
    const origin = useOrigin();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false)
    

    const form = useForm<SettingFormValue>({
        resolver: zodResolver(formSchema),
        defaultValues: initalData
        
    })

    const onSubmit = async (data: SettingFormValue) =>{
        try {
            setLoading(true);
            await axios.patch(`/api/stores/${params.storeId}`, data)
            router.refresh();
            toast.success("Tienda actualizada.")

        } catch (error) {
         toast.error("Hubo un problema")
        }finally{
            setLoading(false);
        }
    }

    const onDelete = async () =>{
        try {
        setLoading(true);
        await axios.delete(`/api/stores/${params.storeId}`)
        router.refresh();
        router.push("/");
        toast.success("Tienda borrada.")


        } catch (error) {
            toast.error("Asegurate de que has borrado todos los productos y categorias primero.")
        }finally{
            setLoading(false);
            setOpen(false);
        }
    }
    return (
        <>
        <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
        />
        <div className='flex items-center justify-between '>
            <Heading
                title="Settings"
                description="Ajustes"
            />
            <Button
                disabled={loading}
                variant="destructive"
                size="icon"
                onClick={() => setOpen(true)}
            >
            <Trash className='h-4 w-4'/>
            </Button>

        </div>
        <Separator/>
        <Form {...form}>

        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full'>
            <div className='grid grid-cols-3 gap-8'>
                <FormField
                    control={form.control}
                    name='name'
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Nombre:</FormLabel>
                            <FormControl>
                                <Input disabled={loading} placeholder='Inserte nombre de la tienda' {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
            </div>
            <Button disabled={loading} className='ml-auto' type='submit'>
                Guardar
            </Button>
        </form>
        </Form>
        <Separator/>
        <ApiAlert 
        title="NEXT_PUBLIC_API_URL" 
        description={`${origin}/api/${params.storeId}`} 
        variant='public' />
        </>
    )
}
