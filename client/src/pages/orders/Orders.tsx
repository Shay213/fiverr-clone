import { useMutation, useQuery } from "@tanstack/react-query";
import "./orders.scss";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

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
  seller: {
    username: string;
  };
  buyer: {
    username: string;
  };
}

interface NewConv {
  conversationId: string;
  buyerId: string;
  sellerId: string;
}

export default function Orders() {
  const strCurrUser = localStorage.getItem("currentUser");
  const currentUser = strCurrUser ? JSON.parse(strCurrUser) : null;

  const navigate = useNavigate();

  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () => newRequest.get("/orders").then((res) => res.data),
  });

  const mutation = useMutation({
    mutationFn: (newConv: NewConv) =>
      newRequest.get(`/conversations/single/${newConv.conversationId}`),
    onError: async (err: any, newConv) => {
      if (err.response.status === 404) {
        try {
          const res = await newRequest.post("/conversations/", {
            to: currentUser.isSeller ? newConv.buyerId : newConv.sellerId,
          });
          navigate(`/message/${res.data.id}`);
        } catch (error) {
          console.log(error);
        }
      }
    },
    onSuccess: (res) => navigate(`/message/${res.data.id}`),
  });

  const handleContact = (order: Order) => {
    const conversationId = order.sellerId + order.buyerId;
    mutation.mutate({
      conversationId,
      buyerId: order.buyerId,
      sellerId: order.sellerId,
    });
  };

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
                <td>{order.seller.username}</td>
                <td>
                  <img
                    className="delete"
                    src={BASE_URL + "img/message.png"}
                    alt=""
                    onClick={() => handleContact(order)}
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
