import React, { useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import Button from "@material-ui/core/Button";
import moment from "moment";
import { delProductStart } from "../../redux/product/product.actions";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { connect } from "react-redux";
import { Box, IconButton, makeStyles, Typography } from "@material-ui/core";
import PopUp from "../popUp";
import ConfirmDialog from "../ConfirmDialog";
import Notification from "../../components/Notification";
import ProductForm from "../Forms/Admin-product";

const useStyles = makeStyles((theme) => ({
  dltButton: {
    marginBottom: theme.spacing(1),
    marginRight: theme.spacing(2),
  },
  addBtn: {
    height: "36px",
    marginBottom: theme.spacing(1),
  },
}));

const DataTable = ({ data, categories, delProductStart }) => {
  const classes = useStyles();
  const rows = data;
  console.log("RENDER DATA TABLE AGAIN");
  const [openPopup, setOpenPopup] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [targetRow, setTargetRow] = useState(null);

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
    onConfirm: null,
  });
  const selectedRow = React.useRef([]);

  const submitDelete = (ind) => {
    console.log("clicked dlt", ind);
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    let selectedByRow = [];
    let indexByRows = [];
    if (typeof ind === "number") {
      indexByRows.push(ind.toString());
      selectedByRow.push(rows[ind]._id);
    } else {
      indexByRows.push(...selectedRow.current);
      selectedRow.current.forEach((id) => selectedByRow.push(rows[id]._id));
    }
    console.log("idxRws", indexByRows, ind);
    delProductStart({ _ids: selectedByRow, ids: indexByRows });
    setNotify({
      isOpen: true,
      message: "Bn đã xóa thành công",
      type: "success",
    });
    selectedRow.current = [];
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.4 },
    { field: "name", headerName: "Name", flex: 1 },
    {
      field: "category_id",
      headerName: "Category ",
      flex: 1,
      valueGetter: (params) => params.row.category_id.name,
    },

    {
      field: "sub_category_id",
      headerName: "Sub Name",
      flex: 1,
      valueGetter: (params) => params.row.sub_category_id.name,
    },
    {
      field: "createdAt",
      type: "date",
      headerName: "Created At",
      flex: 1,
    },
    {
      headerName: "Edit",
      field: "date",
      renderCell: (param) => {
        return (
          <>
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              style={{ textTransform: "none" }}
              onClick={() => {
                setOpenPopup(true);
                setTargetRow(param.row);
              }}
            >
              Sửa
            </Button>

            <Button
              variant="outlined"
              style={{ marginLeft: "8px", textTransform: "none" }}
              startIcon={<DeleteIcon />}
              onClick={() =>
                setConfirmDialog({
                  isOpen: true,
                  title: "Are u sure to delete?",
                  subTitle: "U cant undo this operation",
                  onConfirm: () => {
                    submitDelete(+param.row.id);
                  },
                })
              }
            >
              Xóa
            </Button>
          </>
        );
      },
      flex: 1,
    },
  ];

  const handleClick = () => {
    setNotify({
      isOpen: true,
      message: "Hello",
      type: "success",
    });
  };
  // const [rows, setRows] = useState(data);
  const newRows = rows.map((row, index) => {
    const { _id, createdAt, ...others } = row;
    const fomatted_date = moment(createdAt).format("YYYY-MM-DD");
    const newRow = {
      id: index,
      createdAt: fomatted_date,
      _id,
      ...others,
    };
    return newRow;
  });

  const handleChangeSelect = (rows) => {
    selectedRow.current = rows;
  };

  return (
    <div style={{ height: 500, width: "100%" }}>
      <Box display="flex" justifyContent="space-between" alignItems="flex-end">
        <Typography variant="h2">Product</Typography>
        <Box display="flex">
          <Button
            onClick={() =>
              setConfirmDialog({
                isOpen: true,
                title: "Are u sure to delete?",
                subTitle: "U cant undo this operation",
                onConfirm: () => {
                  submitDelete();
                },
              })
            }
            className={classes.dltButton}
            startIcon={<DeleteIcon />}
            variant="contained"
            color="primary"
          >
            Delete
          </Button>
          <Button
            onClick={() => {
              setTargetRow(null);
              setOpenPopup(true);
            }}
            variant="contained"
            className={classes.addBtn}
            color="primary"
            startIcon={<AddIcon />}
          >
            add
          </Button>
        </Box>
      </Box>
      <DataGrid
        pageSize={10}
        rows={newRows}
        columns={columns}
        checkboxSelection
        disableSelectionOnClick={true}
        loading={!data}
        onSelectionModelChange={(newSelection) => {
          handleChangeSelect(newSelection.selectionModel);
        }}
      />

      <Notification notify={notify} setNotify={setNotify}></Notification>

      <PopUp
        title="Add Product"
        fullScreen={true}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <ProductForm
          categories={categories}
          setOpenPopup={setOpenPopup}
          setTargetRow={setTargetRow}
          targetRow={targetRow}
        />
      </PopUp>

      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </div>
  );
};

const mapDispatchToProp = (dispatch) => ({
  delProductStart: (obj) => dispatch(delProductStart(obj)),
});

export default connect(null, mapDispatchToProp)(DataTable);
