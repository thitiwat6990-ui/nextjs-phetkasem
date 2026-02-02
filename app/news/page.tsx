'use client';

import React, { useEffect, useState } from 'react';
import { 
  Cat, 
  Beer, 
  PawPrint, 
  Calendar, 
  ArrowRight, 
  MailOpen, 
  Send, 
  ChevronLeft, 
  ChevronRight,
  Music,
  ShoppingBag,
  Heart,
  X
} from 'lucide-react';

// ข้อมูลจำลองสำหรับข่าวทั้งหมด 3 หน้า (18 รายการ)
const newsData = [
  // --- Page 1 ---
  {
      id: 1,
      tag: "Product",
      tagColor: "bg-amber-400 text-black",
      imgSrc: "/images/opening.png",
      date: "2 February 2026",
      category: "Product",
      title: "Grand Opening",
      desc: "A beverage of ZUNNERO brew with Japanese rice and roasted Thai rice",
      type: 'article',
      content: `MaewSalid

"Subtly fragrant Thai Toasted Rice meets wholesome Japanese Rice. Ready to serve!"

Taste Note: Malty profile with distinct rice aromas and a gentle hint of Thai toasted rice. Light-bodied, leaving a slight lingering sweetness and a herbal finish.`
  },
  {
      id: 2,
      tag: "Story",
      tagColor: "bg-gray-200 text-gray-800",
      imgSrc: "/images/forward.jpg",
      date: "1 February 2026",
      category: "Story",
      title: "Don't forget to go vote early!",
      desc: "Pls. Vote Maew Salid ",
      type: 'article',
      content: `Today, Do not Forget To Vote in the EarlyVoting! There are only a few hours left, meowww!`
  },
  {
      id: 3,
      tag: "Story",
      tagColor: "bg-gray-200 text-gray-800",
      imgSrc: "/images/fridaycat.jpg",
      date: "31 January 2026",
      category: "Story",
      title: "Friday Cat",
      desc: "Happy Friday with MAEW SALID",
      type: 'article',
      content: `It's finally Friday... I'm taking a little break today... Meowww.`
  },
  {
    id: 4,
    type: 'article',
    tag: "Meeting",
    tagColor: "bg-gray-200 text-gray-800",
    imgSrc: "/images/Nakornpaton.png.jpg",
    date: "31 January 2026",
    category: "Meeting",
    title: 'The first meeting of ZUNNERO',
    desc: " Introducing the artisans behind the brews at NerNoi Na Craft #3  Curated flavors from passionate brewers",
    content: `MEMORY LOG: The First Meeting of ZUNNERO

We had the wonderful opportunity to join "NerNoi Na Craft #3," a gathering filled with true craft lovers and talented brewers.

It was the event where we officially introduced the team behind the deliciousness of ZUNNERO. We got to exchange knowledge and received so much positive energy from everyone who came by to taste.`
  },
  {
    id: 5,
    tag: "Product",
      tagColor: "bg-amber-400 text-black",
      imgSrc: "/images/maew-goodvibe.jpg",
      date: "28 January 2026",
      category: "Product",
      title: "My Name is Maew Salid",
      desc: "Greetings, Humans! I am Maew Salid",
      type: 'article',
      content: `I’m here to represent the fun and flavor of ZUNNERO. Our drink is inspired by the mischievous and playful spirit of Thai cats, blended with only the finest ingredients.

Our signature? It’s the "Thai Toasted Rice." It brings a unique aroma that perfectly balances the smooth depth of "Japanese Rice." The result is a flavor that’s easy to drink but full of hidden layers.

If you see my face on a can anywhere... don't leave me there. Take me home with you!`
  },
  {
    id: 6,
    type: 'subscribe' 
  },
  // --- Page 2 (ข้อมูลใหม่) ---
  {
    id: 7,
    type: 'article',
    tag: "Vibe",
    tagColor: "bg-blue-500 text-white",
    imgSrc: "/images/sickbrew.jpg",
    date: "24 January 2026",
    category: "Meeting",
    title: "Made the undergrow fest",
    desc: "Sick brew head the under grow fest with Phetkasem brewing",
    content: `Total chaos (in a good way) at Undergrow Fest! 🔥🎸

Phetkasem Brewing and the Sick Brew crew pulled up to bring the noise to this underground music and art festival. The vibe was unmatched—fueled by the energy of the new generation, live shows, and ice-cold drinks. 🍻

We even dropped a new experimental brew for a taste test, and the feedback was off the charts! If you missed out this time, don't sweat it. Stay tuned for the next one`
  },
  {
    id: 8,
    type: 'article',
    tag: "Story",
    tagColor: "bg-amber-400 text-black",
    imgSrc: "/images/catintheboat.jpg",
    date: "23 January 2026",
    category: "Story",
    title: "Introducing our new Presenter!",
    desc: "Kitty All dressed up and ready to Join sickbrewheads",
    content: `Introducing our new (furry) Presenter! 😼✨

Seeing her dressed to kill like this, it’s none other than "Nong Kati," the younger sister of Bro Salid! Today she’s rocking a "ready-for-action" theme, prepared to vibe with the Sick Brew Heads crew.

Don't let that resting grump face fool you—she's actually very sweet (especially if you have creamy treats!). Please give a warm welcome to Nong Kati and keep her in your hearts, ZUNNERO fans!`
  },
  {
    id: 9,
      tag: "Brewery",
      tagColor: "bg-gray-200 text-gray-800",
      imgSrc: "/images/openingpks.jpg",
      date: "22 January 2026",
      category: "Brewery",
      title: "Hello Phetkasem brewing",
      desc: "Hi ! We are Phetkasem Brewing, the production house behind Zunnero beverages.",
      type: 'article',
      content: `Hello Earthlings! We are "Phetkasem Brewing." 🌍🍻

We are a small-batch brewery located in the Phetkasem area and the Production House behind the success of the Zunnero brand.

We believe that "Great beer starts with great care." That’s why we oversee every single step ourselves—from selecting the raw ingredients to the final canning process—to ensure that you get to drink nothing but the best`
  },
  {
    id: 10,
    type: 'article',
    tag: "Product",
    tagColor: "bg-orange-500 text-white",
    imgSrc: "/images/comingsoon.png",
    date: "14 January 2026",
    category: "Product",
    title: "Coming Soon",
    desc: "Get ready to meet our newest addition! What style will they bring? Stay tuned to find out!",
    content: `Get Ready for a New Thrill! 🚨

Coming soon: Phetkasem Brewing is about to drop a brand new Product Line for you to try. Let me whisper a secret... this is definitely not just your ordinary Lager or IPA. 🤫

What style is it? What will it taste like? Here’s a little hint: "Sour, Fizzy, and Refreshingly Aromatic." 🍋✨

Hit follow so you don't miss the reveal`
  },
  {
    id: 11,
    tag: "Story",
      tagColor: "bg-gray-200 text-gray-800",
      imgSrc: "/images/zunnerowhite.jpg",
      date: "6 January 2026",
      category: "Brand",
      title: "ZUNNERO",
      desc: "Launching our new brand: Zunnero.",
      type: 'article',
      content: `The Beginning of ZUNNERO

The time has finally come to officially launch our new brand: "ZUNNERO." It all started with a group of friends who share two obsessions: Craft Beer culture and... Cats! 🐱🍺

We wanted to create a brand that is accessible, fun, and uncomplicated—just like sitting down for a drink with your best friends, while a cat causes mischief right by your side.

We hope you’ll give ZUNNERO a warm place in your hearts`
    },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(newsData.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = newsData.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    const elements = document.querySelectorAll('.reveal');
    elements.forEach(el => {
      el.classList.remove('active');
    });

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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReadMore = (article) => {
    setSelectedArticle(article);
    document.body.style.overflow = 'hidden'; 
  };

  const handleCloseModal = () => {
    setSelectedArticle(null);
    document.body.style.overflow = 'auto'; 
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 relative overflow-x-hidden font-sans">
      {/* Inject Font and Custom Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700&display=swap');
        
        :root {
          --font-kanit: 'Kanit', sans-serif;
        }

        body {
          font-family: var(--font-kanit);
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes wiggle {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }

        @keyframes scaleIn {
          0% { opacity: 0; transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }

        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-wiggle { animation: wiggle 2s ease-in-out infinite; }
        .animate-scale-in { animation: scaleIn 0.3s ease-out forwards; }
        
        .reveal {
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.8s cubic-bezier(0.5, 0, 0, 1);
        }
        .reveal.active {
          opacity: 1;
          transform: translateY(0);
        }

        .blob {
          position: absolute;
          filter: blur(40px);
          z-index: 0;
          opacity: 0.4;
        }
      `}</style>

      {/* Decorative Blobs */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="blob bg-amber-400 w-64 h-64 rounded-full top-[-50px] right-[-50px] animate-float"></div>
        <div className="blob bg-orange-500 w-48 h-48 rounded-full bottom-[10%] left-[-20px] animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12 z-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
          {currentItems.map((item) => {
            if (item.type === 'subscribe') {
              return (
                 <div key={item.id} className="news-card reveal group bg-amber-50 rounded-2xl overflow-hidden border-2 border-dashed border-amber-400/50 relative flex flex-col justify-center items-center text-center p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
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

            return (
              <ArticleCard 
                key={item.id}
                tag={item.tag} 
                tagColor={item.tagColor}
                imgSrc={item.imgSrc}
                date={item.date}
                category={item.category}
                title={item.title}
                desc={item.desc}
                hasCatOverlay={item.hasCatOverlay}
                isGrayscaleHover={item.isGrayscaleHover}
                onReadMore={() => handleReadMore(item)} 
              />
            );
          })}

        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-16 gap-2">
          <button 
            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center transition-colors ${currentPage === 1 ? 'opacity-50 cursor-not-allowed text-gray-300' : 'hover:bg-black hover:text-white text-gray-600'}`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

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

          <button 
             onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
             disabled={currentPage === totalPages}
             className={`w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center transition-colors ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed text-gray-300' : 'hover:bg-black hover:text-white text-gray-600'}`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </main>
      
      {/* Modal Popup for Read More */}
      {selectedArticle && (
        // แก้ไข: เปลี่ยน z-50 เป็น z-[9999] เพื่อให้ Modal อยู่เหนือ Header แน่นอน
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={handleCloseModal}
          ></div>

          {/* Modal Container */}
          <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col md:flex-row animate-scale-in">
            {/* Close Button */}
            <button 
              onClick={handleCloseModal}
              className="absolute top-4 right-4 z-20 bg-white/80 hover:bg-black hover:text-white text-gray-800 p-2 rounded-full backdrop-blur-md transition-all shadow-lg"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left Side: Image (50%) */}
            <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-gray-100">
              <img 
                src={selectedArticle.imgSrc} 
                alt={selectedArticle.title} 
                className="w-full h-full object-cover"
              />
               <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:hidden"></div>
            </div>

            {/* Right Side: Content (50%) */}
            <div className="w-full md:w-1/2 p-8 md:p-10 overflow-y-auto bg-white flex flex-col mt-10 md:mt-0">
               <div className="mb-6">
                 <span className={`inline-block ${selectedArticle.tagColor} text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-3`}>
                   {selectedArticle.tag}
                 </span>
                 <h2 className="text-3xl font-bold text-gray-900 leading-tight">
                   {selectedArticle.title}
                 </h2>
               </div>
               
               <div className="flex items-center text-sm text-gray-500 mb-6 gap-3 border-b border-gray-100 pb-6">
                 <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {selectedArticle.date}</div>
                 <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                 <div className="font-medium text-orange-500">{selectedArticle.category}</div>
               </div>

               <div className="prose prose-orange text-gray-600 leading-relaxed flex-grow">
                  <p className="text-lg font-medium text-gray-800 mb-4 italic border-l-4 border-amber-400 pl-4 bg-amber-50 py-2 pr-2 rounded-r-lg">
                    {selectedArticle.desc}
                  </p>
                  
                  {/* Dynamic Content */}
                  <div className="space-y-4 text-gray-600 whitespace-pre-line">
                    {selectedArticle.content || "ไม่มีเนื้อหาเพิ่มเติม..."}
                  </div>
               </div>
            </div>
          </div>
        </div>
      )}

      <div className="pb-12"></div>
    </div>
  );
}

// Sub-component for Article Cards
function ArticleCard({ tag, tagColor, imgSrc, date, category, title, desc, hasCatOverlay, isGrayscaleHover, onReadMore }) {
  return (
    <article className="news-card reveal group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm relative hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col h-full">
      <div className={`absolute top-4 left-4 z-20 ${tagColor} text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide`}>
        {tag}
      </div>
      
      <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 text-orange-500 transform group-hover:rotate-[-12deg] group-hover:scale-110">
        <PawPrint className="w-6 h-6 fill-current" />
      </div>

      <div className="h-64 overflow-hidden relative shrink-0">
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
      
      <div className="p-6 relative flex flex-col grow">
        <div className="flex items-center text-sm text-gray-400 mb-3 gap-2">
          <Calendar className="w-3 h-3" /> {date}
          <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
          <span>{category}</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-500 transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="text-gray-500 mb-4 line-clamp-3 text-sm leading-relaxed flex-grow">
          {desc}
        </p>
        <div className="mt-auto pt-2">
          <button 
            onClick={(e) => { e.preventDefault(); onReadMore(); }}
            className="inline-flex items-center text-orange-500 font-bold hover:gap-2 transition-all group-hover:text-orange-600 cursor-pointer"
          >
            see more <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );
}