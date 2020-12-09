import React, { useState } from "react";
import axios, { AxiosResponse } from "axios";
import MaterialTable, { Column } from "material-table";
import SettingsIcon from "@material-ui/icons/Settings";
import DescriptionIcon from "@material-ui/icons/Description";
import DeleteIcon from "@material-ui/icons/Delete";
import PauseIcon from "@material-ui/icons/Pause";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { TableIcons } from "../../../components";
import SettingsDialog from "../SettingsDialog";

type RowData = {
  Documentoid: number;
  Descripcion?: string;
  UltimaVezFacturada?: string;
  ProximaFactura?: string;
  Estatus: boolean;
  ClienteProveedor: string;
};

const columns: Column<RowData>[] = [
  { title: "Cliente", field: "ClienteProveedor", type: "string" },
  { title: "Descripción", field: "Descripcion", type: "string" },
  {
    title: "Estatus",
    field: "Estatus",
    render: (rowData) => (rowData.Estatus ? <PlayArrowIcon /> : <PauseIcon />),
  },
  {
    title: "Ultima vez facturada",
    field: "UltimaVezFacturada",
    type: "datetime",
  },
  { title: "Próxima factura", field: "ProximaFactura", type: "datetime" },
];

interface IResponse {
  page: number;
  total: number;
  data: RowData[];
}

export type SettingsDialogType = {
  open: boolean;
  Documentoid: number;
  Descripcion?: string;
  ProximaFactura: Date | null;
  Estatus: boolean;
  ClienteProveedor: string;
};

const TemplatesTable: React.FC<{}> = (): JSX.Element => {
  const [openSettigns, setOpenSettings] = useState<SettingsDialogType>({
    open: false,
    Documentoid: 0,
    Descripcion: undefined,
    ProximaFactura: null,
    Estatus: false,
    ClienteProveedor: "",
  });

  const handleDateChange = (date: Date | null) => {
    setOpenSettings({ ...openSettigns, ProximaFactura: date });
  };

  return (
    <React.Fragment>
      <MaterialTable
        title="Listado"
        icons={TableIcons}
        columns={columns}
        data={(query) =>
          new Promise((resolve, reject) => {
            let url = "http://localhost:5007/api/Plantillas/?";
            url += "Size=" + query.pageSize;
            url += "&Page=" + (query.page + 1);
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
        actions={[
          {
            icon: () => <SettingsIcon />,
            tooltip: "Configurar",
            onClick: (event, rowData: RowData | RowData[]): void =>
              setOpenSettings({
                open: true,
                Documentoid: Array.isArray(rowData)
                  ? rowData[0].Documentoid
                  : rowData.Documentoid,
                Descripcion: Array.isArray(rowData)
                  ? rowData[0].Descripcion
                  : rowData.Descripcion,
                ProximaFactura: Array.isArray(rowData)
                  ? new Date(rowData[0].ProximaFactura!)
                  : new Date(rowData.ProximaFactura!),
                Estatus: Array.isArray(rowData)
                  ? rowData[0].Estatus
                  : rowData.Estatus,
                ClienteProveedor: Array.isArray(rowData)
                  ? rowData[0].ClienteProveedor
                  : rowData.ClienteProveedor,
              }),
          },
          {
            icon: () => <DescriptionIcon />,
            tooltip: "Detalles de plantilla",
            onClick: (event, rowData): void => console.log(rowData),
          },
          {
            icon: () => <DeleteIcon />,
            tooltip: "Eliminar plantilla",
            onClick: (event, rowData): void => console.log(rowData),
          },
        ]}
        options={{
          showFirstLastPageButtons: false,
          pageSize: 10,
          actionsColumnIndex: -1,
        }}
      />
      <SettingsDialog
        propsForm={openSettigns}
        handleClose={() =>
          setOpenSettings({
            open: false,
            Documentoid: 0,
            Descripcion: undefined,
            ProximaFactura: null,
            Estatus: false,
            ClienteProveedor: "",
          })
        }
        handleDateChange={handleDateChange}
      />
    </React.Fragment>
  );
};

export default TemplatesTable;
