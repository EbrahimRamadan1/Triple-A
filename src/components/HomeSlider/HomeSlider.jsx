import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "../../assets/images/HomeSlider1.jpg";
import img2 from "../../assets/images/HomeSlider2.jpg";
// import img3 from "../../assets/images/HomeSlider3.jpg";
// import img4 from "../../assets/images/HomeSlider4.jpg";
// import img5 from "../../assets/images/HomeSlider5.jpg";
// import img6 from "../../assets/images/HomeSlider6.jpg";

export default function SimpleSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      <div>
        <img className=" h-80 w-full object-cover" src={img1} alt="" />
      </div>
      <div>
        <img className=" h-30 w-full object-cover" src={img2} alt="" />
      </div>
      {/* <div>
        <img className="w-full h-30" src={img3} alt="" />
      </div>
      <div>
        <img className="w-full h-30" src={img4} alt="" />
      </div>
      <div>
        <img className="w-full h-30" src={img5} alt="" />
      </div>
      <div>
        <img className="w-full h-30" src={img6} alt="" />
      </div> */}
    </Slider>
  );
}
