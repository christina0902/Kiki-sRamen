import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./auth/AuthorizedRoute";
import Login from "./auth/Login";
import Register from "./auth/Register";
import { HomePage } from "./homePage/HomePage";
import { MenuList } from "./menu/MenuList";
import { MenuItemDetails } from "./menu/MenuItemDetails";
import { Cart } from "./cart/Cart";
import { Checkout } from "./checkout/Checkout";
import { ViewAccount } from "./account/ViewAccount";

export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<HomePage />} />
        <Route
          path="login"
          element={<Login setLoggedInUser={setLoggedInUser} />}
        />
        <Route
          path="register"
          element={<Register setLoggedInUser={setLoggedInUser} />}
        />
      </Route>
      <Route path="/menu">
        <Route index element={<MenuList />} />
        <Route path=":id">
          <Route
            index
            element={<MenuItemDetails loggedInUser={loggedInUser} />}
          />
        </Route>
      </Route>
      <Route path="/cart">
        <Route index element={<Cart loggedInUser={loggedInUser} />} />
      </Route>
      <Route path="/checkout">
        <Route
          index
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <Checkout loggedInUser={loggedInUser} />
            </AuthorizedRoute>
          }
        />
      </Route>
      <Route path="/account">
        <Route
          index
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <ViewAccount
                setLoggedInUser={setLoggedInUser}
                loggedInUser={loggedInUser}
              />
            </AuthorizedRoute>
          }
        />
      </Route>
      <Route path="/thankyou" element={<>thank you!</>} />

      <Route path="*" element={<p>Whoops, nothing here...</p>} />
    </Routes>
  );
}
