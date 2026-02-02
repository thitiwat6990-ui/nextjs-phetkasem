"use client";

import "./page.css";
import React, { useState, useEffect } from "react";

export default function Carousel() {
  const slides = [
    {
      id: 1,
      image: "/images/severbeer.png",
      title: "ORDINARY\nBRAND",
      subtitle: "",
    },
    {
      id: 2,
      image: "/images/bggallery.png",
      title: "ULTIMATE\nFLAVOR",
      subtitle: "",
    },
    {
      id: 3,
      image: "/images/5productsmain.png",
      title: "MEET SOME \nSPECIAL DRINK",
      subtitle: "",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 9000);
    return () => clearInterval(interval); // ล้างเวลาเมื่อเปลี่ยนหน้า
  }, [currentIndex]);

  return (
    <div className="carousel-container">
      <div
        className="carousel-track"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="carousel-slide">
            <img src={slide.image} alt={slide.title} />

            <div className="carousel-content">
              <h3>{slide.subtitle}</h3>
              <h1>{slide.title}</h1>
            </div>

            {/* เงามืดๆ ทับรูปให้อ่านหนังสือออก */}
            <div className="overlay-dark"></div>
          </div>
        ))}
      </div>

      {/* ปุ่มกดซ้าย-ขวา */}
      <button className="nav-btn prev" onClick={prevSlide}>
        &#10094;
      </button>
      <button className="nav-btn next" onClick={nextSlide}>
        &#10095;
      </button>

      {/* จุดบอกตำแหน่ง (Dots) ด้านล่าง */}
      <div className="carousel-dots">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          ></div>
        ))}
      </div>
      
    </div>
  );
}
