import { useEffect, useRef, useState } from "react";
import "./gigs.scss";
import GigCard from "../../components/gigCard/GigCard";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useLocation } from "react-router-dom";

const { BASE_URL } = import.meta.env;

enum Sort {
  CREATED_AT = "createdAt",
  SALES = "sales",
}

interface Gig {
  id: string;
  category: string;
  cover: string;
  createdAt: string;
  deliveryTime: number;
  desc: string;
  features: string[];
  images: string[];
  price: number;
  revision: number;
  sales: number;
  shortDescription: string;
  shortTitle: string;
  starNumber: number;
  title: string;
  totalStars: number;
  updatedAt: string;
  userId: string;
}

export default function Gigs() {
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("sales");
  const minRef = useRef<HTMLInputElement | null>(null);
  const maxRef = useRef<HTMLInputElement | null>(null);

  const { search } = useLocation();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: [""],
    queryFn: () =>
      newRequest
        .get(
          `/gigs${search}${
            minRef.current?.value && "&min=" + minRef.current.value
          }${
            maxRef.current?.value && "&max=" + maxRef.current.value
          }&sort=${sort}`
        )
        .then((res) => res.data),
  });

  const reSort = (type: Sort) => {
    setSort(type);
    setOpen(false);
  };

  const apply = () => {
    refetch();
  };

  useEffect(() => {
    refetch();
  }, [sort]);

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
            <input type="text" placeholder="min" ref={minRef} />
            <input type="text" placeholder="max" ref={maxRef} />
            <button onClick={apply}>Apply</button>
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
          {isLoading
            ? "Loading..."
            : error
            ? "Something went wrong!"
            : data.map((gig: Gig) => <GigCard key={gig.id} item={gig} />)}
        </div>
      </div>
    </div>
  );
}
