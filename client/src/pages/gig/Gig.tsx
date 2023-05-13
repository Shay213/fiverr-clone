import { useQuery } from "@tanstack/react-query";
import MySlider from "../../components/slider/MySlider";
import "./gig.scss";
import newRequest from "../../utils/newRequest";
import { Link, useParams } from "react-router-dom";
import Reviews from "../../components/reviews/Reviews";

const { BASE_URL } = import.meta.env;

export default function Gig() {
  const { id } = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: [`gig${id}`],
    queryFn: () => newRequest.get(`gigs/single/${id}`).then((res) => res.data),
  });

  return (
    <div className="gig">
      {isLoading ? (
        "Loading..."
      ) : error ? (
        "Something went wrong!"
      ) : (
        <div className="container">
          <div className="left">
            <span className="breadCrumbs">
              FIVERR &gt; GRAPHICS & DESIGN &gt;
            </span>
            <h1>{data.title}</h1>
            <div className="user">
              <img
                className="pp"
                src={data.user.img || BASE_URL + "img/noavatar.jpg"}
                alt=""
              />
              <span>{data.user.username}</span>
              {!isNaN(data.totalStars / data.starNumber) && (
                <div className="stars">
                  {[
                    ...Array(
                      Math.round(data.totalStars / data.starNumber)
                    ).keys(),
                  ].map((el, i) => (
                    <img src={BASE_URL + "img/star.png"} alt="" key={i} />
                  ))}
                  <span>{Math.round(data.totalStars / data.starNumber)}</span>
                </div>
              )}
            </div>
            <MySlider
              visibleElements={1}
              elWidth={700}
              elHeight={500}
              gap={0}
              arrows={true}
              autoSlide={false}
              style={{ margin: 0 }}
            >
              {data.images.map((img: string) => (
                <img key={img} src={img} alt="" />
              ))}
            </MySlider>
            <h2>About This Gig</h2>
            <p>{data.desc}</p>
            <div className="seller">
              <h2>About The Seller</h2>
              <div className="user">
                <img
                  src={data.user.img || BASE_URL + "img/noavatar.jpg"}
                  alt=""
                />
                <div className="info">
                  <span>{data.user.username}</span>
                  {!isNaN(data.totalStars / data.starNumber) && (
                    <div className="stars">
                      {[
                        ...Array(
                          Math.round(data.totalStars / data.starNumber)
                        ).keys(),
                      ].map((el, i) => (
                        <img src={BASE_URL + "img/star.png"} alt="" key={i} />
                      ))}
                      <span>
                        {Math.round(data.totalStars / data.starNumber)}
                      </span>
                    </div>
                  )}
                  <button>Contact Me</button>
                </div>
              </div>
              <div className="box">
                <div className="items">
                  <div className="item">
                    <span className="title">From</span>
                    <span className="desc">{data.user.country}</span>
                  </div>
                  <div className="item">
                    <span className="title">Member since</span>
                    <span className="desc">
                      {new Date(data.user.createdAt).toDateString()}
                    </span>
                  </div>
                  <div className="item">
                    <span className="title">Avg. response time</span>
                    <span className="desc">4 hours</span>
                  </div>
                  <div className="item">
                    <span className="title">Last delivery</span>
                    <span className="desc">1 day</span>
                  </div>
                  <div className="item">
                    <span className="title">Languages</span>
                    <span className="desc">English</span>
                  </div>
                </div>
                <hr />
                <p>{data.user.desc}</p>
              </div>
            </div>
            {id && <Reviews gigId={id} />}
          </div>
          <div className="right">
            <div className="price">
              <h3>{data.shortTitle}</h3>
              <h2>$ {data.price}</h2>
            </div>
            <p>{data.shortDescription}</p>
            <div className="details">
              <div className="item">
                <img src={BASE_URL + "img/clock.png"} alt="" />
                <span>{data.deliveryTime} days Delivery</span>
              </div>
              <div className="item">
                <img src={BASE_URL + "img/recycle.png"} alt="" />
                <span>{data.revision} Revision</span>
              </div>
            </div>
            <div className="featuers">
              {data.features.map((feature: string) => (
                <div className="item" key={feature}>
                  <img src={BASE_URL + "img/greencheck.png"} alt="" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <Link to={`/pay/${id}`} className="link">
              <button>Continue</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
