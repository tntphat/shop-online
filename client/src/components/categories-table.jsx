import React, { useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button, Typography, Box } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import EditIcon from "@material-ui/icons/Edit";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

import FormCategoryAdd from "./Forms/CategoryForm";

import { deleteCategoryStart } from "../redux/categories/category.actions";

import Popup from "./popUp";
import ConfirmDialog from "./ConfirmDialog";
import Notification from "./Notification";

const useStyles = makeStyles((theme) => ({
  root: {
    maxHeight: "86vh",
  },
  table: {
    minWidth: 650,
  },
  accDetail: {
    cursor: "default",
  },
  accDetailWrap: {
    width: "100%",
    padding: "0",
  },
}));

const AccordionItem = ({ name }) => {
  const classes = useStyles();
  return (
    <>
      <AccordionDetails className={classes.accDetail}>
        <Box
          className={classes.accDetailWrap}
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            <Typography>{name}</Typography>
          </Box>
          <Box display="flex">
            <Button variant="outlined">Sửa</Button>
            <Box ml={1}>
              <Button variant="outlined">Xóa</Button>
            </Box>
          </Box>
        </Box>
      </AccordionDetails>
    </>
  );
};

const Row = ({ row }) => {
  const classes = useStyles();
  return (
    <>
      <TableCell style={{ width: "100%" }} component="th" scope="row">
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            {row.name}
          </AccordionSummary>
          {row.sub_categories.map((item) => (
            <AccordionItem name={item.name} />
          ))}
          <AccordionDetails>
            <Button>Add</Button>
          </AccordionDetails>
        </Accordion>
      </TableCell>
    </>
  );
};

function CategoriesTable({ selectCategories, deleteCategoryStart }) {
  const classes = useStyles();
  const [openPopup, setOpenPopup] = useState(false);
  const [targetRow, setTargetRow] = useState(null);

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
    onConfirm: null,
  });

  const submitDelete = (id) => {
    console.log("clicked dlt", id);
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });

    deleteCategoryStart(id);
    setNotify({
      isOpen: true,
      message: "Bn đã xóa thành công",
      type: "success",
    });
  };

  function handleEdit(row) {
    setTargetRow(row);
    setOpenPopup(true);
  }

  return (
    <>
      <TableContainer className={classes.root} component={Paper}>
        <Box mx={2} mt={2} display="flex" justifyContent="space-between">
          <Typography variant="h5">Categories</Typography>
          <Button variant="contained" onClick={() => setOpenPopup(true)}>
            Add
          </Button>
        </Box>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Sữa/Xóa</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectCategories.map((row) => (
              <TableRow key={row._id}>
                <Row row={row} />
                <TableCell>
                  <Box display="flex">
                    <Button
                      onClick={() => handleEdit(row)}
                      startIcon={<EditIcon />}
                      variant="contained"
                    >
                      Sữa
                    </Button>
                    <Box ml={1}>
                      <Button
                        startIcon={<DeleteOutlineIcon />}
                        variant="contained"
                        onClick={() =>
                          setConfirmDialog({
                            isOpen: true,
                            title: "Are u sure to delete?",
                            subTitle: "U cant undo this operation",
                            onConfirm: () => {
                              submitDelete(row._id);
                            },
                          })
                        }
                      >
                        Xóa
                      </Button>
                    </Box>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Popup
        setTargetRow={setTargetRow}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <FormCategoryAdd targetRow={targetRow} setOpenPopup={setOpenPopup} />
      </Popup>

      <Notification notify={notify} setNotify={setNotify}></Notification>

      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
}

const mapDispatchToProp = (dispatch) => ({
  deleteCategoryStart: (id) => dispatch(deleteCategoryStart(id)),
});

export default connect(null, mapDispatchToProp)(CategoriesTable);
