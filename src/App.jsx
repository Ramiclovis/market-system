import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/login";
import Dashboard from "./pages/dashboard/Dashboard";
import UsersTable from "./pages/users/UsersTable";
import CategoriesTable from "./pages/categories/CategoriesTable";
import CompaniesTable from "./pages/companies/CompaniesTable";
import SuppliersTable from "./pages/suppliers/SuppliersTable";
import BrandsTable from "./pages/brands/BrandsTable";
import UnitsTable from "./pages/units/UnitsTable";
import ProductsTable from "./pages/products/ProductsTable"; 
import PurchaseOrderDetails from "./pages/purchases/purchase_order_details";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<UsersTable />} />
        <Route path="/categories" element={<CategoriesTable />} />
        <Route path="/companies" element={<CompaniesTable />} />
        <Route path="/suppliers" element={<SuppliersTable />} />
        <Route path="/brands" element={<BrandsTable />} />
        <Route path="/units" element={<UnitsTable />} />
        <Route path="/products" element={<ProductsTable />} />
        <Route path="/purchase-order-details" element={<PurchaseOrderDetails />} />
        
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
