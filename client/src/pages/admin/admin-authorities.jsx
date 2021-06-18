import React from "react";
import { Typography } from "@material-ui/core";
import { connect } from "react-redux";
import AuthoritiesTable from "../../components/admin-data-tables/admin-data-authorities";
import { fetchAuthoritiesStart } from "../../redux/authority/authority.actions";
import { selectAuthorities } from "../../redux/authority/authority.selector";
import { useEffect } from "react";

const AdminAuthorities = ({ fetchAuthoritiesStart, selectAuthorities }) => {
  useEffect(() => {
    fetchAuthoritiesStart();
  }, [fetchAuthoritiesStart]);
  return (
    <>
      <Typography variant="h6">Authorities</Typography>
      <AuthoritiesTable authorities={selectAuthorities} />
    </>
  );
};

const mapDispatchToProp = (dispatch) => ({
  fetchAuthoritiesStart: () => dispatch(fetchAuthoritiesStart()),
});

const mapStateToProp = (state) => ({
  selectAuthorities: selectAuthorities(state),
});

export default connect(mapStateToProp, mapDispatchToProp)(AdminAuthorities);
