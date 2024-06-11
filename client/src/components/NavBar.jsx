import { useState } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import {
  Button,
  Collapse,
  Nav,
  NavLink,
  NavItem,
  Navbar,
  NavbarBrand,
  NavbarToggler,
} from "reactstrap";
import { logout } from "../managers/authManager";
import { useNavigate } from "react-router-dom";

export default function NavBar({ loggedInUser, setLoggedInUser }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const toggleNavbar = () => setOpen(!open);

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
                <Button
                  color="primary"
                  onClick={(e) => {
                    e.preventDefault();
                    setOpen(false);
                    logout().then(() => {
                      navigate("/");
                      setLoggedInUser(null);
                      setOpen(false);
                    });
                  }}
                >
                  Logout
                </Button>
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
