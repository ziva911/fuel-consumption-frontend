import { Component } from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import EventRegistry from "../../Api/EventRegistry";
class TopMenuProperties {}
class TopMenuState {
  currentMenuType: "user" | "administrator" | "visitor" = "visitor";
}
export default class TopMenu extends Component<TopMenuProperties> {
  state: TopMenuState;
  constructor(props: TopMenuProperties) {
    super(props);
    this.state = {
      currentMenuType: "visitor",
    };
  }
  componentDidMount() {
    EventRegistry.on("AUTH_EVENT", this.authEventHandler.bind(this));
  }

  componentWillUnmount() {
    EventRegistry.off("AUTH_EVENT", this.authEventHandler.bind(this));
  }

  private authEventHandler(message: string) {
    if (["user_login_failed", "user_logout", "administrator_logout"].includes(message)) {
      if (this.state.currentMenuType !== "visitor") {
        this.setState({
          currentMenuType: "visitor",
        });
      }
    }
    if (["user_login"].includes(message)) {
      this.setState({
        currentMenuType: "user",
      });
    }
    if (["administrator_login"].includes(message)) {
      this.setState({
        currentMenuType: "administrator",
      });
    }
  }

  render() {
    if (this.state.currentMenuType === "visitor") {
      return (
        <Nav className="justify-content-center">
          <Nav.Item>
            <Link className="nav-link" to="/">
              Home
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link className="nav-link" to="/contact">
              Contact
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link className="nav-link" to="/user/login">
              Log in
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link className="nav-link" to="/user/register">
              Register
            </Link>
          </Nav.Item>
        </Nav>
      );
    }
    if (this.state.currentMenuType === "administrator") {
      return (
        <Nav className="justify-content-center">
          <Nav.Item>
            <Link className="nav-link" to="/">
              Home
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link className="nav-link" to="/dashboard/vehicle">
              Vehicles
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link className="nav-link" to="/dashboard/brand">
              Brands
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link className="nav-link" to="/profile">
              My account
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link className="nav-link" to="/user/logout">
              Log out
            </Link>
          </Nav.Item>
        </Nav>
      );
    }
    return (
      <Nav className="justify-content-center">
        <Nav.Item>
          <Link className="nav-link" to="/">
            Home
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link className="nav-link" to="/vehicle">
            Vehicle
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link className="nav-link" to="/profile">
            My account
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link className="nav-link" to="/user/logout">
            Log out
          </Link>
        </Nav.Item>
      </Nav>
    );
  }
}
