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
  description: string;
  productImage: string; // ★ แก้จาก imageLabel เป็น productImage เพื่อความชัดเจน
}

// --- Data ---
const PRODUCT_DATA: Product[] = [
  {
    id: 0,
    title: "MAEW SALID",
    flavors: ["Roasted Rice Aroma", "Smooth Mouthfeel", "Crisp Finish"],
    imageClass: "",
    // ★ ใส่ Path รูปภาพตรงนี้ (ตรวจสอบว่ามีไฟล์จริงใน public/images/)
    productImage: "/images/maewsalid.png", 
    stats: [
      { label: "KHAO KHUA THAI", value: 60 },
      { label: "japanese rice", value: 40 },
      { label: "sweet", value: 40 },
      { label: "bitter", value: 20 },
    ],
    description:
      "THE INSPIRATION BEHIND THIS DRINK COMES FROM OUR DESIRE TO CAPTURE THE ESSENCE OF ASIA WHILE HIGHLIGHTING THE FLAVOR OF RICE. THIS LED US TO COMBINE TWO DISTINCT TYPES OF RICE JAPANESE RICE & THAI ROASTED RICE. TOGETHER, THEY CREATE OUR SIGNATURE BLEND, OFFERING A PERFECTLY BALANCED TASTE THAT WE ARE PROUD TO PRESENT.",
  },
  {
    id: 1,
    title: "SINGHSAPE",
    flavors: ["Roasted Malt", "Dark Chocolate", 'Smooth Finish'],
    imageClass: "label-2",
    productImage: "/images/singhsape.png", // รูปหน้า 2
    stats: [
      { label: "Chocolate", value: 60 },
      { label: "MALTy", value: 80 },
      { label: "SWEET", value: 60 },
      { label: "BITTER", value: 40 },
    ],
    description:
      "SINGHSAPE IS A DARK BROWN TO ALMOST BLACK BEVERAGE, BORN FROM THE DEPTH OF ROASTED CHOCOLATE MALT. TO ENHANCE ITS RICHNESS, CHOCOLATE IS ADDED AT THE FINISH, LENDING A GENTLE SWEETNESS THAT ELEVATES ITS AROMA. DISCOVER A UNIQUE EXPERIENCE.",
  },
  {
    id: 2,
    title: "RAZZ",
    flavors: ["Tangy Raspberry", 'Fruity & Juicy', "sour kick"],
    imageClass: "label-3",
    productImage: "/images/razzcat.png", // รูปหน้า 3
    stats: [
      { label: "raspBERRY", value: 80 },
      { label: "malty", value: 60 },
      { label: "SWEET", value: 60 },
      { label: "BITTER", value: 40 },
    ],
    description:
      "RAZZ” IS A FRUITY DRINK ANCHORED BY RASPBERRY FOR ITS AROMA, FLAVOR AND COLOR. IT’S NATURALLY SWEET WITH A GENTLE TART SNAP. LIGHT, REFRESHING AND EASY TO SIP. RASPBERRIES PAIR WITH ALMOST ANYTHING, MAKING THEM THE PERFECT HERO INGREDIENT.",
  },
  {
    id: 3,
    title: "BLUEFEEZ",
    flavors: ["Sweet Blueberry", "Cooling Mint", 'smootie sour'],
    imageClass: "label-4",
    productImage: "/images/catfeez.png", // รูปหน้า 4
    stats: [
      { label: "blueberry", value: 80 },
      { label: "lemon & mint", value: 60 },
      { label: "SWEET", value: 80 },
      { label: "BITTER", value: 80 },
    ],
    description:
      "PHUKET, A TRUE PARADISE FOR BOTH THAI AND FOREIGN TOURIST, INSTANTLY REMINDS US OF THE REFRESHING SPIRIT OF THE SEA. FROM THIS INSPIRATION. WE CREATED BLUFEEZ A DRINK THAT BLENDS THE SWEET AROMA OF BLUEBERRIES AND THE FRESHNESS OF MINT. EVERY SIP IS A WAVE OF FRESHNESS, BRINGING THE JOY OF THE OCEAN STRAIGHT TO YOU",
  },
  {
    id: 4,
    title: "COCOWAVE",
    flavors: ["coconut", "Tropical Breeze", 'Mellow Sweetness'],
    imageClass: "label-5",
    productImage: "/images/cococat.png", // รูปหน้า 5
    stats: [
      { label: "COCONUT", value: 60 },
      { label: "tropical", value: 60 },
      { label: "SWEET", value: 60 },
      { label: "BITTER", value: 40 },
    ],
    description:
      "SOMETIMES WE CRAVE QUIET. SO WE CRAFTED A DRINK FOR REST & SIMPLE SOLITUDE. PICTURE A DESERTED SHORE, ONE COCONUT TREE, A COLD SIP IN HAND. SOFT SAND, GENTLE WAVES, A BREEZE... YOUR LITTLE PARADISE.",
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
  const [isLeftPanelOpen, setLeftPanelOpen] = useState(false);
  const [isRightPanelOpen, setRightPanelOpen] = useState(false);
  const [isThirdPanelOpen, setThirdPanelOpen] = useState(false);

  const [scrollIndex, setScrollIndex] = useState(0);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const currentProduct = useMemo(
    () => PRODUCT_DATA[scrollIndex] || PRODUCT_DATA[0],
    [scrollIndex]
  );

  // Reset panels เมื่อเปลี่ยนหน้า
  useEffect(() => {
    setLeftPanelOpen(false);
    setRightPanelOpen(false);
    setThirdPanelOpen(false);
  }, [scrollIndex]);

  // Handle Scroll logic
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const index = Math.round(scrollTop / SCROLL_STEP_PX);
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
      <div className="fixed-content-layer">
        
        {/* Title */}
        <div className="style">
          <h2 key={currentProduct.id} className="animate-text">
            {currentProduct.title}
          </h2>
        </div>

        {/* --- ★ ส่วนแสดงรูปภาพ (เพิ่มใหม่ตรงนี้) --- */}
        <div className="dynamic-image-container">
           <img 
             key={currentProduct.id} 
             src={currentProduct.productImage} 
             alt="" 
             className="fade-in-image"
           />
        </div>
        {/* ---------------------------------------- */}

        {/* --- Panel 1: Flavors (ซ้าย) --- */}
        <div className={`info-panel ${isLeftPanelOpen ? "show" : ""}`}>
          <h3 className="info-title">flavors</h3>
          <ul className="info-list">
            {currentProduct.flavors.map((flavor, i) => (
              <li key={i}>{flavor}</li>
            ))}
          </ul>
        </div>

        {/* --- Panel 3: Description --- */}
        <div className={`info-panel3 ${isThirdPanelOpen ? "show" : ""}`}>
          <h3 className="info-title">STORY</h3>
          <p className="description-text">{currentProduct.description}</p>
        </div>

        {/* --- Toggle Buttons Group --- */}
        <div>
          {/* ปุ่ม 1 (ซ้าย) */}
          <button
            className={`toggle-btn ${isLeftPanelOpen ? "active" : ""}`}
            onClick={() => {
              setLeftPanelOpen(!isLeftPanelOpen);
              setRightPanelOpen(false);
              setThirdPanelOpen(false);
            }}
            aria-label="Toggle Flavors"
          >
            <span className="icon">+</span>
          </button>

          {/* ปุ่ม 2 (ขวา) */}
          <button
            className={`toggle-btn2 ${isRightPanelOpen ? "active" : ""}`}
            onClick={() => {
              setRightPanelOpen(!isRightPanelOpen);
              setLeftPanelOpen(false);
              setThirdPanelOpen(false);
            }}
            aria-label="Toggle Stats"
          >
            <span className="icon">+</span>
          </button>

          {/* ปุ่ม 3 (Story) */}
          <button
            className={`toggle-btn3 ${isThirdPanelOpen ? "active" : ""}`}
            onClick={() => {
              setThirdPanelOpen(!isThirdPanelOpen);
              setRightPanelOpen(false);
              setLeftPanelOpen(false);
            }}
            aria-label="Toggle Description"
          >
            <span className="icon">+</span>
          </button>
        </div>

        {/* Floating Product Image */}
        <div className="product-wrapper">
          <div
            className={`can-image-placeholder ${currentProduct.imageClass}`}
          ></div>
        </div>

        {/* --- Panel 2: Stats (ขวา) --- */}
        <div
          className={`info-panel2 ${isRightPanelOpen ? "show" : ""}`}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0px",
            alignItems: "flex-end",
            paddingRight: "60px",
          }}
        >
          {currentProduct.stats.map((stat, i) => (
            <div
              key={i}
              style={{ display: "flex", alignItems: "center", gap: "20px" }}
            >
              <span className="flavor-label">{stat.label}</span>
              <div
                style={{
                  width: "100px",
                  height: "50px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ScaleBar value={stat.value} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- Scroll Track Layer --- */}
      <div className="scroll-track">
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