"use client";

import { toast } from 'react-hot-toast';
import { Billboard } from '@prisma/client';
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
import { useOrigin } from '@/hooks/use-origin';
import ImageUpload from '@/components/ui/imageUpload';


interface BillboardProps {
    initalData: Billboard | null;
}
const formSchema = z.object({
    label: z.string().min(1),
    imageUrl: z.string().min(1)
})

type BillboardFormValue = z.infer<typeof formSchema>;

export const BillboardForm: React.FC<BillboardProps> = ({
    initalData
}) => {
    const params = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false)


    const form = useForm<BillboardFormValue>({
        resolver: zodResolver(formSchema),
        defaultValues: initalData || {
            label: '',
            imageUrl: ''
        }

    })

    const title = initalData ? "Edit billboard" : "Create billboard";
    const description = initalData ? "Edit billboard" : "Add a billboard";
    const toastMessage = initalData ? "Billboard update" : "Billboard created.";
    const action = initalData ? "Guardar" : "Crear";


    const onSubmit = async (data: BillboardFormValue) => {
        try {
            setLoading(true);

            await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`, data)
            if(!initalData){await axios.post(`/api/${params.storeId}/billboards`, data)}

            
            router.refresh();
            router.push(`/${params.store}/billboards`)
            toast.success(toastMessage)

        } catch (error) {
            toast.error("Hubo un problema")
        } finally {
            setLoading(false);
        }
    }

    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`)
            router.refresh();
            router.push("/");
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
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <div className='flex items-center justify-between '>
                <Heading
                    title={title}
                    description={description}
                />
                {initalData && (
                    <Button
                        disabled={loading}
                        variant="destructive"
                        size="icon"
                        onClick={() => setOpen(true)}
                    >
                        <Trash className='h-4 w-4' />
                    </Button>
                )}

            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full'>
                    <FormField
                        control={form.control}
                        name='imageUrl'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Imagen de fondo</FormLabel>
                                <FormControl>
                                    <ImageUpload
                                        value={field.value ? [field.value] : []}
                                        disabled={loading}
                                        onChange={(url) => field.onChange(url)}
                                        onRemove={() => field.onChange("")}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className='grid grid-cols-3 gap-8'>
                        <FormField
                            control={form.control}
                            name='label'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nombre:</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder='Billboard label' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={loading} className='ml-auto ri' type='submit'>
                        {action}
                    </Button>
                </form>
            </Form>
            <Separator />

        </>
    )
}
