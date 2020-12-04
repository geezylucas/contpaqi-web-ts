import React, { useState, useEffect, useRef } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import queryString from "querystring";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Hidden from "@material-ui/core/Hidden";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import HeadForm from "./HeadForm";
import MovementsTable from "./MovementsTable";
import Review from "./Review";
import { useStyles } from "../../App.css";
import { fetchFillView } from "../../store/documentSlice";
import { addHead, addMovements } from "../../store/documentSlice";
import { MovementType, HeadType } from "../../store/documentSlice/types";
import { IApplicationState } from "../../store/rootReducer";
import {
  DataTypeSend,
  HeaderType,
  MovementTableType,
  MovementTypeSend,
} from "./types";

const useStylesCreateDocument = makeStyles((theme: Theme) => ({
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
}));

const steps: string[] = ["Encabezado", "Movimientos", "Revisar"];

interface IProps extends RouteComponentProps {}

const CreateDocumentScreen: React.FC<IProps> = (
  props: IProps
): React.ReactElement => {
  const classes = useStyles();
  const classesCreateDocument = useStylesCreateDocument();
  const dispatch = useDispatch();

  const { location } = props;

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
  const [sendingData, setSendingData] = useState<boolean>(true);
  const [template, setTemplate] = useState<boolean>(false);
  const [stamp, setStamp] = useState<boolean>(true);

  const isMountedRef = useRef<boolean>(true);

  const headState: HeadType = useSelector(
    (state: IApplicationState) => state.document.head
  );
  const movementsState: MovementType[] = useSelector(
    (state: IApplicationState) => state.document.movements
  );

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
    const queryParams = queryString.parse(location.search);

    const keysQueryParams: number = Object.keys(queryParams).length;

    if (keysQueryParams > 0) {
      setTemplate(true);
      setStamp(false);
    } else {
      setTemplate(false);
      setStamp(true);
    }
  }, [location.search]);

  useEffect(() => {
    const sendDataAsync = async (data: DataTypeSend) => {
      try {
        await axios.post("http://localhost:5007/api/Documento/", data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setSendingData(false);
      } catch (error) {
        console.log(error);
      }
    };

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
      case 3:
        const data: DataTypeSend = {
          cabecera: {
            numMoneda: headState.numMoneda,
            serie: {
              m_MaxCapacity: 2147483647,
              Capacity: 16,
              m_StringValue: "",
              m_currentThread: 0,
            },
            tipoCambio: headState.tipoCambio,
            codConcepto: headState.codConcepto,
            codigoCteProv: headState.codigoCteProv,
            fecha: moment(headState.fecha).format("MM/DD/YYYY"),
          },
          movimientos: movementsState.map(
            (o: MovementType): MovementTypeSend => ({
              codAlmacen: o.codAlmacen,
              codProducto: o.codProducto,
              precio: o.precio,
              unidades: o.cantidad,
            })
          ),
          guardarPlantilla: template,
          timbrar: stamp,
        };

        sendDataAsync(data);
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
            sendingData ? (
              <Grid container justify="center">
                <CircularProgress size={50} />
              </Grid>
            ) : (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Documento creado
                </Typography>
                <Typography variant="subtitle1">
                  Documento creado y timbrado con éxito.
                </Typography>
                {template && (
                  <Typography variant="subtitle1">
                    Vaya a la pestaña de "Adminitrar facturas automáticas" para
                    terminar de configurar su nueva plantilla.
                  </Typography>
                )}
              </React.Fragment>
            )
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

export default withRouter(CreateDocumentScreen);
