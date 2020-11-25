import React, { Dispatch, SetStateAction } from "react";
import { useSelector } from "react-redux";
import { useTheme } from "@material-ui/core/styles";
import MaterialTable, { Column } from "material-table";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { TableIcons } from "../../../../components";
import { HeaderType } from "../..";
import { IApplicationState } from "../../../../store/rootReducer";
import {
  ClientProviderType,
  ValueLabelType,
} from "../../../../store/documentSlice/types";

const columns: Column<ClientProviderType>[] = [
  { title: "Código", field: "codigo", type: "string" },
  { title: "Razón social", field: "razonSocial", type: "string" },
  { title: "RFC", field: "rfc", type: "string" },
];

type Props = {
  open: boolean;
  handleClose: () => void;
  header: HeaderType;
  setHeader: Dispatch<SetStateAction<HeaderType>>;
};

const ListClientsDialog: React.FC<Props> = (
  props: Props
): React.ReactElement => {
  const { open, handleClose, header, setHeader } = props;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const clients: ClientProviderType[] = useSelector(
    (state: IApplicationState) => state.document.extraAPI.clientesYProveedores
  );

  const currencies: ValueLabelType[] = useSelector(
    (state: IApplicationState) => state.document.extra.currencies
  );

  const rows: ClientProviderType[] = clients.map(
    (o: ClientProviderType): ClientProviderType => ({
      ...o,
    })
  );

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      fullWidth={true}
      maxWidth="md"
      fullScreen={fullScreen}
    >
      <DialogTitle id="form-dialog-title">Seleccione un cliente</DialogTitle>
      <DialogContent dividers>
        <MaterialTable
          title="Lista de clientes"
          icons={TableIcons}
          columns={columns}
          data={rows}
          options={{ showFirstLastPageButtons: false }}
          onRowClick={(event, rowData: ClientProviderType | undefined) => {
            const currency: ValueLabelType | undefined = currencies.find(
              (o) => o.value === rowData!.moneda
            );

            setHeader({
              ...header,
              client: {
                code: rowData!.codigo,
                businessName: rowData!.razonSocial,
                rfc: rowData!.rfc,
                currency: currency!.value,
                nomCurrency: currency!.label,
              },
            });

            handleClose();
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(ListClientsDialog);
