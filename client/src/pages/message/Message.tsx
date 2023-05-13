import { Link, SubmitFunction, useParams } from "react-router-dom";
import "./message.scss";
import Item from "./Item";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { FormEventHandler } from "react";

export interface Message {
  id: string;
  userId: string;
  conversationId: string;
  description: string;
  user: {
    img: string;
  };
}

interface NewMessage {
  conversationId: string;
  desc: string;
}

export default function Message() {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["messages"],
    queryFn: () => newRequest.get(`/messages/${id}`).then((res) => res.data),
  });

  const mutation = useMutation({
    mutationFn: (newMessage: NewMessage) =>
      newRequest.post("/messages", newMessage),
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]);
    },
  });

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    if (!id) return;
    const form = e.target as HTMLFormElement;
    const firstField = form.elements[0] as HTMLFormElement;

    mutation.mutate({
      conversationId: id,
      desc: firstField.value,
    });
    firstField.value = "";
  };

  return (
    <div className="message">
      <div className="container">
        <span className="breadcrumbs">
          <Link to="/messages" className="link">
            Messages
          </Link>{" "}
          &gt; John Doe &gt;
        </span>
        {isLoading ? (
          "Loading..."
        ) : error ? (
          "Something went wrong!"
        ) : (
          <div className="messages">
            {data.map((m: Message) => (
              <Item m={m} key={m.id} />
            ))}
          </div>
        )}
        <hr />
        <form className="write" onSubmit={handleSubmit}>
          <textarea
            name=""
            placeholder="Write a message..."
            id=""
            cols={30}
            rows={5}
          ></textarea>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}
