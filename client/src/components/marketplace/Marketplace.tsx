import "./marketplace.scss";

const { BASE_URL } = import.meta.env;

export default function Marketplace() {
  return (
    <div className="marketplace">
      <div className="container">
        <h1>Explore the marketplace</h1>
        <div className="grid">
          <div className="item">
            <img
              src={BASE_URL + "img/programming-code-svgrepo-com.svg"}
              alt=""
            />
            <hr />
            <span>Graphics & Design</span>
          </div>
          <div className="item">
            <img
              src={BASE_URL + "img/programming-code-svgrepo-com.svg"}
              alt=""
            />
            <hr />
            <span>Graphics & Design</span>
          </div>
          <div className="item">
            <img
              src={BASE_URL + "img/programming-code-svgrepo-com.svg"}
              alt=""
            />
            <hr />
            <span>Graphics & Design</span>
          </div>
          <div className="item">
            <img
              src={BASE_URL + "img/programming-code-svgrepo-com.svg"}
              alt=""
            />
            <hr />
            <span>Graphics & Design</span>
          </div>
          <div className="item">
            <img
              src={BASE_URL + "img/programming-code-svgrepo-com.svg"}
              alt=""
            />
            <hr />
            <span>Graphics & Design</span>
          </div>
          <div className="item">
            <img
              src={BASE_URL + "img/programming-code-svgrepo-com.svg"}
              alt=""
            />
            <hr />
            <span>Graphics & Design</span>
          </div>
          <div className="item">
            <img
              src={BASE_URL + "img/programming-code-svgrepo-com.svg"}
              alt=""
            />
            <hr />
            <span>Graphics & Design</span>
          </div>
          <div className="item">
            <img
              src={BASE_URL + "img/programming-code-svgrepo-com.svg"}
              alt=""
            />
            <hr />
            <span>Graphics & Design</span>
          </div>
          <div className="item">
            <img
              src={BASE_URL + "img/programming-code-svgrepo-com.svg"}
              alt=""
            />
            <hr />
            <span>Graphics & Design</span>
          </div>
          <div className="item">
            <img
              src={BASE_URL + "img/programming-code-svgrepo-com.svg"}
              alt=""
            />
            <hr />
            <span>Graphics & Design</span>
          </div>
        </div>
      </div>
    </div>
  );
}
