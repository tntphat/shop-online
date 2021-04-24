import React, { useEffect } from "react";
import { connect } from "react-redux";
import DataTable from "../../components/admin-data-products/admin-data-products";
import { fetchProductsStart } from "../../redux/product/product.actions";
import { selectProducts } from "../../redux/product/product.selector";

const AdminProduct = ({ selectProducts, fetchProductsStart }) => {
  useEffect(() => {
    fetchProductsStart();
  }, [fetchProductsStart]);

  // const handleClick = () => {
  //   setNotify({
  //     isOpen: true,
  //     message: "Hello",
  //     type: "success",
  //   });
  // };
  return (
    <>
      <DataTable data={selectProducts} />
    </>
  );
};

const mapStateToProp = (state) => ({
  selectProducts: selectProducts(state),
});

const mapDispatchToProp = (dispatch) => ({
  fetchProductsStart: () => dispatch(fetchProductsStart()),
});

export default connect(mapStateToProp, mapDispatchToProp)(AdminProduct);
