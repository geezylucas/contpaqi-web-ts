import React, { useState } from "react";
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
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import { ValueLabelType } from "../../types";
import { useStyles } from "../../App.css";

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

const AddPrice = (): JSX.Element => (
  <Tooltip title="Buscar cliente">
    <IconButton type="submit">
      <AddIcon />
    </IconButton>
  </Tooltip>
);

type FormType = {
  codeProduct: string;
  nameProduct: string;
  description: string;
  typeProduct: string;
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
    typeProduct: "",
    satKey: "",
    dateNow: moment(Date.now()).format("YYYY-MM-DD"),
    prices: [],
  });

  const handleInputs = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;

    setForm({ ...form, [name]: value });
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
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={12} sm={4}>
              <form
                onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                  event.preventDefault();
                  setForm({ ...form, prices: [...form.prices, price] });
                  setPrice(0);
                }}
              >
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
              </form>
              <List>
                {form.prices.map((value) => {
                  const labelId = `checkbox-list-label-${value}`;
                  return (
                    <ListItem key={value} role={undefined} dense button>
                      <ListItemText id={labelId} primary={`Precio: ${value}`} />
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
                })}
              </List>
            </Grid>
          </Grid>
        </Box>
        <div className={classes.buttons}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Crear
          </Button>
        </div>
      </Paper>
    </Container>
  );
};

export default CreateProductScreen;
