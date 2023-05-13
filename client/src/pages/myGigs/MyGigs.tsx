import { Link } from "react-router-dom";
import "./myGigs.scss";
import getCurrentUser from "../../utils/getCurrentUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import type { Gig } from "../gigs/Gigs";

const { BASE_URL } = import.meta.env;

export default function MyGigs() {
  const currUser = getCurrentUser();
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["myGigs"],
    queryFn: () =>
      newRequest.get(`/gigs?userId=${currUser.id}`).then((res) => res.data),
  });

  const mutation = useMutation({
    mutationFn: (id: string) => newRequest.delete(`/gigs/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["myGigs"] }),
  });

  const handleDelete = (id: string) => {
    mutation.mutate(id);
  };

  return (
    <div className="myGigs">
      {isLoading ? (
        "Loading..."
      ) : error ? (
        "Something went wrong!"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Gigs</h1>
            <Link to="/add">
              <button>Add New Gig</button>
            </Link>
          </div>
          <table>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Sales</th>
              <th>Action</th>
            </tr>
            {data.map((gig: Gig) => (
              <tr key={gig.id}>
                <td>
                  <img className="img" src={gig.cover} alt="" />
                </td>
                <td>{gig.title}</td>
                <td>{gig.price}</td>
                <td>{gig.sales}</td>
                <td>
                  <img
                    className="delete"
                    src={BASE_URL + "img/delete.png"}
                    alt=""
                    onClick={() => handleDelete(gig.id)}
                  />
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
}
