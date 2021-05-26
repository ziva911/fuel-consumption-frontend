import { Container, ButtonGroup, Button } from "react-bootstrap";
import "./Application.scss";

export default function Application() {
  return (
    <Container fluid>
      <div className="Application">
        <header className="Application-header">
          Front-end <br />
          <ButtonGroup aria-label="Basic example">
            <Button variant="secondary">Left</Button>
            <Button variant="secondary">Middle</Button>
            <Button variant="secondary">Right</Button>
          </ButtonGroup>
        </header>
      </div>
    </Container>
  );
}
