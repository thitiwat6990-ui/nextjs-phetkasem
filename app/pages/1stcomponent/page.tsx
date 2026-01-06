"use client";
import { useState } from "react";
import Image from "next/image";
import "./page.css";

// --- 1. ย้าย Interface และ Component มาไว้ข้างนอก ---
interface ScaleBarProps {
  value: number;
}

const ScaleBar = ({ value }: ScaleBarProps) => {
  return (
    <div className="barContainer">
      <div className="indicator" style={{ left: `${value}%` }} />
    </div>
  );
};
// ----------------------------------------------------

export default function ProductReveal() {
  const [isActive, setIsActive] = useState(false);
  const [isActive2, setIsActive2] = useState(false);

  return (
    <div className="showcase-container">
      <div className="name-product">
        <h1>maew salid</h1>
      </div>
      <div className="style">
        <h2>rice pilsner</h2>
      </div>

      {/* Panel 1 */}
      <div className={`info-panel ${isActive ? "show" : ""}`}>
        <h3 className="info-title">Flavor hops</h3>
        <ul className="info-list">
          <li>saaz</li>
          <li>traddition</li>
        </ul>
      </div>

      <div className="product-wrapper">
        <div className="can-image-placeholder"></div>
        {/* ปุ่ม 1 */}
        <button
          className={`toggle-btn ${isActive ? "active" : ""}`}
          onClick={() => setIsActive(!isActive)}
        >
          <span className="icon">+</span>
        </button>
      </div>

      {/* Panel 2 (ใส่ ScaleBar) */}
      <div
        className={`info-panel2 ${isActive2 ? "show" : ""}`}
        style={{ marginTop: "0px" }}
      >
        <span className="flavor-label first">KHAO KHUA THAI</span>
        <div style={{ width: "100px", display: "flex", height: "50px" }}>
          {" "}
          {/* กำหนดความกว้างตรงนี้ */}
          <ScaleBar value={60} />
        </div>
        <span className="flavor-label second">japanese rice</span>
        <div
          style={{
            width: "100px",
            display: "flex",
            height: "50px",
            marginTop: "32px",
          }}
        >
          {" "}
          {/* กำหนดความกว้างตรงนี้ */}
          <ScaleBar value={40} />
        </div>
        <span className="flavor-label thrid">sweet</span>
        <div style={{ width: "100px", display:'flex', height:'50px', marginTop:'62px' }}> {/* กำหนดความกว้างตรงนี้ */}
            <ScaleBar value={40}/>
        </div>
        <span className="flavor-label fourth">butter</span>
        <div style={{ width: "100px", display:'flex', height:'50px', marginTop:'92px' }}> {/* กำหนดความกว้างตรงนี้ */}
            <ScaleBar value={20}/>
        </div>

      </div>

      {/* ปุ่ม 2 */}
      <div>
        <button
          className={`toggle-btn2 ${isActive2 ? "active" : ""}`}
          onClick={() => setIsActive2(!isActive2)}
        >
          <span className="icon">+</span>
        </button>
      </div>
    </div>
  );
}
