import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { fetchUserInvoicesStart } from "../../redux/invoice/invoice.actions";

import ListInvoices from "../list-invoice/list-invoice";

const Invoices = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserInvoicesStart());
  }, [dispatch]);
  const invoices = useSelector((state) => state.invoice).invoices;
  return <ListInvoices invoices={invoices} />;
};

export default Invoices;
