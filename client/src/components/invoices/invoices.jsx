import { Typography } from "@material-ui/core";
import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import TabsBar from "../../components/Tabs/Tabs";

import { fetchUserInvoicesStart } from "../../redux/invoice/invoice.actions";

import CartItems from "../cart-items/cart-items";

import ListInvoices from "../list-invoice/list-invoice";

const Invoices = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserInvoicesStart());
  }, [fetchUserInvoicesStart]);
  const invoices = useSelector((state) => state.invoice).invoices;
  console.log(invoices);
  return <ListInvoices invoices={invoices} />;
};

export default Invoices;
