import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Typography } from "@material-ui/core";
import {
  fetchInvoicesStart,
  editInvoiceStart,
} from "../../redux/invoice/invoice.actions";

import ListInvoices from "../../components/list-invoice/list-invoice";

const AdminInvoices = () => {
  const dispatch = useDispatch();

  // const handleChangeStatusInvoice = (title, status) => {
  //   dispatch(editInvoiceStart({ title, status }));
  // };

  useEffect(() => {
    dispatch(fetchInvoicesStart());
  }, [fetchInvoicesStart]);

  const { invoices } = useSelector((state) => state.invoice);

  return <ListInvoices isAdmin invoices={invoices} />;
};

export default AdminInvoices;
