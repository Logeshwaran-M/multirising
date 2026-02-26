import { Container } from "react-bootstrap";
import "./css/carousel.css";

import img1 from "../assets/country/Australia.avif";
import img2 from "../assets/country/Canada.avif";
import img3 from "../assets/country/england.avif";
import img4 from "../assets/country/Europe.avif";
import img5 from "../assets/country/France.png";
import img6 from "../assets/country/Japan.png";
import img7 from "../assets/country/Singapore.png";
import img8 from "../assets/country/UAE.png";
import img9 from "../assets/country/uk.png";
import img10 from "../assets/country/USA.avif";

const countries = [
  { img: img1, name: "Australia" },
  { img: img2, name: "Canada" },
  { img: img3, name: "England" },
  { img: img4, name: "Europe" },
  { img: img5, name: "France" },
  { img: img6, name: "Japan" },
  { img: img7, name: "Singapore" },
  { img: img8, name: "UAE" },
  { img: img9, name: "UK" },
  { img: img10, name: "USA" },
];

const MultiImageCarousel = () => {
  return (
    <Container className="my-5 overflow-hidden">
      <div className="scroll-wrapper">
        <div className="scroll-track">
          {countries.concat(countries).map((country, index) => (
            <div key={index} className="country-item">
              <img
                src={country.img}
                alt={country.name}
                className="scroll-image"
              />
              <span className="country-name">{country.name}</span>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default MultiImageCarousel;