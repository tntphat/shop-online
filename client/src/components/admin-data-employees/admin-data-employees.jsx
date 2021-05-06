import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, Typography } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import EditIcon from "@material-ui/icons/Edit";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

import Popup from "../popUp";
import ConfirmDialog from "../ConfirmDialog";
import Notification from "../Notification";
import EmployeeForm from "../Forms/EmployeeForm";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const authoritiess = [{ name: "Fat" }];

function EmployeesTable({ authorities, employees }) {
  const classes = useStyles();
  const [openPopup, setOpenPopup] = useState(false);
  const [targetRow, setTargetRow] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
    onConfirm: null,
  });
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  return (
    <>
      <TableContainer component={Paper}>
        <Typography>Employee </Typography>
        <Button variant="contained" onClick={() => setOpenPopup(true)}>
          Add
        </Button>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="left">Tên</TableCell>
              <TableCell>Chức vụ</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {index}
                </TableCell>
                <TableCell align="left">{row.lastName}</TableCell>
                <TableCell>{row.authority.name}</TableCell>
                <TableCell>
                  <Box display="flex">
                    <Button
                      // onClick={() => handleEdit(row)}
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
                            // onConfirm: () => {
                            //   submitDelete(row._id);
                            // },
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
      <Popup fullScreen openPopup={openPopup} setOpenPopup={setOpenPopup}>
        <EmployeeForm authorities={authorities} setOpenPopup={setOpenPopup} />
      </Popup>
      <Notification notify={notify} setNotify={setNotify}></Notification>

      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
}

export default EmployeesTable;
