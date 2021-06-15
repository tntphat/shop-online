import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Button } from "@material-ui/core";
import Popup from "../../components/popUp";
import NoteFrom from "../../components/Forms/Admin-Note";
import { fetchProductsStart } from "../../redux/product/product.actions";
const AdminAddproduct = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProductsStart());
  }, [dispatch]);

  const products = useSelector((state) => state.product.products);

  const [openPopup, setOpenPopup] = useState(false);
  return (
    <>
      <Button onClick={() => setOpenPopup(true)} variant="contained">
        Home
      </Button>
      <Typography variant="h2">Notes</Typography>
      <Popup openPopup={openPopup} setOpenPopup={setOpenPopup}>
        <NoteFrom products={products} setOpenPopup={setOpenPopup} />
      </Popup>
    </>
  );
};

export default AdminAddproduct;
