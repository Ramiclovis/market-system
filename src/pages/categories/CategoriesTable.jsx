import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../dashboard/components/Navbar";
import Footer from "../dashboard/components/Footer";
import Swal from 'sweetalert2';
import "./CategoriesTable.css";

function CategoriesTable() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    parentId: "",
    isActive: "Active",
    createdAt: "",
    updatedAt: ""
  });

  const [categories, setCategories] = useState([
    { id: 1, name: "Beverages", description: "Drinks and beverages", parentId: "", isActive: "Active", createdAt: "2024-01-01", updatedAt: "2024-01-10" },
    { id: 2, name: "Snacks", description: "Chips, nuts, and snacks", parentId: "", isActive: "Active", createdAt: "2024-02-01", updatedAt: "2024-02-05" },
    { id: 3, name: "Soft Drinks", description: "Sodas and colas", parentId: "1", isActive: "Inactive", createdAt: "2024-02-15", updatedAt: "2024-03-01" }
  ]);

  const handleBack = () => {
    navigate("/dashboard");
  };

  const handleRowClick = (category) => {
    setSelectedCategory(category);
    setIsEditMode(true);
    setNewCategory({
      name: category.name,
      description: category.description,
      parentId: category.parentId || "",
      isActive: category.isActive,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt
    });
    setIsModalOpen(true);
  };

  const handleOpenModal = () => {
    setIsEditMode(false);
    setSelectedCategory(null);
    setIsModalOpen(true);
  };

  const handleDelete = (e, category) => {
    e.stopPropagation();
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete category ${category.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        setCategories(prev => prev.filter(c => c.id !== category.id));
        Swal.fire({
          title: 'Deleted!',
          text: `Category ${category.name} has been deleted.`,
          icon: 'success',
          confirmButtonColor: '#10b981'
        });
      }
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setSelectedCategory(null);
    setNewCategory({
      name: "",
      description: "",
      parentId: "",
      isActive: "Active",
      createdAt: "",
      updatedAt: ""
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get main categories (categories without parent)
    const mainCategories = categories.filter(c => !c.parentId);

    // Validation: Cannot add sub category if no main categories exist
    if (!isEditMode && newCategory.parentId && mainCategories.length === 0) {
      Swal.fire({
        title: 'Error!',
        text: 'You must add a Main Category first before adding Sub Categories!',
        icon: 'error',
        confirmButtonColor: '#ef4444'
      });
      return;
    }

    // Validation: Check if parent ID exists when adding sub category
    if (newCategory.parentId) {
      const parentExists = categories.some(c => c.id.toString() === newCategory.parentId.toString());
      if (!parentExists) {
        Swal.fire({
          title: 'Error!',
          text: 'The specified Parent Category does not exist!',
          icon: 'error',
          confirmButtonColor: '#ef4444'
        });
        return;
      }
    }

    if (isEditMode) {
      setCategories(prev => prev.map(c => c.id === selectedCategory.id ? {
        ...c,
        name: newCategory.name,
        description: newCategory.description,
        parentId: newCategory.parentId,
        isActive: newCategory.isActive,
        createdAt: newCategory.createdAt,
        updatedAt: newCategory.updatedAt
      } : c));

      Swal.fire({
        title: 'Updated!',
        text: `Category ${newCategory.name} has been updated successfully.`,
        icon: 'success',
        confirmButtonColor: '#10b981'
      });
    } else {
      const newCategoryData = {
        id: categories.length > 0 ? Math.max(...categories.map(c => c.id)) + 1 : 1,
        name: newCategory.name,
        description: newCategory.description,
        parentId: newCategory.parentId,
        isActive: newCategory.isActive,
        createdAt: newCategory.createdAt,
        updatedAt: newCategory.updatedAt
      };
      setCategories(prev => [...prev, newCategoryData]);
      Swal.fire({
        title: 'Success!',
        text: `Category ${newCategory.name} has been added successfully.`,
        icon: 'success',
        confirmButtonColor: '#10b981'
      });
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
              <h1 className="page-title">Category Management</h1>
              <button className="add-user-button" onClick={handleOpenModal}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                </svg>
                Add New Category
              </button>
            </div>
          </div>

          <table className="users-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Parent ID</th>
                <th>Is Active</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id} onClick={() => handleRowClick(category)} className="clickable-row">
                  <td>{category.id}</td>
                  <td className="user-name">{category.name}</td>
                  <td className="user-email">{category.description}</td>
                  <td>{category.parentId || '-'}</td>
                  <td>
                    <span className={`status ${category.isActive === "Active" ? "active" : "inactive"}`}>
                      {category.isActive}
                    </span>
                  </td>
                  <td>{category.createdAt}</td>
                  <td>{category.updatedAt}</td>
                  <td className="actions">
                    <button 
                      onClick={(e) => handleDelete(e, category)}
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
                    <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  )}
                </svg>
                {isEditMode ? "Edit Category" : "Add New Category"}
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
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                    <span>Name</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={newCategory.name}
                    onChange={handleInputChange}
                    placeholder="Enter category name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM7 17h10v-2H7v2zm0-4h10v-2H7v2zm0-6v2h10V7H7z"/>
                    </svg>
                    <span>Description (Optional)</span>
                  </label>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    value={newCategory.description}
                    onChange={handleInputChange}
                    placeholder="Enter description (optional)"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="parentId">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>
                    </svg>
                    <span>Parent Category (Optional - For Sub Categories)</span>
                  </label>
                  <select
                    id="parentId"
                    name="parentId"
                    value={newCategory.parentId}
                    onChange={handleInputChange}
                  >
                    <option value="">None (This is a Main Category)</option>
                    {categories
                      .filter(c => !c.parentId && (!isEditMode || c.id !== selectedCategory?.id))
                      .map(c => (
                        <option key={c.id} value={c.id}>
                          {c.name} (ID: {c.id})
                        </option>
                      ))
                    }
                  </select>
                  {categories.filter(c => !c.parentId).length === 0 && !isEditMode && (
                    <small style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block' }}>
                      ⚠️ No Main Categories available. Add a Main Category first!
                    </small>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="isActive">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <span>Status</span>
                  </label>
                  <select
                    id="isActive"
                    name="isActive"
                    value={newCategory.isActive}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="createdAt">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                    </svg>
                    <span>Created At</span>
                  </label>
                  <input
                    type="date"
                    id="createdAt"
                    name="createdAt"
                    value={newCategory.createdAt}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="updatedAt">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                    </svg>
                    <span>Updated At</span>
                  </label>
                  <input
                    type="date"
                    id="updatedAt"
                    name="updatedAt"
                    value={newCategory.updatedAt}
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
                  {isEditMode ? "Update Category" : "Add Category"}
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

export default CategoriesTable;


