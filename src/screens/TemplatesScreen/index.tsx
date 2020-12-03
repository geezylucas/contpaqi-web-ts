import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import TemplatesTable from "./TemplatesTable";

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    flex: "1 1 100%",
  },
}));

const TemplatesScreen: React.FC<{}> = (): React.ReactElement => {
  const classes = useStyles();

  return (
    <Container>
      <Toolbar>
        <Typography
          className={classes.title}
          variant="h4"
          component="h1"
          gutterBottom
        >
          Plantillas
        </Typography>
        <Button variant="contained" color="primary">
          Crear plantilla
        </Button>
      </Toolbar>
      <Grid container spacing={3}>
        {/* List clients */}
        <Grid item xs={12}>
          <TemplatesTable />
        </Grid>
      </Grid>
    </Container>
  );
};

export default TemplatesScreen;
