'use client'

import React, { useEffect, useRef, useState } from 'react';
import './page.css'

// ข้อมูลสินค้าแบบละเอียดสำหรับ Popup
const products = [
  { 
    name: "MAEW SALID ORIGINAL", 
    desc: "เบียร์ลาเกอร์สีทอง รสชาตินุ่มนวล ในกระป๋องเงินคลาสสิกที่ทุกคนคุ้นเคย",
    flavor: "A perfect harmony of malt sweetness and Japanese rice. Crisp, clean, and effortlessly refreshing",
    story: "Inspired by the essence of Asia, capturing the unique flavors of Japanese rice and Thai roasted rice for a perfectly balanced signature taste",
    stats: { 'Khao khua thai': 60, 'japanese rice': 40, sweet: 40, bitter: 20 },
    color: "#ff6f0f", 
    textColor: "#f3d4bd", 
    imageUrl: "./images/maew-label.png", 
    featuredImageUrl: " / ",
    thumbUrl: "./images/maewsalid.png"
  },
  { 
    name: "Singha sape", 
    desc: "คราฟต์เบียร์รสช็อกโกแลตมอลต์ คาแรกเตอร์เข้มข้นจัดจ้านบนวัสดุเงินขัดเงา",
    flavor: "Rich dark chocolate meets hints of roasted coffee with a velvety sweet finish",
    story: "A dark, rich beverage born from roasted chocolate malt, finished with a touch of chocolate for a gentle sweetness and elevated aroma",
    stats: { chocolate: 60, malty: 80, Sweet: 60, bitter: 40 },
    color: "#271309", 
    textColor: "#f3d4bd", 
    imageUrl: "./images/singha-sape-label.png", 
    featuredImageUrl: " / ",
    thumbUrl: "./images/singhsape.png"
  },
  { 
    name: "cocowave", 
    desc: "สัมผัสความนุ่มนวลของมอลต์คั่ว ของดีที่ไม่ต้องอธิบายเยอะแต่สะท้อนรสนิยม",
    flavor: "The fragrant aroma of Thai aromatic coconut, perfectly blended with a silky smooth taste",
    story: "SOMETIMES WE CRAVE QUIET. SO WE CRAFTED A DRINK FOR REST & SIMPLE SOLITUDE. PICTURE A DESERTED SHORE, ONE COCONUT TREE, A COLD SIP IN HAND. SOFT SAND, GENTLE WAVES. A BREEZE YOUR LITTLE PARADISE",
    stats: { coconut : 60, tropical: 60, sweet: 60, bitter: 40 },
    color: "#ede5e5", 
    textColor: "#555555", 
    imageUrl: "./images/cocowave-label.png", 
    featuredImageUrl: "/ ",
    thumbUrl: "/images/cococat.png"
  },
  { 
    name: "razz", 
    desc: "เบียร์ที่เป็นมิตรกับทุกคน จริงใจในรสชาติ เรียบง่ายแต่มีเสน่ห์น่าจดจำ",
    flavor: "Refreshing sweet and tart flavors with a smooth, velvety texture and sweet aroma",
    story: "A refreshing fruity drink anchored by raspberry for its signature aroma and color. Naturally sweet with a gentle tart snap—light, easy to sip, and the perfect hero ingredient",
    stats: { raspberry: 80, malt: 60, sweet: 60, bitter: 40 },
    color: "#b6122b", 
    textColor: "#eceff1", 
    imageUrl: "./images/razz-label.png", 
    featuredImageUrl: "/",
    thumbUrl: "./images/razzcat.png"
  },
  { 
    name: "blufeez", 
    desc: "ที่สุดของความชัดเจนในคาแรกเตอร์ ดุดันแต่กลมกล่อม บนกระป๋องสะท้อนแสงเงาอย่างมีมิติ",
    flavor: "Lemon, Mint, Blueberry: The perfect mix. Beat the heat with BluFeeZ",
    story: "Inspired by Phuket's refreshing spirit, BluFeeZ blends the sweet aroma of blueberries with the coolness of mint—a wave of freshness in every sip",
    stats: { blueberry: 80, 'lemon&mint': 20, sweet: 80, sour: 80 },
    color: "#067d81", 
    textColor: "#ffffff", 
    imageUrl: "./images/bblue-label.png", 
    featuredImageUrl: "/ ",
    thumbUrl: "./images/catfeez.png"
  }
];

