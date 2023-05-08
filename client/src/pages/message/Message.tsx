import { Link } from "react-router-dom";
import "./message.scss";
import Item from "./Item";

export default function Message() {
  return (
    <div className="message">
      <div className="container">
        <span className="breadcrumbs">
          <Link to="/messages" className="link">
            Messages
          </Link>{" "}
          &gt; John Doe &gt;
        </span>
        <div className="messages">
          <Item isOwner={false} />
          <Item isOwner={true} />
          <Item isOwner={false} />
          <Item isOwner={true} />
          <Item isOwner={false} />
          <Item isOwner={true} />
        </div>
        <hr />
        <div className="write">
          <textarea
            name=""
            placeholder="Write a message..."
            id=""
            cols={30}
            rows={5}
          ></textarea>
          <button>Send</button>
        </div>
      </div>
    </div>
  );
}
