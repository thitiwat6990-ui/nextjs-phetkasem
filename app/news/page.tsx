'use client';

import React, { useEffect, useState } from 'react';
import { 
  Cat, 
  PawPrint, 
  Calendar, 
  ArrowRight, 
  MailOpen, 
  Send, 
  ChevronLeft, 
  ChevronRight,
} from 'lucide-react';

// --- 1. กำหนด Types (แก้ตัวแดง) ---
type NewsType = 'article' | 'subscribe';

interface NewsItemProps {
  id: number;
  type: NewsType;
  tag?: string;
  tagColor?: string;
  imgSrc?: string;
  date?: string;
  category?: string;
  title?: string;
  desc?: string;
  hasCatOverlay?: boolean;
  isGrayscaleHover?: boolean;
}

// --- 2. ข้อมูลข่าว (Data) ---
const newsData: NewsItemProps[] = [
  // --- Page 1 ---
  {
      id: 1,
      tag: "New Arrival",
      tagColor: "bg-amber-400 text-black",
      imgSrc: "/images/maew-goodvibe.jpg",
      date: "25 January 2026",
      category: "Product",
      title: "My Name is Maew Salid",
      desc: "A beverage of ZUNNERO brew with Japanese rice and roasted Thai rice",
      type: 'article'
  },
  {
      id: 2,
      tag: "Story",
      tagColor: "bg-gray-200 text-gray-800",
      imgSrc: "/images/openingpks.jpg",
      date: "20 January 2026",
      category: "Brewery",
      title: "Grand Opening of Phetkasem Brewing",
      desc: "A beverage production facility operating under the brand 'ZUNNERO'",
      type: 'article'
  },
  {
      id: 3,
      tag: "Story",
      tagColor: "bg-gray-200 text-gray-800",
      imgSrc: "/images/zunnerowhite.jpg",
      date: "5 January 2026",
      category: "Brand",
      title: "My Name is Maew Salid",
      desc: "A beverage of ZUNNERO brew with Japanese rice and roasted Thai rice",
      type: 'article'
  },
  {
    id: 4,
    type: 'article',
    tag: "Story",
    tagColor: "bg-gray-200 text-gray-800",
    imgSrc: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "10 ม.ค. 2026",
    category: "เรื่องเล่า",
    title: 'รู้จักกับ "เจ้าสำลี" ผู้จัดการร้านสี่ขา',
    desc: "เปิดประวัติแมวประจำร้านที่ใครๆ ก็หลงรัก ทำไมมันถึงชอบนอนบนถังเบียร์? อ่านบทสัมภาษณ์สุดพิเศษ...",
    isGrayscaleHover: true
  },
  {
    id: 5,
    type: 'article',
    tag: "New Menu",
    tagColor: "bg-amber-400 text-black",
    imgSrc: "https://images.unsplash.com/photo-1608270586620-248524c67de9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "5 ม.ค. 2026",
    category: "อาหาร",
    title: "กับแกล้มใหม่! ปลาทอดขมิ้นสไตล์แมวเหมียว",
    desc: "เมนูทานเล่นใหม่ที่กรอบอร่อย เข้ากับเบียร์ลาเกอร์ได้อย่างลงตัว (คนทานได้ แมวทานไม่ได้นะจ๊ะ)..."
  },
  {
    id: 6,
    type: 'subscribe' 
  },
  // --- Page 2 ---
//   {
//     id: 7,
//     type: 'article',
//     tag: "Workshop",
//     tagColor: "bg-blue-500 text-white",
//     imgSrc: "https://images.unsplash.com/photo-1555658636-6e4a36218a5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//     date: "1 ก.พ. 2026",
//     category: "เวิร์คช็อป",
//     title: "Brewing 101: สอนต้มเบียร์ฉบับ Homebrew",
//     desc: "อยากลองต้มเบียร์เองไหม? มาเรียนรู้วิธีการเลือกมอลต์ ฮอปส์ และยีสต์ กับ Brewer มืออาชีพของเรา..."
//   },
//   {
//     id: 8,
//     type: 'article',
//     tag: "New Arrival",
//     tagColor: "bg-amber-400 text-black",
//     imgSrc: "https://images.unsplash.com/photo-1615332570265-d8532c253b93?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//     date: "28 ม.ค. 2026",
//     category: "เบียร์สด",
//     title: "Dark Night Stout: เข้มข้นเหมือนคืนเดือนมืด",
//     desc: "สำหรับสายเข้มต้องลอง Stout ตัวใหม่ กลิ่นกาแฟและช็อกโกแลตชัดเจน นุ่มลึกบาดใจ..."
//   },
//   {
//     id: 9,
//     type: 'article',
//     tag: "Story",
//     tagColor: "bg-gray-200 text-gray-800",
//     imgSrc: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//     date: "25 ม.ค. 2026",
//     category: "เรื่องเล่า",
//     title: "ทำไมแมวถึงชอบกล่องฮอปส์?",
//     desc: "ไขปริศนาพฤติกรรมสุดฮาของแก๊งแมวเหมียวในร้าน ที่เห็นกล่องวัตถุดิบเมื่อไหร่เป็นต้องกระโดดใส่..."
//   },
//   {
//     id: 10,
//     type: 'article',
//     tag: "Event",
//     tagColor: "bg-orange-500 text-white",
//     imgSrc: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//     date: "14 ก.พ. 2026",
//     category: "กิจกรรม",
//     title: "Valentine's Day: คู่รักทาสแมว",
//     desc: "วาเลนไทน์นี้พกรูปคู่กับแมวมา รับส่วนลดทันที 20% พร้อมเครื่องดื่มสูตรพิเศษสีชมพู..."
//   },
//   {
//     id: 11,
//     type: 'article',
//     tag: "Merch",
//     tagColor: "bg-purple-500 text-white",
//     imgSrc: "https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//     date: "22 ม.ค. 2026",
//     category: "สินค้า",
//     title: "เสื้อยืด Meow & Brew คอลเลกชันใหม่",
//     desc: "ของมันต้องมี! เสื้อยืดลายกราฟิกแมวขี้เมา Limited Edition วางจำหน่ายแล้วที่หน้าร้าน..."
//   },
//   {
//     id: 12,
//     type: 'article',
//     tag: "New Menu",
//     tagColor: "bg-amber-400 text-black",
//     imgSrc: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//     date: "18 ม.ค. 2026",
//     category: "อาหาร",
//     title: "สปาเก็ตตี้ขี้เมาทะเลเดือด",
//     desc: "รสจัดจ้านถึงเครื่องสมุนไพร เหมาะสำหรับตัดเลี่ยนและทานคู่กับ Lager เย็นๆ..."
//   },
  // --- Page 3 ---
//   {
//     id: 13,
//     type: 'article',
//     tag: "Coming Soon",
//     tagColor: "bg-gray-800 text-white",
//     imgSrc: "https://images.unsplash.com/photo-1585507119436-7c93390d6e6a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//     date: "?? ??? 2026",
//     category: "Sneak Peek",
//     title: "โปรเจกต์ลับ: เบียร์รสกัญชาแมว?",
//     desc: "เรากำลังทดลองสูตรใหม่ที่มนุษย์ดื่มแล้วฟิน (แต่ไม่มีกัญชาแมวจริงๆ นะ แค่ชื่อเล่น!)..."
//   },
//   {
//     id: 14,
//     type: 'article',
//     tag: "Charity",
//     tagColor: "bg-green-500 text-white",
//     imgSrc: "https://images.unsplash.com/photo-1596710629170-16e932dc6f42?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//     date: "1 มี.ค. 2026",
//     category: "เพื่อสังคม",
//     title: "จิบเบียร์ช่วยน้อง: สมทบทุนมูลนิธิแมว",
//     desc: "รายได้ส่วนหนึ่งจากการขายเบียร์ Tap 3 ตลอดเดือนมีนาคม จะบริจาคให้บ้านพักพิงสัตว์..."
//   },
//   {
//     id: 15,
//     type: 'article',
//     tag: "Tips",
//     tagColor: "bg-blue-400 text-white",
//     imgSrc: "https://images.unsplash.com/photo-1574519989912-872f2316279f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//     date: "28 ก.พ. 2026",
//     category: "เกร็ดความรู้",
//     title: "วิธีรินเบียร์ให้ฟองนุ่มเหมือนอุ้งเท้าแมว",
//     desc: "เคล็ดลับการรินเบียร์จากผู้เชี่ยวชาญ เพื่อให้ได้ Head ของเบียร์ที่สมบูรณ์แบบที่สุด..."
//   },
//   {
//     id: 16,
//     type: 'article',
//     tag: "Music",
//     tagColor: "bg-pink-500 text-white",
//     imgSrc: "https://images.unsplash.com/photo-1514525253440-b393452e8d26?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//     date: "15 ก.พ. 2026",
//     category: "เพลง",
//     title: "Playlist แนะนำ: ฟังเพลินๆ ตอนจิบเบียร์",
//     desc: "เรารวบรวมเพลงสไตล์ Lo-Fi และ Jazz Hop ที่เปิดในร้านมาให้ทุกคนได้ฟังตามกันที่บ้าน..."
//   },
//   {
//     id: 17,
//     type: 'article',
//     tag: "Guest",
//     tagColor: "bg-orange-500 text-white",
//     imgSrc: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//     date: "10 ก.พ. 2026",
//     category: "แขกรับเชิญ",
//     title: "Meet the Brewer: พูดคุยกับนักปรุงเบียร์",
//     desc: "โอกาสพิเศษที่จะได้พูดคุยแลกเปลี่ยนประสบการณ์กับ Brewer ชื่อดังจากเชียงใหม่..."
//   },
//   {
//     id: 18,
//     type: 'article',
//     tag: "New Menu",
//     tagColor: "bg-amber-400 text-black",
//     imgSrc: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//     date: "5 ก.พ. 2026",
//     category: "อาหาร",
//     title: "ซี่โครงหมูบาร์บีคิวซอสส้ม",
//     desc: "เมนูหนักท้องสำหรับมื้อเย็น ซอสบาร์บีคิวเคี่ยวกับน้ำส้มสด ให้รสหวานอมเปรี้ยว..."
//   },
];

