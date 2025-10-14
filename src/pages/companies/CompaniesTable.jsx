import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../dashboard/components/Navbar";
import Footer from "../dashboard/components/Footer";
import Swal from 'sweetalert2';
import "./CompaniesTable.css";

function CompaniesTable() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [newCompany, setNewCompany] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    website: "",
    status: "Active"
  });
  
  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: "شركة النجاح للتجارة",
      email: "info@alnajah.com",
      phone: "01234567890",
      address: "القاهرة، مصر",
      website: "www.alnajah.com",
      status: "Active"
    },
    {
      id: 2,
      name: "مؤسسة الأمل التجارية",
      email: "contact@alamal.com",
      phone: "01234567891",
      address: "الإسكندرية، مصر",
      website: "www.alamal.com",
      status: "Active"
    },
    {
      id: 3,
      name: "شركة المستقبل للاستثمار",
      email: "info@almostaqbal.com",
      phone: "01234567892",
      address: "الجيزة، مصر",
      website: "www.almostaqbal.com",
      status: "Inactive"
    },
    {
      id: 4,
      name: "Tech Solutions Corp",
      email: "info@techsolutions.com",
      phone: "01234567893",
      address: "دبي، الإمارات",
      website: "www.techsolutions.com",
      status: "Active"
    },
    {
      id: 5,
      name: "شركة البناء الحديث",
      email: "info@modernbuild.com",
      phone: "01234567894",
      address: "الرياض، السعودية",
      website: "www.modernbuild.com",
      status: "Active"
    }
  ]);

  const handleBack = () => {
    navigate("/dashboard");
  };

  const handleRowClick = (company) => {
    setSelectedCompany(company);
    setIsEditMode(true);
    setNewCompany({
      name: company.name,
      email: company.email,
      phone: company.phone,
      address: company.address,
      website: company.website,
      status: company.status
    });
    setIsModalOpen(true);
  };

  const handleOpenModal = () => {
    setIsEditMode(false);
    setSelectedCompany(null);
    setIsModalOpen(true);
  };

  const handleDelete = (e, company) => {
    e.stopPropagation(); // Prevent opening edit modal
    
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete company ${company.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        // Delete company from state
        setCompanies(prevCompanies => prevCompanies.filter(c => c.id !== company.id));
        
        Swal.fire({
          title: 'Deleted!',
          text: `Company ${company.name} has been deleted.`,
          icon: 'success',
          confirmButtonColor: '#10b981'
        });
      }
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setSelectedCompany(null);
    setNewCompany({
      name: "",
      email: "",
      phone: "",
      address: "",
      website: "",
      status: "Active"
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCompany(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newCompany.email)) {
      Swal.fire({
        title: 'Error!',
        text: 'Please enter a valid email address!',
        icon: 'error',
        confirmButtonColor: '#ef4444'
      });
      return;
    }
    
    if (isEditMode) {
      // Update existing company
      setCompanies(prevCompanies => 
        prevCompanies.map(company => 
          company.id === selectedCompany.id 
            ? {
                ...company,
                name: newCompany.name,
                email: newCompany.email,
                phone: newCompany.phone,
                address: newCompany.address,
                website: newCompany.website,
                status: newCompany.status
              }
            : company
        )
      );
      
      Swal.fire({
        title: 'Updated!',
        text: `Company ${newCompany.name} has been updated successfully.`,
        icon: 'success',
        confirmButtonColor: '#10b981'
      });
    } else {
      // Add new company
      const newCompanyData = {
        id: companies.length > 0 ? Math.max(...companies.map(c => c.id)) + 1 : 1,
        name: newCompany.name,
        email: newCompany.email,
        phone: newCompany.phone,
        address: newCompany.address,
        website: newCompany.website,
        status: newCompany.status
      };
      
      setCompanies(prevCompanies => [...prevCompanies, newCompanyData]);
      
      Swal.fire({
        title: 'Success!',
        text: `Company ${newCompany.name} has been added successfully.`,
        icon: 'success',
        confirmButtonColor: '#10b981'
      });
    }
    
    handleCloseModal();
  };

  return (
    <div className="companies-table-container">
      <Navbar />
      
      {/* Table Container */}
      <div className="table-container">
        <div className="table-wrapper">
          {/* Header */}
          <div className="companies-header">
            <div className="header-content">
              <button onClick={handleBack} className="back-button">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                </svg>
                Back to Dashboard
              </button>
              <h1 className="page-title">Company Management</h1>
              <button className="add-company-button" onClick={handleOpenModal}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                </svg>
                Add New Company
              </button>
            </div>
          </div>

          <table className="companies-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Company Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Website</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company) => (
                <tr key={company.id} onClick={() => handleRowClick(company)} className="clickable-row">
                  <td>{company.id}</td>
                  <td className="company-name">{company.name}</td>
                  <td className="company-email">{company.email}</td>
                  <td className="company-phone">{company.phone}</td>
                  <td className="company-address">{company.address}</td>
                  <td className="company-website">{company.website}</td>
                  <td>
                    <span className={`status ${company.status === "Active" ? "active" : "inactive"}`}>
                      {company.status}
                    </span>
                  </td>
                  <td className="actions">
                    <button 
                      onClick={(e) => handleDelete(e, company)}
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

      {/* Add Company Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  {isEditMode ? (
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                  ) : (
                    <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
                  )}
                </svg>
                {isEditMode ? "Edit Company" : "Add New Company"}
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
                  <label htmlFor="name">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
                    </svg>
                    <span>Company Name</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={newCompany.name}
                    onChange={handleInputChange}
                    placeholder="Enter company name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                    <span>Email Address</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={newCompany.email}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                    <span>Phone Number</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={newCompany.phone}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="address">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    <span>Address</span>
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={newCompany.address}
                    onChange={handleInputChange}
                    placeholder="Enter company address"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="website">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"/>
                    </svg>
                    <span>Website</span>
                  </label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    value={newCompany.website}
                    onChange={handleInputChange}
                    placeholder="Enter website URL"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="status">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <span>Status</span>
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={newCompany.status}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
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
                  {isEditMode ? "Update Company" : "Add Company"}
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

export default CompaniesTable;

