import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Hidden from "@material-ui/core/Hidden";
import HeadForm from "./HeadForm";
import MovementsTable from "./MovementsTable";
import Review from "./Review";
import { useStyles } from "../../App.css";

const useStylesCreateDocument = makeStyles((theme: Theme) => ({
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
}));

const steps: string[] = ["Encabezado", "Movimientos", "Revisar"];

function getStepContent(step: number): JSX.Element {
  switch (step) {
    case 0:
      return <HeadForm />;
    case 1:
      return <MovementsTable />;
    case 2:
      return <Review />;
    default:
      throw new Error("Unknown step");
  }
}

const CreateDocumentScreen: React.FC<{}> = (): React.ReactElement => {
  const classes = useStyles();
  const classesCreateDocument = useStylesCreateDocument();
  const [activeStep, setActiveStep] = React.useState<number>(0);

  const handleNext = (): void => setActiveStep(activeStep + 1);

  const handleBack = (): void => setActiveStep(activeStep - 1);

  return (
    <Container maxWidth="md">
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h4" align="center">
          Crear factura
        </Typography>
        <Hidden smUp implementation="css">
          <Stepper
            activeStep={activeStep}
            className={classesCreateDocument.stepper}
            orientation="vertical"
          >
            {steps.map(
              (label: string): JSX.Element => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              )
            )}
          </Stepper>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Stepper
            activeStep={activeStep}
            className={classesCreateDocument.stepper}
          >
            {steps.map(
              (label: string): JSX.Element => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              )
            )}
          </Stepper>
        </Hidden>
        <React.Fragment>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <div className={classes.buttons}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} className={classes.button}>
                    Atrás
                  </Button>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                >
                  {activeStep === steps.length - 1
                    ? "Crear factura"
                    : "Siguiente"}
                </Button>
              </div>
            </React.Fragment>
          )}
        </React.Fragment>
      </Paper>
    </Container>
  );
};

export default CreateDocumentScreen;
