import React from "react";
import { Switch, Route } from "react-router-dom";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import NavBar from "./router/NavBar";
import { Routes, RouteType } from "./router/routes";
import { Copyright } from "./components";

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

  return (
    <div className={classes.root}>
      {/* AppBar */}
      <NavBar />
      <main className={classes.content}>
        <Toolbar />
        <Switch>
          {Routes.map(
            (o: RouteType): JSX.Element => (
              <Route path={o.path} exact={o.exact} key={o.path}>
                <o.component />
              </Route>
            )
          )}
        </Switch>
        {/* Footer */}
        <Copyright />
      </main>
    </div>
  );
};

export default App;
