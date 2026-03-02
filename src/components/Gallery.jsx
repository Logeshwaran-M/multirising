import React from "react";


const PhotoGallery = () => {
  const images = [
    {
      url: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=500",
      text: "Add Product to Cart"
    },
    {
      url: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=500",
      text: "Select International Address"
    },
    {
      url: "https://images.unsplash.com/photo-1606312619344-3627b1f74b77?w=500",
      text: "Add Delivery Address"
    },
    {
      url: "https://images.unsplash.com/photo-1542444459-db63c6c0a3c9?w=500",
      text: "Pay with Indian Currency"
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