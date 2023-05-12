import { useQuery } from "@tanstack/react-query";
import "./orders.scss";
import newRequest from "../../utils/newRequest";

const { BASE_URL } = import.meta.env;

interface Order {
  id: string;
  gigId: string;
  img: string | null;
  title: string;
  price: number;
  sellerId: string;
  buyerId: string;
  isCompleted: boolean | null;
  paymentIntent: string;
  createdAt: Date;
  updatedAt: Date;
  seller?: {
    username: string;
  };
  buyer?: {
    username: string;
  };
}

export default function Orders() {
  const strCurrUser = localStorage.getItem("currentUser");
  const currentUser = strCurrUser ? JSON.parse(strCurrUser) : null;

  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () => newRequest.get("/orders").then((res) => res.data),
  });

  return (
    <div className="orders">
      {isLoading ? (
        "Loading..."
      ) : error ? (
        "Something went wrong!"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Orders</h1>
          </div>
          <table>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>{currentUser?.isSeller ? "Buyer" : "Seller"}</th>
              <th>Contact</th>
            </tr>
            {data.map((order: Order) => (
              <tr key={order.id}>
                <td>
                  <img className="img" src={order.img || ""} alt="" />
                </td>
                <td>{order.title}</td>
                <td>{order.price}</td>
                <td>
                  {order.buyer
                    ? order.buyer.username
                    : order.seller
                    ? order.seller.username
                    : ""}
                </td>
                <td>
                  <img
                    className="delete"
                    src={BASE_URL + "img/message.png"}
                    alt=""
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
