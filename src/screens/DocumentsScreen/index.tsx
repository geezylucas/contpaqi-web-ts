import React from "react";
import clsx from "clsx";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import DocumentsTable from "./DocumentsTable";
import Chart from "./Chart";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    padding: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(3),
    },
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

const DocumentsScreen: React.FC<{}> = (): React.ReactElement => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Facturas
      </Typography>
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12}>
          <Paper className={fixedHeightPaper}>
            <Chart />
          </Paper>
        </Grid>
        {/* List documents */}
        <Grid item xs={12}>
          <DocumentsTable />
        </Grid>
      </Grid>
    </Container>
  );
};

export default DocumentsScreen;
