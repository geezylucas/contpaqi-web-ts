import React from "react";
import axios, { AxiosResponse } from "axios";
import MaterialTable, { Column } from "material-table";
import { TableIcons } from "../../../components";

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
  { title: "Estatus", field: "Estatus", type: "boolean" },
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

const TemplatesTable: React.FC<{}> = (): React.ReactElement => {
  return (
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
      options={{
        showFirstLastPageButtons: false,
        pageSize: 10,
        actionsColumnIndex: -1,
      }}
    />
  );
};

export default TemplatesTable;
