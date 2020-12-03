import React, { useState } from "react";
import axios, { AxiosResponse } from "axios";
import MaterialTable, { Column } from "material-table";
import { TableIcons } from "../../../components";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import PDFDialog from "../PDFDialog";

type RowData = {
  codConcepto: number;
  nombreConcepto: string;
  folio: number;
  serie: string;
  fecha: string;
  razonSocialCliente: string;
  total: number;
  pendiente: number;
};

type PdfType = {
  open: boolean;
  id: number;
};

const columns: Column<RowData>[] = [
  { title: "Nombre Concepto", field: "nombreConcepto", type: "string" },
  { title: "Concepto", field: "codConcepto", type: "numeric" },
  { title: "Folio", field: "folio", type: "numeric" },
  { title: "Fecha", field: "fecha", type: "datetime" },
  { title: "Razón social", field: "razonSocialCliente", type: "string" },
  { title: "Total", field: "total", type: "currency" },
  { title: "Pendiente", field: "pendiente", type: "currency" },
];

interface IResponse {
  page: number;
  total: number;
  data: RowData[];
}

const DocumentsTable: React.FC<{}> = (): React.ReactElement => {
  const [openPDF, setOpenPDF] = useState<PdfType>({ open: false, id: 0 });

  return (
    <React.Fragment>
      <MaterialTable
        title="Listado"
        icons={TableIcons}
        columns={columns}
        data={(query) =>
          new Promise((resolve, reject) => {
            let url = "http://localhost:5007/api/Documento/GetDocumentos?";
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
        actions={[
          {
            icon: () => <PictureAsPdfIcon />,
            tooltip: "Save User",
            onClick: (event, rowData: RowData | RowData[]): void =>
              setOpenPDF({
                id: Array.isArray(rowData) ? rowData[0].folio : rowData.folio,
                open: true,
              }),
          },
        ]}
        options={{ showFirstLastPageButtons: false, actionsColumnIndex: -1 }}
      />
      <PDFDialog
        open={openPDF.open}
        handleClose={() => setOpenPDF({ ...openPDF, open: false })}
        id={openPDF.id}
      />
    </React.Fragment>
  );
};

export default DocumentsTable;
