import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import moment from "moment";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import { ValueLabelType } from "../../store/documentSlice/types";
import { IApplicationState } from "../../store/rootReducer";
import { useStyles } from "../../App.css";

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

const CreateClientScreen: React.FC<{}> = (): React.ReactElement => {
  const classes = useStyles();
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormType>({
    codeClient: "",
    businessName: "",
    dateNow: moment(Date.now()).format("YYYY-MM-DD"),
    rfc: "",
    curp: "",
    currency: "",
    typeClient: "",
  });

  const handleClose = (): void => {
    setOpen(false);
  };

  const currencies: ValueLabelType[] = useSelector(
    (state: IApplicationState) => state.document.extra.currencies
  );

  const handleInputs = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;

    setForm({ ...form, [name]: value });
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5007/api/Cliente/",
        {
          cCodigoCliente: form.codeClient,
          cRazonSocial: form.businessName,
          cFechaAlta: moment(form.dateNow).format("MM/DD/YYYY"),
          cRFC: form.rfc,
          cCURP: form.curp,
          cNombreMoneda: form.currency,
          cTipoCliente: form.typeClient,
          cEstatus: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        setLoading(false);
        setOpen(true);
        setForm({
          codeClient: "",
          businessName: "",
          dateNow: moment(Date.now()).format("YYYY-MM-DD"),
          rfc: "",
          curp: "",
          currency: "",
          typeClient: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
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
        {loading ? (
          <Grid container justify="center">
            <CircularProgress size={50} />
          </Grid>
        ) : (
          <form onSubmit={onSubmit}>
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
        )}
      </Paper>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Alerta</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Se agregó correctamente el cliente al catálogo de clientes y
            proveedores.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CreateClientScreen;
