import React, { useState } from "react";
import "./Slider.css";

const Slider = () => {

  const images = [
    "https://thumbs.dreamstime.com/b/assortment-mars-chocolate-bars-halloween-128640599.jpg",
    "https://www.bhg.com/thmb/hXGitX5759Ysns4hWC72hq6677s=/1983x0/filters:no_upscale():strip_icc()/History-candy-corn-4ab62bab8f9743779c52b6a652fa760c.jpg",
    "https://grandpajoescandyshop.com/wp-content/uploads/2022/01/cotton-candy-old-fashioned-JPEG.jpg",
  ];
  
  return (
    <div className="Slider">
        {images.map((imageUrl, index) => (
          <img key={index} src={imageUrl} alt="" />
        ))}
      </div>
  );
}

export default Slider;