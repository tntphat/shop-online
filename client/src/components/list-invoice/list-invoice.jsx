import { Typography } from "@material-ui/core";
import React from "react";

import TabsBar from "../../components/Tabs/Tabs";

import { useDispatch } from "react-redux";

import CartItems from "../cart-items/cart-items";

import { editInvoiceStart } from "../../redux/invoice/invoice.actions";

const ListInvoices = ({ invoices, isAdmin }) => {
  const dispatch = useDispatch();

  const invoicesAccepted = [];
  const invoicesPending = [];
  const invoicesDelivering = [];
  const invoicesDelivered = [];
  const invoicesCancelled = [];
  const newArr = invoices.map(({ products, ...rest }) => {
    const items = products.map(({ product_id, quantity }) => ({
      quantity,
      ...product_id,
    }));

    switch (rest.status) {
      case "Pending":
        invoicesPending.push({ ...rest, items });
        break;
      case "Delivering":
        invoicesDelivering.push({ ...rest, items });
        break;
      case "Accepted":
        invoicesAccepted.push({ ...rest, items });
        break;
      case "Delivered":
        invoicesDelivered.push({ ...rest, items });
        break;
      default:
        invoicesCancelled.push({ ...rest, items });
    }

    return { ...rest, items };
  });

  const handleChangeStatusInvoice = (title, status) => {
    dispatch(editInvoiceStart({ title, status }));
  };

  const ListInvoicesAll = () =>
    newArr.map((invoice) => {
      return (
        <CartItems
          key={invoice._id}
          handleChangeStatusInvoice={handleChangeStatusInvoice}
          isAdmin={isAdmin}
          customer={invoice.customer}
          address={invoice.address}
          cartItems={invoice.items}
          title={invoice._id}
          total={invoice.total_price}
          status={invoice.status}
        />
      );
    });

  const ListInvoicesPending = () =>
    invoicesPending.map((invoice) => (
      <CartItems
        key={invoice._id}
        handleChangeStatusInvoice={handleChangeStatusInvoice}
        isAdmin={isAdmin}
        customer={invoice.customer}
        address={invoice.address}
        cartItems={invoice.items}
        title={invoice._id}
        total={invoice.total_price}
        status={invoice.status}
      />
    ));

  const ListInvoicesDelivering = () =>
    invoicesDelivering.map((invoice) => (
      <CartItems
        key={invoice._id}
        handleChangeStatusInvoice={handleChangeStatusInvoice}
        isAdmin={isAdmin}
        customer={invoice.customer}
        address={invoice.address}
        cartItems={invoice.items}
        title={invoice._id}
        total={invoice.total_price}
        status={invoice.status}
      />
    ));

  const ListInvoicesAccepted = () =>
    invoicesAccepted.map((invoice) => (
      <CartItems
        key={invoice._id}
        handleChangeStatusInvoice={handleChangeStatusInvoice}
        isAdmin={isAdmin}
        customer={invoice.customer}
        address={invoice.address}
        cartItems={invoice.items}
        title={invoice._id}
        total={invoice.total_price}
        status={invoice.status}
      />
    ));

  const ListInvoicesDelivered = () =>
    invoicesDelivered.map((invoice) => (
      <CartItems
        key={invoice._id}
        handleChangeStatusInvoice={handleChangeStatusInvoice}
        isAdmin={isAdmin}
        customer={invoice.customer}
        address={invoice.address}
        cartItems={invoice.items}
        title={invoice._id}
        total={invoice.total_price}
        status={invoice.status}
      />
    ));

  const ListInvoicesCancelled = () =>
    invoicesCancelled.map((invoice) => (
      <CartItems
        key={invoice._id}
        handleChangeStatusInvoice={handleChangeStatusInvoice}
        isAdmin={isAdmin}
        customer={invoice.customer}
        address={invoice.address}
        cartItems={invoice.items}
        title={invoice._id}
        total={invoice.total_price}
        status={invoice.status}
      />
    ));

  return (
    <>
      <Typography variant="h5">Invoices</Typography>
      <TabsBar
        tabs={[
          {
            label: "All",
            comp: <ListInvoicesAll />,
          },
          {
            label: "Pending",
            comp: <ListInvoicesPending />,
          },
          {
            label: "Accepted",
            comp: <ListInvoicesAccepted />,
          },
          {
            label: "Delivering",
            comp: <ListInvoicesDelivering />,
          },
          {
            label: "Delivered",
            comp: <ListInvoicesDelivered />,
          },
          {
            label: "Cancelled",
            comp: <ListInvoicesCancelled />,
          },
        ]}
      />
    </>
  );
};

export default ListInvoices;
