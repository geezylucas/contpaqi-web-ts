import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Line } from "react-chartjs-2";

const useStyles = makeStyles({
  lineChart: {
    position: "relative",
  },
});

const Chart: React.FC<{}> = (): React.ReactElement => {
  const classes = useStyles();

  const data = {
    labels: ["1", "2", "3", "4", "5", "6"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
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
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
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
