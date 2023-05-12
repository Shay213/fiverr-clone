import { Link, useLocation, useNavigate } from "react-router-dom";
import "./navbar.scss";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const { BASE_URL } = import.meta.env;

export default function Navbar() {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  const { pathname } = useLocation();

  const strCurrUser = localStorage.getItem("currentUser");
  const currUser = strCurrUser ? JSON.parse(strCurrUser) : null;

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);

    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: () => newRequest.post("/auth/logout"),
    onSuccess: () => {
      localStorage.removeItem("currentUser");
      navigate("/");
    },
    onError: (err) => console.log(err),
  });

  const handleLogout = () => {
    mutation.mutate();
  };

  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link to="/" className="link">
            <span className="text">fiverr</span>
          </Link>
          <span className="dot">.</span>
        </div>
        <div className="links">
          <span>Fiverr Business</span>
          <span>Explore</span>
          <span>English</span>
          <Link to="/login" className="link">
            <span>Sign in</span>
          </Link>
          {!currUser?.isSeller && <span>Become a Seller</span>}
          {!currUser && (
            <Link className="link" to="/register">
              <button>Join</button>
            </Link>
          )}
          {currUser && (
            <div className="user" onClick={() => setOpen(!open)}>
              <img
                src={BASE_URL + (currUser.img || "img/noavatar.jpg")}
                alt=""
              />
              <span>{currUser?.username}</span>
              {open && (
                <div className="options">
                  {currUser?.isSeller && (
                    <>
                      <Link to="/mygigs" className="link">
                        Gigs
                      </Link>
                      <Link to="/add" className="link">
                        Add New Gig
                      </Link>
                    </>
                  )}
                  <Link to="/orders" className="link">
                    Orders
                  </Link>
                  <Link to="/messages" className="link">
                    Messages
                  </Link>
                  <span className="link" onClick={handleLogout}>
                    Logout
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {(active || pathname !== "/") && (
        <>
          <hr />
          <div className="menu">
            <Link to="/" className="link">
              Graphics & Design
            </Link>
            <Link to="/" className="link">
              Video & Animation
            </Link>
            <Link to="/" className="link">
              Writing & Translation
            </Link>
            <Link to="/" className="link">
              AI Services
            </Link>
            <Link to="/" className="link">
              Digital Marketing
            </Link>
            <Link to="/" className="link">
              Music & Audio
            </Link>
            <Link to="/" className="link">
              Programming & Tech
            </Link>
            <Link to="/" className="link">
              Business
            </Link>
            <Link to="/" className="link">
              Lifestyle
            </Link>
          </div>
          <hr />
        </>
      )}
    </div>
  );
}
