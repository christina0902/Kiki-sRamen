import { NavLink as RRNavLink } from "react-router-dom";
import { Nav, NavLink, NavItem, Navbar, NavbarBrand } from "reactstrap";

export default function NavBar({ loggedInUser }) {
  return (
    <div>
      <Navbar className="navBar" container="fluid" dark={true} expand="xl">
        <Nav navbar>
          <NavbarBrand className="mr-auto" tag={RRNavLink} to="/">
            Kiki's Ramen
          </NavbarBrand>
          <NavItem>
            <NavLink tag={RRNavLink} to="/menu">
              Menu
            </NavLink>
          </NavItem>
        </Nav>
        {loggedInUser ? (
          <>
            <Nav navbar>
              <NavItem>
                <NavLink tag={RRNavLink} to="/cart">
                  View Cart
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={RRNavLink} to="/account">
                  Account
                </NavLink>
              </NavItem>
            </Nav>
          </>
        ) : (
          <Nav navbar>
            <NavItem>
              <NavLink tag={RRNavLink} to="/cart">
                View Cart
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to="/login">
                Sign In
              </NavLink>
            </NavItem>
          </Nav>
        )}
      </Navbar>
    </div>
  );
}
