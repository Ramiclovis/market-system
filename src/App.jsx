import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/login";
import Dashboard from "./pages/dashboard/Dashboard";
import UsersTable from "./pages/users/UsersTable";
import CategoriesTable from "./pages/categories/CategoriesTable";
import CompaniesTable from "./pages/companies/CompaniesTable";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<UsersTable />} />
        <Route path="/categories" element={<CategoriesTable />} />
        <Route path="/companies" element={<CompaniesTable />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
