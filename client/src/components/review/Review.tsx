import "./review.scss";

const { BASE_URL } = import.meta.env;

export default function Review({ review }) {
  return (
    <div className="review">
      <div className="user">
        <img
          className="reviewPP"
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
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim totam
        ratione eum itaque soluta quis, accusantium aliquid ea illo, dolore
        earum deserunt natus. Quidem accusamus voluptates corporis quis,
        molestiae fugit.
      </p>
      <div className="helpful">
        <span>Helpful?</span>
        <img src={BASE_URL + "img/like.png"} alt="" />
        <span>Yes</span>
        <img src={BASE_URL + "img/dislike.png"} alt="" />
        <span>No</span>
      </div>
    </div>
  );
}
