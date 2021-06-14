import React from "react";
import { useSelector } from "react-redux";

import WithSpinner from "../with-spinner/with-spinner";
import CategoriesOverview from "./categories-overview";

const CategoriesOverviewWithSpinner = WithSpinner(CategoriesOverview);

export default function () {
  const isLoading1 = useSelector((state) => state.category.isFetching);
  const isLoading2 = useSelector((state) => state.product.isFetching);
  const isLoading = isLoading1 || isLoading2;
  return <CategoriesOverviewWithSpinner isLoading={isLoading} />;
}
