import Carousel from "@/component/carousel/page";
import Second from "./secondhome/page";
import ParallaxHome from "./3rdhome/parallax";
import Process from "./4home/page";
import Footer from "../footer/page";

export default function Home() {
  return (
    <div>
      <header>
        <Carousel />
      </header>
      
        <Second />
        <ParallaxHome />
        <Process />
      
      <footer>
        <Footer/>
      </footer>
    </div>
  );
}
