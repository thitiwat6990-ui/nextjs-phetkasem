/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState } from 'react';
import { X } from 'lucide-react';

// --- 1. Interfaces ---
interface GalleryItem {
  id: number;
  category: string;
  src: string;
  title: string;
  year: string;
}

interface HighlightItem {
  id: number;
  title: string;
  subtitle: string;
  desc: string;
  image: string; 
  video: string; 
}

// --- 2. Mock Data ---
const HIGHLIGHT_ITEM: HighlightItem = {
  id: 1,
  title: "The Sunshine Pilsner",
  subtitle: "Limited Batch No. 42",
  desc: "Experience the depth of malt, blended with the aromas of Japanese rice and roasted Thai rice, in a can design that is simple yet powerful.",
  image: "https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?q=80&w=1471&auto=format&fit=crop",
  video: '/videos/videobeer.mp4', 
};

const GALLERY_IMAGES: GalleryItem[] = [
  { id: 1, category: "Product", src: "/images/maew-salid-labelcan.png", title: "Maew Salid", year: "2026" },
  { id: 2, category: "Product", src: "/images/opening.png", title: "Put the cat into the glass", year: "2026" },
  { id: 3, category: "Brewing", src: "/images/forward-cat.jpg", title: "Grain Bill", year: "2026" },
  { id: 4, category: "Vibe", src: "/images/maew.jpg", title: "Golden Lager", year: "2026" },
  { id: 5, category: "Vibe", src: "/images/canmaew-hk.png", title: "Maew Salid in HongKong", year: "2026" },
  { id: 6, category: "Vibe", src: "/images/fridaycat.jpg", title: "Friday Cat", year: "2026" },
  { id: 7, category: "Vibe", src: "/images/catintheboat.jpg", title: "Razz", year: "2026" },
  { id: 8, category: "Vibe", src: "/images/maew-glass.jpg", title: "Put the cat into the glass", year: "2026" },
  { id: 9, category: "Product", src: "/images/poster-beehern.png", title: "Grain Bill", year: "2026" },
];

