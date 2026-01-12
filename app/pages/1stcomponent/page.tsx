"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import "./page.css"; 

// --- Configuration ---
const SCROLL_STEP_PX = 800; 

// --- Interfaces ---
interface Stat {
  label: string;
  value: number;
}

interface Product {
  id: string | number;
  title: string;
  flavors: string[];
  stats: Stat[];
  imageClass: string; 
}

// --- Data ---
const PRODUCT_DATA: Product[] = [
  {
    id: 0,
    title: "MAEW SALID",
    flavors: ["saaz"], 
    imageClass: "", 
    stats: [
      { label: "KHAO KHUA THAI", value: 60 },
      { label: "japanese rice", value: 40 },
      { label: "sweet", value: 40 },
      { label: "bitter", value: 20 },
    ]
    
  },
  {
    id: 1,
    title: "SINGHSAPE",
    flavors: ["rich cocoa", "roasted malt"], 
    imageClass: "label-2",
    stats: [
      { label: "COCOA", value: 80 },
      { label: "MALT", value: 70 },
      { label: "SWEET", value: 50 },
      { label: "BITTER", value: 30 },
    ]
  },
  {
    id: 2,
    title: "RAZZ",
    flavors: ["fresh berry", "sour kick"], 
    imageClass: "label-3",
    stats: [
      { label: "BERRY", value: 90 },
      { label: "SOUR", value: 60 },
      { label: "SWEET", value: 40 },
      { label: "BITTER", value: 10 },
    ]
  },
  {
    id: 3,
    title: "BLUEFEEZ",
    flavors: ["cool mint", "citrus"], 
    imageClass: "label-4",
    stats: [
      { label: "COOLING", value: 85 },
      { label: "FRESH", value: 50 },
      { label: "SWEET", value: 50 },
      { label: "BITTER", value: 15 },
    ]
  },
  {
    id: 4,
    title: "COCOWAVE",
    flavors: ["coconut", "vanilla aroma"], 
    imageClass: "label-5",
    stats: [
      { label: "COCONUT", value: 95 },
      { label: "AROMA", value: 80 },
      { label: "SWEET", value: 70 },
      { label: "BITTER", value: 10 },
    ]
  },
];

// --- Sub-Components ---
const ScaleBar = ({ value }: { value: number }) => (
  <div className="barContainer">
    <div className="indicator" style={{ left: `${value}%` }} />
  </div>
);

// --- Main Component ---
export default function ProductReveal() {
  const [isLeftPanelOpen, setLeftPanelOpen] = useState(false);   // ปุ่มซ้าย
  const [isRightPanelOpen, setRightPanelOpen] = useState(false);
  const [scrollIndex, setScrollIndex] = useState(0);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // ดึงข้อมูลปัจจุบัน
  const currentProduct = useMemo(() => 
    PRODUCT_DATA[scrollIndex] || PRODUCT_DATA[0], 
  [scrollIndex]);

  // Reset panels เมื่อเปลี่ยนหน้า
  useEffect(() => {
    setLeftPanelOpen(false);
    setRightPanelOpen(false);
  }, [scrollIndex]);

  // Handle Scroll logic
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const index = Math.round(scrollTop / SCROLL_STEP_PX);
      
      // Dynamic clamping ตามจำนวนข้อมูลจริง
      const maxIndex = PRODUCT_DATA.length - 1;
      const clampedIndex = Math.min(Math.max(index, 0), maxIndex);
      
      setScrollIndex((prev) => (prev !== clampedIndex ? clampedIndex : prev));
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div 
      className="main-viewport" 
      ref={scrollContainerRef} 
      data-page={scrollIndex}
    >
      {/* --- Fixed UI Layer --- */}
      <div className="fixed-content-layer">
        
        {/* Title */}
        <div className="style">
          <h2 key={currentProduct.id} className="animate-text">
            {currentProduct.title}
          </h2>
        </div>

        {/* Left Panel: Flavors */}
        <div className={`info-panel ${isLeftPanelOpen ? "show" : ""}`}>
          <h3 className="info-title">flavors</h3>
          <ul className="info-list">
            {currentProduct.flavors.map((flavor, i) => (
               <li key={i}>{flavor}</li>
            ))}
          </ul>
        </div>

        {/* Toggle Buttons */}
        <div>
            {/* ปุ่มซ้าย: กดแล้วปิดขวาทันที */}
            <button
              className={`toggle-btn ${isLeftPanelOpen ? "active" : ""}`}
              onClick={() => {
                setLeftPanelOpen(!isLeftPanelOpen);
                setRightPanelOpen(false); // ★ เพิ่มตรงนี้
              }}
              aria-label="Toggle Flavors"
            >
              <span className="icon">+</span>
            </button>
            
            {/* ปุ่มขวา: กดแล้วปิดซ้ายทันที */}
            <button
              className={`toggle-btn2 ${isRightPanelOpen ? "active" : ""}`}
              onClick={() => {
                setRightPanelOpen(!isRightPanelOpen);
                setLeftPanelOpen(false); // ★ เพิ่มตรงนี้
              }}
              aria-label="Toggle Stats"
            >
              <span className="icon">+</span>
            </button>
        </div>

        {/* Floating Product Image */}
        <div className="product-wrapper">
          <div className={`can-image-placeholder ${currentProduct.imageClass}`}></div>
        </div>

        {/* Right Panel: Stats */}
        <div 
          className={`info-panel2 ${isRightPanelOpen ? "show" : ""}`} 
          style={{
            display: 'flex', 
            flexDirection: 'column',
            gap: '0px',
            alignItems: 'flex-end',
            paddingRight: '60px'
          }}
        >
          {currentProduct.stats.map((stat, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <span className="flavor-label">{stat.label}</span>
              <div style={{ width: "100px", height: "50px", display: "flex", alignItems: "center" }}>
                <ScaleBar value={stat.value} />
              </div>
            </div>
          ))}
        </div>
          
      </div> 

      {/* --- Scroll Track Layer --- */}
      <div className="scroll-track">
        {/* Generate sections dynamically based on data length */}
        {PRODUCT_DATA.map((item) => (
          <section 
            key={item.id} 
            className="snap-section" 
            style={{ height: `${SCROLL_STEP_PX}px` }} 
          />
        ))}
      </div>

    </div>
  );
}