"use client";

import { useState } from "react";
import "./page.css";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky-nav">
      <div className="main-header">
        {/* --- ส่วน Desktop (คงเดิม) --- */}
        <div className="desktop-menu-group">
          <a href=' / '>HOME</a>
          <a href='./pages'>PRODUCT</a>
        </div>

        <div>
          <a href=" / ">
            <img src="/images/pkslogo.png" className="pkslogo" alt="Logo" />
          </a>
        </div>

        <div className="desktop-menu-group">
          <a href='./gallery'>GALLERY</a>
          <a>NEWS</a>
        </div>

        {/* ปุ่ม Hamburger (เพิ่ม class ให้ icon หมุนได้ถ้าต้องการ) */}
        <button 
          className={`hamburger-btn ${isOpen ? "active" : ""}`} 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✕" : "☰"} 
        </button>
      </div>

      {/* --- ส่วน Mobile Dropdown (ปรับปรุงใหม่) --- */}
      <div className={`mobile-menu-dropdown ${isOpen ? "open" : ""}`}>
        <ul className="mobile-menu-list">
          <li>
            <a href=" / " className="active-link">HOME</a>
          </li>
          <li>
            <a href='./pages'>PRODUCT</a>
          </li>
          <li>
            <a href='./galley'>GALLERY</a>
          </li>
          <li>
            <a href='#'>NEWS</a>
          </li>
        </ul>
      </div>

      {/* --- ส่วน Logo Contact (คงเดิม) --- */}
      <div className="logo-contact">
        <a href="https://www.instagram.com/phetkasembrewing/" target="_blank">
          <img
            src="/images/iglogo.png"
            style={{ width: "25px", marginTop: "2px" }}
            alt="Instagram"
          />
        </a>
        <a href="https://www.facebook.com/phetkasembrewing " target="_blank">
          <img src="/images/fblogo.png" style={{ width: "12px" }} alt="Facebook" />
        </a>
      </div>
    </nav>
  );
}