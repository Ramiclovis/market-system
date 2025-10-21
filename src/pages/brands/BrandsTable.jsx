import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../dashboard/components/Navbar";
import Footer from "../dashboard/components/Footer";
import Swal from 'sweetalert2';
import { getCompanyList, getCompanyNameById, initialBrands } from "../../data/sharedData";
import "./BrandsTable.css";

function BrandsTable() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [newBrand, setNewBrand] = useState({
    brand_name: "",
    company_id: "",
    description: "",
    is_active: "Active",
    created_at: "",
    updated_at: ""
  });

  // Get companies list from shared data
  const companies = getCompanyList();
  
  // Initialize brands from shared data
  const [brands, setBrands] = useState(initialBrands);

  const handleBack = () => {
    navigate("/dashboard");
  };

  const getCompanyName = (companyId) => {
    return getCompanyNameById(companyId);
  };

  const handleRowClick = (brand) => {
    setSelectedBrand(brand);
    setIsEditMode(true);
    setNewBrand({
      brand_name: brand.brand_name,
      company_id: brand.company_id,
      description: brand.description,
      is_active: brand.is_active,
      created_at: brand.created_at,
      updated_at: brand.updated_at
    });
    setIsModalOpen(true);
  };

  const handleOpenModal = () => {
    setIsEditMode(false);
    setSelectedBrand(null);
    setNewBrand({
      brand_name: "",
      company_id: "",
      description: "",
      is_active: "Active",
      created_at: "",
      updated_at: ""
    });
    setIsModalOpen(true);
  };

  const handleDelete = (e, brand) => {
    e.stopPropagation();
    
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete brand ${brand.brand_name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        setBrands(prevBrands => prevBrands.filter(b => b.id !== brand.id));
        
        Swal.fire({
          title: 'Deleted!',
          text: `Brand ${brand.brand_name} has been deleted.`,
          icon: 'success',
          confirmButtonColor: '#10b981'
        });
      }
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setSelectedBrand(null);
    setNewBrand({
      brand_name: "",
      company_id: "",
      description: "",
      is_active: "Active",
      created_at: "",
      updated_at: ""
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBrand(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate company selection
    if (!newBrand.company_id) {
      Swal.fire({
        title: 'Error!',
        text: 'Please select a company!',
        icon: 'error',
        confirmButtonColor: '#ef4444'
      });
      return;
    }

    // Validate dates
    if (new Date(newBrand.updated_at) < new Date(newBrand.created_at)) {
      Swal.fire({
        title: 'Error!',
        text: 'Updated date cannot be earlier than created date!',
        icon: 'error',
        confirmButtonColor: '#ef4444'
      });
      return;
    }
    
    if (isEditMode) {
      // Update existing brand
      setBrands(prevBrands => 
        prevBrands.map(brand => 
          brand.id === selectedBrand.id 
            ? {
                ...brand,
                brand_name: newBrand.brand_name,
                company_id: parseInt(newBrand.company_id),
                description: newBrand.description,
                is_active: newBrand.is_active,
                created_at: newBrand.created_at,
                updated_at: newBrand.updated_at
              }
            : brand
        )
      );
      
      Swal.fire({
        title: 'Updated!',
        text: `Brand ${newBrand.brand_name} has been updated successfully.`,
        icon: 'success',
        confirmButtonColor: '#10b981'
      });
    } else {
      // Add new brand
      const newBrandData = {
        id: brands.length > 0 ? Math.max(...brands.map(b => b.id)) + 1 : 1,
        brand_name: newBrand.brand_name,
        company_id: parseInt(newBrand.company_id),
        description: newBrand.description,
        is_active: newBrand.is_active,
        created_at: newBrand.created_at,
        updated_at: newBrand.updated_at
      };
      
      setBrands(prevBrands => [...prevBrands, newBrandData]);
      
      Swal.fire({
        title: 'Success!',
        text: `Brand ${newBrand.brand_name} has been added successfully.`,
        icon: 'success',
        confirmButtonColor: '#10b981'
      });
    }
    
    handleCloseModal();
  };

  return (
    <div className="brands-table-container">
      <Navbar />
      
      {/* Table Container */}
      <div className="table-container">
        <div className="table-wrapper">
          {/* Header */}
          <div className="brands-header">
            <div className="header-content">
              <button onClick={handleBack} className="back-button">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                </svg>
                Back to Dashboard
              </button>
              <button className="add-brand-button" onClick={handleOpenModal}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                </svg>
                Add New Brand
              </button>
            </div>
          </div>

          <table className="brands-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Brand Name</th>
                <th>Company</th>
                <th>Description</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {brands.map((brand) => (
                <tr key={brand.id} onClick={() => handleRowClick(brand)} className="clickable-row">
                  <td>{brand.id}</td>
                  <td className="brand-name">{brand.brand_name}</td>
                  <td className="company-name">{getCompanyName(brand.company_id)}</td>
                  <td className="brand-description">{brand.description}</td>
                  <td>
                    <span className={`status ${brand.is_active === "Active" ? "active" : "inactive"}`}>
                      {brand.is_active}
                    </span>
                  </td>
                  <td className="date-field">{brand.created_at}</td>
                  <td className="date-field">{brand.updated_at}</td>
                  <td className="actions">
                    <button 
                      onClick={(e) => handleDelete(e, brand)}
                      className="action-btn delete"
                      title="Delete"
                    >
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

      {/* Add Brand Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  {isEditMode ? (
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                  ) : (
                    <path d="M12 2l-5.5 9h11L12 2zm0 3.84L13.93 9h-3.87L12 5.84zM17.5 13c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5zm0 7c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zM3 21.5h8v-8H3v8zm2-6h4v4H5v-4z"/>
                  )}
                </svg>
                {isEditMode ? "Edit Brand" : "Add New Brand"}
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
                  <label htmlFor="brand_name">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l-5.5 9h11L12 2zm0 3.84L13.93 9h-3.87L12 5.84z"/>
                    </svg>
                    <span>Brand Name</span>
                  </label>
                  <input
                    type="text"
                    id="brand_name"
                    name="brand_name"
                    value={newBrand.brand_name}
                    onChange={handleInputChange}
                    placeholder="Enter brand name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="company_id">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
                    </svg>
                    <span>Company</span>
                  </label>
                  <select
                    id="company_id"
                    name="company_id"
                    value={newBrand.company_id}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a company</option>
                    {companies.map(company => (
                      <option key={company.id} value={company.id}>
                        {company.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group ">
                  <label htmlFor="description">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM7 17h10v-2H7v2zm0-4h10v-2H7v2zm0-6v2h10V7H7z"/>
                    </svg>
                    <span>Description (Optional)</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={newBrand.description}
                    onChange={handleInputChange}
                    placeholder="Enter brand description (optional)"
                    rows="3"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="is_active">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <span>Status</span>
                  </label>
                  <select
                    id="is_active"
                    name="is_active"
                    value={newBrand.is_active}
                    onChange={handleInputChange}
                    required
                  >
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
                  <input
                    type="date"
                    id="created_at"
                    name="created_at"
                    value={newBrand.created_at}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="updated_at">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                    </svg>
                    <span>Updated At</span>
                  </label>
                  <input
                    type="date"
                    id="updated_at"
                    name="updated_at"
                    value={newBrand.updated_at}
                    onChange={handleInputChange}
                    required
                  />
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
                  {isEditMode ? "Update Brand" : "Add Brand"}
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

export default BrandsTable;

