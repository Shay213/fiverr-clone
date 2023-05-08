import "./item.scss";

export default function Item({ isOwner }: { isOwner: boolean }) {
  return (
    <div className={isOwner ? "item owner" : "item"}>
      <img
        src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt=""
      />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae modi
        explicabo repellendus, veritatis voluptatum maxime accusantium tempore
        quos amet laudantium molestias quaerat culpa ipsam fugiat inventore iure
        praesentium aspernatur dolorem?
      </p>
    </div>
  );
}
