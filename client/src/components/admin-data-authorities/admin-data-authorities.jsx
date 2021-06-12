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

import Popup from "../popUp";
import ConfirmDialog from "../ConfirmDialog";
import Notification from "../Notification";

import AuthorityForm from "../../components/Forms/Admin-Authority";

import EditIcon from "@material-ui/icons/Edit";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function BasicTable({ authorities }) {
  const classes = useStyles();
  const [openPopup, setOpenPopup] = useState(false);
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
        <Typography>Authorities </Typography>
        <Button variant="contained" onClick={() => setOpenPopup(true)}>
          Add
        </Button>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="left">Calories</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {authorities.map((row, index) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {index}
                </TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="right">
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
        <AuthorityForm setOpenPopup={setOpenPopup} />
      </Popup>
      <Notification notify={notify} setNotify={setNotify}></Notification>

      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
}

// import React from "react";
// import { Button } from "@material-ui/core";
// import { useForm } from "react-hook-form";
// import Countries, { countries } from "./Countries";

// export default function App() {
//   const { control, handleSubmit, reset } = useForm({});
//   return (
//     <form onSubmit={handleSubmit((data) => console.log(data))}>
//       <Countries control={control} />
//       <Button variant="contained" color="primary" type="submit">
//         Get country code
//       </Button>
//     </form>
//   );
// }
