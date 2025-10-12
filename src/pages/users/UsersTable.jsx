import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../dashboard/components/Navbar";
import Footer from "../dashboard/components/Footer";
import Swal from 'sweetalert2';
import "./UsersTable.css";

function UsersTable() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "",
    phone: "",
    joinDate: "",
    status: "Active",
    password: "",
    confirmPassword: ""
  });
  
  const [users] = useState([
    {
      id: 1,
      name: "Ahmed Mohamed",
      email: "ahmed@example.com",
      role: "Sales Manager",
      status: "Active",
      joinDate: "2024-01-15",
      phone: "01234567890"
    },
    {
      id: 2,
      name: "Fatima Ali",
      email: "fatima@example.com",
      role: "Accountant",
      status: "Active",
      joinDate: "2024-02-10",
      phone: "01234567891"
    },
    {
      id: 3,
      name: "Mohamed Hassan",
      email: "mohamed@example.com",
      role: "Developer",
      status: "Inactive",
      joinDate: "2024-01-20",
      phone: "01234567892"
    },
    {
      id: 4,
      name: "Sara Ahmed",
      email: "sara@example.com",
      role: "Marketing Manager",
      status: "Active",
      joinDate: "2024-03-05",
      phone: "01234567893"
    },
    {
      id: 5,
      name: "Omar Ibrahim",
      email: "omar@example.com",
      role: "HR Manager",
      status: "Active",
      joinDate: "2024-03-15",
      phone: "01234567894"
    },
    {
      id: 6,
      name: "Nora Ali",
      email: "nora@example.com",
      role: "Administrator",
      status: "Active",
      joinDate: "2024-02-28",
      phone: "01234567895"
    },
    {
      id: 7,
      name: "Khaled Hassan",
      email: "khaled@example.com",
      role: "Developer",
      status: "Active",
      joinDate: "2024-03-20",
      phone: "01234567896"
    },
    {
      id: 8,
      name: "Layla Mohamed",
      email: "layla@example.com",
      role: "Sales Manager",
      status: "Inactive",
      joinDate: "2024-01-10",
      phone: "01234567897"
    },
    {
      id: 9,
      name: "Youssef Ahmed",
      email: "youssef@example.com",
      role: "Accountant",
      status: "Active",
      joinDate: "2024-03-25",
      phone: "01234567898"
    }
  ]);

  const handleBack = () => {
    navigate("/dashboard");
  };

  const handleRowClick = (user) => {
    setSelectedUser(user);
    setIsEditMode(true);
    setNewUser({
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      joinDate: user.joinDate,
      status: user.status,
      password: "",
      confirmPassword: ""
    });
    setIsModalOpen(true);
  };

  const handleOpenModal = () => {
    setIsEditMode(false);
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleDelete = (e, user) => {
    e.stopPropagation(); // Prevent opening edit modal
    
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete user ${user.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Delete user:", user);
        // Add delete logic here
        
        Swal.fire({
          title: 'Deleted!',
          text: `User ${user.name} has been deleted.`,
          icon: 'success',
          confirmButtonColor: '#10b981'
        });
      }
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setSelectedUser(null);
    setNewUser({
      name: "",
      email: "",
      role: "",
      phone: "",
      joinDate: "",
      status: "Active",
      password: "",
      confirmPassword: ""
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate password for new users or if password is being changed
    if (!isEditMode || newUser.password) {
      // Validate password match
      if (newUser.password !== newUser.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      
      // Validate password length
      if (newUser.password.length < 6) {
        alert("Password must be at least 6 characters long!");
        return;
      }
    }
    
    if (isEditMode) {
      console.log("Edit user:", selectedUser.id, newUser);
      // Add edit logic here
    } else {
      console.log("Add new user:", newUser);
      // Add user logic here
    }
    
    handleCloseModal();
  };

  return (
    <div className="users-table-container">
      <Navbar />
      
      {/* Table Container */}
      <div className="table-container">
        <div className="table-wrapper">
          {/* Header */}
          <div className="users-header">
            <div className="header-content">
              <button onClick={handleBack} className="back-button">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                </svg>
                Back to Dashboard
              </button>
              <h1 className="page-title">User Management</h1>
              <button className="add-user-button" onClick={handleOpenModal}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                </svg>
                Add New User
              </button>
            </div>
          </div>

          <table className="users-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Phone</th>
                <th>Join Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} onClick={() => handleRowClick(user)} className="clickable-row">
                  <td>{user.id}</td>
                  <td className="user-name">{user.name}</td>
                  <td className="user-email">{user.email}</td>
                  <td>{user.role}</td>
                  <td className="user-phone">{user.phone}</td>
                  <td>{user.joinDate}</td>
                  <td>
                    <span className={`status ${user.status === "Active" ? "active" : "inactive"}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="actions">
                    <button 
                      onClick={(e) => handleDelete(e, user)}
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

      {/* Add User Modal */}
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
                {isEditMode ? "Edit User" : "Add New User"}
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
                    <span>Full Name</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={newUser.name}
                    onChange={handleInputChange}
                    placeholder="Enter full name"
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
                    value={newUser.email}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                    </svg>
                    <span>Password {isEditMode && "(Leave blank if you don't want to change)"}</span>
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={newUser.password}
                    onChange={handleInputChange}
                    placeholder={isEditMode ? "Enter new password (optional)" : "Enter password"}
                    required={!isEditMode}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                    </svg>
                    <span>Confirm Password</span>
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={newUser.confirmPassword}
                    onChange={handleInputChange}
                    placeholder={isEditMode ? "Confirm new password (optional)" : "Confirm password"}
                    required={!isEditMode}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="role">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>
                    </svg>
                    <span>Role</span>
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={newUser.role}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a role</option>
                    <option value="Sales Manager">Sales Manager</option>
                    <option value="Accountant">Accountant</option>
                    <option value="Developer">Developer</option>
                    <option value="Marketing Manager">Marketing Manager</option>
                    <option value="HR Manager">HR Manager</option>
                    <option value="Administrator">Administrator</option>
                  </select>
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
                    value={newUser.phone}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="joinDate">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                    </svg>
                    <span>Join Date</span>
                  </label>
                  <input
                    type="date"
                    id="joinDate"
                    name="joinDate"
                    value={newUser.joinDate}
                    onChange={handleInputChange}
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
                    value={newUser.status}
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
                  {isEditMode ? "Update User" : "Add User"}
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

export default UsersTable;
