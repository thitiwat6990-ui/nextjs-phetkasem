"use client";

import { useState } from "react";
import Image from "next/image";
import "./page.css"; 

const products = [
  { id: 1, name: "rorker", image: "/images/can-rorker.png", status: "ready" },
  { id: 2, name: "singsep", image: "/images/can-sing.png", status: "coming-soon" },
  { id: 3, name: "razz", image: "/images/can-razz.png", status: "coming-soon" },
  { id: 4, name: "cocowave", image: "/images/can-cocowave.png", status: "coming-soon" },
  { id: 5, name: "BlueFeez", image: "/images/can-blue.png", status: "coming-soon" }, 
];

export default function ProductCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  return (
    <div className="carouselContainer">
      <button onClick={prevSlide} className="navButton">❮</button>

      <div className="window">
        <div
          className="track"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {products.map((product, index) => {
            const isComingSoon = product.status === "coming-soon";

            return (
              <div key={index} className="card">
                <div className="image-wrapper">
                  
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={120}
                    height={500}
                    className={`productImage ${isComingSoon ? "blur-img" : ""}`}
                  />

                  {isComingSoon && (
                    <div className="coming-soon-label">
                      COMING SOON
                    </div>
                  )}
                  
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <button onClick={nextSlide} className="navButton">❯</button>
    </div>
  );
}