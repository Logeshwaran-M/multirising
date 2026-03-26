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
import img11 from "../assets/country/china.jpg";
import img12 from "../assets/country/Indonesia.jpg";
import img13 from "../assets/country/Bangladesh.png";
import img14 from "../assets/country/russia.jpg";
import img15 from "../assets/country/Mexico.webp";
import img16 from "../assets/country/Egypt.webp";
import img17 from "../assets/country/Vietnam.jpg";
import img18 from "../assets/country/Sweden.webp";
import img19 from "../assets/country/Philippines.webp";
import img20 from "../assets/country/Belgium.jpg";
import img21 from "../assets/country/Switzerland.jpg";
import img22 from "../assets/country/Iran.avif";
import img23 from "../assets/country/Germany.png";
import img24 from "../assets/country/Thailand.webp";
import img25 from "../assets/country/italy.jpg";
import img26 from "../assets/country/Spain.webp";
import img27 from "../assets/country/malaysia.jpg";
import img28 from "../assets/country/SaudiArabia.jpg";
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
  { img: img11, name: "China" },
  { img: img12, name: "Indonesia" },
  { img: img13, name: "Bangladesh" },
  { img: img14, name: "Russia" },
  { img: img15, name: "Mexico" },
  { img: img16, name: "Egypt" },
  { img: img17, name: "Vietnam" },
  { img: img18, name: "Sweden" },
  { img: img19, name: "Philippines" },
  { img: img20, name: "Belgium" },
  { img: img21, name: "Switzerland" },
  { img: img22, name: "Iran" },
  { img: img23, name: "Germany" },
  { img: img24, name: "Thailand" },
  { img: img25, name: "Italy" },
  { img: img26, name: "Spain" },
  { img: img27, name: "Malaysia" },
  { img: img28, name: "Saudi Arabia" },
];

const MultiImageCarousel = () => {
  // Duplicate the array for continuous scroll
  const continuousCountries = [...countries, ...countries];

  return (
    <Container className="my-5">
      <div className="scroll-wrapper">
        <div className="scroll-track">
          {continuousCountries.map((country, index) => (
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