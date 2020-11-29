import React, { Dispatch, SetStateAction, useState } from "react";
import clsx from "clsx";
import {
  createStyles,
  lighten,
  makeStyles,
  Theme,
} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import { MovementTableType, HeadCell } from "../types";
import AddMovementDialog from "./AddMovementDialog";

const headCells: HeadCell[] = [
  { id: "uuid", numeric: true, disablePadding: true, label: "#" },
  { id: "code", numeric: false, disablePadding: false, label: "Código" },
  { id: "name", numeric: false, disablePadding: false, label: "Nombre" },
  { id: "amount", numeric: true, disablePadding: false, label: "Cantidad" },
  { id: "unit", numeric: true, disablePadding: false, label: "Unidad" },
  { id: "price", numeric: true, disablePadding: false, label: "Precio" },
  { id: "tax", numeric: true, disablePadding: false, label: "IVA" },
  { id: "subtotal", numeric: true, disablePadding: false, label: "Subtotal" },
  { id: "total", numeric: true, disablePadding: false, label: "Total" },
];

type EnhancedTableProps = {
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
};

const EnhancedTableHead: React.FC<EnhancedTableProps> = (
  props: EnhancedTableProps
): JSX.Element => {
  const { onSelectAllClick, numSelected, rowCount } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        {headCells.map(
          (headCell: HeadCell): JSX.Element => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? "right" : "left"}
              padding={headCell.disablePadding ? "none" : "default"}
            >
              {headCell.label}
            </TableCell>
          )
        )}
      </TableRow>
    </TableHead>
  );
};

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === "light"
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: "1 1 100%",
    },
  })
);

type EnhancedTableToolbarProps = {
  numSelected: number;
  handleOpen: () => void;
  removeItems: () => void;
};

const EnhancedTableToolbar: React.FC<EnhancedTableToolbarProps> = (
  props: EnhancedTableToolbarProps
): JSX.Element => {
  const classes = useToolbarStyles();
  const { numSelected, handleOpen, removeItems } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} {numSelected > 1 ? "seleccionados" : "seleccionado"}
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Agregar o eliminar los movimientos deseados
        </Typography>
      )}
      {numSelected > 0 ? (
        <Button variant="contained" color="secondary" onClick={removeItems}>
          Eliminar
        </Button>
      ) : (
        <Button variant="contained" onClick={handleOpen}>
          Agregar
        </Button>
      )}
    </Toolbar>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2),
    },
  })
);

type Props = {
  rows: MovementTableType[];
  setRows: Dispatch<SetStateAction<MovementTableType[]>>;
};

const MovementsTable: React.FC<Props> = (props: Props): React.ReactElement => {
  const classes = useStyles();
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const { rows, setRows } = props;

  const handleSelectAllClick = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (event.target.checked) {
      const newSelecteds: string[] = rows.map(
        (n: MovementTableType): string => n.uuid
      );
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (
    event: React.MouseEvent<unknown>,
    uuid: string
  ): void => {
    const selectedIndex = selected.indexOf(uuid);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, uuid);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number): void => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const removeItems = (): void => {
    let newRows = rows;

    selected.forEach((element: string) => {
      newRows = newRows.filter(
        (item: MovementTableType) => item.uuid !== element
      );
    });

    setSelected([]);
    setRows(newRows);
  };

  const isSelected = (uuid: string): boolean => selected.indexOf(uuid) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <Paper className={classes.paper}>
      <EnhancedTableToolbar
        handleOpen={() => setOpenDialog(true)}
        removeItems={removeItems}
        numSelected={selected.length}
      />
      <TableContainer>
        <Table aria-labelledby="tableTitle" aria-label="enhanced table">
          <EnhancedTableHead
            numSelected={selected.length}
            onSelectAllClick={handleSelectAllClick}
            rowCount={rows.length}
          />
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(
                (row: MovementTableType, index: number): JSX.Element => {
                  const isItemSelected = isSelected(row.uuid);
                  const labelId = `enhanced-table-checkbox-${row.uuid}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.uuid)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.uuid}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {index + 1}
                      </TableCell>
                      <TableCell>{row.code}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell align="right">{row.amount}</TableCell>
                      <TableCell align="right">{row.unit}</TableCell>
                      <TableCell align="right">{row.price}</TableCell>
                      <TableCell align="right">{row.tax}</TableCell>
                      <TableCell align="right">{row.subtotal}</TableCell>
                      <TableCell align="right">{row.total}</TableCell>
                    </TableRow>
                  );
                }
              )}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <AddMovementDialog
        open={openDialog}
        setRows={setRows}
        handleClose={() => setOpenDialog(false)}
      />
    </Paper>
  );
};

export default MovementsTable;
