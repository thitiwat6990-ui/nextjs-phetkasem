"use client";

import { useState } from "react";
import "./page.css";
import { FaLine, FaFacebook, FaInstagram, FaMapMarkerAlt} from "react-icons/fa";


export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky-nav">
      
      <div className="main-header">
        {/* --- ส่วน Desktop (คงเดิม) --- */}
        <div className="desktop-menu-group">
          <a href=' / '>HOME</a>
          <a href='./products'>PRODUCT</a>
        </div>

        <div>
          <a href=" / ">
            <img src="/images/pkslogo.png" className="pkslogo" alt="Logo" />
          </a>
        </div>

        <div className="desktop-menu-group">
          <a href='./gallery'>GALLERY</a>
          <a href='./news'>NEWS</a>
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
            <a href='./products'>PRODUCT</a>
          </li>
          <li>
            <a href='./gallery'>GALLERY</a>
          </li>
          <li>
            <a href='./news'>NEWS</a>
          </li>
        </ul>
      </div>

      {/* --- ส่วน Logo Contact (คงเดิม) --- */}
      <div className="logo-contact">
        <a href="https://www.instagram.com/phetkasembrewing/" target="_blank">
          <FaInstagram className='svg2'></FaInstagram>
        </a>
        <a href="https://www.facebook.com/phetkasembrewing " target="_blank">
        <FaFacebook className='svg2'></FaFacebook>
        </a>
        
      </div>
    </nav>
  );
}