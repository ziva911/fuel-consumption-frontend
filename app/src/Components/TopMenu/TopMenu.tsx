import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function TopMenu() {
  return (
    <Nav className="justify-content-center">
      <Nav.Item>
        <Link className="nav-link" to="/">
          Home
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link className="nav-link" to="/vehicle">
          Vehicles
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link className="nav-link" to="/contact">
          Contact
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link className="nav-link" to="/profile">
          User profile
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link className="nav-link" to="/signin">
          Sign in
        </Link>
      </Nav.Item>
    </Nav>
  );
}
