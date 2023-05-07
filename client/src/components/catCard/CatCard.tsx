import { Link } from "react-router-dom";
import "./catCard.scss";

interface Item {
  id: number;
  title: string;
  desc: string;
  img: string;
}

export default function CatCard({ item }: { item: Item }) {
  return (
    <Link to="/gigs?cat=design">
      <div className="catCard">
        <img src={item.img} alt="" />
        <span className="desc">{item.desc}</span>
        <span className="title">{item.title}</span>
      </div>
    </Link>
  );
}
