import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInvoicesStart } from "../../redux/invoice/invoice.actions";

import ListInvoices from "../../components/list-invoice/list-invoice";

const AdminInvoices = () => {
  const dispatch = useDispatch();

  // const handleChangeStatusInvoice = (title, status) => {
  //   dispatch(editInvoiceStart({ title, status }));
  // };

  useEffect(() => {
    dispatch(fetchInvoicesStart());
  }, [dispatch]);

  const { invoices } = useSelector((state) => state.invoice);

  return <ListInvoices isAdmin invoices={invoices} />;
};

export default AdminInvoices;
