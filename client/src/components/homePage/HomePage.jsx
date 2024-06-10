import { Link } from "react-router-dom";
import "./homePage.css";

export const HomePage = () => {
  return (
    <>
      <Link className="order-now-btn-link" to="/menu">
        <h1 className="order-now-btn">Order Now</h1>
      </Link>
    </>
  );
};
