// Shared data across all tables
// This file exports data that is used in multiple components

// Initial companies data
export const initialCompanies = [
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
];

// Initial brands data
export const initialBrands = [
  {
    id: 1,
    brand_name: "Premium Brand",
    company_id: 1,
    description: "High quality products",
    is_active: "Active",
    created_at: "2024-01-15",
    updated_at: "2024-02-20"
  },
  {
    id: 2,
    brand_name: "Elite Series",
    company_id: 2,
    description: "Premium product line",
    is_active: "Active",
    created_at: "2024-02-01",
    updated_at: "2024-03-15"
  },
  {
    id: 3,
    brand_name: "Classic Collection",
    company_id: 1,
    description: "Traditional quality products",
    is_active: "Inactive",
    created_at: "2024-01-20",
    updated_at: "2024-02-10"
  },
  {
    id: 4,
    brand_name: "Tech Pro",
    company_id: 4,
    description: "Advanced technology products",
    is_active: "Active",
    created_at: "2024-03-01",
    updated_at: "2024-03-25"
  },
  {
    id: 5,
    brand_name: "Modern Line",
    company_id: 5,
    description: "Contemporary design products",
    is_active: "Active",
    created_at: "2024-02-15",
    updated_at: "2024-03-10"
  }
];

// Get simple company list for dropdowns (id and name only)
export const getCompanyList = () => {
  return initialCompanies
    .filter(company => company.status === "Active")
    .map(company => ({
      id: company.id,
      name: company.name
    }));
};

// Get company name by ID
export const getCompanyNameById = (companyId, companies = initialCompanies) => {
  const company = companies.find(c => c.id === companyId);
  return company ? company.name : "Unknown";
};

// Get simple brand list for dropdowns (id and name only)
export const getBrandList = () => {
  return initialBrands
    .filter(brand => brand.is_active === "Active")
    .map(brand => ({
      id: brand.id,
      name: brand.brand_name
    }));
};

// Get brand name by ID
export const getBrandNameById = (brandId, brands = initialBrands) => {
  const brand = brands.find(b => b.id === brandId);
  return brand ? brand.brand_name : "Unknown";
};

// Initial suppliers data
export const initialSuppliers = [
  {
    id: 1,
    supplier_name: "Global Supplies Co.",
    supplier_phone: "01000000001",
    supplier_email: "contact@globalsupplies.com",
    supplier_address: "Cairo, Egypt",
    supplier_type: "Distributor",
    pricing_method: "Discount Tier",
    payment_method: "Credit",
    products_type: "Food & Beverages",
    supplier_notes: "Preferred for beverages.",
    company_id: 1,
    is_active: "Active",
    created_at: "2024-01-05",
    updated_at: "2024-01-20"
  },
  {
    id: 2,
    supplier_name: "Tech Parts LLC",
    supplier_phone: "01000000002",
    supplier_email: "sales@techparts.com",
    supplier_address: "Dubai, UAE",
    supplier_type: "Manufacturer",
    pricing_method: "Fixed",
    payment_method: "Cash",
    products_type: "Electronics",
    supplier_notes: "Lead time 2 weeks.",
    company_id: 2,
    is_active: "Inactive",
    created_at: "2024-02-10",
    updated_at: "2024-03-01"
  }
];

// Get simple supplier list for dropdowns (id and name only)
export const getSupplierList = () => {
  return initialSuppliers
    .filter(supplier => supplier.is_active === "Active")
    .map(supplier => ({
      id: supplier.id,
      name: supplier.supplier_name
    }));
};

// Get supplier name by ID
export const getSupplierNameById = (supplierId, suppliers = initialSuppliers) => {
  const supplier = suppliers.find(s => s.id === supplierId);
  return supplier ? supplier.supplier_name : "Unknown";
};

// Initial categories data (must match CategoriesTable.jsx)
export const initialCategories = [
  { id: 1, name: "Beverages", description: "Drinks and beverages", parentId: "", isActive: "Active", createdAt: "2024-01-01", updatedAt: "2024-01-10" },
  { id: 2, name: "Snacks", description: "Chips, nuts, and snacks", parentId: "", isActive: "Active", createdAt: "2024-02-01", updatedAt: "2024-02-05" },
  { id: 3, name: "Soft Drinks", description: "Sodas and colas", parentId: "1", isActive: "Inactive", createdAt: "2024-02-15", updatedAt: "2024-03-01" }
];

// Get simple category list for dropdowns (only active main categories)
export const getCategoryList = () => {
  return initialCategories
    .filter(category => category.isActive === "Active" && !category.parentId)
    .map(category => ({
      id: category.id,
      name: category.name
    }));
};

// Get category name by ID
export const getCategoryNameById = (categoryId, categories = initialCategories) => {
  const category = categories.find(c => c.id === categoryId);
  return category ? category.name : "Unknown";
};

// Initial products data
export const initialProducts = [
  {
    id: 1,
    product_name: "Laptop Computer",
    category_id: 1,
    supplier_id: 1,
    brand_id: 4,
    unit_id: 1,
    barcode: "1234567890123",
    purchase_price: 800.00,
    selling_price: 1200.00,
    status: "Active",
    created_at: "2024-01-15",
    updated_at: "2024-02-20"
  },
  {
    id: 2,
    product_name: "Office Desk",
    category_id: 2,
    supplier_id: 3,
    brand_id: 5,
    unit_id: 1,
    barcode: "1234567890124",
    purchase_price: 150.00,
    selling_price: 250.00,
    status: "Active",
    created_at: "2024-02-01",
    updated_at: "2024-03-15"
  }
];




