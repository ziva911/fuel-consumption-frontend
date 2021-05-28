import { Suspense } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ContactPage from "../ContactPage/ContactPage";
import HomePage from "../HomePage/HomePage";
import TopMenu from "../TopMenu/TopMenu";
import "./Application.scss";
import VehiclesPage from "../VehiclesPage/VehiclesPage";

export default function Application() {
  return (
    <BrowserRouter>
      <Container fluid className="Application">
        <div className="Application-header">Fuel consumption tracking app</div>

        <TopMenu />

        <div className="Application-body">
          <Suspense fallback={<div>Ucita se</div>}>
            <Switch>
              <Route exact path="/" component={HomePage}>
                Home
              </Route>
              <Route
                path="/vehicle/:vid?"
                render={(props: any) => {
                  return <VehiclesPage {...props}></VehiclesPage>;
                }}
              ></Route>
              <Route exact path="/contact">
                <ContactPage address="Belgrade, Serbia" phone="123455" />
              </Route>
              <Route exact path="/profile">
                Profile
              </Route>
              <Route exact path="/signin">
                Sign in
              </Route>
            </Switch>
          </Suspense>
        </div>

        <div className="Application-footer">&copy;2021 Nikola Živanović</div>
      </Container>
    </BrowserRouter>
  );
}
