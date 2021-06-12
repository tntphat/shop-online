import React, { useEffect } from "react";
import CategoriesTable from "../../components/categories-table";
// import Popup from "../../components/popUp";
import { connect } from "react-redux";

import { fetchCategoriesStart } from "../../redux/categories/category.actions";
import { selectCategories } from "../../redux/categories/category.selector";
// import FormAdd from "./admin-pruduct-add";

function CategoriesPage({ fetchCategoriesStart, selectCategories }) {
  // const [openPopup, setOpenPopup] = useState(false);
  useEffect(() => {
    fetchCategoriesStart();
  }, [fetchCategoriesStart]);
  return (
    <>
      {/* <Typography variant="h3">Categories</Typography> */}
      <CategoriesTable selectCategories={selectCategories} />
      {/* <Popup openPopup={openPopup} setOpenPopup={setOpenPopup}>
        <FormCategoryAdd setOpenPopup={setOpenPopup} />
      </Popup> */}
    </>
  );
}

const mapStateToProp = (state) => ({
  selectCategories: selectCategories(state),
});

const mapDispatchToProp = (dispatch) => ({
  fetchCategoriesStart: () => dispatch(fetchCategoriesStart()),
});

export default connect(mapStateToProp, mapDispatchToProp)(CategoriesPage);
