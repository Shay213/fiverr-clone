import { useQuery } from "@tanstack/react-query";
import Review from "../review/Review";
import "./reviews.scss";
import newRequest from "../../utils/newRequest";

interface ReviewsProps {
  gigId: string;
}

export interface IReview {
  id: string;
  gigId: string;
  userId: string;
  star: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  user: {
    username: string;
    img: string;
    country: string;
  };
}

export default function Reviews({ gigId }: ReviewsProps) {
  const { isLoading, error, data } = useQuery({
    queryKey: ["reviews"],
    queryFn: () => newRequest.get(`/reviews/${gigId}`).then((res) => res.data),
  });

  console.log(data);

  return (
    <div className="reviews">
      <h1>Reviews</h1>
      {isLoading
        ? "Loading..."
        : error
        ? "Something went wrong!"
        : data.map((review: IReview) => (
            <Review key={review.id} review={review} />
          ))}
    </div>
  );
}
