import React from "react";
import axios, { AxiosResponse } from "axios";
import MaterialTable, { Column } from "material-table";
import { TableIcons } from "../../../components";

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

const ProductsTable: React.FC<{}> = (): JSX.Element => {
  return (
    <MaterialTable
      title="Listado"
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
      options={{
        showFirstLastPageButtons: false,
        pageSize: 10,
        actionsColumnIndex: -1,
      }}
    />
  );
};

export default ProductsTable;
