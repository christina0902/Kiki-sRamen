import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormGroup, Input } from "reactstrap";
import "./checkout.css";
import { getUserProfile } from "../../managers/userProfileManager";
import { placeOrder } from "../../managers/orderManager";

export const Checkout = ({ loggedInUser }) => {
  const [userProfile, setUserProfile] = useState({});
  const [order, setOrder] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getUserProfile(loggedInUser?.id).then(setUserProfile);

    getUserProfile(loggedInUser?.id).then((userProfile) => {
      const updatedOrder = userProfile.orders[0] || {};
      setOrder(updatedOrder);
    });
  }, [loggedInUser]);

  const handlePlaceOrder = () => {
    const orderToPlace = {
      Id: order.id,
      userProfileId: loggedInUser.id,
    };
    placeOrder(orderToPlace).then(() => {
      navigate("/thankyou");
    });
  };

  return (
    <div className="checkout-container" style={{ maxWidth: "750px" }}>
      <div className="form-container">
        <Link className="back-btn-link" to="/cart">
          <i className="fa fa-long-arrow-left back-btn-checkout"></i>
        </Link>
        <h1 className="checkout-header">Contact Information</h1>
        <FormGroup>
          <Input
            type="text"
            readOnly
            defaultValue={userProfile.phoneNumber}
            placeholder="Phone Number"
            className="form-input"
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="text"
            readOnly
            defaultValue={loggedInUser.email}
            placeholder="Email Address"
            className="form-input"
          />
        </FormGroup>
        <FormGroup className="name-input">
          <Input
            type="text"
            readOnly
            defaultValue={userProfile.firstName}
            placeholder="First Name"
            className="form-input block-input"
          />

          <Input
            type="text"
            readOnly
            defaultValue={userProfile.lastName}
            placeholder="Last Name"
            className="form-input block-input"
          />
        </FormGroup>

        <div className="total-price-container">
          <div className="total-price-header">Amount Due:</div>
          <div className="total-price">${order.total}</div>
        </div>

        <button
          className="place-order-btn"
          onClick={() => {
            handlePlaceOrder();
          }}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};
