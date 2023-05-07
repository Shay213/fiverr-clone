import MySlider from "../../components/slider/MySlider";
import "./gig.scss";

const { BASE_URL } = import.meta.env;

export default function Gig() {
  return (
    <div className="gig">
      <div className="container">
        <div className="left">
          <span className="breadCrumbs">
            FIVERR &gt; GRAPHICS & DESIGN &gt;
          </span>
          <h1>I will create ai generated art for you</h1>
          <div className="user">
            <img
              src="https://images.pexels.com/photos/3695799/pexels-photo-3695799.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
            />
            <span>John Doe</span>
            <div className="stars">
              <img src={BASE_URL + "img/star.png"} alt="" />
              <img src={BASE_URL + "img/star.png"} alt="" />
              <img src={BASE_URL + "img/star.png"} alt="" />
              <img src={BASE_URL + "img/star.png"} alt="" />
              <img src={BASE_URL + "img/star.png"} alt="" />
              <span>5</span>
            </div>
          </div>
          <MySlider visibleElements={1} elWidth={300} elHeight={300} gap={0}>
            <img
              src="https://images.pexels.com/photos/845405/pexels-photo-845405.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
            />
            <img
              src="https://images.pexels.com/photos/845405/pexels-photo-845405.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
            />
            <img
              src="https://images.pexels.com/photos/845405/pexels-photo-845405.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
            />
          </MySlider>
          <h2>About This Gig</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
            non tempore fugit quas nam odio omnis quod, culpa sint natus eum
            minus quia distinctio accusamus. Pariatur, dolorum omnis! Nam quod
            modi exercitationem harum consectetur minus non omnis deleniti,
            tenetur, voluptatibus ducimus atque facere inventore neque. Harum,
            iure! Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Molestiae consectetur recusandae numquam incidunt commodi veniam
            explicabo voluptatum in corporis iusto ut quaerat iure ab aut
            officiis dolor, natus earum? Quo vel cum quos earum, quas aperiam
            inventore dolorem atque.
          </p>
          <div className="seller">
            <h2>About The Seller</h2>
            <div className="user">
              <img
                src="https://images.pexels.com/photos/3695799/pexels-photo-3695799.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              />
              <div className="info">
                <span>John Doe</span>
                <div className="stars">
                  <img src={BASE_URL + "img/star.png"} alt="" />
                  <img src={BASE_URL + "img/star.png"} alt="" />
                  <img src={BASE_URL + "img/star.png"} alt="" />
                  <img src={BASE_URL + "img/star.png"} alt="" />
                  <img src={BASE_URL + "img/star.png"} alt="" />
                  <span>5</span>
                </div>
                <button>Contact Me</button>
              </div>
            </div>
            <div className="box">
              <div className="items">
                <div className="item">
                  <span className="title">From</span>
                  <span className="desc">USA</span>
                </div>
                <div className="item">
                  <span className="title">Member since</span>
                  <span className="desc">Aug 2022</span>
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
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
                dolorum corrupti, a adipisci libero illum eos in exercitationem,
                numquam asperiores doloribus ullam neque. Id eius, quae quod
                repellat repellendus praesentium.
              </p>
            </div>
          </div>
          <div className="reviews">
            <h1>Reviews</h1>
            <div className="item">
              <div className="user">
                <img
                  src="https://images.pexels.com/photos/3695799/pexels-photo-3695799.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt=""
                />
                <div className="info">
                  <span>John Doe</span>
                  <div className="country">
                    <img
                      src="https://images.pexels.com/photos/4386429/pexels-photo-4386429.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                      alt=""
                    />
                    <span>United States</span>
                  </div>
                </div>
              </div>
              <div className="stars">
                <img src={BASE_URL + "img/star.png"} alt="" />
                <img src={BASE_URL + "img/star.png"} alt="" />
                <img src={BASE_URL + "img/star.png"} alt="" />
                <img src={BASE_URL + "img/star.png"} alt="" />
                <img src={BASE_URL + "img/star.png"} alt="" />
                <span>5</span>
              </div>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim
                totam ratione eum itaque soluta quis, accusantium aliquid ea
                illo, dolore earum deserunt natus. Quidem accusamus voluptates
                corporis quis, molestiae fugit.
              </p>
              <div className="helpful">
                <span>Helpful?</span>
                <img src={BASE_URL + "img/like.png"} alt="" />
                <span>Yes</span>
                <img src={BASE_URL + "img/dislike.png"} alt="" />
                <span>No</span>
              </div>
            </div>
            <hr />

            <div className="item">
              <div className="user">
                <img
                  src="https://images.pexels.com/photos/3695799/pexels-photo-3695799.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt=""
                />
                <div className="info">
                  <span>John Doe</span>
                  <div className="country">
                    <img
                      src="https://images.pexels.com/photos/4386429/pexels-photo-4386429.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                      alt=""
                    />
                    <span>United States</span>
                  </div>
                </div>
              </div>
              <div className="stars">
                <img src={BASE_URL + "img/star.png"} alt="" />
                <img src={BASE_URL + "img/star.png"} alt="" />
                <img src={BASE_URL + "img/star.png"} alt="" />
                <img src={BASE_URL + "img/star.png"} alt="" />
                <img src={BASE_URL + "img/star.png"} alt="" />
                <span>5</span>
              </div>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim
                totam ratione eum itaque soluta quis, accusantium aliquid ea
                illo, dolore earum deserunt natus. Quidem accusamus voluptates
                corporis quis, molestiae fugit.
              </p>
              <div className="helpful">
                <span>Helpful?</span>
                <img src={BASE_URL + "img/like.png"} alt="" />
                <span>Yes</span>
                <img src={BASE_URL + "img/dislike.png"} alt="" />
                <span>No</span>
              </div>
            </div>
            <hr />

            <div className="item">
              <div className="user">
                <img
                  src="https://images.pexels.com/photos/3695799/pexels-photo-3695799.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt=""
                />
                <div className="info">
                  <span>John Doe</span>
                  <div className="country">
                    <img
                      src="https://images.pexels.com/photos/4386429/pexels-photo-4386429.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                      alt=""
                    />
                    <span>United States</span>
                  </div>
                </div>
              </div>
              <div className="stars">
                <img src={BASE_URL + "img/star.png"} alt="" />
                <img src={BASE_URL + "img/star.png"} alt="" />
                <img src={BASE_URL + "img/star.png"} alt="" />
                <img src={BASE_URL + "img/star.png"} alt="" />
                <img src={BASE_URL + "img/star.png"} alt="" />
                <span>5</span>
              </div>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim
                totam ratione eum itaque soluta quis, accusantium aliquid ea
                illo, dolore earum deserunt natus. Quidem accusamus voluptates
                corporis quis, molestiae fugit.
              </p>
              <div className="helpful">
                <span>Helpful?</span>
                <img src={BASE_URL + "img/like.png"} alt="" />
                <span>Yes</span>
                <img src={BASE_URL + "img/dislike.png"} alt="" />
                <span>No</span>
              </div>
            </div>
          </div>
        </div>
        <div className="right"></div>
      </div>
    </div>
  );
}
