import "./teams.scss";

const { BASE_URL } = import.meta.env;

export default function Teams() {
  return (
    <div className="features teams">
      <div className="container">
        <div className="item">
          <h1>fiverr business</h1>
          <h1>A business solution designed for teams</h1>
          <p>
            Upgrade to a curated experience packed with tools and benefits,
            dedicated to business
          </p>
          <div className="title">
            <img src={BASE_URL + "img/check.png"} alt="" className="check" />
            Connect to freelancers with proven business experience
          </div>
          <div className="title">
            <img src={BASE_URL + "img/check.png"} alt="" className="check" />
            Get matched with the perfect talent by a customer success manager
          </div>
          <div className="title">
            <img src={BASE_URL + "img/check.png"} alt="" className="check" />
            Manage teamwork and boost productivity with one powerful workspace
          </div>
          <button>Explore Fiverr Business</button>
        </div>
        <div className="item">
          <img
            src="https://images.pexels.com/photos/2422293/pexels-photo-2422293.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
