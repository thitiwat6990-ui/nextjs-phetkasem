import "./page.css";

export default function Second() {
  return (
    <div >
        <div>
            <h1 className='head-des'>crafted to inspire</h1>
        </div>
      <div className='allmain'>
        <h2 className='description-main'>
          These unique beers stand out from the mainstream with a diverse array
          of flavors and styles.
          <br /> They are meticulously crafted using creativity and imagination
          to perfect every detail of taste <br /> color, and aroma. This process
          is driven by a passion for experimentation and an unwavering <br />{" "}
          commitment to using only the finest ingredients.
        </h2>
        <img src='/images/cheers.png' className='cheers'></img>
      </div>
    </div>
  );
}
