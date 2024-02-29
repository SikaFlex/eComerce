import prismadb from "@/lib/prismadb";
import { Children } from "react";

interface DashboardPageProps {
    params: { storeId: string },
    children: React.ReactNode
}



const DashboardPage: React.FC<DashboardPageProps> = async ({
    params,
    children

}) =>{

    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId
        }
    });

    return(
        <div>
            Tienda activa: {store?.name}
            {children}
        </div>
    );
}

export default DashboardPage;