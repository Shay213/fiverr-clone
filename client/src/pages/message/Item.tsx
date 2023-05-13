import "./item.scss";
import type { Message } from "./Message";

export default function Item({ m }: { m: Message }) {
  const strCurrUser = localStorage.getItem("currentUser");
  const currUser = strCurrUser ? JSON.parse(strCurrUser) : null;

  return (
    <div className={currUser?.id === m?.userId ? "item owner" : "item"}>
      <img src={m?.user?.img ?? ""} alt="" />
      <p>{m?.description ?? ""}</p>
    </div>
  );
}
