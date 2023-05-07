import { useState } from "react";
import "./gigs.scss";
import { gigs } from "../../data";
import GigCard from "../../components/gigCard/GigCard";

const { BASE_URL } = import.meta.env;

enum Sort {
  CREATED_AT = "createdAt",
  SALES = "sales",
}

export default function Gigs() {
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("sales");

  const reSort = (type: Sort) => {
    setSort(type);
    setOpen(false);
  };

  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs">FIVERR &gt; GRAPHICS & DESIGN &gt;</span>
        <h1>AI Artists</h1>
        <p>
          Explore the boundaries of art and technology with Fiverr's AI artists
        </p>
        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input type="text" placeholder="min" />
            <input type="text" placeholder="max" />
            <button>Apply</button>
          </div>
          <div className="right">
            <span className="sortBy">Sort by</span>
            <span className="sortType">
              {sort === Sort.SALES ? "Best Selling" : "Newest"}
            </span>
            <img
              src={BASE_URL + "img/down.png"}
              alt=""
              onClick={() => setOpen(!open)}
            />
            {open && (
              <div className="rightMenu">
                {sort !== Sort.CREATED_AT && (
                  <span onClick={() => reSort(Sort.CREATED_AT)}>Newest</span>
                )}
                {sort !== Sort.SALES && (
                  <span onClick={() => reSort(Sort.SALES)}>Best Selling</span>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="cards">
          {gigs.map((gig) => (
            <GigCard key={gig.id} item={gig} />
          ))}
        </div>
      </div>
    </div>
  );
}
