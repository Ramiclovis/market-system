import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import Navbar from "../dashboard/components/Navbar";
import Footer from "../dashboard/components/Footer";
import { 
  getBrandList, 
  getBrandNameById, 
  getSupplierList, 
  getSupplierNameById,
  initialProducts 
} from "../../data/sharedData";
import "./ProductsTable.css";

function ProductsTable() {
  // ============================================
  // HOOKS
  // ============================================
  const navigate = useNavigate();

  // ============================================
  // STATE MANAGEMENT
  // ============================================
  const [products, setProducts] = useState(initialProducts);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    product_name: "",
    category_id: "",
    supplier_id: "",
    brand_id: "",
    unit_id: "",
    barcode: "",
    purchase_price: "",
    selling_price: "",
    status: "Active",
    created_at: "",
    updated_at: ""
  });

  // ============================================
  // STATIC DATA
  // ============================================
  const categories = [
    { id: 1, name: "Electronics" },
    { id: 2, name: "Furniture" },
    { id: 3, name: "Clothing" },
    { id: 4, name: "Food & Beverage" },
    { id: 5, name: "Office Supplies" }
  ];

  const units = [
    { id: 1, name: "Piece" },
    { id: 2, name: "Kilogram" },
    { id: 3, name: "Liter" },
    { id: 4, name: "Box" },
    { id: 5, name: "Meter" }
  ];

  const suppliers = getSupplierList();
  const brands = getBrandList();

  // ============================================
  // HELPER FUNCTIONS
  // ============================================
  const getCategoryName = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : "Unknown";
  };

  const getSupplierName = (supplierId) => {
    return getSupplierNameById(supplierId);
  };

  const getBrandName = (brandId) => {
    return getBrandNameById(brandId);
  };

  const getUnitName = (unitId) => {
    const unit = units.find(u => u.id === unitId);
    return unit ? unit.name : "Unknown";
  };

  const resetProductForm = () => {
    setNewProduct({
      product_name: "",
      category_id: "",
      supplier_id: "",
      brand_id: "",
      unit_id: "",
      barcode: "",
      purchase_price: "",
      selling_price: "",
      status: "Active",
      created_at: "",
      updated_at: ""
    });
  };

  // ============================================
  // VALIDATION FUNCTIONS
  // ============================================
  const validateRequiredFields = () => {
    if (!newProduct.category_id || !newProduct.supplier_id || !newProduct.brand_id || !newProduct.unit_id) {
      Swal.fire({
        title: 'Error!',
        text: 'Please fill in all required fields!',
        icon: 'error',
        confirmButtonColor: '#ef4444'
      });
      return false;
    }
    return true;
  };

  const validatePrices = () => {
    const purchasePrice = parseFloat(newProduct.purchase_price);
    const sellingPrice = parseFloat(newProduct.selling_price);

    if (purchasePrice < 0 || sellingPrice < 0) {
      Swal.fire({
        title: 'Error!',
        text: 'Prices cannot be negative!',
        icon: 'error',
        confirmButtonColor: '#ef4444'
      });
      return false;
    }
    return true;
  };

  const validateDates = () => {
    if (new Date(newProduct.updated_at) < new Date(newProduct.created_at)) {
      Swal.fire({
        title: 'Error!',
        text: 'Updated date cannot be earlier than created date!',
        icon: 'error',
        confirmButtonColor: '#ef4444'
      });
      return false;
    }
    return true;
  };

  const checkPriceWarning = (callback) => {
    const purchasePrice = parseFloat(newProduct.purchase_price);
    const sellingPrice = parseFloat(newProduct.selling_price);

    if (sellingPrice < purchasePrice) {
      Swal.fire({
        title: 'Warning!',
        text: 'Selling price is lower than purchase price. Continue?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#f59e0b',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Yes, continue!',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          callback();
        }
      });
      return false;
    }
    return true;
  };

  // ============================================
  // NAVIGATION HANDLERS
  // ============================================
  const handleBack = () => {
    navigate("/dashboard");
  };

  // ============================================
  // MODAL HANDLERS
  // ============================================
  const handleOpenModal = () => {
    setIsEditMode(false);
    setSelectedProduct(null);
    resetProductForm();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setSelectedProduct(null);
    resetProductForm();
  };

  const handleRowClick = (product) => {
    setSelectedProduct(product);
    setIsEditMode(true);
    setNewProduct({
      product_name: product.product_name,
      category_id: product.category_id,
      supplier_id: product.supplier_id,
      brand_id: product.brand_id,
      unit_id: product.unit_id,
      barcode: product.barcode,
      purchase_price: product.purchase_price,
      selling_price: product.selling_price,
      status: product.status,
      created_at: product.created_at,
      updated_at: product.updated_at
    });
    setIsModalOpen(true);
  };

  // ============================================
  // FORM HANDLERS
  // ============================================
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    if (!validateRequiredFields()) return;
    if (!validatePrices()) return;
    if (!validateDates()) return;

    // Check price warning and save
    if (checkPriceWarning(saveProduct)) {
      saveProduct();
    }
  };

  // ============================================
  // CRUD OPERATIONS
  // ============================================
  const saveProduct = () => {
    if (isEditMode) {
      updateProduct();
    } else {
      addProduct();
    }
    handleCloseModal();
  };

  const addProduct = () => {
    const newProductData = {
      id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
      product_name: newProduct.product_name,
      category_id: parseInt(newProduct.category_id),
      supplier_id: parseInt(newProduct.supplier_id),
      brand_id: parseInt(newProduct.brand_id),
      unit_id: parseInt(newProduct.unit_id),
      barcode: newProduct.barcode,
      purchase_price: parseFloat(newProduct.purchase_price),
      selling_price: parseFloat(newProduct.selling_price),
      status: newProduct.status,
      created_at: newProduct.created_at,
      updated_at: newProduct.updated_at
    };

    setProducts(prevProducts => [...prevProducts, newProductData]);

    Swal.fire({
      title: 'Success!',
      text: `Product ${newProduct.product_name} has been added successfully.`,
      icon: 'success',
      confirmButtonColor: '#10b981'
    });
  };

  const updateProduct = () => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === selectedProduct.id
          ? {
              ...product,
              product_name: newProduct.product_name,
              category_id: parseInt(newProduct.category_id),
              supplier_id: parseInt(newProduct.supplier_id),
              brand_id: parseInt(newProduct.brand_id),
              unit_id: parseInt(newProduct.unit_id),
              barcode: newProduct.barcode,
              purchase_price: parseFloat(newProduct.purchase_price),
              selling_price: parseFloat(newProduct.selling_price),
              status: newProduct.status,
              created_at: newProduct.created_at,
              updated_at: newProduct.updated_at
            }
          : product
      )
    );

    Swal.fire({
      title: 'Updated!',
      text: `Product ${newProduct.product_name} has been updated successfully.`,
      icon: 'success',
      confirmButtonColor: '#10b981'
    });
  };

  const handleDelete = (e, product) => {
    e.stopPropagation();

    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete product ${product.product_name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        setProducts(prevProducts => prevProducts.filter(p => p.id !== product.id));

        Swal.fire({
          title: 'Deleted!',
          text: `Product ${product.product_name} has been deleted.`,
          icon: 'success',
          confirmButtonColor: '#10b981'
        });
      }
    });
  };

  // ============================================
  // RENDER
  // ============================================
  return (
    <div className="products-table-container">
      <Navbar />

      {/* Table Container */}
      <div className="table-container">
        <div className="table-wrapper">
          {/* Header */}
          <div className="products-header">
            <div className="header-content">
              <button onClick={handleBack} className="back-button">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                </svg>
                Back to Dashboard
              </button>
              <button className="add-product-button" onClick={handleOpenModal}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                </svg>
                Add New Product
              </button>
            </div>
          </div>

          {/* Products Table */}
          <table className="products-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Supplier</th>
                <th>Brand</th>
                <th>Unit</th>
                <th>Barcode</th>
                <th>Purchase</th>
                <th>Selling</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr 
                  key={product.id} 
                  onClick={() => handleRowClick(product)} 
                  className="clickable-row"
                >
                  <td>{product.id}</td>
                  <td className="product-name">{product.product_name}</td>
                  <td className="category-name">{getCategoryName(product.category_id)}</td>
                  <td className="supplier-name">{getSupplierName(product.supplier_id)}</td>
                  <td className="brand-name">{getBrandName(product.brand_id)}</td>
                  <td className="unit-name">{getUnitName(product.unit_id)}</td>
                  <td className="barcode">{product.barcode}</td>
                  <td className="price">${parseFloat(product.purchase_price)}</td>
                  <td className="price">${parseFloat(product.selling_price)}</td>
                  <td>
                    <span className={`status ${product.status === "Active" ? "active" : "inactive"}`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="actions">
                    <button
                      onClick={(e) => handleDelete(e, product)}
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

      {/* Add/Edit Product Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="modal-header">
              <h2 className="modal-title">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  {isEditMode ? (
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                  ) : (
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                  )}
                </svg>
                {isEditMode ? "Edit Product" : "Add New Product"}
              </h2>
              <button className="modal-close-btn" onClick={handleCloseModal}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="products-form-grid">
                {/* Product Name */}
                <div className="form-group">
                  <label htmlFor="product_name">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"/>
                    </svg>
                    <span>Product Name</span>
                  </label>
                  <input
                    type="text"
                    id="product_name"
                    name="product_name"
                    value={newProduct.product_name}
                    onChange={handleInputChange}
                    placeholder="Enter product name"
                    required
                  />
                </div>

                {/* Category */}
                <div className="form-group">
                  <label htmlFor="category_id">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3 5h18v2H3V5zm0 6h18v2H3v-2zm0 6h18v2H3v-2z"/>
                    </svg>
                    <span>Category</span>
                  </label>
                  <select
                    id="category_id"
                    name="category_id"
                    value={newProduct.category_id}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Supplier */}
                <div className="form-group">
                  <label htmlFor="supplier_id">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                    </svg>
                    <span>Supplier</span>
                  </label>
                  <select
                    id="supplier_id"
                    name="supplier_id"
                    value={newProduct.supplier_id}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a supplier</option>
                    {suppliers.map(supplier => (
                      <option key={supplier.id} value={supplier.id}>
                        {supplier.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Brand */}
                <div className="form-group">
                  <label htmlFor="brand_id">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l-5.5 9h11L12 2zm0 3.84L13.93 9h-3.87L12 5.84zM17.5 13c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5zm0 7c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zM3 21.5h8v-8H3v8zm2-6h4v4H5v-4z"/>
                    </svg>
                    <span>Brand</span>
                  </label>
                  <select
                    id="brand_id"
                    name="brand_id"
                    value={newProduct.brand_id}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a brand</option>
                    {brands.map(brand => (
                      <option key={brand.id} value={brand.id}>
                        {brand.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Unit */}
                <div className="form-group">
                  <label htmlFor="unit_id">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H3V8h2v4h2V8h2v4h2V8h2v4h2V8h2v4h2V8h2v8z"/>
                    </svg>
                    <span>Unit</span>
                  </label>
                  <select
                    id="unit_id"
                    name="unit_id"
                    value={newProduct.unit_id}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a unit</option>
                    {units.map(unit => (
                      <option key={unit.id} value={unit.id}>
                        {unit.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Barcode */}
                <div className="form-group">
                  <label htmlFor="barcode">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M2 6h2v12H2zm3 0h1v12H5zm2 0h3v12H7zm4 0h1v12h-1zm2 0h3v12h-3zm4 0h1v12h-1zm3 0h2v12h-2z"/>
                    </svg>
                    <span>Barcode</span>
                  </label>
                  <input
                    type="text"
                    id="barcode"
                    name="barcode"
                    value={newProduct.barcode}
                    onChange={handleInputChange}
                    placeholder="Enter barcode"
                    required
                  />
                </div>

                {/* Purchase Price */}
                <div className="form-group">
                  <label htmlFor="purchase_price">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z"/>
                    </svg>
                    <span>Purchase Price</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    id="purchase_price"
                    name="purchase_price"
                    value={newProduct.purchase_price}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    required
                  />
                </div>

                {/* Selling Price */}
                <div className="form-group">
                  <label htmlFor="selling_price">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z"/>
                    </svg>
                    <span>Selling Price</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    id="selling_price"
                    name="selling_price"
                    value={newProduct.selling_price}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    required
                  />
                </div>

                {/* Profit (Only in Edit Mode) */}
                {isEditMode && (
                  <div className="form-group">
                    <label htmlFor="profit">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
                      </svg>
                      <span>Profit</span>
                    </label>
                    <input
                      type="text"
                      id="profit"
                      name="profit"
                      value={
                        newProduct.purchase_price && newProduct.selling_price
                          ? `$${(parseFloat(newProduct.selling_price) - parseFloat(newProduct.purchase_price)).toFixed(2)}`
                          : '$0.00'
                      }
                      readOnly
                      style={{ backgroundColor: '#f3f4f6', cursor: 'not-allowed' }}
                    />
                  </div>
                )}

                {/* Status */}
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
                    value={newProduct.status}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                {/* Created At */}
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
                    value={newProduct.created_at}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Updated At */}
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
                    value={newProduct.updated_at}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Modal Actions */}
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
                  {isEditMode ? "Update Product" : "Add Product"}
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

export default ProductsTable;
