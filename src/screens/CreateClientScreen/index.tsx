import React, { useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import { ValueLabelType } from "../../types";
import { IApplicationState } from "../../store/rootReducer";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    padding: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(3),
    },
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const typeClient: ValueLabelType[] = [
  {
    value: 1,
    label: "Cliente",
  },
  {
    value: 2,
    label: "Cliente - proveedor",
  },
  {
    value: 3,
    label: "Proveedor",
  },
];

type FormType = {
  codeClient: string;
  businessName: string;
  dateNow: string;
  rfc: string;
  curp: string;
  currency: string;
  typeClient: string;
};

interface IStateProps {
  currencies: ValueLabelType[];
}

type Props = IStateProps;

const CreateClientScreen: React.FC<Props> = (
  props: Props
): React.ReactElement => {
  const classes = useStyles();
  const [form, setForm] = useState<FormType>({
    codeClient: "",
    businessName: "",
    dateNow: moment(Date.now()).format("YYYY-MM-DD"),
    rfc: "",
    curp: "",
    currency: "",
    typeClient: "",
  });

  const { currencies } = props;

  const handleInputs = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;

    setForm({ ...form, [name]: value });
  };

  return (
    <Container maxWidth="md">
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h4" align="center">
          Nuevo cliente
        </Typography>
        <Typography variant="h6" gutterBottom>
          Llenar todos los campos requeridos
        </Typography>
        <form>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                id="dateNow"
                name="dateNow"
                label="Fecha"
                type="date"
                fullWidth
                disabled
                defaultValue={form.dateNow}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="codeClient"
                name="codeClient"
                label="Código cliente"
                required
                fullWidth
                value={form.codeClient}
                onChange={handleInputs}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                id="businessName"
                name="businessName"
                label="Razón social"
                required
                fullWidth
                value={form.businessName}
                onChange={handleInputs}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="rfc"
                name="rfc"
                label="RFC"
                fullWidth
                value={form.rfc}
                onChange={handleInputs}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="curp"
                name="curp"
                label="CURP"
                fullWidth
                value={form.curp}
                onChange={handleInputs}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                select
                id="currency"
                name="currency"
                label="Moneda"
                fullWidth
                helperText="Por favor selecciona un elemento"
                value={form.currency}
                onChange={handleInputs}
              >
                {currencies.map(
                  (option: ValueLabelType): JSX.Element => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  )
                )}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                select
                id="typeClient"
                name="typeClient"
                label="Tipo cliente"
                fullWidth
                helperText="Por favor selecciona un elemento"
                value={form.typeClient}
                onChange={handleInputs}
              >
                {typeClient.map(
                  (option: ValueLabelType): JSX.Element => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  )
                )}
              </TextField>
            </Grid>
          </Grid>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              type="submit"
            >
              Crear
            </Button>
          </div>
        </form>
      </Paper>
    </Container>
  );
};

const mapStateToProps = (state: IApplicationState): IStateProps => ({
  currencies: state.document.extra.currencies,
});

export default connect<IStateProps, {}, {}, IApplicationState>(
  mapStateToProps,
  {}
)(CreateClientScreen);
