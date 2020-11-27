import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { v4 as uuidv4 } from "uuid";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import SearchIcon from "@material-ui/icons/Search";
import { MovementTableType } from "../../types";
import ListProductsDialog from "../ListProductsDialog";
import { financial } from "../../../../utils";

type Props = {
  open: boolean;
  handleClose: () => void;
  setRows: Dispatch<SetStateAction<MovementTableType[]>>;
};

const AddMovementDialog: React.FC<Props> = (props: Props) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [movement, setMovement] = useState<MovementTableType>({
    uuid: uuidv4(),
    code: "",
    name: "",
    amount: 0,
    unit: 0,
    price: 0,
    tax: 0,
    subtotal: 0,
    total: 0,
    prices: [],
  });

  const { open, handleClose, setRows } = props;

  useEffect(() => {
    setMovement({
      uuid: uuidv4(),
      code: "",
      name: "",
      amount: 0,
      unit: 0,
      price: 0,
      tax: 0,
      subtotal: 0,
      total: 0,
      prices: [],
    });
  }, [open]);

  const handlePrice = (event: React.ChangeEvent<HTMLInputElement>): void => {
    let value: number = parseFloat(event.target.value);

    setMovement({
      ...movement,
      price: value,
      subtotal: financial(value * movement.amount),
      tax: financial(value * movement.amount * 0.16),
      total: financial(value * movement.amount * 1.16),
    });
  };

  const handleAmount = (event: React.ChangeEvent<HTMLInputElement>): void => {
    let value: number = parseFloat(event.target.value);

    setMovement({
      ...movement,
      amount: value,
      subtotal: financial(value * movement.price),
      tax: financial(value * movement.price * 0.16),
      total: financial(value * movement.price * 1.16),
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    setRows((prevArray: MovementTableType[]) => [...prevArray, movement]);

    handleClose();
  };

  const SearchProduct = (): JSX.Element => (
    <Tooltip title="Buscar producto o servicio">
      <IconButton onClick={() => setOpenDialog(true)} size="small">
        <SearchIcon />
      </IconButton>
    </Tooltip>
  );

  return (
    <React.Fragment>
      <Dialog
        open={open}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
        maxWidth="md"
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle id="form-dialog-title">Agregar movimiento</DialogTitle>
          <DialogContent>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="product"
                  name="product"
                  label="Producto"
                  fullWidth
                  value={
                    movement.code !== ""
                      ? `${movement.code} ${movement.name}`
                      : ""
                  }
                  InputProps={{ endAdornment: <SearchProduct /> }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="storage"
                  name="storage"
                  label="Almacen"
                  fullWidth
                  value={1}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="amount"
                  name="amount"
                  label="Cantidad"
                  type="number"
                  inputProps={{ min: "0", step: "1" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  onChange={handleAmount}
                  value={movement.amount}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                {movement.prices.length > 0 ? (
                  <TextField
                    required
                    select
                    id="price"
                    name="price"
                    label="Precio"
                    fullWidth
                    value={movement.price}
                    helperText="Por favor selecciona un elemento"
                    onChange={handlePrice}
                  >
                    <MenuItem value={0} disabled>
                      Selecciona un precio
                    </MenuItem>
                    {movement.prices.map(
                      (o: number): JSX.Element => (
                        <MenuItem key={o} value={o}>
                          {o}
                        </MenuItem>
                      )
                    )}
                  </TextField>
                ) : (
                  <TextField
                    required
                    id="price"
                    name="price"
                    label="Precio"
                    type="number"
                    inputProps={{ min: "0", step: "0.01" }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    value={movement.price}
                    onChange={handlePrice}
                  />
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  disabled
                  id="discount"
                  name="discount"
                  label="Descuento"
                  fullWidth
                  value="0"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  disabled
                  id="tax"
                  name="tax"
                  label="I.V.A."
                  fullWidth
                  value={movement.tax}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  disabled
                  id="subtotal"
                  name="subtotal"
                  label="Subtotal"
                  fullWidth
                  value={movement.subtotal}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  disabled
                  id="total"
                  name="total"
                  label="Total"
                  fullWidth
                  value={movement.total}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button type="submit" color="primary">
              Agregar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <ListProductsDialog
        movement={movement}
        setMovement={setMovement}
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
      />
    </React.Fragment>
  );
};

export default AddMovementDialog;
