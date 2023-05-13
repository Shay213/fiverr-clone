import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";

export default function Success() {
  const { search } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const paymentIntent = params.get("payment_intent");

  useEffect(() => {
    (async () => {
      try {
        await newRequest.put("/orders", { paymentIntent });
        setTimeout(() => navigate("/orders"), 5000);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="success">
      <p>
        Payment successful. You are being redirected to the orders page. Please
        do not close the page.
      </p>
    </div>
  );
}
