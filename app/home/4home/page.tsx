import ProductCarousel from "@/component/carousel2/page";
import "./page.css";

export default function Process() {
  return (
    <div>
      <div className="header">
        <h1>Product flavors</h1>
      </div>

      <div className="banner">
        <div className="product">
          <div className="soda"></div>
        </div>
        <div className="rock">
          <img></img>
          <img src="/images/mountain.png"></img>
        </div>
      </div>

      <div className="banner-sing">
        <div className="singsep">
          <div className="soda2"></div>
        </div>
      </div>

      <div className="banner-razz">
        <div className="razz">
          <div className="soda3"></div>
        </div>
      </div>

      <div className="banner-bluefeez">
        <div className="bluefeez">
          <div className="soda4"></div>
        </div>
      </div>

      <div className="banner-coco">
        <div className="coco">
          <div className="soda5"></div>
        </div>
      </div>

      <div>
        <p className="sunnero">sunnero by phetkasembrewing</p>
      </div>
      <div>
        <ProductCarousel />
      </div>
    </div>
  );
}
