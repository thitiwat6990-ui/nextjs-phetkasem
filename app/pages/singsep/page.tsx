"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import "./page.css";

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

export default function ProductReveal() {
  const [isActive, setIsActive] = useState(false);
  const [isActive2, setIsActive2] = useState(false);

  // --- 2. เพิ่มส่วนนี้: State และ Logic สำหรับจับการ Scroll ---
  const [scrollIndex, setScrollIndex] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const height = window.innerHeight;
      // คำนวณว่าตอนนี้เลื่อนลงมาถึงหน้า 2 หรือยัง (ถ้าเลื่อนเกินครึ่งจอให้นับเป็น 1)
      const index = Math.round(window.scrollY /height);
      setScrollIndex(index);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

    return (
        <div className='singsep-container'>

        </div>
    )

}