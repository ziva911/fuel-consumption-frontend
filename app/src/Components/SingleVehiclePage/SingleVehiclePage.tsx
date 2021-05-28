import { Container } from "react-bootstrap";
import BasePage from "../BasePage/BasePage";
import { BasePageProperties } from "../BasePage/BasePage";

class SingleVehiclePageProperties extends BasePageProperties {
  match?: {
    params: {
      vid: string;
    };
  };
}

export default class SingleVehiclePage extends BasePage<SingleVehiclePageProperties> {
  renderMain(): JSX.Element {
    const vid = this.props.match?.params.vid;
    return <Container className="pageHolder">{"Ovo je jedno vozilo pod rednim brojem " + vid}</Container>;
  }
}
