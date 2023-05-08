import { Link } from "react-router-dom";
import "./myGigs.scss";

const { BASE_URL } = import.meta.env;

export default function MyGigs() {
  return (
    <div className="myGigs">
      <div className="container">
        <div className="title">
          <h1>Gigs</h1>
          <Link to="/add">
            <button>Add New Gig</button>
          </Link>
        </div>
        <table>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Sales</th>
            <th>Action</th>
          </tr>
          <tr>
            <td>
              <img
                className="img"
                src="https://images.pexels.com/photos/15182778/pexels-photo-15182778.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              />
            </td>
            <td>Gig1</td>
            <td>88</td>
            <td>123</td>
            <td>
              <img
                className="delete"
                src={BASE_URL + "img/delete.png"}
                alt=""
              />
            </td>
          </tr>
          <tr>
            <td>
              <img
                className="img"
                src="https://images.pexels.com/photos/15182778/pexels-photo-15182778.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              />
            </td>
            <td>Gig1</td>
            <td>88</td>
            <td>123</td>
            <td>
              <img
                className="delete"
                src={BASE_URL + "img/delete.png"}
                alt=""
              />
            </td>
          </tr>
          <tr>
            <td>
              <img
                className="img"
                src="https://images.pexels.com/photos/15182778/pexels-photo-15182778.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              />
            </td>
            <td>Gig1</td>
            <td>88</td>
            <td>123</td>
            <td>
              <img
                className="delete"
                src={BASE_URL + "img/delete.png"}
                alt=""
              />
            </td>
          </tr>
          <tr>
            <td>
              <img
                className="img"
                src="https://images.pexels.com/photos/15182778/pexels-photo-15182778.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              />
            </td>
            <td>Gig1</td>
            <td>88</td>
            <td>123</td>
            <td>
              <img
                className="delete"
                src={BASE_URL + "img/delete.png"}
                alt=""
              />
            </td>
          </tr>
          <tr>
            <td>
              <img
                className="img"
                src="https://images.pexels.com/photos/15182778/pexels-photo-15182778.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              />
            </td>
            <td>Gig1</td>
            <td>88</td>
            <td>123</td>
            <td>
              <img
                className="delete"
                src={BASE_URL + "img/delete.png"}
                alt=""
              />
            </td>
          </tr>
          <tr>
            <td>
              <img
                className="img"
                src="https://images.pexels.com/photos/15182778/pexels-photo-15182778.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              />
            </td>
            <td>Gig1</td>
            <td>88</td>
            <td>123</td>
            <td>
              <img
                className="delete"
                src={BASE_URL + "img/delete.png"}
                alt=""
              />
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
}
