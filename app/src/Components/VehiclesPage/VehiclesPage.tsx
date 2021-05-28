import { Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import BasePage from "../BasePage/BasePage";
import { BasePageProperties } from "../BasePage/BasePage";
import VehicleModel from "../../../../../backend/api/src/components/vehicle/vehicle.model";
import VehicleService from "../../Services/VehicleService";
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
}
export default class VehiclesPage extends BasePage<VehiclesPageProperties> {
  state: VehiclesPageState;
  constructor(props: VehiclesPageProperties) {
    super(props);
    this.state = {
      title: "",
      userVehicles: [],
    };
  }

  componentDidMount() {
    this.getAllUserVehicles();
  }

  componentDidUpdate(prevProps: VehiclesPageProperties, prevState: VehiclesPageState) {
    if (prevProps.match?.params.vid !== this.props.match?.params.vid) {
      this.getAllUserVehicles();
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
    return (
      <>
        <h1>{this.state.title}</h1>
        <Container>
          {this.state.userVehicles
            ? this.state.userVehicles.map((vehicle) => (
                <Row key={"vehicle-elem-" + vehicle.vehicleId}>
                  <Link to={"/vehicle/" + vehicle.vehicleId}>
                    {vehicle.internalName
                      ? `${vehicle.internalName} (${vehicle.brandModel?.brand?.name} ${vehicle.brandModel?.name})`
                      : `${vehicle.brandModel?.brand?.name} ${vehicle.brandModel?.name}`}
                  </Link>
                </Row>
              ))
            : ""}
        </Container>
      </>
    );
  }
}
