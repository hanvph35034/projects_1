import { IProduct } from "@/common/types/product";
import FormAdmin from "@/pages/(dashboard)/dashboard/Form";

import DashboardPage from "@/pages/(dashboard)/dashboard/page";
import LayoutAdmin from "@/pages/(dashboard)/layout";
import ProductManagementPage from "@/pages/(dashboard)/products/page";
import HomePage from "@/pages/(website)/home/page";
import LayoutWebsite from "@/pages/(website)/layout";

import { Route, Routes } from "react-router-dom";

const Router = () => {


    return (
        <>
        <div className="container mb-5">
             <Routes>
                <Route path="/" element={<LayoutWebsite />}>
                    <Route index element={<HomePage />} />
                </Route>
                <Route path="admin" element={<LayoutAdmin />}>
                    <Route index element={<DashboardPage  />} /> 
                    <Route path="product" element={<ProductManagementPage />} /> 
                     <Route path="product/add" element={< FormAdmin/>} /> 
                    <Route path="product/add/:id" element={< FormAdmin/>} /> 
                </Route>
            </Routes>
        </div>
        </>
    );
};

export default Router;
