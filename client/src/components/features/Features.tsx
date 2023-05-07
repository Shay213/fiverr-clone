import "./features.scss";

const { BASE_URL } = import.meta.env;

export default function Features() {
  return (
    <div className="features">
      <div className="container">
        <div className="item">
          <h1>A whole world of freelance talent at your fingertips</h1>
          <div className="title">
            <img src={BASE_URL + "img/check.png"} alt="" />
            The best for every budget
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem,
            quos sed ab totam architecto.
          </p>
          <div className="title">
            <img src={BASE_URL + "img/check.png"} alt="" />
            The best for every budget
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem,
            quos sed ab totam architecto.
          </p>
          <div className="title">
            <img src={BASE_URL + "img/check.png"} alt="" />
            The best for every budget
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem,
            quos sed ab totam architecto.
          </p>
        </div>
        <div className="item">
          <video src={BASE_URL + "vid/video.mp4"} controls></video>
          <span>
            Free Stock Videos by <a href="http://videezy.com/">Videezy</a>
          </span>
        </div>
      </div>
    </div>
  );
}
