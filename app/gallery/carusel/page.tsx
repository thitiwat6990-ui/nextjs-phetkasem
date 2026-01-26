// Carousel.tsx
"use client";

import React from "react";
import "./page.css";

// --- ชุดรูปภาพที่ 1 (สำหรับแถวบน) ---
const row1Images = [
  "/images/maew-salid.png", // รูปป้อมปราการ
  "/images/maew2.png", // รูปราสเบอร์รี่
  "/images/maew3.png", // รูปเท้า
  "/images/maew4.png", // รูปตาข่ายดักฝัน
  "/images/maew5.png",
];

// --- ชุดรูปภาพที่ 2 (สำหรับแถวที่ 2 - รูปไม่เหมือนกัน) ---
const row2Images = [
  "/images/malting.jpg", // <-- เปลี่ยน ID เพื่อให้รูปต่างกัน
  "/images/canmaew-rice.png",
  "/images/maew.jpg",
  "/images/maew-glass.jpg",
  "/images/canmaew-hk.png",
];

const row3Images = [
    "/images/malting.jpg", // <-- เปลี่ยน ID เพื่อให้รูปต่างกัน
  "https://picsum.photos/id/202/600/400",
  "https://picsum.photos/id/203/600/400",
  "https://picsum.photos/id/204/600/400",
  "https://picsum.photos/id/206/600/400",
]

const FirstGallery = () => {
  // สร้าง Seamless Loop แยกของใครของมัน
  const seamlessRow1 = [...row1Images, ...row1Images];
  const seamlessRow2 = [...row2Images, ...row2Images];
  const seamlessRow3 = [...row3Images, ...row3Images];

  return (
    <div>
      {/* --- แถวที่ 1 (เลื่อนซ้ายไปขวา) --- */}
      <div className="carouselContainer">
        <div className="track">
          {seamlessRow1.map((src, index) => (
            <div key={`row1-${index}`} className="card">
              <img 
                src={src} 
                alt={`row1-img-${index}`} 
                className="image" 
                loading="lazy" 
              />
            </div>
          ))}
        </div>
      </div>

      {/* --- แถวที่ 2 (เลื่อนขวาไปซ้าย ตามที่ขอ) --- */}
      <div className="carouselContainer2">
        <div className="track2">
          {seamlessRow2.map((src, index) => (
            <div key={`row2-${index}`} className="card2">
              <img 
                src={src} 
                alt={`row2-img-${index}`} 
                className="image" 
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* --- แถวที่ 3 (เลื่อนซ้ายไปขวา) --- */}
      <div className="carouselContainer3">
        <div className="track3">
          {seamlessRow3.map((src, index) => (
            <div key={`row3-${index}`} className="card3">
              <img 
                src={src} 
                alt={`row1-img-${index}`} 
                className="image" 
                loading="lazy" 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FirstGallery;