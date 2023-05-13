import { Link } from "react-router-dom";
import "./messages.scss";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import moment from "moment";

interface Conversation {
  id: string;
  sellerId: string;
  buyerId: string;
  readBySeller: boolean;
  readByBuyer: boolean;
  lastMessage: string | null;
  createdAt: Date;
  updatedAt: Date;
  buyer: {
    username: string;
  };
  seller: {
    username: string;
  };
}

export default function Messages() {
  const strCurrUser = localStorage.getItem("currentUser");
  const currUser = strCurrUser ? JSON.parse(strCurrUser) : null;

  const { isLoading, error, data } = useQuery({
    queryKey: ["messages"],
    queryFn: () => newRequest.get("/conversations").then((res) => res.data),
  });

  return (
    <div className="messages">
      {isLoading ? (
        "Loading..."
      ) : error ? (
        "Something went wrong!"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Messages</h1>
          </div>
          <table>
            <tr>
              <th>{currUser.isSeller ? "Buyer" : "Seller"}</th>
              <th>Last Message</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
            {data.map((c: Conversation) => (
              <tr className="active" key={c.id}>
                <td>
                  {currUser.isSeller ? c.buyer.username : c.seller.username}
                </td>
                <td>
                  <Link to="/message/123" className="link">
                    {(c?.lastMessage ?? "").substring(0, 100)}...
                  </Link>
                </td>
                <td>{moment(c.updatedAt).fromNow()}</td>
                <td>
                  <button>Mark as Read</button>
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
}
