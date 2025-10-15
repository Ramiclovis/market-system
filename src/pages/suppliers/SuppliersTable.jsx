import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../dashboard/components/Navbar";
import Footer from "../dashboard/components/Footer";
import Swal from 'sweetalert2';
import "./SuppliersTable.css";

function SuppliersTable() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [newSupplier, setNewSupplier] = useState({
    supplier_name: "",
    supplier_phone: "",
    supplier_email: "",
    supplier_address: "",
    supplier_type: "Manufacturer",
    pricing_method: "Fixed",
    payment_method: "Cash",
    products_type: "",
    supplier_notes: "",
    company_id: "",
    is_active: "Active",
    created_at: "",
    updated_at: ""
  });

  const [suppliers, setSuppliers] = useState([
    { id: 1, supplier_name: "Global Supplies Co.", supplier_phone: "01000000001", supplier_email: "contact@globalsupplies.com", supplier_address: "Cairo, Egypt", supplier_type: "Distributor", pricing_method: "Discount Tier", payment_method: "Credit", products_type: "Food & Beverages", supplier_notes: "Preferred for beverages.", company_id: "1", is_active: "Active", created_at: "2024-01-05", updated_at: "2024-01-20" },
    { id: 2, supplier_name: "Tech Parts LLC", supplier_phone: "01000000002", supplier_email: "sales@techparts.com", supplier_address: "Dubai, UAE", supplier_type: "Manufacturer", pricing_method: "Fixed", payment_method: "Cash", products_type: "Electronics", supplier_notes: "Lead time 2 weeks.", company_id: "2", is_active: "Inactive", created_at: "2024-02-10", updated_at: "2024-03-01" }
  ]);

  const handleBack = () => {
    navigate("/dashboard");
  };

  const handleRowClick = (supplier) => {
    setSelectedSupplier(supplier);
    setIsEditMode(true);
    setNewSupplier({
      supplier_name: supplier.supplier_name,
      supplier_phone: supplier.supplier_phone,
      supplier_email: supplier.supplier_email,
      supplier_address: supplier.supplier_address,
      supplier_type: supplier.supplier_type,
      pricing_method: supplier.pricing_method,
      payment_method: supplier.payment_method,
      products_type: supplier.products_type,
      supplier_notes: supplier.supplier_notes,
      company_id: supplier.company_id,
      is_active: supplier.is_active,
      created_at: supplier.created_at,
      updated_at: supplier.updated_at
    });
    setIsModalOpen(true);
  };

  const handleOpenModal = () => {
    setIsEditMode(false);
    setSelectedSupplier(null);
    setIsModalOpen(true);
  };

  const handleDelete = (e, supplier) => {
    e.stopPropagation();
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete supplier ${supplier.supplier_name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        setSuppliers(prev => prev.filter(s => s.id !== supplier.id));
        Swal.fire({ title: 'Deleted!', text: `Supplier ${supplier.supplier_name} has been deleted.`, icon: 'success', confirmButtonColor: '#10b981' });
      }
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setSelectedSupplier(null);
    setNewSupplier({
      supplier_name: "",
      supplier_phone: "",
      supplier_email: "",
      supplier_address: "",
      supplier_type: "Manufacturer",
      pricing_method: "Fixed",
      payment_method: "Cash",
      products_type: "",
      supplier_notes: "",
      company_id: "",
      is_active: "Active",
      created_at: "",
      updated_at: ""
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSupplier(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (newSupplier.supplier_email && !emailRegex.test(newSupplier.supplier_email)) {
      Swal.fire({ title: 'Error!', text: 'Please enter a valid email address!', icon: 'error', confirmButtonColor: '#ef4444' });
      return;
    }

    if (isEditMode) {
      setSuppliers(prev => prev.map(s => s.id === selectedSupplier.id ? { ...s, ...newSupplier } : s));
      Swal.fire({ title: 'Updated!', text: `Supplier ${newSupplier.supplier_name} has been updated successfully.`, icon: 'success', confirmButtonColor: '#10b981' });
    } else {
      const newSupplierData = { id: suppliers.length > 0 ? Math.max(...suppliers.map(s => s.id)) + 1 : 1, ...newSupplier };
      setSuppliers(prev => [...prev, newSupplierData]);
      Swal.fire({ title: 'Success!', text: `Supplier ${newSupplier.supplier_name} has been added successfully.`, icon: 'success', confirmButtonColor: '#10b981' });
    }

    handleCloseModal();
  };

  return (
    <div className="users-table-container">
      <Navbar />

      <div className="table-container">
        <div className="table-wrapper">
          <div className="users-header">
            <div className="header-content">
              <button onClick={handleBack} className="back-button">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                </svg>
                Back to Dashboard
              </button>
              <h1 className="page-title">Supplier Management</h1>
              <button className="add-user-button" onClick={handleOpenModal}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                </svg>
                Add New Supplier
              </button>
            </div>
          </div>

          <table className="users-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Address</th>
                <th>Type</th>
                <th>Pricing</th>
                <th>Payment</th>
                <th>Products Type</th>
                <th>Notes</th>
                <th>Company ID</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier) => (
                <tr key={supplier.id} onClick={() => handleRowClick(supplier)} className="clickable-row">
                  <td>{supplier.id}</td>
                  <td className="user-name">{supplier.supplier_name}</td>
                  <td className="user-email">{supplier.supplier_phone}</td>
                  <td>{supplier.supplier_email || '-'}</td>
                  <td className="user-email">{supplier.supplier_address || '-'}</td>
                  <td>{supplier.supplier_type}</td>
                  <td>{supplier.pricing_method}</td>
                  <td>{supplier.payment_method}</td>
                  <td>{supplier.products_type || '-'}</td>
                  <td className="user-email">{supplier.supplier_notes || '-'}</td>
                  <td>{supplier.company_id || '-'}</td>
                  <td>
                    <span className={`status ${supplier.is_active === "Active" ? "active" : "inactive"}`}>
                      {supplier.is_active}
                    </span>
                  </td>
                  <td className="actions">
                    <button onClick={(e) => handleDelete(e, supplier)} className="action-btn delete" title="Delete">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                      </svg>
                      <span>Delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  {isEditMode ? (
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                  ) : (
                    <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  )}
                </svg>
                {isEditMode ? "Edit Supplier" : "Add New Supplier"}
              </h2>
              <button className="modal-close-btn" onClick={handleCloseModal}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="supplier_name">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                    <span>Supplier Name</span>
                  </label>
                  <input type="text" id="supplier_name" name="supplier_name" value={newSupplier.supplier_name} onChange={handleInputChange} placeholder="Enter supplier name" required />
                </div>

                <div className="form-group">
                  <label htmlFor="supplier_phone">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                    <span>Phone</span>
                  </label>
                  <input type="tel" id="supplier_phone" name="supplier_phone" value={newSupplier.supplier_phone} onChange={handleInputChange} placeholder="Enter phone number" required />
                </div>

                <div className="form-group">
                  <label htmlFor="supplier_email">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                    <span>Email</span>
                  </label>
                  <input type="email" id="supplier_email" name="supplier_email" value={newSupplier.supplier_email} onChange={handleInputChange} placeholder="Enter email" />
                </div>

                <div className="form-group">
                  <label htmlFor="supplier_address">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    <span>Address</span>
                  </label>
                  <input type="text" id="supplier_address" name="supplier_address" value={newSupplier.supplier_address} onChange={handleInputChange} placeholder="Enter address" />
                </div>

                <div className="form-group">
                  <label htmlFor="supplier_type">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
                    </svg>
                    <span>Supplier Type</span>
                  </label>
                  <select id="supplier_type" name="supplier_type" value={newSupplier.supplier_type} onChange={handleInputChange}>
                    <option value="Manufacturer">Manufacturer</option>
                    <option value="Distributor">Distributor</option>
                    <option value="Wholesaler">Wholesaler</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="pricing_method">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-2.83-.48-5.08-2.73-5.56-5.56H5v-2h1.44c.2-1.07.74-2.05 1.5-2.82l-1.02-1.02 1.41-1.41 1.02 1.02c.77-.76 1.75-1.3 2.82-1.5V5h2v1.44c1.07.2 2.05.74 2.82 1.5l1.02-1.02 1.41 1.41-1.02 1.02c.76.77 1.3 1.75 1.5 2.82H19v2h-1.44c-.48 2.83-2.73 5.08-5.56 5.56V19h-2v.93z"/>
                    </svg>
                    <span>Pricing Method</span>
                  </label>
                  <select id="pricing_method" name="pricing_method" value={newSupplier.pricing_method} onChange={handleInputChange}>
                    <option value="Fixed">Fixed</option>
                    <option value="Discount Tier">Discount Tier</option>
                    <option value="Negotiated">Negotiated</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="payment_method">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M21 8V7l-3 2-2-1-3 2-2-1-3 2-2-1-3 2v3h18V8z"/>
                    </svg>
                    <span>Payment Method</span>
                  </label>
                  <select id="payment_method" name="payment_method" value={newSupplier.payment_method} onChange={handleInputChange}>
                    <option value="Cash">Cash</option>
                    <option value="Credit">Credit</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="products_type">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3 5h18v2H3V5zm0 6h18v2H3v-2zm0 6h18v2H3v-2z"/>
                    </svg>
                    <span>Products Type</span>
                  </label>
                  <input type="text" id="products_type" name="products_type" value={newSupplier.products_type} onChange={handleInputChange} placeholder="e.g. Food, Electronics" />
                </div>

                <div className="form-group">
                  <label htmlFor="supplier_notes">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM7 17h10v-2H7v2zm0-4h10v-2H7v2zm0-6v2h10V7H7z"/>
                    </svg>
                    <span>Notes</span>
                  </label>
                  <input type="text" id="supplier_notes" name="supplier_notes" value={newSupplier.supplier_notes} onChange={handleInputChange} placeholder="Optional notes" />
                </div>

                <div className="form-group">
                  <label htmlFor="company_id">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
                    </svg>
                    <span>Company ID</span>
                  </label>
                  <input type="text" id="company_id" name="company_id" value={newSupplier.company_id} onChange={handleInputChange} placeholder="Related company ID" />
                </div>

                <div className="form-group">
                  <label htmlFor="is_active">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <span>Status</span>
                  </label>
                  <select id="is_active" name="is_active" value={newSupplier.is_active} onChange={handleInputChange} required>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="created_at">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                    </svg>
                    <span>Created At</span>
                  </label>
                  <input type="date" id="created_at" name="created_at" value={newSupplier.created_at} onChange={handleInputChange} required />
                </div>

                <div className="form-group">
                  <label htmlFor="updated_at">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                    </svg>
                    <span>Updated At</span>
                  </label>
                  <input type="date" id="updated_at" name="updated_at" value={newSupplier.updated_at} onChange={handleInputChange} required />
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={handleCloseModal}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                  </svg>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  {isEditMode ? "Update Supplier" : "Add Supplier"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default SuppliersTable;


