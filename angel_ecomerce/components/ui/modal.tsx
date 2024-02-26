"use client";
import { 
    Dialog,
    DialogContent, 
    DialogDescription, 
    DialogTitle 
} from "@/components/ui/dialog";
import { RedirectType } from "next/navigation";


interface ModalProps {
    title: string;
    description: string;
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
};

export const Modal: React.FC<ModalProps> =({
    title,
    description,
    isOpen,
    onClose,
    children
})=>{
  const onChange = (open: boolean) => {
    if(!open){
        onClose();
    }
  }  

return (
    <Dialog open={isOpen} onOpenChange={onChange}>
        <DialogContent>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
            <div>
                {children}
            </div>
        </DialogContent>

    </Dialog>
);
};