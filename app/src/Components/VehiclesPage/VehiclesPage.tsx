import { Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import BasePage from "../BasePage/BasePage";
import { BasePageProperties } from "../BasePage/BasePage";
import SingleVehiclePage from "../SingleVehiclePage/SingleVehiclePage";

class VehiclesPageProperties extends BasePageProperties {
  match?: {
    params: {
      vid: string;
    };
  };
}

class VehiclesPageState {
  title: string = "";
  userVehicles: number[] = [];
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
    this.getVehicleData();
  }

  componentDidUpdate(prevProps: VehiclesPageProperties, prevState: VehiclesPageState) {
    if (prevProps.match?.params.vid !== this.props.match?.params.vid) {
      this.getVehicleData();
    }
  }

  private getVehicleId(): number | null {
    const vid = Number(this.props.match?.params.vid);
    return vid ? +vid : null;
  }

  private getVehicleData() {
    const vid = this.getVehicleId();
    if (vid === null) {
      this.setState({
        title: "Sva vozila",
        userVehicles: [1, 2, 3, 4, 5],
      });
    } else {
      this.setState({
        title: "Vozilo " + vid,
        userVehicles: [vid + 1, vid + 2, vid + 3],
      });
    }
  }

  renderArray(): JSX.Element {
    return <Container></Container>;
  }

  showSingleVehicle(): JSX.Element {
    return <SingleVehiclePage />;
  }

  showAllVehicles(): JSX.Element {
    return (
      <>
        {this.state.userVehicles.map((vehicle) => (
          <Row>
            <Link to={"/vehicle/" + (vehicle ?? "")}>{vehicle}</Link>
          </Row>
        ))}
      </>
    );
  }

  renderMain(): JSX.Element {
    return (
      <>
        <h1>{this.state.title}</h1>
        <Container>
          {this.state.userVehicles.map((vehicle) => (
            <Row>
              <Link to={"/vehicle/" + vehicle}>Vehicle {vehicle}</Link>
            </Row>
          ))}
        </Container>
      </>
    );
  }
}
