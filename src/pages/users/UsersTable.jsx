import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UsersTable.css";

function UsersTable() {
  const navigate = useNavigate();
  const [users] = useState([
    {
      id: 1,
      name: "أحمد محمد",
      email: "ahmed@example.com",
      role: "مدير المبيعات",
      status: "نشط",
      joinDate: "2024-01-15",
      phone: "01234567890"
    },
    {
      id: 2,
      name: "فاطمة علي",
      email: "fatima@example.com",
      role: "محاسبة",
      status: "نشط",
      joinDate: "2024-02-10",
      phone: "01234567891"
    },
    {
      id: 3,
      name: "محمد حسن",
      email: "mohamed@example.com",
      role: "مطور",
      status: "غير نشط",
      joinDate: "2024-01-20",
      phone: "01234567892"
    },
    {
      id: 4,
      name: "سارة أحمد",
      email: "sara@example.com",
      role: "مديرة التسويق",
      status: "نشط",
      joinDate: "2024-03-05",
      phone: "01234567893"
    },
    {
      id: 5,
      name: "خالد يوسف",
      email: "khaled@example.com",
      role: "مدير الموارد البشرية",
      status: "نشط",
      joinDate: "2024-02-28",
      phone: "01234567894"
    },
    {
      id: 6,
      name: "نور محمد",
      email: "nour@example.com",
      role: "مصممة جرافيك",
      status: "غير نشط",
      joinDate: "2024-01-10",
      phone: "01234567895"
    },
    {
      id: 7,
      name: "عمر حسام",
      email: "omar@example.com",
      role: "مطور واجهات",
      status: "نشط",
      joinDate: "2024-03-15",
      phone: "01234567896"
    },
    {
      id: 8,
      name: "ليلى عبدالله",
      email: "layla@example.com",
      role: "محللة بيانات",
      status: "نشط",
      joinDate: "2024-02-20",
      phone: "01234567897"
    }
  ]);

  const handleBack = () => {
    navigate("/dashboard");
  };

  const handleEdit = (userId) => {
    console.log("تعديل المستخدم:", userId);
  };

  const handleDelete = (userId) => {
    console.log("حذف المستخدم:", userId);
  };

  const handleView = (userId) => {
    console.log("عرض المستخدم:", userId);
  };

  return (
    <div className="users-table-container">
      {/* Header */}
      <header className="users-header">
        <div className="header-content">
          <button onClick={handleBack} className="back-button">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
            العودة للداشبورد
          </button>
          <h1 className="page-title">إدارة المستخدمين</h1>
          <button className="add-user-button">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
            إضافة مستخدم جديد
          </button>
        </div>
      </header>

      {/* Table Container */}
      <div className="table-container">
        <div className="table-wrapper">
          <table className="users-table">
            <thead>
              <tr>
                <th>الرقم</th>
                <th>الاسم</th>
                <th>البريد الإلكتروني</th>
                <th>الوظيفة</th>
                <th>رقم الهاتف</th>
                <th>تاريخ الانضمام</th>
                <th>الحالة</th>
                <th>العمليات</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td className="user-name">{user.name}</td>
                  <td className="user-email">{user.email}</td>
                  <td>{user.role}</td>
                  <td className="user-phone">{user.phone}</td>
                  <td>{user.joinDate}</td>
                  <td>
                    <span className={`status ${user.status === "نشط" ? "active" : "inactive"}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="actions">
               
                    <button 
                      onClick={() => handleEdit(user.id)}
                      className="action-btn edit"
                      title="تعديل"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                      </svg>
                    </button>
                    <button 
                      onClick={() => handleDelete(user.id)}
                      className="action-btn delete"
                      title="حذف"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <footer className="users-footer">
        <div className="footer-content">
          <p>إجمالي المستخدمين: {users.length}</p>
          <p>المستخدمون النشطون: {users.filter(user => user.status === "نشط").length}</p>
        </div>
      </footer>
    </div>
  );
}

export default UsersTable;
