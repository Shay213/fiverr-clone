import { Link } from "react-router-dom";
import "./projectCard.scss";

interface Item {
  id: number;
  img: string;
  pp: string;
  cat: string;
  username: string;
}

export default function ProjectCard({ item }: { item: Item }) {
  return (
    <Link to="/" className="link">
      <div className="projectCard">
        <img src={item.img} alt="" />
        <div className="info">
          <img src={item.pp} alt="" />
          <div className="texts">
            <h2>{item.cat}</h2>
            <span>{item.username}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
