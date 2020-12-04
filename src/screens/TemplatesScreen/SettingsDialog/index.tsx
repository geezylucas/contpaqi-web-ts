import React from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { SettingsDialogType } from "../TemplatesTable";

type Props = {
  propsForm: SettingsDialogType;
  handleClose: () => void;
  handleDateChange: (date: Date | null) => void;
};

const SettingsDialog: React.FC<Props> = (props: Props): JSX.Element => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { propsForm, handleClose, handleDateChange } = props;

  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth={true}
      maxWidth="sm"
      open={propsForm.open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Configurar</DialogTitle>
      <DialogContent>
        <DialogContentText>Llene todos los campos requeridos</DialogContentText>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              autoFocus
              id="ClienteProveedor"
              name="ClienteProveedor"
              label="Cliente o proveedor"
              fullWidth
              value={propsForm.ClienteProveedor}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="Descripcion"
              name="Descripcion"
              label="Descripción"
              multiline
              rowsMax={4}
              fullWidth
              value={propsForm.Descripcion}
            />
          </Grid>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid item xs={12}>
              <KeyboardDatePicker
                fullWidth
                id="date-picker-dialog"
                label="Date picker dialog"
                format="MM/dd/yyyy"
                value={propsForm.ProximaFactura}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <KeyboardTimePicker
                fullWidth
                id="time-picker"
                label="Time picker"
                value={propsForm.ProximaFactura}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={propsForm.Estatus}
                  name="Estatus"
                  color="primary"
                />
              }
              label="Estatus"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleClose} color="primary">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SettingsDialog;
