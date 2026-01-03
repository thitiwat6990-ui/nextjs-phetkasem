"use client";

import "./page.css";
import React from "react";
import useScrollPosition from "@/app/hooks/useScrollPosition";

const PARALLAX_SPEED = 0.8;
const ParallaxHome = () => {
  const scrollY = useScrollPosition();

  const transfromValue = scrollY * PARALLAX_SPEED;

  return (
    <div>
      <div>
        <div
          style={{
            justifyContent: "center",
            backgroundImage: "url('/images/bgproduct.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            zIndex: "0",
            marginTop:'150px'
          }}
          className="overlay"
        >
          <div>
            <h1 className="enjoy">
              ENJOY YOUR DAY
              <br />
              MEET SOME SPECIAL
            </h1>
            <p className="des-beer">
              Breathe deep, smile wide, and dive into your day.
              <br />
              You never know what magic awaits
              <br />
              or whose extraordinary path might cross yours.
            </p>
          </div>
          <img src='/images/homebrew.png' className='logo-homebrew'></img>
        </div>
        
        <h1 ></h1>

      </div>
    </div>
  );
};

export default ParallaxHome;
