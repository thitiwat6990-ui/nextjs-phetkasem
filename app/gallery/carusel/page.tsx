// Carousel.tsx
"use client";

import React from "react";
import "./page.css";

// 1. สร้าง Type ขึ้นมาเพื่อแก้ปัญหาตัวแดงที่ 'any'
interface ProductImage {
  src: string;
  title: string;
}

const row1Images: ProductImage[] = [
  { src: "/images/maew-salid.png", title: "MAEW SALID" },
  { src: "/images/maew2.png", title: "SINGHSAPE" },
  { src: "/images/maew3.png", title: "RAZZ" },
  { src: "/images/maew4.png", title: "BLUFEEZ" },
  { src: "/images/maew5.png", title: "COCOWAVE" },
];

const row2Images: ProductImage[] = [
  { src: "/images/malting.jpg", title: "Malting Process" },
  { src: "/images/canmaew-rice.png", title: "Rice Lager" },
  { src: "/images/maew.jpg", title: "Original Maew" },
  { src: "/images/maew-glass.jpg", title: "PERFECT POSITION" },
  { src: "/images/canmaew-hk.png", title: "HONG KONG VIBE" },
];

const row3Images: ProductImage[] = [
  { src: "/images/malting.jpg", title: "Malting" },
  { src: "https://picsum.photos/id/202/600/400", title: "Brewing" },
  { src: "https://picsum.photos/id/203/600/400", title: "Hops" },
  { src: "https://picsum.photos/id/204/600/400", title: "Yeast" },
  { src: "https://picsum.photos/id/206/600/400", title: "Barley" },
];

const FirstGallery = () => {
  const seamlessRow1 = [...row1Images, ...row1Images];
  const seamlessRow2 = [...row2Images, ...row2Images];
  const seamlessRow3 = [...row3Images, ...row3Images];

  const containerClass = "overflow-x-auto md:overflow-hidden w-full scrollbar-hide";
  const trackBaseClass = "flex gap-4 max-md:animate-none w-max md:w-auto";

  // 2. แก้ item: any เป็น item: ProductImage
  const renderCard = (item: ProductImage, index: number, cardClass: string) => (
    <div 
      key={`${cardClass}-${index}`} 
      // 3. ใช้ Tailwind คุม Layout ตรงนี้เลย (relative + overflow-hidden)
      // รับรองว่าตัวหนังสือจะซ้อนอยู่ข้างในและไม่ล้นออกมาแน่นอน
      className={`${cardClass} shrink-0 snap-center group relative overflow-hidden rounded-lg`}
    >
      <img 
        src={item.src} 
        alt={item.title} 
        className="image object-cover h-full w-full block" 
        loading="lazy" 
      />
      
      {/* ส่วนตัวหนังสือ (Overlay) */}
      <div 
        className="
          absolute bottom-0 left-0 w-full p-4 
          bg-gradient-to-t from-black/90 to-transparent 
          text-white text-center font-bold z-10
          
          /* --- Animation Settings --- */
          /* ปกติ: ซ่อนโดยเลื่อนขึ้นไปข้างบน (-translate-y-full) และจางหาย (opacity-0) */
          opacity-0 -translate-y-full
          transition-all duration-200 ease-in
          
          /* Hover: ไหลลงมาที่เดิม (translate-y-0) และชัดขึ้น (opacity-100) */
          group-hover:opacity-100 group-hover:translate-y-0
          group-hover:duration-500 group-hover:ease-out
        "
      >
        <span className="text-lg drop-shadow-md">{item.title}</span>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-6">
      <div className={`${containerClass} carouselContainer`}>
        <div className={`${trackBaseClass} track`}>
          {seamlessRow1.map((item, index) => renderCard(item, index, "card"))}
        </div>
      </div>

      <div className={`${containerClass} carouselContainer2`}>
        <div className={`${trackBaseClass} track2`}>
          {seamlessRow2.map((item, index) => renderCard(item, index, "card2"))}
        </div>
      </div>

      <div className={`${containerClass} carouselContainer3`}>
        <div className={`${trackBaseClass} track3`}>
          {seamlessRow3.map((item, index) => renderCard(item, index, "card3"))}
        </div>
      </div>
    </div>
  );
};

export default FirstGallery;