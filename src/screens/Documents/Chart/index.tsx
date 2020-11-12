import React from "react";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Line } from "react-chartjs-2";

const useStyles = makeStyles((theme: Theme) => ({
  lineChart: {
    position: "relative",
    height: "50vh",
    [theme.breakpoints.up("sm")]: {
      height: "auto",
    },
  },
}));

const Chart: React.FC<{}> = (): React.ReactElement => {
  const theme: Theme = useTheme();
  const classes = useStyles();
  const matches: boolean = useMediaQuery(theme.breakpoints.up("sm"));

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "First dataset",
        data: [33, 53, 85, 41, 44, 65],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
      {
        label: "Second dataset",
        data: [33, 25, 35, 51, 54, 76],
        fill: false,
        borderColor: "#742774",
      },
    ],
  };

  const legend = {
    display: true,
    position: "bottom",
    labels: {
      fontColor: "#323130",
      fontSize: 14,
    },
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            suggestedMin: 0,
            suggestedMax: 100,
          },
        },
      ],
    },
    responsive: true,
    maintainAspectRatio: matches,
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Gráfica de facturas
      </Typography>
      <div className={classes.lineChart}>
        <Line data={data} legend={legend} options={options} />
      </div>
    </React.Fragment>
  );
};
export default Chart;
