import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../dashboard/components/Navbar";
import Footer from "../dashboard/components/Footer";
import Swal from 'sweetalert2';
import "./UnitsTable.css";

function UnitsTable() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [newUnit, setNewUnit] = useState({
    name: "",
    is_active: "Active",
    created_at: "",
    updated_at: ""
  });

  const [units, setUnits] = useState([
    { id: 1, name: "Kilogram", is_active: "Active", created_at: "2024-01-01", updated_at: "2024-01-10" },
    { id: 2, name: "Liter", is_active: "Active", created_at: "2024-01-02", updated_at: "2024-01-15" },
    { id: 3, name: "Piece", is_active: "Active", created_at: "2024-01-03", updated_at: "2024-01-20" },
    { id: 4, name: "Meter", is_active: "Inactive", created_at: "2024-01-04", updated_at: "2024-02-01" },
    { id: 5, name: "Box", is_active: "Active", created_at: "2024-01-05", updated_at: "2024-02-10" }
  ]);

  const handleBack = () => {
    navigate("/dashboard");
  };

  const handleRowClick = (unit) => {
    setSelectedUnit(unit);
    setIsEditMode(true);
    setNewUnit({
      name: unit.name,
      is_active: unit.is_active,
      created_at: unit.created_at,
      updated_at: unit.updated_at
    });
    setIsModalOpen(true);
  };

  const handleOpenModal = () => {
    setIsEditMode(false);
    setSelectedUnit(null);
    setNewUnit({
      name: "",
      is_active: "Active",
      created_at: "",
      updated_at: ""
    });
    setIsModalOpen(true);
  };

  const handleDelete = (e, unit) => {
    e.stopPropagation();
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete unit ${unit.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        setUnits(prev => prev.filter(u => u.id !== unit.id));
        Swal.fire({
          title: 'Deleted!',
          text: `Unit ${unit.name} has been deleted.`,
          icon: 'success',
          confirmButtonColor: '#10b981'
        });
      }
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setSelectedUnit(null);
    setNewUnit({
      name: "",
      is_active: "Active",
      created_at: "",
      updated_at: ""
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUnit(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate dates
    if (new Date(newUnit.updated_at) < new Date(newUnit.created_at)) {
      Swal.fire({
        title: 'Error!',
        text: 'Updated date cannot be earlier than created date!',
        icon: 'error',
        confirmButtonColor: '#ef4444'
      });
      return;
    }

    if (isEditMode) {
      setUnits(prev => prev.map(u => u.id === selectedUnit.id ? {
        ...u,
        name: newUnit.name,
        is_active: newUnit.is_active,
        created_at: newUnit.created_at,
        updated_at: newUnit.updated_at
      } : u));

      Swal.fire({
        title: 'Updated!',
        text: `Unit ${newUnit.name} has been updated successfully.`,
        icon: 'success',
        confirmButtonColor: '#10b981'
      });
    } else {
      const newUnitData = {
        id: units.length > 0 ? Math.max(...units.map(u => u.id)) + 1 : 1,
        name: newUnit.name,
        is_active: newUnit.is_active,
        created_at: newUnit.created_at,
        updated_at: newUnit.updated_at
      };
      setUnits(prev => [...prev, newUnitData]);
      Swal.fire({
        title: 'Success!',
        text: `Unit ${newUnit.name} has been added successfully.`,
        icon: 'success',
        confirmButtonColor: '#10b981'
      });
    }

    handleCloseModal();
  };

  return (
    <div className="units-table-container">
      <Navbar />

      <div className="table-container">
        <div className="table-wrapper">
          <div className="units-header">
            <div className="header-content">
              <button onClick={handleBack} className="back-button">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                </svg>
                Back to Dashboard
              </button>
              <button className="add-unit-button" onClick={handleOpenModal}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                </svg>
                Add New Unit
              </button>
            </div>
          </div>

          <table className="units-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Is Active</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {units.map((unit) => (
                <tr key={unit.id} onClick={() => handleRowClick(unit)} className="clickable-row">
                  <td>{unit.id}</td>
                  <td className="unit-name">{unit.name}</td>
                  <td>
                    <span className={`status ${unit.is_active === "Active" ? "active" : "inactive"}`}>
                      {unit.is_active}
                    </span>
                  </td>
                  <td>{unit.created_at}</td>
                  <td>{unit.updated_at}</td>
                  <td className="actions">
                    <button 
                      onClick={(e) => handleDelete(e, unit)}
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

      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  {isEditMode ? (
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                  ) : (
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"/>
                  )}
                </svg>
                {isEditMode ? "Edit Unit" : "Add New Unit"}
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
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"/>
                    </svg>
                    <span>Unit Name</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={newUnit.name}
                    onChange={handleInputChange}
                    placeholder="Enter unit name"
                    required
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
                    value={newUnit.is_active}
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
                    value={newUnit.created_at}
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
                    value={newUnit.updated_at}
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
                  {isEditMode ? "Update Unit" : "Add Unit"}
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

export default UnitsTable;
