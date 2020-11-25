import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
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
import { fetchFillView } from "../../store/documentSlice";
import { addHead, addMovements } from "../../store/documentSlice";
import { MovementType } from "../../store/documentSlice/types";

const useStylesCreateDocument = makeStyles((theme: Theme) => ({
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
}));

const steps: string[] = ["Encabezado", "Movimientos", "Revisar"];

export type HeaderType = {
  date: string;
  folio: number;
  client: {
    code: string;
    businessName: string;
    rfc: string;
    currency: number;
    nomCurrency: string;
  };
  exchangeRate: number;
  concept: number;
  nomConcept: string;
};

export type MovementTableType = {
  uuid: string;
  code: string;
  name: string;
  amount: number;
  unit: number;
  price: number;
  tax: number;
  subtotal: number;
  total: number;
  prices: number[];
};

const CreateDocumentScreen: React.FC<{}> = (): React.ReactElement => {
  const classes = useStyles();
  const classesCreateDocument = useStylesCreateDocument();
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState<number>(0);
  const [movements, setMovements] = useState<MovementTableType[]>([]);
  const [header, setHeader] = useState<HeaderType>({
    date: moment(Date.now()).format("YYYY-MM-DD"),
    folio: 0,
    client: {
      code: "",
      businessName: "",
      rfc: "",
      currency: 1,
      nomCurrency: "",
    },
    exchangeRate: 1.0,
    concept: 0,
    nomConcept: "",
  });
  const [template, setTemplate] = useState<boolean>(false);
  const [stamp, setStamp] = useState<boolean>(true);

  const isMountedRef = useRef<boolean>(true);

  useEffect(() => {
    if (isMountedRef.current) {
      dispatch(fetchFillView());
    }
  }, [dispatch]);

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    switch (activeStep) {
      case 1:
        dispatch(
          addHead({
            numMoneda: header.client.currency,
            nomMoneda: header.client.nomCurrency,
            tipoCambio: header.exchangeRate,
            codConcepto: header.concept,
            nomConcepto: header.nomConcept,
            codigoCteProv: header.client.code,
            nomCteProv: header.client.businessName,
            fecha: header.date,
            folio: header.folio,
          })
        );
        break;
      case 2:
        const summaryMovements: MovementType[] = movements.map(
          (o: MovementTableType) => ({
            codAlmacen: 1,
            codProducto: o.code,
            nomProducto: o.name,
            precio: o.price,
            cantidad: o.amount,
            total: o.total,
          })
        );

        dispatch(addMovements(summaryMovements));
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStep]);

  const handleNext = (): void => setActiveStep(activeStep + 1);

  const handleBack = (): void => setActiveStep(activeStep - 1);

  function getStepContent(step: number): JSX.Element {
    switch (step) {
      case 0:
        return <HeadForm header={header} setHeader={setHeader} />;
      case 1:
        return <MovementsTable rows={movements} setRows={setMovements} />;
      case 2:
        return (
          <Review
            template={template}
            setTemplate={setTemplate}
            stamp={stamp}
            setStamp={setStamp}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }

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
