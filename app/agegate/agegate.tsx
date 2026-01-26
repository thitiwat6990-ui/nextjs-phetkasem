// components/AgeGate.tsx
"use client";

import React, { useState, useEffect } from 'react';
import './agegate.css';

const AgeGate = () => {
  // เริ่มต้นเป็น false ก่อน เพื่อไม่ให้หน้าเว็บขาวหรือ Block ทันทีที่ยังโหลดไม่เสร็จ
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // 1. เช็คว่าเคย "ยืนยัน" หรือยัง
    const isVerified = localStorage.getItem('phetkasem_age_verified');

    if (!isVerified) {
      // 2. ถ้ายังไม่เคยยืนยัน -> ให้แสดง Popup
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowPopup(true);
      // 3. ล็อคไม่ให้เลื่อนหน้าจอ
      document.body.style.overflow = 'hidden';
    }

    // Cleanup function: เผื่อ Component ถูกถอดออก ให้คืนค่า Scroll
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleConfirm = () => {
    // บันทึกค่าลงเครื่อง user
    localStorage.setItem('phetkasem_age_verified', 'true');
    setShowPopup(false);
    document.body.style.overflow = 'unset'; // คืนค่าให้เลื่อนหน้าจอได้
  };

  const handleDeny = () => {
    window.location.href = "https://www.google.com";
  };

  // ถ้าไม่ต้องโชว์ ให้ return null ไปเลย (ไม่มีผลกับ Layout แน่นอน)
  if (!showPopup) return null;

  return (
    <div className='overlay'>
      <div className='modal'>
        <div className='logo'>PHETKASEM BREWING</div>
        <p className='text'>
          เว็บไซต์นี้เกี่ยวกับเครื่องดื่มแอลกอฮอล์<br/>
          กรุณายืนยันว่าคุณมีอายุ 20 ปีบริบูรณ์ขึ้นไป
        </p>
        <div className='btnGroup'>
          <button onClick={handleDeny} className='btnNo'>ไม่ใช่</button>
          <button onClick={handleConfirm} className='btnYes'>ใช่, เข้าสู่เว็บไซต์</button>
        </div>
      </div>
    </div>
  );
};

export default AgeGate;