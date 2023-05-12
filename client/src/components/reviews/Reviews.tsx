import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Review from "../review/Review";
import "./reviews.scss";
import newRequest from "../../utils/newRequest";
import { FormEventHandler } from "react";

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

interface NewReview {
  gigId: string;
  description: string;
  star: number;
}

export default function Reviews({ gigId }: ReviewsProps) {
  const { isLoading, error, data } = useQuery({
    queryKey: ["reviews"],
    queryFn: () => newRequest.get(`/reviews/${gigId}`).then((res) => res.data),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newReview: NewReview) =>
      newRequest.post("/reviews", newReview),
    onError: (err: any) => console.log(err),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["reviews"] }),
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const description = (e.target as HTMLFormElement)
      .elements[0] as HTMLFormElement;
    const star = (e.target as HTMLFormElement).elements[1] as HTMLFormElement;

    mutation.mutate({
      gigId,
      description: description.value,
      star: star.value,
    });
  };
  return (
    <div className="reviews">
      <h1>Reviews</h1>
      {isLoading
        ? "Loading..."
        : error
        ? "Something went wrong!"
        : data.map((review: IReview, i: number) => (
            <Review key={review.id} review={review} />
          ))}
      <div className="add">
        <h3>Add a review</h3>
        <form action="" onSubmit={handleSubmit} className="addForm">
          <input type="text" placeholder="Write your opinion" />
          <select name="" id="">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <button>Send</button>
        </form>
      </div>
    </div>
  );
}
