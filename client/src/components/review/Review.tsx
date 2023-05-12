import "./review.scss";
import type { IReview } from "../reviews/Reviews";

const { BASE_URL } = import.meta.env;

enum Star {
  ONE = 1,
  TWO,
  THREE,
  FOUR,
  FIVE,
}

export default function Review({
  review,
  addHr,
}: {
  review: IReview;
  addHr: boolean;
}) {
  const starNum = Star[review.star as keyof typeof Star];
  return (
    <div className="review">
      <div className="user">
        <img
          className="reviewPP"
          src={review.user.img || BASE_URL + "img/noavatar.jpg"}
          alt=""
        />
        <div className="info">
          <span>{review.user.username}</span>
          <div className="country">
            <img
              src="https://images.pexels.com/photos/4386429/pexels-photo-4386429.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
            />
            <span>{review.user.country}</span>
          </div>
        </div>
      </div>
      <div className="stars">
        {Array(starNum)
          .fill(0)
          .map((el, i) => (
            <img src={BASE_URL + "img/star.png"} alt="" key={i} />
          ))}
        <span>{starNum}</span>
      </div>
      <p>{review.description}</p>
      <div className="helpful">
        <span>Helpful?</span>
        <img src={BASE_URL + "img/like.png"} alt="" />
        <span>Yes</span>
        <img src={BASE_URL + "img/dislike.png"} alt="" />
        <span>No</span>
      </div>
      {addHr && <hr />}
    </div>
  );
}
