import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

const HeadForm: React.FC<{}> = (): React.ReactElement => {
  const SearchClient = (): JSX.Element => (
    <Tooltip title="Buscar cliente">
      <IconButton size="small">
        <SearchIcon />
      </IconButton>
    </Tooltip>
  );

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Llenar todos los campos requeridos
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            select
            id="concept"
            name="concept"
            label="Concepto"
            fullWidth
            helperText="Por favor selecciona un elemento"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField id="folio" name="folio" label="Folio" disabled fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="date"
            name="date"
            label="Fecha"
            type="date"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="client"
            name="client"
            label="Cliente"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchClient />
                </InputAdornment>
              ),
            }}
            helperText="Por favor busque y seleccione un elemento"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            id="currency"
            name="currency"
            label="Moneda"
            fullWidth
            helperText="Por favor selecciona un elemento"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="exchangeRate"
            name="exchangeRate"
            label="Tipo de cambio"
            type="number"
            fullWidth
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default HeadForm;
