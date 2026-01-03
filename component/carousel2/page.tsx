"use client";

import { useState } from "react";
import Image from "next/image";
import "./page.css";

const products = [
  { id: 1, name: "rorker", image: "/images/can-rorker.png" },
  { id: 2, name: "singsep", image: "/images/can-sing.png" },
  { id: 3, name: "razz", image: "/images/can-razz.png" },
  { id: 4, name: "cocowave", image: "/images/can-cocowave.png" },
  { id: 5, name: "BlueFeez", image: "/images/can-blue.png" },
];

export default function ProductCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1));
  };

  // ฟังก์ชันกดปุ่มย้อนกลับ
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  return (
    <div className="carouselContainer">
      <button onClick={prevSlide} className="navButton">
        ❮
      </button>

      <div className="window">
        <div
          className="track"
          // คำนวณระยะการเลื่อน: เลื่อนทีละ 100% ของความกว้างการ์ด
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {products.map((product, index) => (
            <div key={index} className="card">
              <Image
                src={product.image}
                alt={product.name}
                width={120}
                height={500}
                className="productImage"
              />
            </div>
          ))}
        </div>
      </div>

      {/* ปุ่มกดขวา */}
      <button onClick={nextSlide} className="navButton">
        ❯
      </button>
    </div>
  );
}
