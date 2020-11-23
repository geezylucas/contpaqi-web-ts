import React from "react";
import axios, { AxiosResponse } from "axios";
import MaterialTable, { Column } from "material-table";
import { TableIcons } from "../../../components";

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
  {
    title: "Avatar",
    field: "avatar",
    type: "string",
    render: (rowData: RowData) => (
      <img
        style={{ height: 36, borderRadius: "50%" }}
        src={rowData.avatar}
        alt={`${rowData.first_name} ${rowData.last_name}`}
      />
    ),
  },
  { title: "First Name", field: "first_name", type: "string" },
  { title: "Last Name", field: "last_name", type: "string" },
];

const DocumentsTable: React.FC<{}> = (): React.ReactElement => {
  return (
    <MaterialTable
      title="Lista de documentos"
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
    />
  );
};

export default DocumentsTable;
