"use client";

import "./page.css";
import { motion } from "framer-motion"; // นำเข้า library สำหรับแอนิเมชัน

export default function Second() {
  return (
    <div>
      {/* หัวข้อสไลด์จากซ้าย */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h1 className='head-des'>crafted to inspire</h1>
      </motion.div>

      <div className='allmain'>
        {/* คำอธิบายสไลด์จากซ้าย (มาช้ากว่าหัวข้อนิดนึงเพื่อให้ดูมีมิติ) */}
        <motion.h2 
          className='description-main'
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Maew Salid captures the essence of simplicity—the golden afternoon sun hitting a wooden porch<br/>The scent of steaming rice, and the gentle breeze. It doesn't strive to be extraordinary.<br/>Yet, the more you look, the more you feel its natural charm. Like something truly good<br/>that needs no explanation, this is the soul of Maew Salid Beer.<br/>A beer that doesn't try to be too fancy, but is crafted to be easy-drinking<br/>sincere, and full of character—just like its name.
        </motion.h2>

        {/* รูปแมวค่อยๆ แสดง (Fade In) */}
        <motion.img 
          src='/images/maewsalid.png' 
          className='cheers'
          initial={{ opacity: 0 }} // เริ่มต้นที่จางหาย
          whileInView={{ opacity: 1 }} // เมื่อเลื่อนมาเห็นให้ค่อยๆ สว่าง
          transition={{ duration: 1.5, delay: 0.5 }} // แสดงผลช้าๆ นุ่มๆ
          viewport={{ once: true }}
        />
      </div>
    </div>
  );
}