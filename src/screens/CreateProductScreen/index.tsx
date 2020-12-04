import React, { useState } from "react";
import axios from "axios";
import moment from "moment";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import { ValueLabelType } from "../../store/documentSlice/types";
import { useStyles } from "../../App.css";
import { financial } from "../../utils";

const typeProduct: ValueLabelType[] = [
  {
    value: 1,
    label: "Producto",
  },
  {
    value: 2,
    label: "Paquete",
  },
  {
    value: 3,
    label: "Servicio",
  },
];

type FormType = {
  codeProduct: string;
  nameProduct: string;
  description: string;
  typeProduct: number;
  satKey: string;
  dateNow: string;
  prices: number[];
};

const CreateProductScreen: React.FC<{}> = (): React.ReactElement => {
  const classes = useStyles();
  const [price, setPrice] = useState<number>(0.0);
  const [form, setForm] = useState<FormType>({
    codeProduct: "",
    nameProduct: "",
    description: "",
    typeProduct: 0,
    satKey: "",
    dateNow: moment(Date.now()).format("YYYY-MM-DD"),
    prices: [],
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const AddPrice: React.FC<{}> = (): JSX.Element => (
    <Tooltip title="Buscar cliente">
      <IconButton onClick={addPrice}>
        <AddIcon />
      </IconButton>
    </Tooltip>
  );

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleInputs = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;

    setForm({ ...form, [name]: value });
  };

  const addPrice = (): void => {
    setForm({ ...form, prices: [...form.prices, price] });
    setPrice(0);
  };

  interface IDataSend {
    [key: string]: string | number[] | number;
  }

  const onSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    setLoading(true);

    const data: IDataSend = {
      cCodigoProducto: form.codeProduct,
      cNombreProducto: form.nameProduct,
      cDescripcionProducto: form.description,
      cTipoProducto: form.typeProduct,
      cFechaAltaProducto: form.dateNow,
      cStatusProducto: 1,
      cClaveSAT: form.satKey,
    };

    form.prices.forEach((o: number, index: number) => {
      let key: string = `cPrecio${index + 1}`;
      data[key] = financial(o);
    });

    try {
      const response = await axios.post(
        "http://localhost:5007/api/Producto/",
        data,
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
          codeProduct: "",
          nameProduct: "",
          description: "",
          typeProduct: 0,
          satKey: "",
          dateNow: moment(Date.now()).format("YYYY-MM-DD"),
          prices: [],
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
          Nuevo producto
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
                  id="codeProduct"
                  name="codeProduct"
                  label="Código producto"
                  required
                  fullWidth
                  value={form.codeProduct}
                  onChange={handleInputs}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="nameProduct"
                  name="nameProduct"
                  label="Nombre producto"
                  required
                  fullWidth
                  value={form.nameProduct}
                  onChange={handleInputs}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  select
                  id="typeProduct"
                  name="typeProduct"
                  label="Tipo producto"
                  fullWidth
                  helperText="Por favor selecciona un elemento"
                  value={form.typeProduct}
                  onChange={handleInputs}
                >
                  <MenuItem value={0} disabled>
                    Selecciona un tipo producto
                  </MenuItem>
                  {typeProduct.map(
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
                  id="description"
                  name="description"
                  label="Descripción"
                  multiline
                  fullWidth
                  value={form.description}
                  onChange={handleInputs}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="satKey"
                  name="satKey"
                  label="Clave SAT"
                  required
                  fullWidth
                  value={form.satKey}
                  onChange={handleInputs}
                />
              </Grid>
            </Grid>
            <Box marginTop={4}>
              <Grid
                container
                spacing={3}
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid item xs={12} sm={4}>
                  <React.Fragment>
                    <TextField
                      id="price"
                      name="price"
                      label="Precio"
                      type="number"
                      inputProps={{ min: "0", step: "0.01" }}
                      value={price}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setPrice(parseFloat(event.target.value))
                      }
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <AddPrice />
                          </InputAdornment>
                        ),
                      }}
                      helperText="Por favor agregar un elemento si desea que el producto tenga precios por defecto"
                    />
                    <List>
                      {form.prices.map(
                        (value: number): JSX.Element => {
                          const labelId = `checkbox-list-label-${value}`;
                          return (
                            <ListItem key={value} role={undefined} dense button>
                              <ListItemText
                                id={labelId}
                                primary={`Precio: ${value}`}
                              />
                              <ListItemSecondaryAction>
                                <IconButton
                                  edge="end"
                                  aria-label="comments"
                                  onClick={() => {
                                    const newPrices = form.prices.filter(
                                      (elem) => elem !== value
                                    );

                                    setForm({ ...form, prices: newPrices });
                                  }}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </ListItemSecondaryAction>
                            </ListItem>
                          );
                        }
                      )}
                    </List>
                  </React.Fragment>
                </Grid>
              </Grid>
            </Box>
            <div className={classes.buttons}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.button}
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
            Se agregó correctamente el producto al catálogo de productos o
            servicios.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CreateProductScreen;
