"use client";

import "./page.css";
import React, { useState, useEffect } from "react";

export default function Carousel() {
  const slides = [
    {
      id: 1,
      type: "video",
      src: "/videos/maew-main.mp4",
      title: "PHET\nKASEM\nBREWING",
      subtitle: "",
    },
    {
      id: 2,
      type: "video",
      src: "./videos/maewmaew3.mp4",
      title: "ULTIMATE\nFLAVOR\nBEER",
      subtitle: "",
    },
    {
      id: 3,
      type: "image",
      src: "/images/severbeer.png",
      title: "MEET\nSOME\nSPECIAL\nDRINK",
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
    }, 8000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="carousel-container">
      <div
        className="carousel-track"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => ( // เพิ่ม index ตรงนี้
          <div key={slide.id} className="carousel-slide">
            
            {slide.type === "video" ? (
              <video
                src={slide.src}
                autoPlay
                loop
                muted
                playsInline
                className="carousel-media"
              />
            ) : (
              <img 
                src={slide.src} 
                alt={slide.title} 
                className="carousel-media" 
              />
            )}

            <div className="carousel-content">
              <h3>{slide.subtitle}</h3>
              {/* เพิ่มเงื่อนไข: ถ้าเป็นสไลด์แรก (index 0) ให้ใส่ class hide-on-mobile */}
              <h1 className={index === 0 ? "hide-on-mobile" : ""}>
                {slide.title}
              </h1>
            </div>

            <div className="overlay-dark"></div>
          </div>
        ))}
      </div>

      <button className="nav-btn prev" onClick={prevSlide}>
        &#10094;
      </button>
      <button className="nav-btn next" onClick={nextSlide}>
        &#10095;
      </button>

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