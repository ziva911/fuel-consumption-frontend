import { Col, Container, Row, Image } from "react-bootstrap";
import VehicleModel from "../../../../../backend/api/src/components/vehicle/vehicle.model";
import RefuelHistory from "../../../../../backend/api/src/components/refuel_history/refuel-history.model";
import BasePage, { BasePageProperties } from "../BasePage/BasePage";
import "./SingleVehiclePage.scss";
import VehicleService from "../../Services/VehicleService";
import RefuelHistoryService from "../../Services/RefuelHistoryService";
class SingleVehiclePageProperties extends BasePageProperties {
  match?: {
    params: {
      vid: string;
    };
  };
}

class SingleVehiclePageState {
  title: string = "";
  vehicleInfo: VehicleModel | null = null;
  refuelHistory: RefuelHistory[] = [];
}
export default class SingleVehiclePage extends BasePage<SingleVehiclePageProperties> {
  state: SingleVehiclePageState;
  constructor(props: SingleVehiclePageProperties) {
    super(props);
    this.state = {
      title: "",
      vehicleInfo: null,
      refuelHistory: [],
    };
  }

  componentDidMount() {
    this.getVehicleData();
  }

  componentDidUpdate(prevProps: SingleVehiclePageProperties, prevState: SingleVehiclePageProperties) {
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
    if (vid !== null) {
      this.getVehicleById(vid);
      this.getVehicleRefuelHistory(vid);
    }
  }

  private getVehicleById(vehicleId: number) {
    VehicleService.getVehicleById(vehicleId).then((vehicle) => {
      if (vehicle === null) {
        return this.setState({
          title: "No vehicles found",
          vehicleInfo: null,
          refuelHistory: [],
        });
      }
      this.setState({
        title: vehicle.internalName
          ? `${vehicle.internalName} (${vehicle.brandModel?.brand?.name} ${vehicle.brandModel?.name})`
          : `${vehicle.brandModel?.brand?.name} ${vehicle.brandModel?.name}`,
        vehicleInfo: vehicle,
        refuelHistory: this.state.refuelHistory,
      });
    });
  }

  private getVehicleRefuelHistory(vehicleId: number) {
    RefuelHistoryService.getRefuelHistoryByVehicleId(vehicleId).then((refuelHistory) => {
      if (refuelHistory.length === 0) {
        return this.setState({
          title: "No refuel history found",
          vehicleInfo: null,
          refuelHistory: [],
        });
      }
      this.setState({
        title: this.state.title,
        vehicleInfo: this.state.vehicleInfo,
        refuelHistory: refuelHistory,
      });
    });
  }

  renderArray(): JSX.Element {
    return <Container></Container>;
  }

  showSingleVehicle(): JSX.Element {
    return <SingleVehiclePage />;
  }

  renderMain(): JSX.Element {
    const vehicle = this.state.vehicleInfo;
    const refuelHistory = this.state.refuelHistory;
    return (
      <Container className="pageHolder">
        <h1>{this.state.title}</h1>
        {vehicle ? (
          <Row className="vehicleInfo-container" key={"vehicle-elem-" + vehicle.vehicleId}>
            {vehicle.imagePath ? (
              <Col xs={6} md={4}>
                <Row>
                  <Image src={vehicle.imagePath} thumbnail />
                </Row>
                <Row>
                  <Col>Edit image</Col>
                  <Col>Delete image</Col>
                </Row>
              </Col>
            ) : (
              <Col xs={6} md={4}>
                <Row>
                  <Image src={"random slika"} thumbnail />
                </Row>
                <Row>
                  <Col>Add image</Col>
                </Row>
              </Col>
            )}
            <Col className="vehicleInfo">
              <Row>
                <Col>
                  {vehicle.internalName
                    ? `${vehicle.internalName} (${vehicle.brandModel?.brand?.name} ${vehicle.brandModel?.name})`
                    : `${vehicle.brandModel?.brand?.name} ${vehicle.brandModel?.name}`}
                </Col>
                <Col>{vehicle.paintColor}</Col>
                <Col>{"year: " + vehicle.manufactureYear}</Col>
                <Col>{vehicle.fuelType?.name}</Col>
              </Row>
              <Row>
                <Col>Created at: {new Date(vehicle.createdAt).toLocaleDateString("en-US")}</Col>
                <Col>
                  <Row>Starting mileage: {vehicle.mileageStart}</Row>
                  <Row>Last recorded mileage: {vehicle.mileageCurrent}</Row>
                </Col>
                <Col>{vehicle.fuelExtra ? "Extra fuel from previous refuel: " + vehicle.fuelExtra : "Last refuel was to the top"}</Col>
              </Row>
            </Col>
          </Row>
        ) : (
          "null"
        )}
        {refuelHistory.length ? (
          <Container className="refuel-array-container">
            <Row>
              <Col className="refuel-array">
                {refuelHistory.map((refuel) => (
                  <Row className="refuel-array-elem" key={"refuel-elem-" + refuel.refuelHistoryId}>
                    <Row>
                      <Col>{new Date(refuel.date).toLocaleDateString("en-US")}</Col>
                      <Col>{refuel.isFull ? "Do vrha" : ""}</Col>
                    </Row>
                    <Row>
                      <Col>Recorded mileage: {refuel.mileageCurrent} km</Col>
                      <Col>Quantity after: {refuel.quantity} units</Col>
                      <Col>{`${refuel.totalCost} (${(refuel.totalCost / refuel.quantity).toFixed(2)} pu.)`}</Col>
                    </Row>
                  </Row>
                ))}
              </Col>
              <Col className="refuel-statistics">Refuel Statistics TODO</Col>
            </Row>
          </Container>
        ) : (
          ""
        )}
      </Container>
    );
  }
}
