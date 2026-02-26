import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import banner from "../assets/abroad.png";
import MultiImageCarousel from "./Carosal";
import frame1 from "../assets/Frame1.webp"
import frame2 from "../assets/Frame2.webp"
import frame3 from "../assets/Frame3.webp"
import frame4 from "../assets/Frame4.webp"

const CountriesSection = () => {



const images = [
  {
    url: frame1,
    
  },
  {
    url: frame2,
 
  },
  {
    url: frame3,
 
  },
  {
    url: frame4,
   
  }
];
 const products = [
  {
    id: 1,
    name: "Premium Gift Hamper",
    price: 2499,
    image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=500"
  },
  {
    id: 2,
    name: "Organic Honey Jar",
    price: 599,
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=500"
  },
  {
    id: 3,
    name: "Handmade Chocolate Box",
    price: 899,
    image: "https://images.unsplash.com/photo-1606312619344-3627b1f74b77?w=500"
  },
  {
    id: 4,
    name: "Traditional Snacks Combo",
    price: 1299,
    image: "https://images.unsplash.com/photo-1604908554027-1c6e8b9e8d6e?w=500"
  },
  {
    id: 5,
    name: "Festival Special Kit",
    price: 1999,
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=500"
  },
  {
    id: 6,
    name: "Dry Fruits Pack",
    price: 1499,
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500"
  },
  {
    id: 7,
    name: "Aromatic Candle Set",
    price: 799,
    image: "https://images.unsplash.com/photo-1602874801006-9d8b6c1a5f63?w=500"
  },
  {
    id: 8,
    name: "Luxury Tea Collection",
    price: 999,
    image: "https://images.unsplash.com/photo-1542444459-db63c6c0a3c9?w=500"
  }
];



  return (
    <div>

      {/* 🔹 Banner */}
      <div className="position-relative">
        <img
          src={banner}
          alt="Send Gifts Worldwide"
          className="w-100"
          style={{ height: "450px", objectFit: "cover" }}
        />
       
      </div>

      {/* 🔹 Countries Scroll */}
      <MultiImageCarousel />

      {/* 🔹 Products */}
      <Container className="my-5">
        <h2 className="text-center mb-5 fw-bold ">
          Our Premium Products
        </h2>

        <Row>
          {products.map((product) => (
            <Col key={product.id} lg={3} md={4} sm={6} className="mb-4">
             <Card className="h-100 shadow-sm border-0 rounded-4 hover-card">
                <Card.Img
                  variant="top"
                  src={product.image}
                  style={{ height: "220px", objectFit: "cover" }}
                />
                <Card.Body className="text-center">
                  <Card.Title className="fw-semibold">
                    {product.name}
                  </Card.Title>

                  <Card.Text className="fw-bold text-primary fs-5">
                    ₹{product.price}
                  </Card.Text>

                  <Button
                    variant="primary"
                    className="w-100 rounded-pill"
                   
                  >
                    Add to Cart
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

    <div className="row g-4 mb-4">
  {images.map((item, index) => (
    <div className="col-md-3" key={index}>
      <div
        className="image-box"
        onClick={() =>
          index === 0 && setCartCount(prev => prev + 1)
        }
      >
        <img
          src={item.url}
          className="img-fluid"
          alt=""
        />
      </div>
    </div>
  ))}
</div>
    </div>
  );
};

export default CountriesSection;