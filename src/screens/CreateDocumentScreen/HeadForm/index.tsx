import React, { Dispatch, SetStateAction, useState } from "react";
import { useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import MenuItem from "@material-ui/core/MenuItem";
import SearchIcon from "@material-ui/icons/Search";
import { HeaderType } from "../types";
import {
  ConceptType,
  ValueLabelType,
} from "../../../store/documentSlice/types";
import { IApplicationState } from "../../../store/rootReducer";
import ListClientsDialog from "./ListClientsDialog";

type Props = {
  header: HeaderType;
  setHeader: Dispatch<SetStateAction<HeaderType>>;
};

const HeadForm: React.FC<Props> = (props: Props): React.ReactElement => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const { header, setHeader } = props;

  const concepts: ConceptType[] = useSelector(
    (state: IApplicationState) => state.document.extraAPI.conceptos
  );
  const currencies: ValueLabelType[] = useSelector(
    (state: IApplicationState) => state.document.extra.currencies
  );

  const handleConcepts = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const concept: ConceptType | undefined = concepts.find(
      (o: ConceptType) => o.codigoConcepto === parseInt(event.target.value, 10)
    );

    setHeader({
      ...header,
      nomConcept: concept!.nombreConcepto,
      concept: concept!.codigoConcepto,
      folio: concept!.noFolio,
    });
  };

  const handleCurrency = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const currency: ValueLabelType | undefined = currencies.find(
      (o: ValueLabelType) => o.value === parseInt(event.target.value, 10)
    );

    setHeader({
      ...header,
      client: {
        ...header.client,
        currency: currency!.value,
        nomCurrency: currency!.label,
      },
    });
  };

  const handleInputs = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;

    setHeader({ ...header, [name]: value });
  };

  const SearchClient = (): JSX.Element => (
    <Tooltip title="Buscar cliente">
      <IconButton size="small" onClick={() => setOpenDialog(true)}>
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
            value={header.concept}
            onChange={handleConcepts}
          >
            <MenuItem value={0} disabled>
              Selecciona un concepto
            </MenuItem>
            {concepts.map(
              (option: ConceptType): JSX.Element => (
                <MenuItem
                  key={option.codigoConcepto}
                  value={option.codigoConcepto}
                >
                  {option.nombreConcepto}
                </MenuItem>
              )
            )}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="folio"
            name="folio"
            label="Folio"
            disabled
            fullWidth
            value={header.folio}
          />
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
            value={header.date}
            onChange={handleInputs}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="client"
            name="client"
            label="Cliente"
            fullWidth
            value={
              header.client.code !== ""
                ? `${header.client.code} ${header.client.businessName}`
                : ""
            }
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
            value={header.client.currency}
            onChange={handleCurrency}
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
            id="exchangeRate"
            name="exchangeRate"
            label="Tipo de cambio"
            type="number"
            fullWidth
            value={header.exchangeRate}
            onChange={handleInputs}
          />
        </Grid>
      </Grid>
      <ListClientsDialog
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        setHeader={setHeader}
        header={header}
      />
    </React.Fragment>
  );
};

export default React.memo(HeadForm);
