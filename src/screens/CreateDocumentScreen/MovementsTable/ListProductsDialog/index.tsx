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
import { MovementTableType } from "../..";

type RowData = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

interface IResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: RowData[];
}

const columns: Column<RowData>[] = [
  { title: "First Name", field: "first_name", type: "string" },
  { title: "Last Name", field: "last_name", type: "string" },
];

type Props = {
  open: boolean;
  handleClose: () => void;
  movement: MovementTableType;
  setMovement: Dispatch<SetStateAction<MovementTableType>>;
};

const ListProductsDialog: React.FC<Props> = (
  props: Props
): React.ReactElement => {
  const { open, handleClose } = props;
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
      <DialogContent dividers>
        <MaterialTable
          title="Lista de productos"
          icons={TableIcons}
          columns={columns}
          data={(query) =>
            new Promise((resolve, reject) => {
              let url = "https://reqres.in/api/users?";
              url += "per_page=" + query.pageSize;
              url += "&page=" + (query.page + 1);
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
          options={{ showFirstLastPageButtons: false }}
          onRowClick={(event, rowData: RowData | undefined) => {
            console.log(rowData);
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