// --- 3. Main Component ---
export default function NewsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(newsData.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = newsData.slice(indexOfFirstItem, indexOfLastItem);

  // Scroll Reveal Effect
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal');
    elements.forEach(el => el.classList.remove('active'));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    setTimeout(() => {
        elements.forEach((el) => observer.observe(el));
    }, 100);

    return () => observer.disconnect();
  }, [currentPage]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 relative overflow-x-hidden font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700&display=swap');
        :root { --font-kanit: 'Kanit', sans-serif; }
        body { font-family: var(--font-kanit); }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes wiggle { 0%, 100% { transform: rotate(-3deg); } 50% { transform: rotate(3deg); } }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-wiggle { animation: wiggle 2s ease-in-out infinite; }
        .reveal { opacity: 0; transform: translateY(50px); transition: all 0.8s cubic-bezier(0.5, 0, 0, 1); }
        .reveal.active { opacity: 1; transform: translateY(0); }
        .blob { position: absolute; filter: blur(40px); z-index: 0; opacity: 0.4; }
      `}</style>

      {/* Decorative Blobs */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="blob bg-amber-400 w-64 h-64 rounded-full top-[-50px] right-[-50px] animate-float"></div>
        <div className="blob bg-orange-500 w-48 h-48 rounded-full bottom-[10%] left-[-20px] animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <main className="container mx-auto px-6 py-12 z-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
          {/* Render Loop */}
          {currentItems.map((item) => {
            if (item.type === 'subscribe') {
              return <SubscribeCard key={item.id} />;
            }
            return <ArticleCard key={item.id} {...item} />;
          })}

        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-16 gap-2">
          {/* Prev Button */}
          <button 
            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center transition-colors ${currentPage === 1 ? 'opacity-50 cursor-not-allowed text-gray-300' : 'hover:bg-black hover:text-white text-gray-600'}`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Page Numbers */}
          {[...Array(totalPages)].map((_, index) => {
            const pageNum = index + 1;
            const isActive = currentPage === pageNum;
            return (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                  isActive 
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/40' 
                    : 'border border-gray-200 text-gray-600 hover:bg-black hover:text-white'
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          {/* Next Button */}
          <button 
             onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
             disabled={currentPage === totalPages}
             className={`w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center transition-colors ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed text-gray-300' : 'hover:bg-black hover:text-white text-gray-600'}`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </main>
      
      <div className="pb-12"></div>
    </div>
  );
}

// --- 4. Sub-components (แยกออกมาเพื่อความสะอาด) ---

// Component การ์ดสมัครสมาชิก
function SubscribeCard() {
  return (
    <div className="news-card reveal group bg-amber-50 rounded-2xl overflow-hidden border-2 border-dashed border-amber-400/50 relative flex flex-col justify-center items-center text-center p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
      <div className="w-20 h-20 bg-amber-400 rounded-full flex items-center justify-center mb-4 animate-wiggle border-2 border-black">
        <MailOpen className="w-8 h-8 text-black" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">
        ไม่พลาดทุกข่าวสาร
      </h3>
      <p className="text-gray-500 mb-6 text-sm">
        สมัครสมาชิกรับข่าวสารเบียร์ใหม่และรูปแมวน่ารักๆ ส่งตรงถึงอีเมล
      </p>
      <form className="w-full relative" onSubmit={(e) => e.preventDefault()}>
        <input 
          type="email" 
          placeholder="อีเมลของคุณ..." 
          className="w-full pl-4 pr-12 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all text-sm bg-white"
        />
        <button type="submit" className="absolute right-1 top-1 bg-black text-white w-10 h-10 rounded-full hover:bg-orange-500 transition-colors flex items-center justify-center">
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}

// Component การ์ดข่าวทั่วไป
function ArticleCard({ 
  tag, 
  tagColor, 
  imgSrc, 
  date, 
  category, 
  title, 
  desc, 
  hasCatOverlay, 
  isGrayscaleHover 
}: NewsItemProps) {
  return (
    <article className="news-card reveal group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm relative hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
      {tag && (
        <div className={`absolute top-4 left-4 z-20 ${tagColor} text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide`}>
          {tag}
        </div>
      )}
      
      <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 text-orange-500 transform group-hover:rotate-[-12deg] group-hover:scale-110">
        <PawPrint className="w-6 h-6 fill-current" />
      </div>

      <div className="h-64 overflow-hidden relative">
        <img 
          src={imgSrc} 
          alt={title} 
          className={`w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ${isGrayscaleHover ? 'grayscale group-hover:grayscale-0' : ''}`} 
        />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        {hasCatOverlay && (
          <div className="absolute bottom-[-10px] right-4 w-16 h-16 bg-white rounded-full flex items-center justify-center border-4 border-white shadow-md transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 delay-100">
            <Cat className="w-8 h-8 text-black" />
          </div>
        )}
      </div>
      
      <div className="p-6 relative">
        <div className="flex items-center text-sm text-gray-400 mb-3 gap-2">
          <Calendar className="w-3 h-3" /> {date}
          <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
          <span>{category}</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-500 transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="text-gray-500 mb-4 line-clamp-3 text-sm leading-relaxed">
          {desc}
        </p>
        <a href="#" className="inline-flex items-center text-orange-500 font-bold hover:gap-2 transition-all group-hover:text-orange-600">
          อ่านต่อ <ArrowRight className="ml-2 w-4 h-4" />
        </a>
      </div>
    </article>
  );
}