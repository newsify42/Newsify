import React from "react";
import { Route, Switch } from "react-router-dom";

const SwitchRoutes = ({ routes }) => {
  return (
    <Switch>
      {routes.map((route, index) => {
        return (
          <Route
            exact={route.path === "/" ? true : null}
            key={index}
            path={route.path}
            render={
              route.render
                ? route.render
                : props => <route.component {...props} routes={route.routes} />
            }
          />
        );
      })}
    </Switch>
  );
};

export default SwitchRoutes;
