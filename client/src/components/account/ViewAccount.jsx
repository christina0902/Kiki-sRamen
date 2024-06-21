import { useState } from "react";
import { logout } from "../../managers/authManager";
import { useNavigate } from "react-router-dom";
import "./account.css";
import { AccountDetails } from "./AccountDetails";
import { PastOrders } from "./PastOrders";

export const ViewAccount = ({ loggedInUser, setLoggedInUser }) => {
  const [viewAccount, setViewAccount] = useState(true);

  const navigate = useNavigate();

  return (
    <>
      <div className="account-container" style={{ maxWidth: "850px" }}>
        <div className="account-form-container">
          <div className="account-header">
            <button
              onClick={() => {
                setViewAccount(true);
              }}
              className={`category-btn account-btn ${
                viewAccount ? "btn-active" : null
              }`}
            >
              Account
            </button>
            <button
              className={`category-btn account-btn ${
                !viewAccount ? "btn-active" : null
              }`}
              onClick={() => {
                setViewAccount(false);
              }}
            >
              Past Orders
            </button>
          </div>
          {viewAccount ? (
            <AccountDetails loggedInUser={loggedInUser} />
          ) : (
            <PastOrders loggedInUser={loggedInUser} />
          )}
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            logout().then(() => {
              navigate("/");
              setLoggedInUser(null);
            });
          }}
          to="/"
          className="sign-out-btn"
        >
          Sign Out
        </button>
      </div>
    </>
  );
};
