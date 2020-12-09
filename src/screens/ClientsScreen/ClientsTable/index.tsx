import React from "react";
import axios, { AxiosResponse } from "axios";
import MaterialTable, { Column } from "material-table";
import { TableIcons } from "../../../components";

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

const ClientsTable: React.FC<{}> = (): JSX.Element => {
  return (
    <MaterialTable
      title="Listado"
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
      options={{
        showFirstLastPageButtons: false,
        pageSize: 10,
        actionsColumnIndex: -1,
      }}
    />
  );
};

export default ClientsTable;
