import { ChangeEvent, FormEventHandler, useState } from "react";
import "./register.scss";
import { useMutation } from "@tanstack/react-query";
import upload from "../../utils/upload";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

interface User {
  username: string;
  email: string;
  password: string;
  img: string;
  country: string;
  isSeller: boolean;
  desc: string;
  phone: string;
}

export default function Register() {
  const [file, setFile] = useState<File | null>(null);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    country: "",
    isSeller: false,
    desc: "",
    phone: "",
  });

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (user: User) => newRequest.post("/auth/register", user),
    onError: (err) => console.log(err),
    onSuccess: () => navigate("/"),
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSeller = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    setUser((prev) => ({ ...prev, isSeller: value }));
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!file) return;

    const url = await upload(file);
    mutation.mutate({ ...user, img: url });
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="left">
          <h1>Create a new account</h1>
          <label htmlFor="">Username</label>
          <input
            name="username"
            type="text"
            placeholder="johndoe"
            onChange={handleChange}
          />
          <label htmlFor="">Email</label>
          <input
            name="email"
            type="email"
            placeholder="email"
            onChange={handleChange}
          />
          <label htmlFor="">Password</label>
          <input name="password" type="password" onChange={handleChange} />
          <label htmlFor="">Profile Picture</label>
          <input
            type="file"
            onChange={(e) => e.target?.files && setFile(e.target.files[0])}
          />
          <label htmlFor="">Country</label>
          <input
            name="country"
            type="text"
            placeholder="Usa"
            onChange={handleChange}
          />
          <button type="submit">Register</button>
        </div>
        <div className="right">
          <h1>I want to become a seller</h1>
          <div className="toggle">
            <label htmlFor="">Activate the seller account</label>
            <label className="switch">
              <input type="checkbox" onChange={handleSeller} />
              <span className="slider round"></span>
            </label>
          </div>
          <label htmlFor="">Phone Number</label>
          <input
            name="phone"
            type="text"
            placeholder="+1 234 567 89"
            onChange={handleChange}
          />
          <label htmlFor="">Description</label>
          <textarea
            placeholder="A short description of yourself"
            name="desc"
            id=""
            cols={30}
            rows={10}
            onChange={handleChange}
          ></textarea>
        </div>
      </form>
    </div>
  );
}
