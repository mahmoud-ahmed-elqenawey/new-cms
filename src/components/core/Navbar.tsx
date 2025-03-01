import { removeTokens } from "@/services/auth";
import useAuth from "@/store/useAuth";
import { Button } from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  return (
    <div>
      <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
        Home
      </NavLink>{" "}
      <NavLink
        to="settings"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Settings
      </NavLink>{" "}
      <NavLink
        to="profile"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Profile
      </NavLink>{" "}
      <NavLink
        to="lgoin"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        login
      </NavLink>{" "}
      <Button onClick={() => removeTokens(navigate, setIsAuthenticated)}>
        Logout
      </Button>
    </div>
  );
};

export default Navbar;
