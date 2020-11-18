import React from "react";
import { useSelector } from "react-redux";
import {
  Switch,
  Route,
  Redirect,
  RouteComponentProps,
  RouteProps,
} from "react-router-dom";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import NavBar from "./router/NavBar";
import { Routes, RouteType } from "./router/routes";
import { Copyright } from "./components";
import { IApplicationState } from "./store/rootReducer";
import { SignInScreen } from "./screens";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      width: "100%",
    },
  })
);

const App: React.FC<{}> = (): React.ReactElement => {
  const classes = useStyles();
  const token: string | undefined = useSelector(
    (state: IApplicationState) => state.user.token
  );

  const PrivateRoute: React.FC<RouteProps> = ({
    component,
    ...rest
  }: RouteProps) => (
    <Route
      {...rest}
      render={(props: RouteComponentProps) =>
        token ? (
          <Route {...props} component={component} />
        ) : (
          <Redirect to="/signin" />
        )
      }
    />
  );

  type PropsLayout = {
    children: JSX.Element;
  };

  const Layout: React.FC<PropsLayout> = (props: PropsLayout): JSX.Element => (
    <React.Fragment>
      {/* AppBar */}
      <NavBar />
      <main className={classes.content}>
        <Toolbar />
        {props.children}
        {/* Footer */}
        <Copyright />
      </main>
    </React.Fragment>
  );

  return (
    <div className={classes.root}>
      <Switch>
        <Route
          path="/signin"
          render={(props: RouteComponentProps) =>
            !token ? (
              <Route {...props}>
                <SignInScreen />
              </Route>
            ) : (
              <Redirect to="/" />
            )
          }
        />
        <Route>
          <Layout>
            <Switch>
              {Routes.map(
                (route: RouteType): JSX.Element => (
                  <PrivateRoute
                    key={route.path}
                    component={route.component}
                    path={route.path}
                    exact={route.exact}
                  />
                )
              )}
            </Switch>
          </Layout>
        </Route>
      </Switch>
    </div>
  );
};

export default App;
