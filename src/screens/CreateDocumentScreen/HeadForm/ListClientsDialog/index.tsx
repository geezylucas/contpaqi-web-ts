import React, { Dispatch, SetStateAction } from "react";
import axios, { AxiosResponse } from "axios";
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
import { HeaderType } from "../../types";
import { IApplicationState } from "../../../../store/rootReducer";
import { ValueLabelType } from "../../../../store/documentSlice/types";

type RowData = {
  codigo: string;
  razonSocial: string;
  rfc: string;
  idMoneda: number;
  moneda: string;
  tipoCliente: string;
};

const columns: Column<RowData>[] = [
  { title: "Código", field: "codigo", type: "string" },
  { title: "Razón social", field: "razonSocial", type: "string" },
  { title: "RFC", field: "rfc", type: "string" },
  { title: "Moneda", field: "moneda", type: "string" },
  { title: "Tipo Cliente", field: "tipoCliente", type: "string" },
];

interface IResponse {
  page: number;
  total: number;
  data: RowData[];
}

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

  const currencies: ValueLabelType[] = useSelector(
    (state: IApplicationState) => state.document.extra.currencies
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
      <DialogContent>
        <MaterialTable
          title="Listado de clientes"
          icons={TableIcons}
          columns={columns}
          data={(query) =>
            new Promise((resolve, reject) => {
              let url = "http://localhost:5007/api/Cliente/GetClientes?";
              url += "PageNumber=" + (query.page + 1);
              url += "&Rows=" + query.pageSize;
              axios
                .get<IResponse>(url)
                .then((response: AxiosResponse<IResponse>) => {
                  resolve({
                    data: response.data.data,
                    page: response.data.page - 1,
                    totalCount: response.data.total,
                  });
                });
            })
          }
          onRowClick={(event, rowData: RowData | undefined) => {
            const currency: ValueLabelType | undefined = currencies.find(
              (o: ValueLabelType) => o.value === rowData!.idMoneda
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
          options={{
            showFirstLastPageButtons: false,
            actionsColumnIndex: -1,
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