export default function App() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const currentIndexRef = useRef(0);
  const [isScriptsLoaded, setScriptsLoaded] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [activeProduct, setActiveProduct] = useState(products[0]);

  useEffect(() => {
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    const loadAllScripts = async () => {
      try {
        if (!window.THREE) await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js');
        if (!window.gsap) await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js');
        if (!window.ScrollTrigger) await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js');
        setScriptsLoaded(true);
      } catch (err) {
        console.error("Failed to load scripts", err);
      }
    };
    loadAllScripts();
  }, []);

  useEffect(() => {
    if (!isScriptsLoaded) return;

    const THREE = window.THREE;
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
    // ปรับเริ่มต้นตามขนาดจอ
    camera.position.z = window.innerWidth > 768 ? 7 : 12;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    
    if (canvasRef.current) canvasRef.current.appendChild(renderer.domElement);

    const canGroup = new THREE.Group();
    canGroup.scale.set(0.75, 0.75, 0.75);
    scene.add(canGroup);

    const whiteMaterial = new THREE.MeshStandardMaterial({
      color: 0xeeeeee,
      metalness: 0.5,
      roughness: 0.2,
    });

    const textureLoader = new THREE.TextureLoader();
    const textures = products.map(p => {
      const tex = textureLoader.load(p.imageUrl);
      tex.anisotropy = 8;
      tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    });

    const labelMaterial = new THREE.MeshStandardMaterial({
      map: textures[0],
      metalness: 0.3, 
      roughness: 0.4,
      emissive: new THREE.Color(0xffffff), 
      emissiveIntensity: 0.05,
    });

    const bodyGeo = new THREE.CylinderGeometry(1, 1, 2.8, 60, 1, true);
    const labelMesh = new THREE.Mesh(bodyGeo, labelMaterial);
    canGroup.add(labelMesh);

    const topShoulderGeo = new THREE.CylinderGeometry(0.85, 1, 0.4, 64);
    const topShoulder = new THREE.Mesh(topShoulderGeo, whiteMaterial);
    topShoulder.position.y = 1.6;
    canGroup.add(topShoulder);

    const topRimGeo = new THREE.TorusGeometry(0.85, 0.05, 16, 64);
    const topRim = new THREE.Mesh(topRimGeo, whiteMaterial);
    topRim.rotation.x = Math.PI / 2;
    topRim.position.y = 1.8;
    canGroup.add(topRim);

    const bottomHeelGeo = new THREE.CylinderGeometry(1, 0.85, 0.2, 64);
    const bottomHeel = new THREE.Mesh(bottomHeelGeo, whiteMaterial);
    bottomHeel.position.y = -1.5;
    canGroup.add(bottomHeel);

    scene.add(new THREE.HemisphereLight(0xffffff, 0x444444, 1.5));
    const mainLight = new THREE.DirectionalLight(0xffffff, 1);
    mainLight.position.set(5, 5, 5);
    scene.add(mainLight);

    const onClick = (event) => {
      const mouse = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
      );
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      if (raycaster.intersectObjects(canGroup.children).length > 0) {
        if (currentIndexRef.current < products.length) {
          setActiveProduct(products[currentIndexRef.current]);
          setShowPopup(true);
        }
      }
    };
    window.addEventListener('click', onClick);

    const sections = gsap.utils.toArray('.product-section');
    sections.forEach((section, i) => {
      ScrollTrigger.create({
        trigger: section,
        scroller: containerRef.current,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          currentIndexRef.current = i;
          if (i < products.length) {
            labelMaterial.map = textures[i];
            labelMaterial.needsUpdate = true;
            gsap.to(containerRef.current, { backgroundColor: products[i].color, duration: 0.8 });
          } else {
            gsap.to(containerRef.current, { backgroundColor: "#000000", duration: 0.8 });
          }
          gsap.to(section.querySelector('.product-info'), { opacity: 1, x: 0, duration: 0.8 });
        },
        onEnterBack: () => {
          currentIndexRef.current = i;
          if (i < products.length) {
            labelMaterial.map = textures[i];
            labelMaterial.needsUpdate = true;
            gsap.to(containerRef.current, { backgroundColor: products[i].color, duration: 0.8 });
          } else {
             gsap.to(containerRef.current, { backgroundColor: "#000000", duration: 0.8 });
          }
          gsap.to(section.querySelector('.product-info'), { opacity: 1, x: 0, duration: 0.8 });
        },
        onLeave: () => gsap.to(section.querySelector('.product-info'), { opacity: 0, x: -50, duration: 0.5 }),
        onLeaveBack: () => gsap.to(section.querySelector('.product-info'), { opacity: 0, x: -50, duration: 0.5 })
      });
    });

    gsap.to(canGroup.rotation, {
      y: Math.PI * 10,
      scrollTrigger: {
        trigger: ".scroll-wrapper",
        scroller: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1
      }
    });

    const animate = () => {
      requestAnimationFrame(animate);
      canGroup.rotation.y += 0.005;
      
      const isMobile = window.innerWidth <= 768;
      canGroup.position.x = isMobile ? 0 : 2;
      canGroup.position.x = isMobile ? 0 : 2;
  canGroup.position.y = isMobile ? 0.5 : 0;
      // อัปเดตตำแหน่งกล้องแบบ Dynamic ใน animate
      camera.position.z = isMobile ? 12 : 7;
      
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', onClick);
      ScrollTrigger.getAll().forEach(t => t.kill());
      renderer.dispose();
    };
  }, [isScriptsLoaded]);

  const StatBar = ({ label, value, color }) => (
    <div className="mb-4">
      <div className="flex justify-between text-[10px] mb-1 font-bold uppercase tracking-widest text-gray-400">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full transition-all duration-1000" style={{ width: showPopup ? `${value}%` : '0%', backgroundColor: color }} />
      </div>
    </div>
  );

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 overflow-y-auto snap-y snap-mandatory transition-colors duration-700 ease-in-out select-none h-screen"
      style={{ backgroundColor: products[0].color }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@800&family=Noto+Serif+Thai:wght@100..900&display=swap');
        * { font-family: 'Noto Serif Thai' !important; }
        .product-title { font-family: 'Playfair Display' !important; }
        ::-webkit-scrollbar { width: 0px; }
        
        .hint-text {
          font-family: 'Noto Sans' !important;
          letter-spacing: 0em;
        }

        @keyframes verticalLine {
          0% { transform: scaleY(0); transform-origin: top; }
          50% { transform: scaleY(1); transform-origin: top; }
          51% { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }
        .animate-line {
          animation: verticalLine 2.5s infinite ease-in-out;
        }
      `}</style>

      {/* fixed background elements (3D Canvas) */}
      <div ref={canvasRef} className="fixed inset-0 z-10 pointer-events-auto cursor-pointer" />

      {/* Interactive Hint - Centered at Bottom */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-none">
        <span className="hint-text text-white/50 text-[10px] font-bold mb-4 uppercase text-center tracking-[0.3em]">
          CLICK CAN FOR DETAILS
        </span>
        <div className="w-[1px] h-16 bg-white/20 overflow-hidden relative">
          <div className="absolute inset-0 bg-white/70 animate-line" />
        </div>
      </div>

      {/* Scrollable Content Wrapper */}
      <div className="scroll-wrapper relative z-20">
        {products.map((product, index) => (
          <section key={index} className="product-section h-screen flex flex-col md:flex-row items-center justify-center md:justify-start px-[10%] snap-start snap-always pointer-events-none">
    
    {/* ใน Mobile จะถูกดันลงมาข้างล่างเพราะข้างบนมีกระป๋องจองที่อยู่ */}
    <div className="product-info mt-[35vh] md:mt-0 max-w-[600px] opacity-0 text-center md:text-left md:-translate-x-12 transition-all duration-700">
      <h1 className="product-title text-4xl md:text-8xl mb-4 uppercase leading-tight drop-shadow-xl" style={{ color: product.textColor }}>
        {product.name}
      </h1>
      {/* <p className="text-white/80 text-sm md:text-lg max-w-md mx-auto md:mx-0">
        {product.desc}
      </p> */}
    </div>
    
  </section>
        ))}

        {/* Final Page */}
        <section className="product-section h-screen flex items-center px-[10%] snap-start snap-always pointer-events-none">
          <div className="product-info hidden md:block max-w-[800px] opacity-0 -translate-x-12 transition-all duration-700">
            <p className="text-orange-500 font-bold tracking-[0.3em] uppercase mb-4">The Collection</p>
            <h1 className="product-title text-5xl md:text-7xl text-white mb-8 uppercase leading-tight">
              MORE FLAVORS<br/>COMING SOON
            </h1>
            <p className="text-gray-400 text-xl max-w-lg">
              เตรียมพบกับรสชาติใหม่ๆ จากแมวสลิดที่พร้อมจะเปลี่ยนทุกค่ำคืนของคุณให้เป็นความทรงจำที่พิเศษยิ่งขึ้น
            </p>
          </div>
        </section>
      </div>

      {/* Popup Overlay */}
      {showPopup && (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md" onClick={() => setShowPopup(false)}>
    {/* ปรับขนาด Container: Mobile กว้าง 88%, Desktop กว้างปกติ (max-4xl) */}
    <div className="bg-white w-[88%] md:w-full max-w-4xl rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[85vh] md:max-h-[90vh]" onClick={e => e.stopPropagation()}>
      
      {/* ส่วนบน (Stats): ลด Padding ใน Mobile */}
      <div className="w-full md:w-5/12 bg-gray-50 p-5 md:p-8 flex flex-col items-center border-b md:border-b-0 md:border-r">
        {/* ย่อรูปสินค้าใน Mobile */}
        <div className="w-24 h-16 md:w-36 md:h-24 mb-2">
          <img src={activeProduct.thumbUrl} alt="" className="w-full h-full object-contain" />
        </div>
        
        {/* ย่อหัวข้อ Characteristics */}
        <h3 className="product-title text-lg md:text-2xl text-gray-900 mb-4 md:mb-8 tracking-widest uppercase">Characteristics</h3>
        
        {/* บีบระยะ StatBar ให้แคบลง */}
        <div className="w-full space-y-1 md:space-y-2">
          {Object.entries(activeProduct.stats).map(([label, value], idx) => (
            <StatBar 
              key={label} 
              label={label} 
              value={value} 
              color={idx % 2 === 0 ? "#1a1a1a" : activeProduct.color} 
            />
          ))}
        </div>
      </div>

      {/* ส่วนล่าง (Content): ลด Padding และขนาดตัวอักษร */}
      <div className="w-full md:w-7/12 p-6 md:p-12 overflow-y-auto bg-white">
        <div className="flex justify-between items-start mb-4 md:mb-6">
          <div>
            <p className="text-[8px] md:text-[10px] font-bold tracking-widest text-orange-500 uppercase">Premium Selection</p>
            {/* ชื่อสินค้าเล็กลงใน Mobile */}
            <h2 className="product-title text-2xl md:text-4xl text-gray-900 uppercase mt-1">{activeProduct.name}</h2>
          </div>
          <button onClick={() => setShowPopup(false)} className="text-gray-300 hover:text-black p-1">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>

        <div className="space-y-4 md:space-y-6">
          {/* ปรับขนาดคำโปรยและเนื้อเรื่อง */}
          <p className="text-gray-700 text-sm md:text-lg italic border-l-4 border-orange-500 pl-4">"{activeProduct.flavor}"</p>
          <p className="text-gray-500 text-[11px] md:text-base leading-relaxed">{activeProduct.story}</p>
          
          {/* ปุ่มปิดที่เล็กลงนิดหน่อยใน Mobile */}
          <button 
            onClick={() => setShowPopup(false)} 
            className="w-full bg-black text-white py-3 md:py-4 rounded-xl font-bold hover:bg-orange-600 transition-colors uppercase tracking-widest text-[9px] md:text-[11px]"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  </div>
)}

      {/* Loading Screen */}
      {!isScriptsLoaded && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-gray-100">
          <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}