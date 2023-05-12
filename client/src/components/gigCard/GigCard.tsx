import { Link } from "react-router-dom";
import "./gigCard.scss";

const { BASE_URL } = import.meta.env;

interface ItemProps {
  images: string[];
  cover: string;
  desc: string;
  starNumber: number;
  price: number;
}

export default function GigCard({ item }: { item: ItemProps }) {
  return (
    <Link to="/gig/123" className="link">
      <div className="gigCard">
        <img src={item.images[0]} alt="" />
        <div className="info">
          <div className="user">
            <img src={item.cover} alt="" />
            <span>Test username</span>
          </div>
          <p>{item.desc}</p>
          <div className="star">
            <img src={BASE_URL + "img/star.png"} alt="" />
            <span>{item.starNumber}</span>
          </div>
        </div>
        <hr />
        <div className="details">
          <img src={BASE_URL + "img/heart.png"} alt="" />
          <div className="price">
            <span>STARTING AT</span>
            <h2>${item.price}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
}
