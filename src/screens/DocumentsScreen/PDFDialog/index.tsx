import React from "react";
import { useTheme } from "@material-ui/core/styles";
import { Document, Page, pdfjs } from "react-pdf";
import { SizeMe } from "react-sizeme";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

type Props = {
  open: boolean;
  handleClose: () => void;
  id: number;
};

const PDFDialog: React.FC<Props> = (props: Props): JSX.Element => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { open, handleClose, id } = props;
  const pdf = `./docs/${id}.pdf`;

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      fullWidth={true}
      maxWidth="md"
    >
      <DialogTitle id="form-dialog-title">PDF de documento {id}</DialogTitle>
      <DialogContent>
        <SizeMe>
          {({ size }) => (
            <Document file={pdf}>
              <Page pageNumber={1} width={size.width ? size.width : 1} />
            </Document>
          )}
        </SizeMe>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PDFDialog;
