import { Component } from "react";
import { Container } from "react-bootstrap";
interface Brand {
  name: string;
  logo: string;
}
interface BrandModel {
  id: number;
  name: string;
  brand: Brand | null;
}
class VehiclesArrayElementProperties {
  id: number | null = null;
  internalName?: string = "";
  // manufactureYear: number = 1900;
  // paintColor: string = "gray";
  // mileageStart: number = 0;
  // mileageCurrent: number = 0;
  // createdAt: string = "";
  // modifiedAt: string = "";
  // imagePath: string = "";
  // brandModel: BrandModel | null = null;
  // fuelType: string = "";
}

export default class VehiclesArrayElement extends Component<VehiclesArrayElementProperties> {
  renderMain(): JSX.Element {
    return <Container className="pageHolder">{"vozilo sa id: " + this.props.id}</Container>;
  }
}
