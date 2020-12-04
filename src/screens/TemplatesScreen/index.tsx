import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import TemplatesTable from "./TemplatesTable";

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    flex: "1 1 100%",
  },
}));

interface IProps extends RouteComponentProps {}

const TemplatesScreen: React.FC<IProps> = (
  props: IProps
): React.ReactElement => {
  const classes = useStyles();

  const { history } = props;

  const pushCreateDocument = (): void => {
    history.push("/createdocument?template=true");
  };

  return (
    <Container>
      <Box mb={2}>
        <Toolbar disableGutters>
          <Typography
            className={classes.title}
            variant="h4"
            component="h1"
            gutterBottom
          >
            Plantillas
          </Typography>
          <Button
            onClick={pushCreateDocument}
            variant="contained"
            color="primary"
          >
            Crear plantilla
          </Button>
        </Toolbar>
      </Box>
      <Grid container spacing={3}>
        {/* List clients */}
        <Grid item xs>
          <TemplatesTable />
        </Grid>
      </Grid>
    </Container>
  );
};

export default withRouter(TemplatesScreen);
