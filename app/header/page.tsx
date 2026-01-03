"use client";

import { useState } from "react"; // อย่าลืม import
import "./page.css";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false); // เพิ่ม state สำหรับ hamburger

  return (
    <nav >
      <div className="main-header">
        <div className="desktop-menu-group">
          <a href=' / '>HOME</a>
          <a href='./pages'>PAGES</a>
        </div>

        <div>
          <a href=" / ">
            <img src="/images/pkslogo.png" className="pkslogo" />
          </a>
        </div>

        <div className="desktop-menu-group">
          <a>GALLERY</a>
          <a>NEWS</a>
        </div>

        <button className="hamburger-btn" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>
      </div>

      <div className={`mobile-menu-dropdown  ${isOpen ? "open" : ""}`}>
        <ul style={{ marginLeft: "50px" }}>
          <li>
            <a href=" / " style={{ color: "orange" }}>
              HOME
            </a>
          </li>
          <li>
            <a href='./pages'>PAGES</a>
          </li>
          <li>
            <a>GALLERY</a>
          </li>
          <li>
            <a>NEWS</a>
          </li>
        </ul>
      </div>
      <div className=" logo-contact ">
        <a href="https://www.instagram.com/phetkasembrewing/" target="_blank">
          <img
            src="/images/iglogo.png"
            style={{ width: "25px", marginTop: "2px" }}
          />
        </a>
        <a href="https://www.facebook.com/phetkasembrewing " target="_blank" >
          <img src="/images/fblogo.png" style={{ width: "12px" }} />
        </a>
      </div>
    </nav>
  );
}
