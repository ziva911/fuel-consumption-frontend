import { Button, CardDeck, Col, Container, Row } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import BasePage from "../BasePage/BasePage";
import { BasePageProperties } from "../BasePage/BasePage";
import VehicleModel from "../../../../../backend/api/src/components/vehicle/vehicle.model";
import VehicleService from "../../Services/VehicleService";
import EventRegistry from "../../Api/EventRegistry";
import VehiclesArrayElement from "./VehiclesArrayElement/VehiclesArrayElement";
class VehiclesPageProperties extends BasePageProperties {
  match?: {
    params: {
      vid: string;
    };
  };
}

class VehiclesPageState {
  title: string = "";
  userVehicles: VehicleModel[] = [];
  isUserLoggedIn: boolean = true;
}
export default class VehiclesPage extends BasePage<VehiclesPageProperties> {
  state: VehiclesPageState;
  constructor(props: VehiclesPageProperties) {
    super(props);
    this.state = {
      title: "",
      userVehicles: [],
      isUserLoggedIn: true,
    };
  }

  componentDidMount() {
    this.getAllUserVehicles();
    EventRegistry.off("AUTH_EVENT", this.authEventHandler.bind(this));
  }

  componentDidUpdate(prevProps: VehiclesPageProperties, prevState: VehiclesPageState) {
    if (prevProps.match?.params.vid !== this.props.match?.params.vid) {
      this.getAllUserVehicles();
    }
  }

  private authEventHandler(status: string) {
    if (this.state.isUserLoggedIn && ["force_login", "user_login_failed", "user_logout", "administrator_logout"].includes(status)) {
      this.setState({
        isUserLoggedIn: false,
      });
    }
  }

  private getAllUserVehicles() {
    VehicleService.getAllVehicles().then((res) => {
      if (res.length === 0) {
        return this.setState({
          title: "No vehicles found",
          userVehicles: [],
        });
      }
      this.setState({
        title: "All vehicles",
        userVehicles: res,
      });
    });
  }

  renderMain(): JSX.Element {
    if (this.state.isUserLoggedIn === false) {
      return <Redirect to="/user/login" />;
    }
    return (
      <>
        <h1>{this.state.title}</h1>
        <Container>
          <Row>
            <CardDeck className="row">
              {this.state.userVehicles
                ? this.state.userVehicles.map((vehicle) => {
                    return <VehiclesArrayElement key={"vehicle-elem-" + vehicle.vehicleId} vehicle={vehicle} />;
                  })
                : ""}
            </CardDeck>
            <Col>
              <Link to={"/vehicle/add"}>
                <Button>Add new vehicle</Button>
              </Link>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
