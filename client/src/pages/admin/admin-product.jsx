import React, { useEffect } from "react";
import { connect } from "react-redux";
import DataTable from "../../components/admin-data-products/admin-data-products";
import { fetchProductsStart } from "../../redux/product/product.actions";
import { selectProducts } from "../../redux/product/product.selector";
import { fetchCategoriesStart } from "../../redux/categories/category.actions";
import { selectCategories } from "../../redux/categories/category.selector";

const AdminProduct = ({
  selectProducts,
  fetchProductsStart,
  selectCategories,
  fetchCategoriesStart,
}) => {
  useEffect(() => {
    fetchProductsStart();
  }, [fetchProductsStart]);

  useEffect(() => {
    fetchCategoriesStart();
  }, [fetchCategoriesStart]);
  return (
    <>
      <DataTable data={selectProducts} categories={selectCategories} />
    </>
  );
};

const mapStateToProp = (state) => ({
  selectProducts: selectProducts(state),
  selectCategories: selectCategories(state),
});

const mapDispatchToProp = (dispatch) => ({
  fetchProductsStart: () => dispatch(fetchProductsStart()),
  fetchCategoriesStart: () => dispatch(fetchCategoriesStart()),
});

export default connect(mapStateToProp, mapDispatchToProp)(AdminProduct);
