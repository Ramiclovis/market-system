import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../dashboard/components/Navbar";
import { getCategoryList, getSupplierList } from "../../data/sharedData";
import "./purchase_order_details.css";

function PurchaseOrderDetails() {
  const navigate = useNavigate();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [discountPercent, setDiscountPercent] = useState(0);

  const handleBack = () => {
    navigate("/dashboard");
  };

  // Get categories from shared data
  const categoryList = getCategoryList();
  const categories = categoryList.map(cat => cat.name);

  // Get suppliers from shared data
  const supplierList = getSupplierList();
  const suppliers = supplierList.map(sup => sup.name);

  // Sample products data with prices
  const productsData = [
    { id: 1, name: "Al-Ameed Coffee", price: 150.00 },
    { id: 2, name: "Marlboro Turkish", price: 85.00 },
    { id: 3, name: "Kalleh Milk", price: 60.00 },
    { id: 4, name: "Aleppo Pistachio", price: 120.00 },
    { id: 5, name: "Cola Zero Medium", price: 45.00 },
    { id: 6, name: "Cola Large Size", price: 65.00 },
    { id: 7, name: "Dew Shosha", price: 55.00 },
    { id: 8, name: "Molokhia", price: 30.00 },
    { id: 9, name: "Lay's Chips Large", price: 80.00 },
    { id: 10, name: "exforw", price: 100.00 },
    { id: 11, name: "piax", price: 90.00 }
  ];

  const handleAddProduct = (product) => {
    const existingProduct = selectedProducts.find(p => p.id === product.id);
    
    if (existingProduct) {
      // If product exists, increase quantity
      setSelectedProducts(prev =>
        prev.map(p =>
          p.id === product.id
            ? { ...p, quantity: p.quantity + 1, total: (p.quantity + 1) * p.price }
            : p
        )
      );
    } else {
      // Add new product with quantity 1
      setSelectedProducts(prev => [
        ...prev,
        { ...product, quantity: 1, total: product.price, notes: "" }
      ]);
    }
  };

  const handleRemoveProduct = (productId) => {
    setSelectedProducts(prev => prev.filter(p => p.id !== productId));
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setSelectedProducts(prev =>
      prev.map(p =>
        p.id === productId
          ? { ...p, quantity: newQuantity, total: newQuantity * p.price }
          : p
      )
    );
  };

  const handleNotesChange = (productId, notes) => {
    setSelectedProducts(prev =>
      prev.map(p => (p.id === productId ? { ...p, notes } : p))
    );
  };

  // Calculate totals
  const total = selectedProducts.reduce((sum, p) => sum + p.total, 0);
  const discountAmount = (total * discountPercent) / 100;
  const totalAfterDiscount = total - discountAmount;
  const net = totalAfterDiscount;

  return (
    <div className="users-table-container">
      <Navbar />
      
      {/* Table Container */}
     
       
          <div className="main-layout">
            {/* Left: Product Table */}
            <div className="left-content">
              <div className="product-table-container">
                <table className="product-table">
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th>Notes</th>
                      <th>Action</th>  
                    </tr>
                  </thead>
                  <tbody>
                    {selectedProducts.map((product) => (
                      <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>${product.price.toFixed(2)}</td>
                        <td>
                          <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                            <button 
                              onClick={() => handleQuantityChange(product.id, product.quantity - 1)}
                              style={{ padding: '2px 8px', cursor: 'pointer' }}
                            >
                              -
                            </button>
                            <input
                              type="number"
                              value={product.quantity}
                              onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
                              style={{ width: '50px', textAlign: 'center' }}
                              min="1"
                            />
                            <button 
                              onClick={() => handleQuantityChange(product.id, product.quantity + 1)}
                              style={{ padding: '2px 8px', cursor: 'pointer' }}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td>${product.total.toFixed(2)}</td>
                        <td>
                          <input
                            type="text"
                            value={product.notes}
                            onChange={(e) => handleNotesChange(product.id, e.target.value)}
                            placeholder="Notes"
                            style={{ width: '100px' }}
                          />
                        </td>
                        <td>
                          <button 
                            onClick={() => handleRemoveProduct(product.id)}
                            style={{ 
                              padding: '5px 10px', 
                              background: '#ef4444', 
                              color: 'white', 
                              border: 'none', 
                              borderRadius: '5px', 
                              cursor: 'pointer' 
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Summary Section */}
              <div className="summary-section">
                <div className="summary-row">
                  <div className="summary-field">
                    <span className="summary-label">Total</span>
                    <span className="summary-value">${total.toFixed(2)}</span>
                  </div>
                  <div className="summary-field">
                    <span className="summary-label">Discount %</span>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3px' }}>
                      <input
                        type="number"
                        value={discountPercent}
                        onChange={(e) => setDiscountPercent(parseFloat(e.target.value) || 0)}
                        min="0"
                        max="100"
                        step="0.1"
                        style={{
                          background: 'rgba(255, 255, 255, 0.2)',
                          border: '1px solid rgba(255, 255, 255, 0.3)',
                          borderRadius: '4px',
                          color: 'white',
                          fontSize: '14px',
                          fontWeight: '700',
                          textAlign: 'center',
                          width: '60px',
                          padding: '4px',
                          outline: 'none'
                        }}
                      />
                      <span style={{fontSize: '16px', fontWeight: '700', color: 'white'}}>%</span>
                    </div>
                  </div>
                  <div className="summary-field">
                    <span className="summary-label">Discount Amount</span>
                    <span className="summary-value">${discountAmount.toFixed(2)}</span>
                  </div>
                  <div className="summary-field">
                    <span className="summary-label">Total After Discount</span>
                    <span className="summary-value">${totalAfterDiscount.toFixed(2)}</span>
                  </div>
                </div>
                <div className="summary-row-bottom">
                  <div className="summary-field">
                    <span className="summary-label">Net</span>
                    <span className="summary-value">${net.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Center: Categories and Products */}
            <div className="center-content">
              {/* Categories Grid */}
              <div className="categories-section">
                <div className="categories-grid">
                  {categories.map((category, index) => (
                    <button key={index} className="category-btn">
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Products Grid */}
              <div className="products-section">
                <div className="products-grid">
                  {productsData.map((product) => (
                    <button 
                      key={product.id} 
                      className="product-btn"
                      onClick={() => handleAddProduct(product)}
                    >
                      {product.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Input Fields and Action Buttons */}
            <div className="right-panel">
              {/* Input Fields */}
              <div className="input-fields">
                <div className="input-group small-field">
                  <label>Invoice Number</label>
                  <input type="text" />
                </div>
                <div className="input-group small-field">
                  <label>Barcode</label>
                  <input type="text" />
                </div>
                <div className="input-group small-field">
                  <label>Notes</label>
                  <input type="text" />
                </div>
                <div className="input-group small-field">
                  <label>Invoice Date & Time</label>
                  <input type="text" />
                </div>
                <div className="input-group">
                  <label>Supplier Name</label>
                  <select>
                    <option value="">Select Supplier</option>
                    {suppliers.map((supplier, index) => (
                      <option key={index} value={supplier}>
                        {supplier}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="action-buttons">
                <button className="action-btn save-btn">
                  <span className="btn-icon">✓</span>
                  Save
                </button>
                <button className="action-btn print-btn">
                  <span className="btn-icon">🖨️</span>
                  Print Invoice
                </button>
                <button className="action-btn post-btn">
                  <span className="btn-icon">📤</span>
                  Post Invoice
                </button>
                <button className="action-btn delete-btn">
                  <span className="btn-icon">🗑️</span>
                  Delete Invoice
                </button>
                <button className="action-btn back-btn" onClick={handleBack}>
                  <span className="btn-icon">🔍</span>
                  Back
                </button>
              </div>
            </div>
          </div>
    </div>
  );
}

export default PurchaseOrderDetails;
