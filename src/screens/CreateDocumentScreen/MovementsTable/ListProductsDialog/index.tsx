import React, { Dispatch, SetStateAction } from "react";
import { useTheme } from "@material-ui/core/styles";
import axios, { AxiosResponse } from "axios";
import MaterialTable, { Column } from "material-table";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { TableIcons } from "../../../../components";
import { MovementTableType } from "../../types";

type RowData = {
  codigo: string;
  nombre: string;
  precios: null | number[];
  claveSAT: string;
  tipoProducto: string;
};

const columns: Column<RowData>[] = [
  { title: "Código", field: "codigo", type: "string" },
  { title: "Nombre", field: "nombre", type: "string" },
  {
    title: "Precios",
    field: "precios",
    render: (rowData: RowData) =>
      rowData.precios ? rowData.precios.join(" - ") : "Sin precios",
    type: "currency",
  },
  { title: "Clave SAT", field: "claveSAT", type: "string" },
  { title: "Tipo producto", field: "tipoProducto", type: "string" },
];

interface IResponse {
  page: number;
  total: number;
  data: RowData[];
}

type Props = {
  open: boolean;
  handleClose: () => void;
  movement: MovementTableType;
  setMovement: Dispatch<SetStateAction<MovementTableType>>;
};

const ListProductsDialog: React.FC<Props> = (props: Props): JSX.Element => {
  const { open, handleClose, movement, setMovement } = props;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      fullWidth={true}
      maxWidth="md"
      fullScreen={fullScreen}
    >
      <DialogTitle id="form-dialog-title">Seleccione un producto</DialogTitle>
      <DialogContent>
        <MaterialTable
          title="Listado de productos"
          icons={TableIcons}
          columns={columns}
          data={(query) =>
            new Promise((resolve, reject) => {
              let url = "http://localhost:5007/api/Producto/GetProductos?";
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
            setMovement({
              ...movement,
              code: rowData!.codigo,
              name: rowData!.nombre,
              prices: rowData!.precios === null ? [] : rowData!.precios,
              price: 0,
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

export default ListProductsDialog;