export default function App() {
  const [filter, setFilter] = useState("All");
  const [selectedImage, setSelectedImage] = useState<GalleryItem | HighlightItem | null>(null);

  const filteredImages = filter === "All" 
    ? GALLERY_IMAGES 
    : GALLERY_IMAGES.filter(img => img.category === filter);

  return (
    <div className="min-h-screen bg-[white] text-[#1A1A1A] font-sans selection:bg-black selection:text-white">
      
      {/* Hero Section */}
      <section className="pt-20 pb-20 px-6 md:px-12 container mx-auto">
        <div className="flex flex-col md:flex-row gap-16 items-start">
          <div className="md:w-5/12 pt-10">
            <span className="text-xs font-medium tracking-[0.3em] uppercase text-gray-400 block mb-6">Featured Selection</span>
            <h1 className="text-5xl md:text-7xl font-serif font-light leading-tight mb-8">
              {HIGHLIGHT_ITEM.title}
            </h1>
            <p className="text-gray-600 leading-relaxed mb-10 max-w-sm font-light">
              {HIGHLIGHT_ITEM.desc}
            </p>
            <a href="#" className="inline-flex items-center gap-4 text-xs font-bold tracking-[0.2em] uppercase group">
              View Collection
              <span className="w-8 h-[1px] bg-black group-hover:w-16 transition-all duration-300"></span>
            </a>
          </div>
          
          <div 
            className="md:w-7/12 relative group cursor-pointer w-full" 
            onClick={() => setSelectedImage(HIGHLIGHT_ITEM)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setSelectedImage(HIGHLIGHT_ITEM)}
          >
            <div className="aspect-[4/5] overflow-hidden bg-gray-100 relative">
              <video 
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                poster={HIGHLIGHT_ITEM.image}
              >
                 <source src={HIGHLIGHT_ITEM.video} type="video/mp4" />
                 Your browser does not support the video tag.
              </video>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-6 shadow-xl hidden md:block z-10">
               <p className="text-xs tracking-widest uppercase text-gray-400 font-sans">Launch Date</p>
               <p className="text-lg font-sans">Feb 1, 2026</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 px-6 md:px-12 container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-20 border-b border-black/10 pb-6">
          <h2 className="text-3xl font-sans italic">The Archive</h2>
          <div className="flex gap-8 mt-6 md:mt-0 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
            {["All", "Product", "Vibe", "Brewing"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`text-xs font-medium tracking-[0.15em] uppercase transition-colors relative whitespace-nowrap ${
                  filter === cat ? "text-black" : "text-gray-400 hover:text-black"
                }`}
              >
                {cat}
                {filter === cat && <span className="absolute -bottom-2 left-0 w-full h-[1px] bg-black"></span>}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {filteredImages.map((img) => (
            <div 
              key={img.id} 
              className="group cursor-pointer"
              onClick={() => setSelectedImage(img)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setSelectedImage(img)}
            >
              <div className="aspect-square overflow-hidden bg-gray-100 mb-6 relative">
                {/* --- แก้ไขตรงนี้ครับ --- */}
                {/* เปลี่ยนจาก grayscale เป็น md:grayscale (ให้มีผลเฉพาะจอคอม) */}
                <img 
                  src={img.src} 
                  alt={img.title}
                  className="w-full h-full object-cover filter md:grayscale md:group-hover:grayscale-0 transition-all duration-700 ease-in-out"
                />
              </div>
              <div className="flex justify-between items-center border-t border-black/10 pt-4">
                <div>
                  <h3 className="text-lg font-sans group-hover:italic transition-all">{img.title}</h3>
                  <span className="text-xs text-gray-400 uppercase tracking-wider">{img.category}</span>
                </div>
                <span className="text-xs font-sans text-gray-400">{img.year}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer / CTA */}
      <section className="py-32 px-6 container mx-auto text-center">
        <p className="text-xs font-bold tracking-[0.3em] uppercase text-gray-400 mb-6">Stay Connected</p>
        <h2 className="text-4xl md:text-6xl font-serif leading-tight mb-10">
          Crafting culture,<br />one can at a time.
        </h2>
        <div className="flex justify-center gap-8" style={{marginLeft:'-30px'}}>
          <a href="https://www.instagram.com/phetkasembrewing/" target='_blank' className="text-sm hover:line-through transition-all text-gray-500 hover:text-black">Instagram</a>
          <a href="https://www.facebook.com/phetkasembrewing/ " target='_blank' className="text-sm hover:line-through transition-all text-gray-500 hover:text-black">Facebook</a>
          <a href="https://lin.ee/0fUAVHt" target='_blank' className="text-sm hover:line-through transition-all text-gray-500 hover:text-black">Line</a>
        </div>
      </section>

      <footer className="border-t border-black/5 py-8 px-6 md:px-12 bg-white">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-[10px] md:text-xs uppercase tracking-widest text-gray-400">
          <p>© 2026 Phetkasem brewing</p>
          <div className="flex gap-6 mt-4 md:mt-0">
             <span>Bangkok, Thailand</span>
             <span>Est. 2026</span>
          </div>
        </div>
      </footer>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[9999] bg-white/95 backdrop-blur-sm flex items-center justify-center p-6 md:p-12 cursor-zoom-out"
          onClick={() => setSelectedImage(null)}
        >
          <div className="w-full h-full flex flex-col items-center justify-center relative">
            <button 
              className="absolute top-0 right-0 p-4 hover:rotate-90 transition-transform duration-300 z-50"
              onClick={() => setSelectedImage(null)}
            >
               <X className="w-8 h-8 font-light" />
            </button>
            
            <div className="max-w-4xl max-h-[80vh] w-full h-full flex items-center justify-center relative" onClick={(e) => e.stopPropagation()}>
               {(selectedImage as any).video ? (
                  <video 
                    controls 
                    autoPlay 
                    className="max-w-full max-h-full shadow-2xl"
                  >
                    <source src={(selectedImage as any).video} type="video/mp4" />
                  </video>
               ) : (
                  <img 
                    src={(selectedImage as any).src || (selectedImage as any).image} 
                    alt={selectedImage.title} 
                    className="max-w-full max-h-full object-contain shadow-2xl" 
                  />
               )}
            </div>
            
            <div className="mt-8 text-center" onClick={(e) => e.stopPropagation()}>
               <h3 className="text-2xl font-serif mb-2">{selectedImage.title}</h3>
               <p className="text-xs uppercase tracking-widest text-gray-500">
                 {(selectedImage as any).category || "Featured Selection"}
               </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}