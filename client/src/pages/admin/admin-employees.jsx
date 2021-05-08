import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";

import EmployeesTable from "../../components/admin-data-employees/admin-data-employees";
import { fetchAuthoritiesStart } from "../../redux/authority/authority.actions";
import { fetchEmployeesStart } from "../../redux/user/user.actions";
import { selectAuthorities } from "../../redux/authority/authority.selector";
import { selectEmployees } from "../../redux/user/user.selector";

function EmployeesPage({
  fetchAuthoritiesStart,
  selectAuthorities,
  fetchEmployeesStart,
  selectEmployees,
}) {
  useEffect(() => {
    fetchAuthoritiesStart();
  }, [fetchAuthoritiesStart]);
  useEffect(() => {
    fetchEmployeesStart();
  }, [fetchEmployeesStart]);
  return (
    <EmployeesTable
      employees={selectEmployees}
      authorities={selectAuthorities}
    />
  );
}

const mapDispatchToProp = (dispatch) => ({
  fetchAuthoritiesStart: () => dispatch(fetchAuthoritiesStart()),
  fetchEmployeesStart: () => dispatch(fetchEmployeesStart()),
});

const mapStateToProp = (state) => ({
  selectAuthorities: selectAuthorities(state),
  selectEmployees: selectEmployees(state),
});
export default connect(mapStateToProp, mapDispatchToProp)(EmployeesPage);
