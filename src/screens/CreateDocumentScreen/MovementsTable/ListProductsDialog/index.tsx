import React, { Dispatch, SetStateAction } from "react";
import { useTheme } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import MaterialTable, { Column } from "material-table";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { TableIcons } from "../../../../components";
import { MovementTableType } from "../../types";
import { ProductServiceType } from "../../../../store/documentSlice/types";
import { IApplicationState } from "../../../../store/rootReducer";

const columns: Column<ProductServiceType>[] = [
  { title: "Código", field: "codigo", type: "string" },
  { title: "Nombre", field: "nombre", type: "string" },
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
  const { open, handleClose, movement, setMovement } = props;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const products: ProductServiceType[] = useSelector(
    (state: IApplicationState) => state.document.extraAPI.productosYServicios
  );

  const rows: ProductServiceType[] = products.map(
    (o: ProductServiceType): ProductServiceType => ({
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
      <DialogTitle id="form-dialog-title">Seleccione un producto</DialogTitle>
      <DialogContent>
        <MaterialTable
          title="Lista de productos"
          icons={TableIcons}
          columns={columns}
          data={rows}
          options={{ showFirstLastPageButtons: false }}
          onRowClick={(event, rowData: ProductServiceType | undefined) => {
            setMovement({
              ...movement,
              code: rowData!.codigo,
              name: rowData!.nombre,
              prices: rowData!.precios === null ? [] : rowData!.precios,
              price: 0,
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

export default ListProductsDialog;
