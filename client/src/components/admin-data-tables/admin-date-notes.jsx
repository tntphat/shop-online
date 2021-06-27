import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Typography } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import EditIcon from "@material-ui/icons/Edit";
import { formatDateByString } from "../../helpers/date-time";
import { formatNumber } from "../../helpers/number";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  done: {
    backgroundColor: theme.palette.doneNote.main,
  },
}));

const Row = ({ row }) => {
  return (
    <>
      <TableCell style={{ width: "1000px" }} component="th" scope="row">
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{row._id}</Typography>
          </AccordionSummary>
          {row.goods.map((item) => (
            <AccordionDetails>
              <span>{item.product_id.name}</span>

              <span style={{ marginLeft: "auto", fontWeight: "500" }}>
                Left: {item.quantityLeft} / {item.quantity}
              </span>
            </AccordionDetails>
          ))}
          <AccordionDetails>
            <Accordion style={{ width: "100%", opacity: "0.8" }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Import Notes</Typography>
              </AccordionSummary>
              {row.import_notes.map((imp_note) => (
                <AccordionDetails>
                  <Accordion style={{ width: "100%", opacity: "0.8" }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <span> {imp_note._id}</span>

                      <span style={{ marginLeft: "auto", fontWeight: "500" }}>
                        {formatDateByString(imp_note.createdAt, "DD-MM HH:mm")}
                      </span>
                    </AccordionSummary>
                    {imp_note.goods.map((prod) => (
                      <AccordionDetails>
                        <span>{prod.product_id.name}</span>

                        <span style={{ marginLeft: "auto", fontWeight: "500" }}>
                          {prod.quantity}
                        </span>
                      </AccordionDetails>
                    ))}
                  </Accordion>
                </AccordionDetails>
              ))}
            </Accordion>
          </AccordionDetails>
        </Accordion>
      </TableCell>
    </>
  );
};

function NotesTable({ notes, handleImportNote }) {
  const classes = useStyles();

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="left">Tên</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Orderer</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notes.map((row, index) => (
              <TableRow key={index} className={row.status && classes.done}>
                <TableCell component="th" scope="row">
                  {index}
                </TableCell>
                <TableCell align="left">
                  <Row key={row._id} row={row} />
                </TableCell>
                <TableCell>
                  {formatDateByString(row.createdAt, "DD/MM")}
                </TableCell>
                <TableCell>{row.orderer.firstName}</TableCell>
                <TableCell>{formatNumber(row.total_price)}</TableCell>
                <TableCell>
                  <IconButton
                    disabled={row.status}
                    onClick={() => handleImportNote(row)}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default NotesTable;
