import { Link } from "react-router-dom";
import "./gigCard.scss";

const { BASE_URL } = import.meta.env;

interface ItemProps {
  id: number;
  img: string;
  pp: string;
  username: string;
  desc: string;
  star: number;
  price: number;
}

export default function GigCard({ item }: { item: ItemProps }) {
  return (
    <Link to="/gig/123" className="link">
      <div className="gigCard">
        <img src={item.img} alt="" />
        <div className="info">
          <div className="user">
            <img src={item.pp} alt="" />
            <span>{item.username}</span>
          </div>
          <p>{item.desc}</p>
          <div className="star">
            <img src={BASE_URL + "img/star.png"} alt="" />
            <span>{item.star}</span>
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
