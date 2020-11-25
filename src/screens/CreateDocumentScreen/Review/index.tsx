import React, { Dispatch, SetStateAction } from "react";
import { useSelector } from "react-redux";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { IApplicationState } from "../../../store/rootReducer";
import { HeadType, MovementType } from "../../../store/documentSlice/types";
import { financial } from "../../../utils";

const useStyles = makeStyles((theme: Theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

const reducerTotal = (accumulator: number, currentValue: number): number =>
  accumulator + currentValue;

type Props = {
  template: boolean;
  setTemplate: Dispatch<SetStateAction<boolean>>;
  stamp: boolean;
  setStamp: Dispatch<SetStateAction<boolean>>;
};

const Review: React.FC<Props> = (props: Props): React.ReactElement => {
  const classes = useStyles();
  const { template, setTemplate, stamp, setStamp } = props;

  const head: HeadType = useSelector(
    (state: IApplicationState) => state.document.head
  );

  const movements: MovementType[] = useSelector(
    (state: IApplicationState) => state.document.movements
  );

  const handleStamp = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setStamp(event.target.checked);
  };

  const handleTemplate = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setTemplate(event.target.checked);
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Revise todos los datos antes de crear la factura
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Encabezado
          </Typography>
          <Typography gutterBottom>Fecha: {head.fecha}</Typography>
          <Typography gutterBottom>Concepto: {head.nomConcepto}</Typography>
          <Typography gutterBottom>Folio: {head.folio}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Cliente
          </Typography>
          <Typography gutterBottom>
            Nombre: {head.codigoCteProv} {head.nomCteProv}
          </Typography>
          <Typography gutterBottom>Moneda: {head.nomMoneda}</Typography>
          <Typography gutterBottom>
            Tipo de cambio: {head.tipoCambio}
          </Typography>
        </Grid>
      </Grid>
      <Divider />
      <List disablePadding>
        {movements.map(
          (o: MovementType, index: number): JSX.Element => (
            <ListItem className={classes.listItem} key={index}>
              <ListItemText
                primary={o.nomProducto}
                secondary={`Cantidad: ${o.cantidad}`}
              />
              <Typography variant="body2">{o.total}</Typography>
            </ListItem>
          )
        )}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total de productos" />
          <Typography variant="subtitle1" className={classes.total}>
            {movements.length > 0 &&
              financial(
                movements
                  .map((o: MovementType): number => o.cantidad)
                  .reduce(reducerTotal)
              )}
          </Typography>
        </ListItem>
        <Divider />
        <ListItem className={classes.listItem}>
          <ListItemText primary="Subtotal" />
          <Typography variant="subtitle1" className={classes.total}>
            $
            {movements.length > 0 &&
              financial(
                movements
                  .map((o: MovementType): number => o.total)
                  .reduce(reducerTotal) / 1.16
              )}
          </Typography>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText primary="I.V.A" />
          <Typography variant="subtitle1" className={classes.total}>
            $
            {movements.length > 0 &&
              financial(
                (movements
                  .map((o: MovementType): number => o.total)
                  .reduce(reducerTotal) /
                  1.16) *
                  0.16
              )}
          </Typography>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            $
            {movements.length > 0 &&
              financial(
                movements
                  .map((o: MovementType): number => o.total)
                  .reduce(reducerTotal)
              )}
          </Typography>
        </ListItem>
      </List>
      <Divider />
      <FormControlLabel
        control={
          <Checkbox
            checked={stamp}
            onChange={handleStamp}
            name="stamp"
            color="primary"
          />
        }
        label="¿Timbrar el documento?"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={template}
            onChange={handleTemplate}
            name="template"
            color="primary"
          />
        }
        label="¿Desea guardar este documento como una plantilla para su facturación automáticamente?"
      />
    </React.Fragment>
  );
};

export default Review;
