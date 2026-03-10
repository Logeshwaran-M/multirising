import React from "react";
import plate from "../assets/round.png"
import eco from "../assets/leaf.jpg"
import collect from "../assets/process/collect.png"
import dry from "../assets/process/dry.png"
import cut from "../assets/process/cut.png"
import wash from "../assets/process/wash.png"
import pack from "../assets/process/pack.png"




const PhotoGallery = () => {
  const images = [
    {
      url: plate,
      text: "Round Plate"
    },
    {
      url: eco,
      text: "Eco Friendly"
    },
    {
      url: collect,
      text: "Collecting Process"
    },
    {
      url: dry,
      text: "Dry Process"
    },

     {
      url: cut,
      text: "Cutting Process"
    },
     {
      url: wash,
      text: "Washing Process"
    },
     {
      url: pack,
      text: "Packing Process"
    }
  ];

  return (
    <div className="container my-5 "  style={{paddingTop:"40px"}}>
      <div className="row g-4">
        {images.map((item, index) => (
          <div className="col-md-3 col-sm-6" key={index}>
            <div className="gallery-box">
              <img src={item.url} alt="" className="img-fluid" />
              <div className="overlay">
                <h5>{item.text}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;